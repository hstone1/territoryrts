package com.brendanhenry.civrts.game.map;

import com.brendanhenry.civrts.game.item.Inventory;
import com.brendanhenry.civrts.scheduler.Operation;

/**
 * Created by henry on 5/12/2017.
 */
public abstract class ProductionFacility extends Building implements Operation {
  Inventory inv;

  public ProductionFacility(int x, int y, int width, int height) {
    super(x, y, width, height);
    inv = new Inventory(3);
  }
}
