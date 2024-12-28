package Portfolio.Tracker.DTO;

import jakarta.validation.constraints.*;

public class TransactionRequest {
    @NotBlank(message = "Stock symbol cannot be blank")
    private String stockSymbol;

    @NotBlank(message = "Stock name cannot be blank")
    private String stockName;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private double price;

    private String notes;

    // Getters and Setters
    public String getStockSymbol() {
        return stockSymbol;
    }

    public void setStockSymbol(String stockSymbol) {
        this.stockSymbol = stockSymbol;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
