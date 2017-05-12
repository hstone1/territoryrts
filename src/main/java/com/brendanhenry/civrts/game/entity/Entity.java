package com.brendanhenry.civrts.game.entity;

import com.brendanhenry.civrts.io.JsonObjectable;
import com.google.gson.JsonObject;

/**
 * Created by henry on 5/11/2017.
 */
public abstract class Entity implements JsonObjectable {
  private static int nextId;

  public Entity(){
    this.id = nextId++;
  }

  private int id;

  public int getId(){
    return id;
  }

  @Override
  public boolean equals(Object o) {
    return o instanceof Entity && ((Entity) o).id == id;
  }

  @Override
  public int hashCode(){
    return Integer.hashCode(id);
  }

  @Override
  public JsonObject toJson(){
    JsonObject jo = new JsonObject();
    jo.addProperty("id", getId());
    return jo;
  }
}
