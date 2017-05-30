package com.brendanhenry.civrts.game.entity.action;

import com.brendanhenry.civrts.game.entity.Character;
import com.brendanhenry.civrts.io.JsonObjectable;

/**
 * Created by henry on 5/30/2017.
 */
public interface Action extends JsonObjectable {
    /**
     *
     * @param c
     * @return boolean
     *          True - end the action
     *          False - continue action
     */
    boolean start(Character c, long time);
    boolean update(Character c, long time);
    void end(Character c);
    void kill(Character c, long time);
}
