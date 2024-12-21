package Portfolio.Tracker.Controller;

import Portfolio.Tracker.Entity.Portfolio;
import Portfolio.Tracker.Service.PortfolioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/portfolio")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    // Endpoint to add a new portfolio
    @PostMapping("/add")
    public ResponseEntity<Portfolio> addPortfolio(@RequestBody Portfolio portfolio) {
        Portfolio createdPortfolio = portfolioService.addPortfolio(portfolio);
        return new ResponseEntity<>(createdPortfolio, HttpStatus.CREATED);
    }

    // Endpoint to get a portfolio by ID using request param
    @GetMapping("/get")
    public ResponseEntity<Portfolio> getPortfolioById(@RequestParam("id") Long id) {
        Portfolio portfolio = portfolioService.getPortfolioById(id);
        if (portfolio != null) {
            return new ResponseEntity<>(portfolio, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to get all portfolios
    @GetMapping("/all")
    public ResponseEntity<Iterable<Portfolio>> getAllPortfolios() {
        Iterable<Portfolio> portfolios = portfolioService.getAllPortfolios();
        return new ResponseEntity<>(portfolios, HttpStatus.OK);
    }

    // Endpoint to update an existing portfolio
    @PutMapping("/update")
    public ResponseEntity<Portfolio> updatePortfolio(@RequestParam("id") Long id, @RequestBody Portfolio portfolio) {
        Portfolio updatedPortfolio = portfolioService.updatePortfolio(id, portfolio);
        if (updatedPortfolio != null) {
            return new ResponseEntity<>(updatedPortfolio, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to delete a portfolio by ID
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deletePortfolio(@RequestParam("id") Long id) {
        if (portfolioService.deletePortfolio(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
