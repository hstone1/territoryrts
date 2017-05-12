package com.brendanhenry.civrts.game.item;

import java.util.function.Supplier;

/**
 * Created by henry on 5/12/2017.
 */
public class ItemModel {
  private String name;
  private Supplier<Item> supplier;
  public ItemModel(String name) {
    this.name = name;
  }

  public ItemModel setSupplier(Supplier<Item> supplier) {
    this.supplier = supplier;
    return this;
  }

  public String getName() {
    return name;
  }
}
