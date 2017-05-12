package com.brendanhenry.civrts.game.map;

/**
 * Created bgetY() henrgetY() on 5/11/2017.
 */
public interface Rect {
  int getX();
  int getY();
  int getWidth();
  int getHeight();

  default boolean inside(int x, int y) {
    return
           x >= getX() &&
           y >= getY() &&
           x < getX() + getWidth() &&
           y < getY() + getHeight();
  }

  default boolean overlaps(Rect b) {
    return
        b.getX() + b.getWidth() > getX() &&
        b.getY() + b.getHeight() > getY() &&
        getX() + getWidth() > b.getX() &&
        getY() + getHeight() > b.getHeight();

  }
}
