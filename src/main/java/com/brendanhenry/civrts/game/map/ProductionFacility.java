package com.brendanhenry.civrts.game.map;

import com.brendanhenry.civrts.game.item.Inventory;
import com.brendanhenry.civrts.scheduler.Operation;
import com.google.gson.JsonObject;

/**
 * Created by henry on 5/12/2017.
 */
public abstract class ProductionFacility extends Building implements Operation {
  protected Inventory produced;

  public ProductionFacility(int id, int x, int y) {
    super(id, x, y);
    produced = new Inventory(3);
  }

  @Override
  public JsonObject toJson(){
    JsonObject jo = super.toJson();
    jo.add("inv", produced.toJson());
    return jo;
  }
}
