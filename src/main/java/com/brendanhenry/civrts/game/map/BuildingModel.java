package com.brendanhenry.civrts.game.map;

import java.util.function.Supplier;

/**
 * Created by henry on 5/12/2017.
 */
public class BuildingModel {
  private int width;
  private int height;
  private String name;

  public BuildingModel (String name, int width, int height) {
    this.name = name;
    this.width = width;
    this.height = height;
  }

  public int getWidth() {
    return width;
  }

  public int getHeight() {
    return height;
  }

  public String getName() {
    return name;
  }
}
