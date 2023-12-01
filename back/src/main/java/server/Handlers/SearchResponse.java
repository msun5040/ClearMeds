package server.Handlers;

import com.squareup.moshi.Json;
import java.util.List;
import java.util.Map;

public record SearchResponse(
    //either looks like this, or just error hashmap with code, and message
    @Json(name="meta") Map<String,Object> meta,
    @Json(name = "results") List<Result> results
) {

  public record Result(
      @Json(name = "application_number") String application_number,
      @Json(name = "sponsor_name") String sponsor_name,
      @Json(name = "products") List<Product> products
  ) {}

  public record Product(
      @Json(name = "product_number") String product_number,
      @Json(name = "reference_drug") String reference_drug,
      @Json(name = "brand_name") String brand_name,
      @Json(name = "active_ingredients") List<ActiveIngredient> active_ingredients,
      @Json(name = "reference_standard") String reference_standard,
      @Json(name = "dosage_form") String dosage_form,
      @Json(name = "route") String route,
      @Json(name = "marketing_status") String marketing_status
  ) {}

  public record ActiveIngredients(
      @Json(name = "name") String name,
      @Json(name = "strength") String strength
  ){}

}


