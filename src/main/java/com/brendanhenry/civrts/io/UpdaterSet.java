package com.brendanhenry.civrts.io;

import com.brendanhenry.civrts.game.entity.Entity;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Set;

/**
 * Created by henry on 5/12/2017.
 */
public class UpdaterSet<T extends Entity> implements Set<T>, Jsonable {
  private MessageType added;
  private MessageType removed;
  private Set<T> backer;
  private Websocket ws;

  public UpdaterSet (Set<T> backer, Websocket ws, MessageType added,
                      MessageType removed) {
    this.added = added;
    this.removed = removed;
    this.backer = backer;
    this.ws = ws;
  }

  @Override
  public int size() {
    return backer.size();
  }

  @Override
  public boolean isEmpty() {
    return backer.isEmpty();
  }

  @Override
  public boolean contains(Object o) {
    return backer.contains(o);
  }

  @Override
  public Iterator<T> iterator() {
    return backer.iterator();
  }

  @Override
  public Object[] toArray() {
    return backer.toArray();
  }

  @Override
  public <T1> T1[] toArray(T1[] a) {
    return backer.toArray(a);
  }

  @Override
  public boolean add(T t) {
    boolean add = backer.add(t);
    if (add) {
      ws.sendAll(added, t.toJson());
    }
    return add;
  }

  @Override
  public boolean remove(Object o) {
    if (o instanceof Entity) {
      boolean rem = backer.remove(o);
      if (rem) {
        ws.sendAll(removed, new JsonPrimitive(((Entity) o).getId()));
      }
      return rem;
    } else {
      return false;
    }
  }

  @Override
  public boolean containsAll(Collection<?> c) {
    return backer.containsAll(c);
  }

  @Override
  public boolean addAll(Collection<? extends T> c) {
    for(T t : c) {
      add(t);
    }
    return true;
  }

  @Override
  public boolean removeAll(Collection<?> c) {
    for (Object o : c) {
      remove(o);
    }
    return true;
  }

  @Override
  public boolean retainAll(Collection<?> c) {
    throw new UnsupportedOperationException("cannot retain all from a synced " +
        "list");
  }

  @Override
  public void clear() {
    while(!isEmpty()) {
      remove(0);
    }
  }

  @Override
  public JsonElement toJson() {
    JsonArray arr = new JsonArray();
    for(T t : backer){
      arr.add(t.toJson());
    }
    return arr;
  }
}
