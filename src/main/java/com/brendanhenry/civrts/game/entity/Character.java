package com.brendanhenry.civrts.game.entity;

import com.brendanhenry.civrts.game.entity.action.Action;
import com.brendanhenry.civrts.game.entity.action.WalkAction;
import com.brendanhenry.civrts.game.entity.pathfinding.Location;
import com.brendanhenry.civrts.io.MessageType;
import com.brendanhenry.civrts.io.Websocket;
import com.google.gson.JsonObject;

import java.util.LinkedList;
import java.util.Queue;

/**
 * Created by henry on 5/12/2017.
 */
public class Character extends Entity implements Location {
  public static CharacterModel[] types = {
    new CharacterModel("Worker", 5)
  };



  private double x;
  private double y;
  protected int modelId;

  private Queue<Action> actions;

  public Character(int id, double x, double y, Websocket ws){
    this.x = x;
    this.y = y;
    this.modelId = id;

    actions = new LinkedList<>();

    ws.regularSendAll(MessageType.UPDATE_CHARACTER,
        this::toJson, 100);
  }

  private void update() {
      long time = System.currentTimeMillis();
          while (!actions.isEmpty()) {
          if (actions.peek().update(this, time)) {
              actions.peek().end(this);
              actions.remove();
              startAction(time);
          } else {
              return;
          }
      }
  }

  private void startAction(long time){
      if (!actions.isEmpty()) {
          if (actions.peek().start(this, time)) {
              actions.peek().end(this);
              actions.remove();
              startAction(time);
          }
      }
  }

    @Override
    public JsonObject toJson() {
        update();
        JsonObject jo = super.toJson();
        jo.addProperty("x", x);
        jo.addProperty("y", y);
        jo.addProperty("modelid", modelId);
        if (!actions.isEmpty()) {
            jo.add("currentaction", actions.peek().toJson());
        }
        return jo;
    }

  public double getX () {
    return x;
  }

  public double getY () {
    return y;
  }
  
  public void setX (double x) {
      this.x = x;
  }
  
  public void setY (double y) {
      this.y = y;
  }

  protected CharacterModel getModel() {
    return types[modelId];
  }

  public void setDestination(Location destination) {
    addActionPriority(new WalkAction(destination));
  }
  
  private void addActionPriority(Action a){
      long time = System.currentTimeMillis();
      if (!actions.isEmpty()) {
          actions.peek().kill(this, time);
      }
      actions.clear();
      actions.add(a); a.start(this, time);
  }

  public String getName(){
    return getModel().getName();
  }

  public double getSpeed(){
    return types[modelId].getSpeed();
  }
}
