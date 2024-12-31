public interface Strategy {
    String getId();
    void run();
    void stop();
    StrategyStatus getStatus();
    Map<String, Object> getMetrics();
} 