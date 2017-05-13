package com.brendanhenry.civrts.game.entity.pathfinding;

import com.brendanhenry.civrts.io.JsonObjectable;
import com.google.gson.JsonObject;

/**
 * Created by henry on 5/12/2017.
 */
public interface Location extends JsonObjectable{
  double getX();
  double getY();

  default double distanceTo(Location l) {
    double dx = l.getX() - getX();
    double dy = l.getY() - getY();
    return Math.sqrt(dx * dx + dy * dy);
  }

  @Override
  default JsonObject toJson() {
    JsonObject jo = new JsonObject();
    jo.addProperty("x", getX());
    jo.addProperty("y", getY());
    return jo;
  }
}
