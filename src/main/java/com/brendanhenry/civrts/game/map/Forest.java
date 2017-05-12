package com.brendanhenry.civrts.game.map;

import com.brendanhenry.civrts.game.item.ItemWood;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class Forest extends ProductionFacility {
  public Forest(int x, int y) {
    super(0, x, y);
  }

  @Override
  public void run() {
    produced.add(ItemWood.get());
  }
}
