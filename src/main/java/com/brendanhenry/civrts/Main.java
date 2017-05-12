package com.brendanhenry.civrts;

import com.brendanhenry.civrts.unifiedMemory.Websocket;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import static spark.Spark.*;

/**
 * Hello world!
 *
 */
public class Main {
    Websocket sync = new Websocket(25);

    public static void main( String[] args ) {
        Main m = new Main();
        m.run();

        try {
            Thread.sleep(1000000);
        } catch (InterruptedException e) { e.printStackTrace(); }
    }

    private void run() {
        port(4567);
        externalStaticFileLocation("resources");
        webSocket("/socket", sync);
        get("/home", (req, res) -> "hello world");
    }
}
