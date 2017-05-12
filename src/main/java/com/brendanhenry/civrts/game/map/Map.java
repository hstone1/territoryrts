package com.brendanhenry.civrts.game.map;

import com.brendanhenry.civrts.G;
import com.brendanhenry.civrts.io.MessageType;
import com.brendanhenry.civrts.io.Sender;
import com.brendanhenry.civrts.io.Websocket;
import com.google.gson.JsonObject;

import java.util.ArrayList;

/**
 * Created by henry on 5/11/2017.
 */
public class Map {
  private ArrayList<Building> buildings;

  public Map() {
    buildings = new ArrayList<>();
    buildings.add(new Building(3, 3, 1, 1));
    buildings.add(new Building(1, 4, 2, 1));
    buildings.add(new Building(2, 0, 0, 2));
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
    s.send(MessageType.BUILDINGS,
        G.SON.toJson(buildings));
  }

  public void registerGlobalCommands(Websocket ws) {
    ws.putCommand(MessageType.PLACE_BUILDING,
        (w, s, m) -> {
          JsonObject loc = G.PARSE.parse(m).getAsJsonObject();
          int x = loc.get("x").getAsInt();
          int y = loc.get("y").getAsInt();
          buildings.add(new Building(x, y, 2, 2));
          w.send(s, MessageType.BUILDINGS,
               G.SON.toJson(buildings));
        });
  }
}
