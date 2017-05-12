package com.brendanhenry.civrts.io;

/**
 * Created by henry on 5/12/2017.
 */
@FunctionalInterface
public interface Sender {
  public void send(MessageType type, Jsonable message);
}
