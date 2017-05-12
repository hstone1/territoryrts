package com.brendanhenry.civrts.game.map;

import com.brendanhenry.civrts.game.item.ItemWood;

/**
 * Created by henry on 5/12/2017.
 */
public class Forest extends ProductionFacility {
  private static int BIG_TILE_SIZE = 16;

  public Forest(int x, int y) {
    super(x, y, BIG_TILE_SIZE, BIG_TILE_SIZE);
  }

  @Override
  public void run() {
    inv.add(new ItemWood());
  }
}
