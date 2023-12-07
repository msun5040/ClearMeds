package server;

import Caching.CacheSearchActiveIngredient;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import okio.Buffer;

import org.testng.reporters.jq.ResultsByClass;
import server.Exceptions.BadJSONException;
import server.Exceptions.DatasourceException;
import server.Handlers.SearchResponse;
import server.Handlers.SearchResponse.ActiveIngredient;
import server.Handlers.SearchResponse.Result;
import spark.Spark;

public class FDADataSource {

    /**
     * This is the FDADataSource class that handles all the API calls to the FDA.
     */
    private JsonAdapter<SearchResponse> featureAdapter;
    private SearchResponse searchResponse;
    private Moshi moshi;

    private Map<String, List<String>> ndc_to_ingredients;
    private Map<String, List<String>> active_ingredient_to_ndc;
    private Map<String, Result> ndc_to_result;


    public FDADataSource() {

        try {

            this.moshi = new Moshi.Builder().build();
            this.featureAdapter = this.moshi.adapter(SearchResponse.class);

            // this is the smaller geojson
            //      Path jsonFilePath = Path.of("data/geo.json");

            Path jsonFilePath = Path.of("data/drug-drugsfda-0001-of-0001.json");
            String jsonData = new String(Files.readAllBytes(jsonFilePath));
            this.searchResponse = this.featureAdapter.fromJson(jsonData);
//            this.viewGeoCache = new ViewGeoCache(10, 10, this.featureCollection)x;



        } catch (IOException e) {
            System.err.println(e);
            System.err.println(e.getMessage());
        }

    }



    public void parse() {
        for (Result result: this.searchResponse.results()) {

            List<String> product_ndcs = result.openFDA().product_ndc();

            for (String ndc: product_ndcs) {

                List<String> ingredients = new ArrayList<String>();
//                fill out ingredientrs list
//                make api call to the other side to get the active ingredients
                this.ndc_to_ingredients.put(ndc, ingredients);
                this.ndc_to_result.put(ndc, result);

                for (ActiveIngredient active_ingredient_obj: result.products().get(0).active_ingredients()) {
                    String active_ingredient = active_ingredient_obj.name();
                    if (!this.active_ingredient_to_ndc.containsKey(active_ingredient)) {
                        this.active_ingredient_to_ndc.put(active_ingredient, new ArrayList<String>());
                    }
                    this.active_ingredient_to_ndc.get(active_ingredient).add(ndc);
                }

            }

        }
    }

    public SearchResponse searchActiveIngredient(String activeIngredient) throws DatasourceException {
        try {
            //1000 is the maximum limit
//            https://api.fda.gov/drug/drugsfda.json?search=products.active_ingredients.name:IBUPROFEN&limit=1000
            URL requestURL =
                    new URL(
                            "https",
                            "api.fda.gov",
                            "/drug/drugsfda.json?search=products.active_ingredients.name:"+activeIngredient+"&limit=1000");
            HttpURLConnection clientConnection = connect(requestURL);
            Moshi moshi = new Moshi.Builder().build();
            JsonAdapter<SearchResponse> adapter = moshi.adapter(SearchResponse.class);
            SearchResponse response =
                    adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

            clientConnection.disconnect();
            System.out.println("hello?");
            System.out.println(response.results().get(1).openFDA().product_ndc());
            System.out.println(response.results().get(1).products().get(0).active_ingredients());
            return response;
        } catch (Exception e) {
            //this is if there is an exception probably if a parameter doesn't exist or a search value doesn't exist
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
