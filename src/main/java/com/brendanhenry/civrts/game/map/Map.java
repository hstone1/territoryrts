package com.brendanhenry.civrts.game.map;

import com.brendanhenry.civrts.game.entity.Character;
import com.brendanhenry.civrts.game.entity.pathfinding.AbstractLocation;
import com.brendanhenry.civrts.io.MessageType;
import com.brendanhenry.civrts.io.Sender;
import com.brendanhenry.civrts.io.UpdaterSet;
import com.brendanhenry.civrts.io.Websocket;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.util.HashSet;

/**
 * Created by henry on 5/11/2017.
 */
public class Map {
  private static JsonParser PARSE = new JsonParser();

  private UpdaterSet<Building> buildings;
  private UpdaterSet<Character> characters;

  Websocket ws;

  public Map(Websocket ws) {
    this.ws = ws;
    buildings = new UpdaterSet<>(
        new HashSet<>(),
        ws,
        MessageType.ADD_BUILDING,
        MessageType.REMOVE_BUILDING);
    characters = new UpdaterSet<>(
        new HashSet<>(),
        ws,
        MessageType.ADD_CHARACTER,
        MessageType.REMOVE_CHARACTER);
    buildings.add(new Forest(0, 16));
    buildings.add(new Forest(16, 0));
  }

  public Building getBuilding(int x, int y) {
    for (Building b : buildings) {
      if (b.inside(x, y)) {
        return b;
      }
    }
    return null;
  }

  public boolean canFit(Rect r) {
    for(Building b : buildings) {
      if (b.overlaps(r)) {
        return false;
      }
    }
    return true;
  }

  public void sendFullUpdate(Sender s) {
    s.send(MessageType.BUILDINGS, buildings);
    s.send(MessageType.CHARACTERS, characters);
  }

  public void registerGlobalCommands(Websocket ws) {
    ws.putCommand(MessageType.PLACE_BUILDING,
        (w, s, m) -> {
          JsonObject loc = PARSE.parse(m).getAsJsonObject();
          int x = loc.get("x").getAsInt();
          int y = loc.get("y").getAsInt();
          buildings.add(new Forest(x, y));
        });

    ws.putCommand(MessageType.MOVE_CHARACTER,
        (w, s, m) -> {
          JsonObject move = PARSE.parse(m).getAsJsonObject();
          double x = move.get("x").getAsDouble();
          double y = move.get("y").getAsDouble();
          int charId = move.get("id").getAsInt();
          characters.getById(charId).setDestination(
              new AbstractLocation(x, y)
          );
        });
  }
}
