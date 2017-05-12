package com.brendanhenry.civrts;

import com.brendanhenry.civrts.game.Game;
import com.brendanhenry.civrts.io.Sender;
import com.brendanhenry.civrts.io.SocketServer;
import com.brendanhenry.civrts.io.Websocket;
import org.eclipse.jetty.websocket.api.Session;

/**
 * Created by henry on 5/12/2017.
 */
public class GameSocket implements SocketServer {
  Game g;

  public GameSocket(Game g) {
    this.g = g;
  }

  @Override
  public void newSession(Websocket ws, Session s) {
    Sender send = (t, m) -> ws.send(s, t, m);
    g.sendFullUpdate(send);
  }

  @Override
  public void registerGlobalCommands(Websocket ws) {
    g.registerGlobalCommands(ws);
  }
}
