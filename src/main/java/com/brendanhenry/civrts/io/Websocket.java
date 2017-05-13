package com.brendanhenry.civrts.io;

import com.brendanhenry.civrts.scheduler.Schedular;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * A class that allows easy communication with users (on multiple tabs rather
 * than individual websocket sessions) It also is integrated with a
 * SocketServer which registers new commands for users and generally
 * organizes communications.
 *
 * Created by henry on 4/14/2017.
 */
@WebSocket
public class Websocket {
  private static Gson GSON = new Gson();

  private Map<String, MessageListener> commands;
  private List<Session> sessions;
  private SocketServer serve;
  private Schedular schedular;

  public Websocket() {
    sessions = new ArrayList<>();
    commands = new HashMap<>();
    schedular = new Schedular(25);
    schedular.start();
  }

  public void regularSendAll(MessageType mt, PeriodicSend send, int dt) {
    schedular.addOperation(
        () -> {
          sendAll(mt, send.toSend());
        }, dt
    );
  }

  public void setServer(SocketServer serve){
    this.serve = serve;
    serve.registerGlobalCommands(this);
  }

  /**
   * Add a new command to listen for on all users.
   * @param type enum represting the command and containing its string
   *             representation.
   * @param ml the listener to be called (websocket, user, message) upon the
   *           recieval of this command
   */
  public void putCommand(MessageType type, MessageListener ml) {
    commands.put(type.getName(), ml);
  }

  public void send(Session s, MessageType type, Jsonable message) {
    send(s, type, message.toJson());
  }

  public synchronized void send(Session s, MessageType type, JsonElement
      message) {
    try {
      s.getRemote().sendString(GSON.toJson(type.make(message)));
    } catch (IOException e) {
      System.out.println("ERROR: sending message to session");
    }
  }

  /**
   * Send a message to all of the sessions registered on the websocket.
   * @param type the type of message to be sent.
   * @param message the object which contains the string data to be sent to
   *                the client.
   */
  public void sendAll(MessageType type, JsonElement message) {
    for (Session s : sessions) {
      send(s, type, message);
    }
  }

  public void sendAll(MessageType type, Jsonable message) {
    sendAll(type, message.toJson());
  }


  /**
   * Register the connection of a new user. Does not do anything, because the
   * first communication with the client must be client initiated (user
   * authentication).
   * @param user the session that was registered
   */
  @OnWebSocketConnect
  public void onConnect(Session user) {
    serve.newSession(this, user);
    sessions.add(user);
  }

  /**
   * Close a session when the session disconnects (disassociates it with its
   * user)
   * @param user the session that is leaving
   * @param statusCode the status of that session
   * @param reason the reason why the session left
   */
  @OnWebSocketClose
  public void onClose(Session user, int statusCode, String reason) {
    sessions.remove(user);
  }

  /**
   * upon receiving a command from a user, run the corresponding command as
   * per the publish subscribe paradigm.
   * @param sess the session that sent a message.
   * @param message the message itself in the format "(.*):(.*)"
   *                where the first group is the type of the message and the
   *                second group is any data associated with a message of
   *                that type.
   */
  @OnWebSocketMessage
  public void onMessage(Session sess, String message) {
    if (message.contains(":")) {
      String type = message.substring(0, message.indexOf(':')).toLowerCase();
      String data = message.substring(message.indexOf(':') + 1);
      if (commands.containsKey(type)) {
        try {
          commands.get(type).handleMessage(this, sess, data);
        } catch (Exception e) {
          System.out.println("ERROR: handling the message \"" + message + "\"");
          System.out.println("ERROR MESSAGE: " + e.getMessage());
        }
        return;
      }
    }
    System.out.println("ERROR: received unrecognized command");
  }
}
