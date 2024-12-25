package Portfolio.Tracker.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class StockTransactionDTO {
    @NotNull
    private Long stockId;

    @NotNull
    @Min(1)
    private Integer quantity;

    @NotNull
    @Min(0)
    private BigDecimal price;

    @NotNull
    private TransactionType type;

    public enum TransactionType {
        BUY, SELL
    }

    // Constructors, getters, setters
    public StockTransactionDTO(Long stockId, Integer quantity, BigDecimal price, TransactionType type) {
        this.stockId = stockId;
        this.quantity = quantity;
        this.price = price;
        this.type = type;
    }

    public @NotNull Long getStockId() {
        return stockId;
    }

    public void setStockId(@NotNull Long stockId) {
        this.stockId = stockId;
    }

    public @NotNull @Min(1) Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(@NotNull @Min(1) Integer quantity) {
        this.quantity = quantity;
    }

    public @NotNull @Min(0) BigDecimal getPrice() {
        return price;
    }

    public void setPrice(@NotNull @Min(0) BigDecimal price) {
        this.price = price;
    }

    public @NotNull TransactionType getType() {
        return type;
    }

    public void setType(@NotNull TransactionType type) {
        this.type = type;
    }
}
