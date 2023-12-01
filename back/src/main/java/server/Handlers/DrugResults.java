package server.Handlers;

import com.squareup.moshi.Json;
import java.util.Map;

public record DrugResults(
        @Json(name = "") String type) {

    public record ActiveIngredient(
            @Json(name = "type") String type,
            @Json(name = "properties") Map<String, Object> properties) {
    }
}