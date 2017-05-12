package com.brendanhenry.civrts.io;

import com.brendanhenry.civrts.game.entity.Entity;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

/**
 * Created by henry on 5/12/2017.
 */
public class UpdaterList<T extends Entity> implements List<T>, Jsonable {
  private MessageType added;
  private MessageType removed;
  private MessageType set;
  private List<T> backer;
  private Websocket ws;

  public UpdaterList (List<T> backer, Websocket ws, MessageType added,
                      MessageType removed, MessageType set) {
    this.added = added;
    this.set = set;
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
    JsonObject m = new JsonObject();
    m.addProperty("loc", backer.size());
    m.add("item", t.toJson());
    ws.sendAll(added, m);
    return backer.add(t);
  }

  @Override
  public boolean remove(Object o) {
    int loc = backer.indexOf(o);
    backer.remove(loc);
    return true;
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
  public boolean addAll(int index, Collection<? extends T> c) {
    for(T t : c) {
      add(index++, t);
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
  public T get(int index) {
    return  backer.get(index);
  }

  @Override
  public T set(int index, T element) {
    JsonObject m = new JsonObject();
    m.addProperty("loc", index);
    m.add("item", element.toJson());
    ws.sendAll(set, m);
    return backer.set(index, element);
  }

  @Override
  public void add(int index, T element) {
    JsonObject m = new JsonObject();
    m.addProperty("loc", index);
    m.add("item", element.toJson());
    ws.sendAll(added, m);
    backer.add(index, element);
  }

  @Override
  public T remove(int index) {
    JsonObject m = new JsonObject();
    m.addProperty("loc", index);
    ws.sendAll(removed, m);
    return backer.remove(index);
  }

  @Override
  public int indexOf(Object o) {
    return backer.indexOf(o);
  }

  @Override
  public int lastIndexOf(Object o) {
    return backer.lastIndexOf(o);
  }

  @Override
  public ListIterator<T> listIterator() {
    return backer.listIterator();
  }

  @Override
  public ListIterator<T> listIterator(int index) {
    return backer.listIterator(index);
  }

  @Override
  public List<T> subList(int fromIndex, int toIndex) {
    return backer.subList(fromIndex, toIndex);
  }

  @Override
  public JsonElement toJson() {
    JsonArray arr = new JsonArray();
    for(int i = 0;i < backer.size();i++){
      arr.add(backer.get(i).toJson());
    }
    return arr;
  }
}
