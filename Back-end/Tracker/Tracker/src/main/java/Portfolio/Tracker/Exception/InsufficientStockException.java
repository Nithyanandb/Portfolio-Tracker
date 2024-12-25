package com.example.stockmanagement.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String symbol) {
        super("Insufficient stock quantity for: " + symbol);
    }
}