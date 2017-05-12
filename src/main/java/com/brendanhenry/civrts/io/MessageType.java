package com.brendanhenry.civrts.io;

/**
 * Created by henry on 4/2/2017.
 */
public enum MessageType {
  BUILDINGS ("buildings"),
  PLACE_BUILDING ("placebuilding");


  private final String name;
  MessageType(String name){
    this.name = name;
  }

  @Override
  public String toString() {
    return name;
  }
}
