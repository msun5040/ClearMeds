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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import okio.Buffer;

import server.Exceptions.BadJSONException;
import server.Exceptions.DatasourceException;
import server.Handlers.SearchResponse;
import spark.Spark;

public class FDADataSource {

    /**
     * This is the FDADataSource class that handles all the API calls to the FDA.
     */
    public FDADataSource() {

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
