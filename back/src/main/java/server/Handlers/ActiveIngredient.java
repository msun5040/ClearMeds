package server.Handlers;

import com.squareup.moshi.Json;

import java.util.Map;
import java.util.List;

public record ActiveIngredient(
        @Json(name = "active_ingredients") List<Map> name) {}