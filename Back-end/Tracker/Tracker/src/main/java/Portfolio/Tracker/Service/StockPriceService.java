package Portfolio.Tracker.Service;

import Portfolio.Tracker.DTO.StockInfo;
import Portfolio.Tracker.DTO.StockQuote;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.concurrent.TimeUnit;
import java.util.Map;
import java.util.List;
import java.util.HashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class StockPriceService {
    private final RestTemplate restTemplate;
    
    @Value("${finnhub.api.base-url}")
    private String apiBaseUrl;
    
    @Value("${finnhub.api.key}")
    private String apiKey;

    private final Cache<String, StockQuote> quoteCache = Caffeine.newBuilder()
        .expireAfterWrite(30, TimeUnit.SECONDS)
        .maximumSize(100)
        .build();

    private final Cache<String, StockInfo> infoCache = Caffeine.newBuilder()
        .expireAfterWrite(24, TimeUnit.HOURS)
        .maximumSize(100)
        .build();

    public StockQuote getQuote(String symbol) {
        try {
            StockQuote cachedQuote = quoteCache.getIfPresent(symbol);
            if (cachedQuote != null) {
                return cachedQuote;
            }

            String url = String.format("%s/quote?symbol=%s&token=%s", apiBaseUrl, symbol, apiKey);
            ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
            
            if (response.getBody() != null) {
                JsonNode data = response.getBody();
                StockQuote quote = StockQuote.builder()
                    .currentPrice(data.get("c").asDouble())
                    .change(data.get("d").asDouble())
                    .dayChangePercent(data.get("dp").asDouble())
                    .highPrice(data.get("h").asDouble())
                    .lowPrice(data.get("l").asDouble())
                    .openPrice(data.get("o").asDouble())
                    .previousClose(data.get("pc").asDouble())
                    .timestamp(data.get("t").asLong())
                    .build();

                quoteCache.put(symbol, quote);
                return quote;
            }
            throw new RuntimeException("Invalid quote data received");
        } catch (Exception e) {
            log.error("Failed to fetch quote for {}: {}", symbol, e.getMessage());
            throw new RuntimeException("Failed to fetch stock quote", e);
        }
    }

    public StockInfo getStockInfo(String symbol) {
        try {
            StockInfo cachedInfo = infoCache.getIfPresent(symbol);
            if (cachedInfo != null) {
                return cachedInfo;
            }

            String url = String.format("%s/stock/profile2?symbol=%s&token=%s", apiBaseUrl, symbol, apiKey);
            ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
            
            if (response.getBody() != null) {
                JsonNode data = response.getBody();
                StockInfo info = StockInfo.builder()
                    .symbol(symbol)
                    .name(data.get("name").asText())
                    .currency(data.get("currency").asText())
                    .exchange(data.get("exchange").asText())
                    .build();

                infoCache.put(symbol, info);
                return info;
            }
            throw new RuntimeException("Invalid stock info received");
        } catch (Exception e) {
            log.error("Failed to fetch stock info for {}: {}", symbol, e.getMessage());
            throw new RuntimeException("Failed to fetch stock information", e);
        }
    }

    public Map<String, Double> getMultiplePrices(List<String> symbols) {
        Map<String, Double> prices = new HashMap<>();
        for (String symbol : symbols) {
            try {
                StockQuote quote = getQuote(symbol);
                if (quote != null) {
                    prices.put(symbol, quote.getCurrentPrice());
                }
            } catch (Exception e) {
                log.error("Failed to fetch price for {}", symbol);
            }
        }
        return prices;
    }
}