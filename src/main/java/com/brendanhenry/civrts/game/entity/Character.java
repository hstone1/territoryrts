package com.brendanhenry.civrts.game.entity;

import com.brendanhenry.civrts.game.entity.pathfinding.Location;
import com.brendanhenry.civrts.io.MessageType;
import com.brendanhenry.civrts.io.Websocket;
import com.google.gson.JsonObject;

/**
 * Created by henry on 5/12/2017.
 */
public class Character extends Entity implements Location {
  public static CharacterModel[] types = {
    new CharacterModel("Worker", 1)
  };

  private Location destination;
  private long locationTime;

  private double x;
  private double y;
  protected int modelId;

  public Character(int id, double x, double y, Websocket ws){
    this.x = x;
    this.y = y;
    this.modelId = id;

    ws.regularSendAll(MessageType.UPDATE_CHARACTER,
        this::toJson, 100);
  }

  @Override
  public JsonObject toJson(){
    JsonObject jo = super.toJson();
    jo.addProperty("x", x);
    jo.addProperty("y", y);
    if (destination != null) {
      jo.add("destination", destination.toJson());
    }
    jo.addProperty("modelid", modelId);
    return jo;
  }

  private void updateLocation(long time) {
    if (destination != null) {
      int diff = (int) (time - locationTime);
      double dx = destination.getX() - x;
      double dy = destination.getY() - y;
      double dist = Math.sqrt(dx * dx + dy * dy);
      double travelAbility = getSpeed() * diff / 1000.0;
      if (dist < travelAbility) {
        this.x = destination.getX();
        this.y = destination.getY();
        this.destination = null;
      } else {
        this.x += dx * travelAbility / dist;
        this.y += dy * travelAbility / dist;
      }
    }
    locationTime = time;
  }

  public double getX () {
    updateLocation(System.currentTimeMillis());
    return x;
  }

  public double getY () {
    updateLocation(System.currentTimeMillis());
    return y;
  }

  protected CharacterModel getModel() {
    return types[modelId];
  }

  public void setDestination(Location destination) {
    updateLocation(System.currentTimeMillis());
    this.destination = destination;
  }

  public String getName(){
    return getModel().getName();
  }

  public double getSpeed(){
    return types[modelId].getSpeed();
  }
}
