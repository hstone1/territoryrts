package com.brendanhenry.civrts.game.entity.pathfinding;

/**
 * Created by henry on 5/12/2017.
 */
public class AbstractLocation implements Location{
  double x;
  double y;
  public AbstractLocation(double x, double y) {
    this.x = x;
    this.y = y;
  }
  public double getX() {
    return x;
  }

  public double getY() {
    return y;
  }
}
