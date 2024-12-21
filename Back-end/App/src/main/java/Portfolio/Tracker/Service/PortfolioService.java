package Portfolio.Tracker.Service;

import Portfolio.Tracker.Entity.Portfolio;
import Portfolio.Tracker.Repository.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    // Add a new portfolio
    public Portfolio addPortfolio(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    // Get portfolio by ID
    public Portfolio getPortfolioById(Long id) {
        Optional<Portfolio> portfolio = portfolioRepository.findById(id);
        return portfolio.orElse(null);
    }

    // Get all portfolios
    public Iterable<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    // Update an existing portfolio
    public Portfolio updatePortfolio(Long id, Portfolio portfolio) {
        if (portfolioRepository.existsById(id)) {
            portfolio.setId(id);  // Make sure the ID is set for the update
            return portfolioRepository.save(portfolio);
        }
        return null;
    }

    // Delete a portfolio
    public boolean deletePortfolio(Long id) {
        if (portfolioRepository.existsById(id)) {
            portfolioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
