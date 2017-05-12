package com.brendanhenry.civrts.io;

import com.google.gson.JsonElement;

/**
 * Created by henry on 5/12/2017.
 */
public interface Jsonable {
  JsonElement toJson();
}
