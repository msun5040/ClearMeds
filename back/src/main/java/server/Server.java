package server;

import static spark.Spark.after;

import server.Handlers.ActiveIngredientHandler;
import spark.Spark;

/**
 * Server class which is responsible for setting up our server by instantiating each of our handlers
 * and hooking them up to the API.
 */
public class Server {
  static final int port = 3232;

  public Server() {

    Spark.port(port);

    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });

    //    Spark.get("/searchdrug", new DrugHandler());
    Spark.get("/search_active_ingredient", new ActiveIngredientHandler());
    Spark.init();
    Spark.awaitInitialization();
  }

  public void tearDown() {
    //    Spark.unmap("/searchdrug");
    Spark.unmap("/search_active_ingredient");
    Spark.awaitStop(); // don't proceed until the server is stopped
  }

  public static void main(String args[]) {
    //    Database database = new Database();
    //    Map<String, Set<String>> ndcToIngredients = database.getNdc_to_active_ingredient();
    //    System.out.println("Contents of ndc_to_ingredients:");
    Server server = new Server();
    System.out.println("Server started on http://localhost:" + port + "/");
  }
}
