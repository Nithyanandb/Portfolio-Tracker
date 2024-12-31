package Portfolio.Tracker.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class StockPriceService {
    private static final Logger logger = LoggerFactory.getLogger(StockPriceService.class);
    
    private final RestTemplate restTemplate;
    
    @Value("${stock.api.base-url}")
    private String apiBaseUrl;
    
    @Value("${stock.api.key}")
    private String apiKey;

    public double getCurrentPrice(String symbol) {
        try {
            String url = String.format("%s/quote/%s?token=%s", apiBaseUrl, symbol, apiKey);
            ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
            
            if (response.getBody() != null && response.getBody().has("c")) {
                return response.getBody().get("c").asDouble();
            }
            
            throw new RuntimeException("Unable to fetch current price for " + symbol);
        } catch (Exception e) {
            logger.error("Error fetching stock price for {}: {}", symbol, e.getMessage());
            throw new RuntimeException("Failed to fetch stock price: " + e.getMessage());
        }
    }

    public boolean isValidSymbol(String symbol) {
        try {
            String url = String.format("%s/search?q=%s&token=%s", apiBaseUrl, symbol, apiKey);
            ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
            
            return response.getBody() != null && 
                   response.getBody().has("count") && 
                   response.getBody().get("count").asInt() > 0;
        } catch (Exception e) {
            logger.error("Error validating symbol {}: {}", symbol, e.getMessage());
            return false;
        }
    }
} 