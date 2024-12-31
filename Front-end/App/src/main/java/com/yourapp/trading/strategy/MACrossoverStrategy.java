@Slf4j
public class MACrossoverStrategy implements Strategy {
    private final String id;
    private final Map<String, Object> config;
    private volatile boolean running;
    
    public MACrossoverStrategy(Map<String, Object> config) {
        this.id = UUID.randomUUID().toString();
        this.config = config;
    }
    
    @Override
    public void run() {
        running = true;
        while (running) {
            try {
                // Implement MA crossover logic
                calculateMovingAverages();
                checkForSignals();
                Thread.sleep(1000); // Adjust based on your needs
            } catch (Exception e) {
                log.error("Error in MA Crossover strategy", e);
            }
        }
    }
    
    @Override
    public void stop() {
        running = false;
    }
    
    // Implementation details...
} 