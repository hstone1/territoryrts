package com.brendanhenry.civrts.io;

import com.google.gson.JsonObject;

/**
 * Created by henry on 5/12/2017.
 */
@FunctionalInterface
public interface PeriodicSend {
  JsonObject toSend();
}
