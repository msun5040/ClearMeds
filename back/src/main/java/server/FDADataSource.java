package server;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import okio.Buffer;
import server.Database.FirebaseInitializer;
import server.Exceptions.DatasourceException;
import server.Handlers.DrugResponse;
import server.Handlers.DrugResponse.Result;
import server.Handlers.LabelResponse;

public class FDADataSource {
  private FirebaseInitializer firebaseInitializer;
  private JsonAdapter<DrugResponse> drugsFeatureAdapter;
  private JsonAdapter<LabelResponse> labelFeatureAdapter;
  private LabelResponse labelResponse;
  private DrugResponse drugResponse;
  private Moshi moshi;
  private Map<String, List<String>> ndc_to_ingredients;
  private Map<String, List<String>> active_ingredient_to_ndc;
  private Map<String, Result> ndc_to_result;
  private Firestore db;

  public FDADataSource() {
    this.db = FirestoreClient.getFirestore();
    this.ndc_to_ingredients = new HashMap<String, List<String>>();
    this.active_ingredient_to_ndc = new HashMap<String, List<String>>();
    this.ndc_to_result = new HashMap<String, Result>();
  }

  public Map<String, List<String>> getNdctoIngredients() {

    ApiFuture<DocumentSnapshot> future =
        db.collection("ndc_to_ingredients").document("ACETAMINOPHEN").get();

    try {
      System.out.println("hello");
      DocumentSnapshot document = future.get();
      if (document.exists()) {
        ArrayList<String> values = (ArrayList<String>) document.get("values");
        System.out.println(values);

      } else {
        System.out.println("Document not found!");
      }

    } catch (ExecutionException e) {
      e.printStackTrace();
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    return ndc_to_ingredients;
  }

  public static void main(String[] args) {
    FDADataSource fdaDataSource = new FDADataSource();
    Map<String, List<String>> ndcToIngredients = fdaDataSource.getNdctoIngredients();
  }

  public DrugResponse searchActiveIngredient(String activeIngredient) throws DatasourceException {
    try {
      // 1000 is the maximum limit
      //
      //
      //
      // https://api.fda.gov/drug/drugsfda.json?search=products.active_ingredients.name:IBUPROFEN&limit=1000
      URL requestURL =
          new URL(
              "https",
              "api.fda.gov",
              "/drug/drugsfda.json?search=products.active_ingredients.name:"
                  + activeIngredient
                  + "&limit=1000");
      HttpURLConnection clientConnection = connect(requestURL);
      Moshi moshi = new Moshi.Builder().build();
      JsonAdapter<DrugResponse> adapter = moshi.adapter(DrugResponse.class);
      DrugResponse response =
          adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

      clientConnection.disconnect();
      return response;
    } catch (Exception e) {

      throw new DatasourceException(e.getMessage(), e.getCause());
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
}
