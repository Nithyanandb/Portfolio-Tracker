package Portfolio.Tracker.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symbol;
    private int quantity;
    private BigDecimal purchase_Price;
    private BigDecimal current_Price;
    private BigDecimal profit_Loss;
    private Long portfolio_Id;
    private LocalDateTime purchase_Date;
    private LocalDateTime updated_Date;
    private String exchange = "NASDAQ";  // Default value for exchange
    private String sector = "Technology";  // Default value for sector
    private BigDecimal day_Change_Percentage;
    private String type;

    // Constructor that accepts only required fields
    public Stock(String symbol, int quantity, BigDecimal purchase_Price, String type) {
        this.symbol = symbol;
        this.quantity = quantity;
        this.purchase_Price = purchase_Price;
        this.type = type;
        this.purchase_Date = LocalDateTime.now(); // Automatically set purchase date
        this.updated_Date = LocalDateTime.now(); // Automatically set updated date
    }

    // Getter and Setter methods
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPurchase_Price() {
        return purchase_Price;
    }

    public void setPurchase_Price(BigDecimal purchase_Price) {
        this.purchase_Price = purchase_Price;
    }

    public BigDecimal getCurrent_Price() {
        return current_Price;
    }

    public void setCurrent_Price(BigDecimal current_Price) {
        this.current_Price = current_Price;
    }

    public BigDecimal getProfit_Loss() {
        return profit_Loss;
    }

    public void setProfit_Loss(BigDecimal profit_Loss) {
        this.profit_Loss = profit_Loss;
    }

    public Long getPortfolio_Id() {
        return portfolio_Id;
    }

    public void setPortfolio_Id(Long portfolio_Id) {
        this.portfolio_Id = portfolio_Id;
    }

    public LocalDateTime getPurchase_Date() {
        return purchase_Date;
    }

    public void setPurchase_Date(LocalDateTime purchase_Date) {
        this.purchase_Date = purchase_Date;
    }

    public LocalDateTime getUpdated_Date() {
        return updated_Date;
    }

    public void setUpdated_Date(LocalDateTime updated_Date) {
        this.updated_Date = updated_Date;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public BigDecimal getDay_Change_Percentage() {
        return day_Change_Percentage;
    }

    public void setDay_Change_Percentage(BigDecimal day_Change_Percentage) {
        this.day_Change_Percentage = day_Change_Percentage;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    // Default constructor
    public Stock() {}

}
