package com.brendanhenry.civrts.io;

import org.eclipse.jetty.websocket.api.Session;

/**
 * A server that runs a websocket.
 * Created by henry on 4/14/2017.
 */
public interface SocketServer {

  /**
   * When a new session is loaded on a websocket.
   *
   * Often used to send any information pertinent to the page itself.
   * @param ws the websocket.
   * @param s the session that is newly loaded onto the websocket.
   */
  void newSession(Websocket ws, Session s);

  /**
   * When the websocket is started this gives the socket server an
   * opportunity to subscribe to messages from the server.
   * @param ws the websocket.
   */
  void registerGlobalCommands(Websocket ws);
}
