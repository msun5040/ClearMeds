package server.Handlers;

import com.squareup.moshi.Json;
import java.util.List;
import java.util.Map;

public record SearchResponse(
    // either looks like this, or just error hashmap with code, and message
    @Json(name = "meta") Map<String, Object> meta, @Json(name = "results") List<Result> results) {

  public record Result(
      @Json(name = "application_number") String application_number,
      @Json(name = "sponsor_name") String sponsor_name,
      @Json(name = "products") List<Product> products,
      @Json(name = "inactive_ingredient") List<String> inactive_ingredient,
      @Json(name = "active_ingredient") List<String> active_ingredient,
      @Json(name = "openfda") OpenFDA openFDA
  ) {}

  public record OpenFDA(
      @Json(name = "application_number") List<String> application_number,
      @Json(name = "brand_name") List<String> brand_name,
      @Json(name = "generic_name") List<String> generic_name,
      @Json(name = "manufacturer_name") List<String> manufacturer_name,
      @Json(name = "product_ndc") List<String> product_ndc,
      @Json(name = "product_type") List<String> product_type,
      @Json(name = "route") List<String> route,
      @Json(name = "substance_name") List<String> substance_name,
      @Json(name = "rxcui") List<String> rxcui,
      @Json(name = "spl_id") List<String> spl_id,
      @Json(name = "package_ndc") List<String> package_ndc,
      @Json(name = "unii") List<String> unii,
      @Json(name = "products") List<Product> products) {} //merge conflict here idk if we need this so im leaving it here



  public record Product(
      @Json(name = "product_number") String product_number,
      @Json(name = "reference_drug") String reference_drug,
      @Json(name = "brand_name") String brand_name,
      @Json(name = "active_ingredients") List<ActiveIngredient> active_ingredients,
      @Json(name = "reference_standard") String reference_standard,
      @Json(name = "dosage_form") String dosage_form,
      @Json(name = "route") String route,
      @Json(name = "marketing_status") String marketing_status) {}

  public record ActiveIngredient(
      @Json(name = "name") String name,
      @Json(name = "strength") String strength
  ){}

  public record ActiveIngredients(
      @Json(name = "name") String name, @Json(name = "strength") String strength) {}
}
