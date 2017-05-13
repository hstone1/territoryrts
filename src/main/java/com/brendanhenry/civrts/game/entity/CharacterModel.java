package com.brendanhenry.civrts.game.entity;

/**
 * Created by henry on 5/12/2017.
 */
public class CharacterModel {
  private String name;
  private double speed;

  public CharacterModel(String name, double speed) {
    this.name = name;
    this.speed = speed;
  }

  public String getName() {
    return name;
  }

  public double getSpeed() {
    return speed;
  }
}
