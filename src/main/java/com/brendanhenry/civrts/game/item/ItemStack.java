package com.brendanhenry.civrts.game.item;

/**
 * Created by henry on 5/11/2017.
 */
public class ItemStack {
  private Item m;
  private int number;

  public ItemStack(Item m, int number) {
    this.m = m;
    this.number = number;
  }

  public ItemStack(Item m) {
    this.m = m;
    this.number = 1;
  }

  public ItemStack() {
    this.m = null;
    this.number = 0;
  }

  public int getNumber() {
    return number;
  }

  public Item getItem() {
    return m;
  }

  public boolean canContain(Item m){
    return this.m != null && m.equals(this.m);
  }

  public void addOne() {
    number++;
  }

  public boolean isEmpty(){
    return m == null || number == 0;
  }
}
