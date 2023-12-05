package server.Handlers;

import com.squareup.moshi.Json;
import java.util.List;
import java.util.Map;

public record ActiveIngredient(@Json(name = "active_ingredients") List<Map> name) {}
