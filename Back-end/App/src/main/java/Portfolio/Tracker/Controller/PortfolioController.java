package Portfolio.Tracker.Controller;

import Portfolio.Tracker.Entity.Portfolio;
import Portfolio.Tracker.Service.PortfolioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/portfolio")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    // Add portfolio
    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_USER')")  // Example of role-based access
    public ResponseEntity<Portfolio> addPortfolio(@RequestBody Portfolio portfolio) {
        Portfolio createdPortfolio = portfolioService.addPortfolio(portfolio);
        return new ResponseEntity<>(createdPortfolio, HttpStatus.CREATED);
    }

    // Get portfolio by ID
    @GetMapping("/get")
    public ResponseEntity<Portfolio> getPortfolioById(@RequestParam("id") Long id) {
        Portfolio portfolio = portfolioService.getPortfolioById(id);
        return portfolio != null
                ? new ResponseEntity<>(portfolio, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Get all portfolios
    @GetMapping("/all")
    public ResponseEntity<Iterable<Portfolio>> getAllPortfolios() {
        Iterable<Portfolio> portfolios = portfolioService.getAllPortfolios();
        return new ResponseEntity<>(portfolios, HttpStatus.OK);
    }

    // Update portfolio
    @PutMapping("/update")
    public ResponseEntity<Portfolio> updatePortfolio(@RequestParam("id") Long id, @RequestBody Portfolio portfolio) {
        Portfolio updatedPortfolio = portfolioService.updatePortfolio(id, portfolio);
        return updatedPortfolio != null
                ? new ResponseEntity<>(updatedPortfolio, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete portfolio
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deletePortfolio(@RequestParam("id") Long id) {
        return portfolioService.deletePortfolio(id)
                ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
