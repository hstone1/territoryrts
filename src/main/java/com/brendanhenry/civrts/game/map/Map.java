package com.brendanhenry.civrts.game.map;

import com.brendanhenry.civrts.io.MessageType;
import com.brendanhenry.civrts.io.Sender;
import com.brendanhenry.civrts.io.UpdaterList;
import com.brendanhenry.civrts.io.Websocket;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.util.ArrayList;

/**
 * Created by henry on 5/11/2017.
 */
public class Map {
  private static JsonParser PARSE = new JsonParser();

  private UpdaterList<Building> buildings;

  public Map(Websocket ws) {
    buildings = new UpdaterList<>(
        new ArrayList<>(),
        ws,
        MessageType.ADD_BUILDING,
        MessageType.REMOVE_BUILDING,
        MessageType.UPDATE_BUILDING);
    buildings.add(new Forest(0, 16));
    buildings.add(new Forest(16, 0));
  }

  public Building getBuilding(int x, int y) {
    for (Building b : buildings) {
      if (b.inside(x, y)) {
        return b;
      }
    }
    return null;
  }

  public boolean canFit(Rect r) {
    for(Building b : buildings) {
      if (b.overlaps(r)) {
        return false;
      }
    }
    return true;
  }

  public void sendFullUpdate(Sender s) {
    s.send(MessageType.BUILDINGS, buildings);
  }

  public void registerGlobalCommands(Websocket ws) {
    ws.putCommand(MessageType.PLACE_BUILDING,
        (w, s, m) -> {
          JsonObject loc = PARSE.parse(m).getAsJsonObject();
          int x = loc.get("x").getAsInt();
          int y = loc.get("y").getAsInt();
          buildings.add(new Forest(x, y));
        });
  }
}
