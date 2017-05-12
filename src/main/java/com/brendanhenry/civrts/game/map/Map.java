package com.brendanhenry.civrts.game.map;

import com.brendanhenry.civrts.G;
import com.brendanhenry.civrts.io.MessageType;
import com.brendanhenry.civrts.io.Sender;

import java.lang.reflect.Array;
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
}
