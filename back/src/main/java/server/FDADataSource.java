package server;

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
import spark.Spark;

public class FDADataSource {

    /**
     * This is the FDADataSource class that handles all the API calls to the FDA.
     */
    public FDADataSource() {

    }

    public List<List<String>> searchActiveIngredient(String activeIngredient) throws DatasourceException {
        try {
            URL requestURL =
                    new URL(
                            "https",
                            "api.fda.gov",
                            "/drug/drugsfda.json?search="+activeIngredient+"&limit=10");
            HttpURLConnection clientConnection = connect(requestURL);
            Moshi moshi = new Moshi.Builder().build();
            Type mapStringObject = Types.newParameterizedType(List.class, List.class, String.class);
            JsonAdapter<List<List<String>>> adapter = moshi.adapter(mapStringObject);
            List<List<String>> responseList =
                    adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

            Map<String, String> responseMap = new HashMap<String, String>();
            clientConnection.disconnect();
            return responseList;
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
