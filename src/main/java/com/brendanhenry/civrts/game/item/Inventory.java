package com.brendanhenry.civrts.game.item;

/**
 * Created by henry on 5/11/2017.
 */
public class Inventory {
  ItemStack[] slots;

  public Inventory(int slots) {
    this.slots = new ItemStack[slots];
    for (int i = 0; i < slots; i++) {
      this.slots[i] = new ItemStack();
    }
  }
}
