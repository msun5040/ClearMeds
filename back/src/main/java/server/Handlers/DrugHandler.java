package server.Handlers;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import server.FDADataSource;
import spark.Request;
import spark.Response;
import spark.Route;

public class DrugHandler implements Route {
    private FDADataSource fdaDataSource;

    public DrugHandler() {
        this.fdaDataSource = new FDADataSource();
    }

    /**
     *
     * @param request  The request object providing information about the HTTP request
     * @param response The response object providing functionality for modifying the response
     * @return
     */
    @Override
    public Object handle(Request request, Response response) {

        // format: /searchdrug?drugname=_&allergy=_&age=_&currentdrugs=_
        String drugName = request.queryParams("drugname");
        String allergy = request.queryParams("allergy");
        String age = request.queryParams("age");
        String currentDrugs = request.queryParams("currentdrugs");

        // prepare to send a reply
        Moshi moshi = new Moshi.Builder().build();
        Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
        JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
        Map<String, Object> responseMap = new HashMap<>();

        return adapter.toJson(responseMap);

    }
}