package server.Handlers;

import com.squareup.moshi.Json;
import java.util.List;
import java.util.Map;

public record LabelResponse(
        @Json(name="meta") Map<String,Object> meta,
        @Json(name = "results") Result results
) {
    public record Result(
        @Json(name = "active_ingredient") String active_ingredient,
        @Json(name = "inactive_ingredient") String inactive_ingredient
        ) {}
}
