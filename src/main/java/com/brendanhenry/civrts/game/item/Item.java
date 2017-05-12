package com.brendanhenry.civrts.game.item;

/**
 * Created by henry on 5/11/2017.
 */
public class Item {
  public String name;
  public int id;
  public Item(int id, String name) {
    this.id = id;
    this.name = name;
  }

  @Override
  public boolean equals(Object o) {
    return o instanceof Item && ((Item) o).id == id;
  }

  @Override
  public int hashCode(){
    return Integer.hashCode(id);
  }
}
