package com.brendanhenry.civrts.game.map;

/**
 * Created by henry on 5/11/2017.
 */
public class Rect {
  private int x;
  private int y;
  private int width;
  private int height;

  public Rect(int x, int y, int width, int height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  public boolean inside(int x, int y) {
    return
        x >= this.x &&
            y >= this.y &&
            x < this.x + this.width &&
            y < this.y + this.height;
  }

  public boolean overlaps(Rect b) {
    return
        b.x + b.width > x &&
            b.y + b.height > y &&
            x + width > b.x &&
            y + height > b.y;
  }
}
