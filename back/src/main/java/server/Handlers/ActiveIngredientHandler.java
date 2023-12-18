package server.Handlers;

import Caching.CacheSearchActiveIngredient;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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

    // prepare to send a reply
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapStringObject);
    Map<String, Object> responseMap = new HashMap<>();

    // format: /search_active_ingredient?active_ingredient=_
    String active_ingredient_string = request.queryParams("active_ingredient");
    String allergic_ingredient_string = request.queryParams("allergy_ingredient");

    // if the drug/ingredient name is null, return error_bad_request
    if (active_ingredient_string == null) {
      responseMap.put("response_code", "error");
      responseMap.put("error_type", "error_bad_request");
      responseMap.put("error_message", "active_ingredient parameter is empty!");
      responseMap.put("active_ingredient", active_ingredient_string);
      responseMap.put("allergic_ingredient", allergic_ingredient_string);
      return adapter.toJson(responseMap);
    }

    List<String> active_ingredient_list = Arrays.asList(active_ingredient_string.split(","));
    active_ingredient_list =
        active_ingredient_list.stream().map(String::toUpperCase).collect(Collectors.toList());

    List<String> allergic_ingredient_list;
    if (allergic_ingredient_string == null) {
      allergic_ingredient_list = new ArrayList<String>();
    } else {
      allergic_ingredient_list = Arrays.asList(allergic_ingredient_string.split(","));
      allergic_ingredient_list =
          allergic_ingredient_list.stream().map(String::toUpperCase).collect(Collectors.toList());
    }

    try {
      // for loop through each active ingredient; make a bunch of lists and compare them.
      //      this.fdaDataSource.searchActiveIngredient();
      //      Map<String, Object> cacheResponse = this.cache.search(active_ingredient_string);

      //      responseMap.put("results",
      // this.fdaDataSource.searchActiveIngredient(active_ingredient_string));
      ArrayList<HashMap<String, Object>> results =
          this.fdaDataSource.searchActiveIngredient(
              active_ingredient_list, allergic_ingredient_list);

      responseMap.put("results", results);
      responseMap.put("type", "success");
      responseMap.put("active_ingredient", active_ingredient_string);
      responseMap.put("allergic_ingredient", allergic_ingredient_string);

    } catch (Exception e) {
      responseMap.put("type", "error");
      responseMap.put("error_type", e.getClass().toString());
      responseMap.put("error_message", e.getMessage());
      //      responseMap.put("error_cause", e.getCause());
      responseMap.put("active_ingredient", active_ingredient_string);
      responseMap.put("allergic_ingredient", allergic_ingredient_string);
    }

    return adapter.toJson(responseMap);
  }
}
