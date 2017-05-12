package com.brendanhenry.civrts.scheduler;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by henry on 5/11/2017.
 */
public class Schedular extends Thread{
  private int checkTime;
  private List<Operate> operations;

  public Schedular(int msTimeCheck) {
    operations = new ArrayList<>();
    this.checkTime = msTimeCheck;
    setDaemon(true);
  }

  public void addOperation(Operation o, int dt) {
    operations.add(new Operate(o, dt));
  }

  @Override
  public void start(){
    long time = System.currentTimeMillis();
    for (Operate o : operations) {
      o.setLastRun(time);
    }
    super.start();
  }

  @Override
  public void run() {
    while (true) {
      runUpdate();
      try {
        Thread.sleep(checkTime);
      } catch (InterruptedException ignored) { }
    }
  }

  private void runUpdate(){
    long time = System.currentTimeMillis();
    for (Operate o : operations) {
      o.doRuns(time);
    }
  }

  private static class Operate implements Operation{
    private Operation operation;
    private long lastRun;
    private long frequency;

    public Operate(Operation opertation, int frequency){
      this.operation = opertation;
      this.frequency = frequency;
      lastRun = System.currentTimeMillis();
    }

    public void resetLastRun(){
      lastRun = System.currentTimeMillis();
    }

    public void setLastRun(long t) {
      this.lastRun = t;
    }

    public void doRuns(long time){
      long dt = time - lastRun;
      while (dt > frequency) {
        operation.run();
        dt -= frequency;
        lastRun += frequency;
      }
    }

    @Override
    public void run() {
      operation.run();
    }
  }
}
