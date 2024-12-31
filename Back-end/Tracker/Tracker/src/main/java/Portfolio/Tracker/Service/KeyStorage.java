package Portfolio.Tracker.Service;

import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.concurrent.ConcurrentHashMap;
import java.time.Instant;
import org.springframework.scheduling.annotation.Scheduled;

@Service
public class KeyStorage {
    private final ConcurrentHashMap<String, KeyEntry> activeKeys = new ConcurrentHashMap<>();

    public void storeKey(String token, SecretKey key) {
        activeKeys.put(token, new KeyEntry(key, Instant.now()));
    }

    public SecretKey getKey(String token) {
        KeyEntry entry = activeKeys.get(token);
        return entry != null ? entry.key : null;
    }

    public void removeKey(String token) {
        activeKeys.remove(token);
    }

    @Scheduled(fixedRate = 3600000) // Run every hour
    public void cleanupExpiredKeys() {
        Instant cutoff = Instant.now().minusSeconds(3600); // 1 hour ago
        activeKeys.entrySet().removeIf(entry -> entry.getValue().timestamp.isBefore(cutoff));
    }

    private static class KeyEntry {
        final SecretKey key;
        final Instant timestamp;

        KeyEntry(SecretKey key, Instant timestamp) {
            this.key = key;
            this.timestamp = timestamp;
        }
    }
} 