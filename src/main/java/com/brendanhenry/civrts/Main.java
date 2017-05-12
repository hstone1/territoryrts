package com.brendanhenry.civrts;

import com.brendanhenry.civrts.game.Game;
import com.brendanhenry.civrts.io.Websocket;

import static spark.Spark.*;

/**
 * Hello world!
 *
 */
public class Main {
    private GameSocket sock;

    public static void main( String[] args ) {
        Main m = new Main();
        m.run();

        try {
            Thread.sleep(1000000);
        } catch (InterruptedException e) { e.printStackTrace(); }
    }

    private void run() {
        Websocket ws = new Websocket();
        sock = new GameSocket(new Game(ws));
        ws.setServer(sock);

        port(4567);
        externalStaticFileLocation("resources");
        webSocket("/socket", ws);
        get("/home", (req, res) -> "hello world");
    }
}
