package com.brendanhenry.civrts.game.entity.action;

import com.brendanhenry.civrts.game.entity.Character;
import com.brendanhenry.civrts.game.entity.pathfinding.Location;
import com.google.gson.JsonObject;

/**
 * Created by henry on 5/30/2017.
 */
public class WalkAction implements Action {
    private Location destination;
    private long locationTime;
    
    public WalkAction(Location destination){
        this.destination = destination;
    }
    
    @Override
    public boolean start(Character c, long time) {
        locationTime = time;
        return false;
    }
    
    @Override
    public boolean update(Character c, long time) {
        int diff = (int) (time - locationTime);
        double dx = destination.getX() - c.getX();
        double dy = destination.getY() - c.getY();
        double dist = Math.sqrt(dx * dx + dy * dy);
        double travelAbility = c.getSpeed() * diff / 1000.0;
        if (dist < travelAbility) {
            return true;
        } else {
            c.setX(c.getX() + dx * travelAbility / dist);
            c.setY(c.getY() + dy * travelAbility / dist);
        }
        locationTime = time;
        return false;
    }
    
    @Override
    public void end(Character c) {
        c.setX(destination.getX());
        c.setY(destination.getY());
    }
    
    @Override
    public void kill(Character c, long time) {
        if(update(c, time)){
            end(c);
        }
    }
    
    @Override
    public JsonObject toJson() {
        JsonObject tis = new JsonObject();
        tis.addProperty("name", "walk");
        tis.add("destination", destination.toJson());
        return tis;
    }
}
