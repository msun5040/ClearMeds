package server.Handlers;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;


public class DrugHandler implements Route {
    @Override
    public Object handle(Request request, Response response) {

        // format: /searchdrug?drugname=_&allergy=_&age=_&currentdrugs=_
        String drugName = request.queryParams("drugname");
        String allergy = request.queryParams("allergy");
        String age = request.queryParams("age");
        String currentDrugs = request.queryParams("currentdrugs");

        // prepare to send a reply
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<SuccessGeoJsonResponse> successAdapter = moshi.adapter(SuccessGeoJsonResponse.class);
        JsonAdapter<ServerFailureResponse> failureAdapter = moshi.adapter(ServerFailureResponse.class);
        Map<String, Object> responseMap = new HashMap<>();
    }
}
