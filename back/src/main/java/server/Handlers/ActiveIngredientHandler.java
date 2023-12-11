package server.Handlers;

import Caching.CacheSearchActiveIngredient;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import server.Exceptions.DatasourceException;
import server.FDADataSource;
import spark.Request;
import spark.Response;
import spark.Route;

public class ActiveIngredientHandler implements Route {
  private FDADataSource fdaDataSource;
  private CacheSearchActiveIngredient cache;

  public ActiveIngredientHandler() {
    this.fdaDataSource = new FDADataSource();
    this.cache = new CacheSearchActiveIngredient(10, 10, this.fdaDataSource);
  }

  /**
   * @param request The request object providing information about the HTTP request
   * @param response The response object providing functionality for modifying the response
   * @return
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {

    // format: /search_active_ingredient?active_ingredient=_
    String active_ingredient = request.queryParams("active_ingredient");
    String hello = request.queryParams("hello");

    System.out.println(Arrays.asList(active_ingredient.split(",")));
    System.out.println(hello);
//    String allergy = request.queryParams("allergy");
//    String age = request.queryParams("age");
//    String currentDrugs = request.queryParams("currentdrugs");
    //    String allergy = request.queryParams("allergy");
    //    String age = request.queryParams("age");
    //    String currentDrugs = request.queryParams("currentdrugs");

    // prepare to send a reply
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
    Map<String, Object> responseMap = new HashMap<>();

    // if the drug/ingredient name is null, return error_bad_request
    if (active_ingredient == null) {
      responseMap.put("type", "error");
      responseMap.put("error_type", "error_bad_request");
      responseMap.put("details", "active_ingredient is null!");
      return adapter.toJson(responseMap);
    }

    try {

      responseMap.put("result", this.fdaDataSource.searchActiveIngredient(active_ingredient));

    } catch (DatasourceException e) {
      responseMap.put("type", "error");
      responseMap.put("error_type", "error_datasource");
      responseMap.put("details", e.getMessage());
      responseMap.put("active_ingredient", active_ingredient);
    }

    return adapter.toJson(responseMap);
  }
}
