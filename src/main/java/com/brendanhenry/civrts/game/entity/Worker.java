package com.brendanhenry.civrts.game.entity;

import com.brendanhenry.civrts.io.Websocket;

/**
 * Created by henry on 5/30/2017.
 */
public class Worker extends Character{
  public Worker(double x, double y, Websocket ws) {
    super(0, x, y, ws);
  }
}
