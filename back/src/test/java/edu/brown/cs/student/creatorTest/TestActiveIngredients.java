package edu.brown.cs.student.creatorTest;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import org.eclipse.jetty.util.IO;
import org.junit.jupiter.api.BeforeAll;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import okio.Buffer;
import org.junit.jupiter.api.*;
import org.testng.Assert;
import server.Handlers.ActiveIngredientHandler;
import spark.Spark;

public class TestActiveIngredients {
    private final Type mapStringObject =
            Types.newParameterizedType(Map.class, String.class, Object.class);
    private JsonAdapter<Map<String, Object>> adapter;

    @BeforeAll
    public static void setUpOnce() {
        //pick an arbitrary free port
        Spark.port(0);
        // Eliminate logger spam in console for test suite
        Logger.getLogger("").setLevel(Level.WARNING); // empty name = root
    }

    @BeforeEach
    public void setup() {
        Moshi moshi = new Moshi.Builder().build();
        adapter = moshi.adapter(mapStringObject);
    }

    @AfterEach
    public void tearDown() {
        // Gracefully stop Spark listening on both endpoints
        Spark.unmap("/broadband");
        Spark.awaitStop(); // don't proceed until the server is stopped
    }

    @AfterAll
    public static void shutdown() throws InterruptedException {
        Spark.stop();
        Thread.sleep(3000);
    }

    /**
     * Helper to start a connection to a specific API endpoint/params
     *
     * @param apiCall the call string, including endpoint (Note: this would be better if it had more
     *     structure!)
     * @return the connection for the given URL, just after connecting
     * @throws IOException if the connection fails for some reason
     */
    private HttpURLConnection tryRequest(String apiCall) throws IOException {
        // Configure the connection (but don't actually send a request yet)
        URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
        HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
        // The request body contains a Json object
        clientConnection.setRequestProperty("Content-Type", "application/json");
        // We're expecting a Json object in the response body
        clientConnection.setRequestProperty("Accept", "application/json");

        clientConnection.connect();
        return clientConnection;
    }

    // tests the most basic working call without any allergy information
    @Test
    public void testBasicSearch() throws IOException {
        Spark.get("/search_active_ingredient", new ActiveIngredientHandler());
        Spark.awaitInitialization();

        HttpURLConnection loadConnection = tryRequest("search_active_ingredient?active_ingredient=Acetaminophen");
        //     Get an OK response (the *connection* worked, the *API* provides an error response)
        Assertions.assertEquals(200, loadConnection.getResponseCode());

        Map<String, Object> body =
                adapter.fromJson(new Buffer().readFrom(loadConnection.getInputStream()));
        Assert.assertEquals(body.get("type"), "success");
    }

    // tests what happens when we search for an active ingredient that doesn't exist
    @Test
    public void testNonDrugSearch() throws IOException {
        Spark.get("/search_active_ingredient", new ActiveIngredientHandler());
        Spark.awaitInitialization();

        HttpURLConnection loadConnection = tryRequest("search_active_ingredient?active_ingredient=poo");
        //     Get an OK response (the *connection* worked, the *API* provides an error response)
        Assertions.assertEquals(200, loadConnection.getResponseCode());

        Map<String, Object> body =
                adapter.fromJson(new Buffer().readFrom(loadConnection.getInputStream()));
        Assert.assertEquals(body.get("type"), "error");
        Assert.assertEquals(body.get("error_message"), "not found in database");
    }

    // tests for when we include an inactive ingredient for an active ingredient that doesn't exist
    @Test
    public void testNonDrugInactiveSearch() throws IOException {
        Spark.get("/search_active_ingredient", new ActiveIngredientHandler());
        Spark.awaitInitialization();

        HttpURLConnection loadConnection = tryRequest(
                "search_active_ingredient?active_ingredient=poo&allergy_ingredient=peanuts");
        //     Get an OK response (the *connection* worked, the *API* provides an error response)
        Assertions.assertEquals(200, loadConnection.getResponseCode());

        Map<String, Object> body =
                adapter.fromJson(new Buffer().readFrom(loadConnection.getInputStream()));
        Assert.assertEquals(body.get("type"), "error");
        Assert.assertEquals(body.get("error_message"), "not found in database");
    }

    // tests for when we have multiple active ingredients without allergy
    @Test
    public void testMultipleActivesSearch() throws IOException {
        Spark.get("/search_active_ingredient", new ActiveIngredientHandler());
        Spark.awaitInitialization();

        HttpURLConnection loadConnection = tryRequest(
                "search_active_ingredient?active_ingredient=acetaminophen,codeine%20phosphate");
        //     Get an OK response (the *connection* worked, the *API* provides an error response)
        Assertions.assertEquals(200, loadConnection.getResponseCode());

        Map<String, Object> body =
                adapter.fromJson(new Buffer().readFrom(loadConnection.getInputStream()));
        Assert.assertEquals(body.get("type"), "success");
    }

    // tests for when we have multiple active ingredients with an allergy
    @Test
    public void testMultipleActivesAllergySearch() throws IOException {
        Spark.get("/search_active_ingredient", new ActiveIngredientHandler());
        Spark.awaitInitialization();

        HttpURLConnection loadConnection = tryRequest(
                "search_active_ingredient?active_ingredient=acetaminophen,codeine%20phosphate&allergy_ingredient=ibuprofen");
        //     Get an OK response (the *connection* worked, the *API* provides an error response)
        Assertions.assertEquals(200, loadConnection.getResponseCode());

        Map<String, Object> body =
                adapter.fromJson(new Buffer().readFrom(loadConnection.getInputStream()));
        Assert.assertEquals(body.get("type"), "success");
    }

    // tests for when we have a list of actives and one of them doesn't exist
    @Test
    public void testMultipleWrongActivesSearch() throws IOException {
        Spark.get("/search_active_ingredient", new ActiveIngredientHandler());
        Spark.awaitInitialization();

        HttpURLConnection loadConnection = tryRequest(
                "search_active_ingredient?active_ingredient=asdf,codeine%20phosphate&allergy_ingredient=ibuprofen");
        //     Get an OK response (the *connection* worked, the *API* provides an error response)
        Assertions.assertEquals(200, loadConnection.getResponseCode());

        Map<String, Object> body =
                adapter.fromJson(new Buffer().readFrom(loadConnection.getInputStream()));
        Assert.assertEquals(body.get("type"), "error");
    }
}
