package com.brendanhenry.civrts.game;

import com.brendanhenry.civrts.game.map.Map;
import com.brendanhenry.civrts.io.Sender;

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
}
