package com.brendanhenry.civrts.game.item;

/**
 * Created by henry on 5/12/2017.
 */
public class ItemWood extends Item{
  static ItemWood architype = new ItemWood();
  private ItemWood() {
    super(0);
  }
  public static ItemWood get(){
    return architype;
  }
}
