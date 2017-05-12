package com.brendanhenry.civrts.game.item;

import com.brendanhenry.civrts.io.JsonObjectable;
import com.google.gson.JsonObject;

import java.util.ArrayList;

/**
 * Created by henry on 5/11/2017.
 */
public class ItemStack implements JsonObjectable {
  private ArrayList<Item> items;

  public ItemStack() {
    items = new ArrayList<>();
  }

  public int getSize() {
    return items.size();
  }

  public ItemModel getModel() {
    if (!isEmpty()) {
      return items.get(0).getModel();
    }
    throw new RuntimeException("No items in stack to define a model");
  }

  public boolean canContain(Item m) {
    return items.isEmpty() || m.getId() == items.get(0).getId();
  }

  public boolean add(Item a) {
    if (canContain(a)) {
      items.add(a);
      return true;
    }
    return false;
  }

  public boolean isEmpty(){
    return items.size() == 0;
  }

  @Override
  public JsonObject toJson() {
    JsonObject jo = new JsonObject();
    if (items.isEmpty()) {
      jo.addProperty("id", -1);
      jo.addProperty("name", "Empty");
      jo.addProperty("count", 0);
    } else {
      jo.addProperty("id", items.get(0).getId());
      jo.addProperty("name", getModel().getName());
      jo.addProperty("count", items.size());
    }
    return jo;
  }
}
