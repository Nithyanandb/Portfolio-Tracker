@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {
    List<Trade> findByStrategyId(String strategyId);
    List<Trade> findBySymbolAndDateAfter(String symbol, LocalDateTime date);
    @Query("SELECT t FROM Trade t WHERE t.symbol = :symbol AND t.status = 'OPEN'")
    List<Trade> findOpenPositions(String symbol);
} 