package server.Handlers;

// import Caching.CacheAPI;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import server.Exceptions.BadRequestException;
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
   * @param request The request object providing information about the HTTP request
   * @param response The response object providing functionality for modifying the response
   * @return
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {

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

    try {
      // if the drug/ingredient name is null, return error_bad_request
      if (drugName == null) {
        throw new BadRequestException("'drug name' parameter missing");
      }

    } catch (BadRequestException e) {
      responseMap.put("type", "error");
      responseMap.put("error_type", "error_bad_request");
      responseMap.put("details", e.getMessage());
    }

    return adapter.toJson(responseMap);
  }
}
