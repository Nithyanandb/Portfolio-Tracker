@Repository
public interface StrategyRepository extends JpaRepository<StrategyEntity, String> {
    List<StrategyEntity> findByStatus(StrategyStatus status);
    Optional<StrategyEntity> findByIdAndStatus(String id, StrategyStatus status);
} 