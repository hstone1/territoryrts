package com.brendanhenry.civrts.game;

import com.brendanhenry.civrts.game.map.Map;
import com.brendanhenry.civrts.io.MessageType;
import com.brendanhenry.civrts.io.Sender;
import com.brendanhenry.civrts.io.Websocket;

/**
 * Created by henry on 5/12/2017.
 */
public class Game {
  private Map map;

  public Game(){
    this.map = new Map();
  }

  public void sendFullUpdate(Sender s) {
    map.sendFullUpdate(s);
  }

  public void registerGlobalCommands(Websocket ws) {
    map.registerGlobalCommands(ws);
  }
}
