package com.brendanhenry.civrts.io;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

/**
 * Created by henry on 4/2/2017.
 */
public enum MessageType {
  //Server Operations
  BUILD ("buildings"),
  BUILDINGS ("full", BUILD),
  ADD_BUILDING ("add", BUILD),
  REMOVE_BUILDING ("remove", BUILD),
  CHAR ("characters"),
  CHARACTERS ("full", CHAR),
  ADD_CHARACTER ("add", CHAR),
  REMOVE_CHARACTER ("remove", CHAR),
  UPDATE_CHARACTER("update", CHAR),



  PLACE_BUILDING ("placebuilding"),
  MOVE_CHARACTER("movecharacter");


  private final String name;
  private final MessageType parent;
  MessageType(String name){
    this.name = name;
    this.parent = null;
  }

  MessageType(String name, MessageType parent){
    this.name = name;
    this.parent = parent;
  }

  public JsonObject make(JsonElement m) {
    JsonObject message = new JsonObject();
    message.addProperty("type", name);
    message.add("message", m);
    if (parent == null) {
      return message;
    } else {
      return parent.make(message);
    }
  }

  public String getName() {
    return name;
  }
}
