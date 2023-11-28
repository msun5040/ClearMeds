package server;

import static spark.Spark.after;

import server.Handlers.DrugHandler;
import spark.Spark;
import java.util.HashSet;
import java.util.Set;



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

        Spark.get("/searchdrug", new DrugHandler());
        Spark.init();
        Spark.awaitInitialization();

    }

    public void tearDown() {
        Spark.unmap("/searchdrug");

        Spark.awaitStop(); // don't proceed until the server is stopped

    }

    public static void main(String args[]) {
        try {
            Server server = new Server(new ACSAPIDataSource());
            System.out.println("Server started on http://localhost:" + port + "/");
        } catch (DatasourceException e) {
            System.err.println("Server failed to start: " + e.getMessage());
        }
    }

}