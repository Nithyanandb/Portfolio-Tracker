package com.yourapp.trading.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yourapp.trading.model.MarketData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
    
    private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
    }
    
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        // Handle incoming messages
    }
    
    public void broadcastMarketData(MarketData data) {
        String payload = new ObjectMapper().writeValueAsString(data);
        sessions.forEach(session -> {
            try {
                session.sendMessage(new TextMessage(payload));
            } catch (Exception e) {
                log.error("Error sending market data", e);
            }
        });
    }
} 