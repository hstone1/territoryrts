package com.brendanhenry.civrts.game.item;

/**
 * Created by henry on 5/11/2017.
 */
public abstract class Item {
  public static ItemModel[] cardTypes =
      {
          new ItemModel("Wood")
      };

  private int id;
  protected Item(int id) {
    this.id = id;
  }

  public boolean ofType(ItemModel m) {
    return cardTypes[id] == m;
  }

  public ItemModel getModel() {
    return cardTypes[id];
  }

  public int getId() {
    return id;
  }
}
