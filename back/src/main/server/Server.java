package main.server;

import java.util.List;
import spark.Spark;

import FDAHandler;

/**
 * Server class which is responsible for setting up our server by instantiating each of our handlers
 * and hooking them up to the API.
 */
public class Server {

    static final int port = 3232;


    public static void main(String[] args) {
        int port = 3234;
        Spark.port(port);

        Spark.get("/searchdrug", new FDAHandler());

        Spark.init();
        Spark.awaitInitialization();
        System.out.println("Server started at http://localhost:" + port);
    }

    

}
