package com.brendanhenry.civrts.game.map;

import com.brendanhenry.civrts.game.entity.Entity;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

/**
 * Created by henry on 5/11/2017.
 */
public class Building extends Entity implements Rect{
  public static BuildingModel[] bms = {
      new BuildingModel("forest", 16, 16)
  };

  private int x;
  private int y;
  private int id;

  public Building(int id, int x, int y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  @Override
  public int getX() {
    return x;
  }

  @Override
  public int getY() {
    return y;
  }

  @Override
  public int getWidth() {
    return bms[id].getWidth();
  }

  @Override
  public int getHeight() {
    return bms[id].getHeight();
  }

  public String getName() {
    return bms[id].getName();
  }

  @Override
  public JsonObject toJson() {
    JsonObject b = super.toJson();
    b.addProperty("x", getX());
    b.addProperty("y", getY());
    b.addProperty("width", getWidth());
    b.addProperty("height", getHeight());
    b.addProperty("name", getName());
    return b;
  }
}
