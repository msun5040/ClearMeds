package server;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import io.opencensus.internal.DefaultVisibilityForTesting;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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


    try {

//      InputStream serviceAccount = new FileInputStream("data/private/clearmeds_private_key.json");
      InputStream serviceAccount = new FileInputStream("data/private/clearmedsthomas_private_key.json");
      GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
      FirebaseOptions options = new FirebaseOptions.Builder()
          .setCredentials(credentials)
          .build();
      FirebaseApp.initializeApp(options);
      this.db = FirestoreClient.getFirestore();
    } catch (IOException e){
      e.printStackTrace();

    }
    this.ndc_to_ingredients = new HashMap<String, List<String>>();
    this.active_ingredient_to_ndc = new HashMap<String, List<String>>();
    this.ndc_to_result = new HashMap<String, Result>();
  }

//  public Map<String, List<String>> getNdctoIngredients() {
//
//    ApiFuture<DocumentSnapshot> future =
//        db.collection("ndc_to_ingredients").document("ACAMPROSATE CALCIUM").get();
//
//    try {
//      System.out.println("hello");
//      DocumentSnapshot document = future.get();
//      if (document.exists()) {
//        ArrayList<String> values = (ArrayList<String>) document.get("values");
//        System.out.println(values);
//
//      } else {
//        System.out.println("Document not found!");
//      }
//
//    } catch (ExecutionException e) {
//      e.printStackTrace();
//    } catch (InterruptedException e) {
//      e.printStackTrace();
//    }
//    return ndc_to_ingredients;
//  }


  public DrugResponse searchActiveIngredient(String activeIngredient) throws DatasourceException {
      try {
        // getting the ndc list from the active ingredient passed in
        DocumentReference docRef = db.collection("active_ingredient_to_ndc").document(activeIngredient);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        ArrayList<String> output = new ArrayList<>();

        if (document.exists()) {
          Map<String, String> dict = new HashMap<>();

          for (Object ndcObject: document.getData().values()) {
            // turn the string into an iterable list
            String ndcString = ndcObject.toString();
            List<String> elements = Arrays.stream(ndcString.substring(1, ndcString.length() - 1).split(","))
                .map(String::trim)
                .collect(Collectors.toList());
            for (String ndc: elements) {
              System.out.println(ndc);
              // getting stuff from ingredient list
              ArrayList<String> ingredientsList = new ArrayList<>();
              DocumentReference docRef1 = db.collection("ndc_to_active_ingredient").document(ndc);
              ApiFuture<DocumentSnapshot> future1 = docRef1.get();
              DocumentSnapshot document1 = future1.get();
              System.out.println("doc1 " + document1.getData().toString());

              // getting other information from ndc_to_result
              DocumentReference docRef2 = db.collection("ndc_to_result").document(ndc);
              ApiFuture<DocumentSnapshot> future2 = docRef2.get();
              DocumentSnapshot document2 = future2.get();
              System.out.println("doc2 " + document2.getData().toString());
              // action idem - link all of these things and make the response now
            }
          }
        } else {
          System.out.println("no such document exists!");
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
      return null;
  }

  public Map<String, Map<String, Object>> searchActiveIngredient1(String activeIngredient) throws DatasourceException {
    try {
      // getting the ndc list from the active ingredient passed in
      DocumentReference ai_to_ndc_docRef = db.collection("active_ingredient_to_ndc").document(activeIngredient);
      ApiFuture<DocumentSnapshot> ai_to_ndc_future = ai_to_ndc_docRef.get();
      DocumentSnapshot ai_to_ndc_doc = ai_to_ndc_future.get();


      Map<String, Map<String, Object>> result = new HashMap<>();



      if (ai_to_ndc_doc.exists()) {

//        GenericTypeIndicator<ArrayList<String>> indicator = new GenericTypeIndicator<ArrayList<String>>() {};
//        ai_to_ndc_doc.toObject(List.class);
        ArrayList<String> ndcs = (ArrayList<String>) ai_to_ndc_doc.get("values");
        for (String ndc: ndcs) {
          // turn the string into an iterable list

          Map<String, Object> curr_ndc_map = new HashMap<>();

          // getting stuff from ingredient list

          DocumentReference ndc_to_ai_docRef = db.collection("ndc_to_active_ingredient").document(ndc);
          ApiFuture<DocumentSnapshot> ndc_to_ai_future = ndc_to_ai_docRef.get();
          DocumentSnapshot ndc_to_ai_doc = ndc_to_ai_future.get();

          ArrayList<String> active_ingredients = (ArrayList<String>) ndc_to_ai_doc.get("values");
          System.out.println("active ingredients: " + active_ingredients);


          DocumentReference ndc_to_iai_docRef = db.collection("ndc_to_inactive_ingredient").document(ndc);
          ApiFuture<DocumentSnapshot> ndc_to_iai_future = ndc_to_iai_docRef.get();
          DocumentSnapshot ndc_to_iai_doc = ndc_to_iai_future.get();
          String inactive_ingredients;
          if (ndc_to_iai_doc.get("values") != null) {
            inactive_ingredients = ndc_to_iai_doc.get("values").toString();
          } else {
            inactive_ingredients = "No inactive ingredients";
          }


          // getting other information from ndc_to_result
          DocumentReference ndc_to_res_docRef = db.collection("ndc_to_result").document(ndc);
          ApiFuture<DocumentSnapshot> ndc_to_res_future = ndc_to_res_docRef.get();
          DocumentSnapshot ndc_to_res_doc = ndc_to_res_future.get();

          Map<String, ArrayList<String>> openfda = (Map<String, ArrayList<String>>) ndc_to_res_doc.get("openfda");



          //dosage_form, route, marketing status, brand_name


          System.out.println("doc2 " + ndc_to_res_doc.getData().toString());
          // action idem - link all of these things and make the response now

          ArrayList<String> brand_name = openfda.get("brand_name");
          ArrayList<String> generic_name = openfda.get("generic_name");
          ArrayList<String> manufacturer_name = openfda.get("manufacturer_name");
          ArrayList<String> route = openfda.get("route");
          ArrayList<String> product_type = openfda.get("product_type");

          ArrayList<Map<String, Object>> product_list = (ArrayList<Map<String, Object>>) ndc_to_res_doc.get("products");
          //only getting the first one for ease of access / plus they should be all the same (just different strenghts)
          String dosage_form = (String) product_list.get(0).get("dosage_form");
          String marketing_status = (String) product_list.get(0).get("marketing_status");

          curr_ndc_map.put("active_ingredients", active_ingredients);
          curr_ndc_map.put("inactive_ingredients", inactive_ingredients);
          curr_ndc_map.put("brand_name", brand_name );
          curr_ndc_map.put("generic_name", generic_name );
          curr_ndc_map.put("manufacturer_name", manufacturer_name );
          curr_ndc_map.put("route", route );
          curr_ndc_map.put("product_type", product_type );
          curr_ndc_map.put("dosage_form", dosage_form );
          curr_ndc_map.put("marketing_status", marketing_status );

          result.put(ndc, curr_ndc_map);





          //open fda: brand_name, generic_name, manufacturer name, product_type, route
          //product: brand_name (can get from openfda), dosage_form, route (can get from openfda), marketing_status
          //final map: active_ingredients (map), inactive_Ingredients(map), brand_name(openfda), generic_name (openfda),
//          manufacturer_name (openfda), product_type(openfda), route(openfda), dosage_form(result), marketing_status(result)




          }

          return result;
        } else {
        System.out.println("no such ai_to_ndc_doc exists!");
        }
    } catch (Exception e) {
      e.printStackTrace();
    }

    //return error result custom map, etc.
    return null;
  }

//      // 1000 is the maximum limit
//      //
//      //
//      //
//      // https://api.fda.gov/drug/drugsfda.json?search=products.active_ingredients.name:IBUPROFEN&limit=1000
//      URL requestURL =
//          new URL(
//              "https",
//              "api.fda.gov",
//              "/drug/drugsfda.json?search=products.active_ingredients.name:"
//                  + activeIngredient
//                  + "&limit=1000");
//      HttpURLConnection clientConnection = connect(requestURL);
//      Moshi moshi = new Moshi.Builder().build();
//      JsonAdapter<DrugResponse> adapter = moshi.adapter(DrugResponse.class);
//      DrugResponse response =
//          adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
//
//      clientConnection.disconnect();
//      return response;
//    } catch (Exception e) {
//
//      throw new DatasourceException(e.getMessage(), e.getCause());
//    }
//  }

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
    //    CollectionReference collection = db.collection("ndc_to_ingredients");
    //    System.out.println(collection);
    try {

      FDADataSource fdaDataSource = new FDADataSource();
//      fdaDataSource.searchActiveIngredient("ACETAMINOPHEN");
      Map<String, Map<String, Object>> res = fdaDataSource.searchActiveIngredient1("ACETAMINOPHEN");
      System.out.println(res.toString());
    } catch (DatasourceException e) {
      e.printStackTrace();
    }
  }

}
