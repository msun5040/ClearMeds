package server;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import me.tongfei.progressbar.ProgressBar;
import okio.Buffer;
import server.Exceptions.DatasourceException;
import server.Handlers.DrugResponse;
import server.Handlers.DrugResponse.ActiveIngredient;
import server.Handlers.DrugResponse.Result;
import server.Handlers.LabelResponse;

public class Database {

  private Firestore db;
  private Map<String, List<String>> ndc_to_ingredients;
  private Map<String, List<String>> active_ingredient_to_ndc;
  private Map<String, Result> ndc_to_result;
  private DrugResponse drugResponse;
  private JsonAdapter<DrugResponse> drugsFeatureAdapter;

  public Database() throws IOException, DatasourceException {

    FileInputStream serviceAccount =
        new FileInputStream("data/APIKey/clearmeds-f60c8-firebase-adminsdk-1laql-827595cce1.json");

    FirebaseOptions options =
        new FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .build();

    FirebaseApp.initializeApp(options);

    this.db = FirestoreClient.getFirestore();

    Moshi moshi = new Moshi.Builder().build();

    this.drugsFeatureAdapter = moshi.adapter(DrugResponse.class);

    Path jsonFilePath = Path.of("data/drug-drugsfda-0001-of-0001.json");
    String jsonData = new String(Files.readAllBytes(jsonFilePath));
    this.drugResponse = this.drugsFeatureAdapter.fromJson(jsonData);

    this.ndc_to_ingredients = new HashMap<String, List<String>>();
    this.active_ingredient_to_ndc = new HashMap<String, List<String>>();
    this.ndc_to_result = new HashMap<String, Result>();

    this.parse();
    this.addToDatabase();
  }

  private void parse() throws DatasourceException {
    ProgressBar pb = new ProgressBar("Test", this.drugResponse.results().size());
    pb.start();


    for (Result result : this.drugResponse.results()) {

      pb.step();

      // null checking to ensure if openfda and product_ndc exists. if it doesn't, skip it.
      if (result.openFDA() == null || result.openFDA().product_ndc() == null) {
        continue;
      }

      List<String> product_ndcs = result.openFDA().product_ndc(); // this line works

      // for every ndc in product_ndcs, get the list of all ingredients (active and inactive)
      for (String ndc : product_ndcs) {

        List<String> ingredients = new ArrayList<String>();

        // this part fills in the ingredients list with the active ingredient.
        // all the ndcs in this product list share the same active ingredient, can look at the first
        // one, and add that
        List<ActiveIngredient> active_ingredients = result.products().get(0).active_ingredients();
        for (ActiveIngredient active_ingredient : active_ingredients) {
          ingredients.add(active_ingredient.name());
        }

        //                fill out ingredients list
        //                make api call to the other side to get the active ingredients
        try { // this call fails
          URL requestURL =
              new URL(
                  "https",
                  "api.fda.gov",
                  "/drug/label.json?search=openfda.product_ndc:\"" + ndc + "\"&limit=1");
          // there's only one label for each product ndc, so can limit=1

          HttpURLConnection clientConnection = connect(requestURL);
          Moshi moshi = new Moshi.Builder().build();
          JsonAdapter<LabelResponse> adapter = moshi.adapter(LabelResponse.class);
          LabelResponse labelResponse =
              adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
          // System.out.println(response2);
          // System.out.println(response2.results() != null);
          if (labelResponse.results() != null) {
            for (LabelResponse.Result res : labelResponse.results()) {
              if (res.inactive_ingredient() != null) {
                ingredients.add(res.active_ingredient().toString());
              }
              if (res.inactive_ingredient() != null) {
                ingredients.add(res.inactive_ingredient().toString());
              }
              //              System.out.println(ndc);
              //              System.out.println(ingredients);
              this.ndc_to_ingredients.put(ndc, ingredients);
            }
          }

        } catch (Exception e) {

          throw new DatasourceException(e.getMessage(), e.getCause());
        }

        this.ndc_to_result.put(ndc, result);

        for (ActiveIngredient active_ingredient_obj :
            result.products().get(0).active_ingredients()) {
          String active_ingredient = active_ingredient_obj.name();
          if (!this.active_ingredient_to_ndc.containsKey(active_ingredient)) {
            this.active_ingredient_to_ndc.put(active_ingredient, new ArrayList<String>());
          }
          this.active_ingredient_to_ndc.get(active_ingredient).add(ndc);
        }
      }
    }
  }

  /**
   * Private helper method; throws IOException so different callers can handle differently if
   * needed.
   *
   * @param requestURL
   * @return
   * @throws IOException
   */
  private static HttpURLConnection connect(URL requestURL) throws IOException {
    URLConnection urlConnection = requestURL.openConnection();
    if (!(urlConnection instanceof HttpURLConnection))
      throw new IOException("Unexpected: result of connection wasn't HTTP");
    HttpURLConnection clientConnection = (HttpURLConnection) urlConnection;
    clientConnection.connect(); // GET
    if (clientConnection.getResponseCode() != 200)
      throw new IOException(
          "Unexpected: API connection not success status " + clientConnection.getResponseMessage());
    return clientConnection;
  }

  public static void main(String args[]) {

    try {
      Database database = new Database();
    } catch (IOException e) {
      e.printStackTrace();
    } catch (DatasourceException e) {
      e.printStackTrace();
    }
  }

  private void addToDatabase() {
    // stores the hashmaps
    storeMapInFirestore("ndc_to_ingredients", ndc_to_ingredients);
    storeMapInFirestore("active_ingredient_to_ndc", active_ingredient_to_ndc);
    storeResultMapInFirestore("ndc_to_result", ndc_to_result);
  }

  private void storeMapInFirestore(String collectionName, Map<String, List<String>> map) {
    for (Map.Entry<String, List<String>> entry : map.entrySet()) {
      String key = entry.getKey();
      List<String> values = entry.getValue();

      DocumentReference docRef = db.collection(collectionName).document(key);

      // adding data to the document
      docRef.set(Map.of("values", values));

      System.out.println("Document added with ID: " + key);
    }
  }

  private void storeResultMapInFirestore(String collectionName, Map<String, Result> resultMap) {
    for (Map.Entry<String, Result> entry : resultMap.entrySet()) {
      String key = entry.getKey();
      Result result = entry.getValue();

      // Map<String, Object> resultData = convertResultToMap(result);

      DocumentReference docRef = db.collection(collectionName).document(key);

      docRef.set(Map.of("values", result));

      System.out.println("Document added with ID: " + key);
    }
  }

  //
  //  private Map<String, Object> convertResultToMap(Result result) {
  //    // Convert your Result object to a Map (customize this based on your Result class structure)
  //    // Example: Map<String, Object> resultData = Map.of("field1", result.getField1(), "field2",
  // result.getField2(), ...);
  //    // ...
  //
  //    return null;
  //
  //
  //  }

}

/**
 * import com.google.auth.oauth2.GoogleCredentials; import com.google.cloud.firestore.Firestore;
 *
 * <p>import com.google.firebase.FirebaseApp; import com.google.firebase.FirebaseOptions;
 *
 * <p>// Use a service account InputStream serviceAccount = new
 * FileInputStream("path/to/serviceAccount.json"); GoogleCredentials credentials =
 * GoogleCredentials.fromStream(serviceAccount); FirebaseOptions options = new
 * FirebaseOptions.Builder() .setCredentials(credentials) .build();
 * FirebaseApp.initializeApp(options);
 *
 * <p>Firestore db = FirestoreClient.getFirestore();
 */
