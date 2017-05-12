package com.brendanhenry.civrts.game.item;

import com.brendanhenry.civrts.io.Jsonable;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

/**
 * Created by henry on 5/11/2017.
 */
public class Inventory implements Jsonable {
  ItemStack[] slots;

  public Inventory(int slots) {
    this.slots = new ItemStack[slots];
    for (int i = 0; i < slots; i++) {
      this.slots[i] = new ItemStack();
    }
  }

  public boolean add(Item item) {
    for (int i = 0; i < slots.length; i++){
      if(slots[i].canContain(item)){
        slots[i].add(item);
        return true;
      }
    }
    for (int i = 0; i < slots.length; i++){
      if(slots[i].isEmpty()){
        slots[i] = new ItemStack();
        slots[i].add(item);
        return true;
      }
    }
    return false;
  }

  @Override
  public JsonElement toJson() {
    JsonArray arr = new JsonArray();
    for( int i = 0; i < slots.length; i++) {
      arr.add(slots[i].toJson());
    }
    return arr;
  }
}
