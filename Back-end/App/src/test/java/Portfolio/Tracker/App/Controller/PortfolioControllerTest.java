package Portfolio.Tracker.App.Controller;

import Portfolio.Tracker.Controller.PortfolioController;
import Portfolio.Tracker.Entity.Portfolio;
import Portfolio.Tracker.Service.PortfolioService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class PortfolioControllerTest {

    private MockMvc mockMvc;

    @Mock
    private PortfolioService portfolioService;

    @InjectMocks
    private PortfolioController portfolioController;

    private ObjectMapper objectMapper;
    private Portfolio portfolio;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        portfolio = new Portfolio(1L, "Test Portfolio", "Sample description");

        mockMvc = MockMvcBuilders.standaloneSetup(portfolioController).build();
    }

    @Test
    void testAddPortfolio() throws Exception {
        when(portfolioService.addPortfolio(any(Portfolio.class))).thenReturn(portfolio);

        mockMvc.perform(post("/portfolio/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(portfolio)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Test Portfolio"))
                .andExpect(jsonPath("$.description").value("Sample description"));

        verify(portfolioService, times(1)).addPortfolio(any(Portfolio.class));
    }

    @Test
    void testGetPortfolioById() throws Exception {
        when(portfolioService.getPortfolioById(1L)).thenReturn(portfolio);

        mockMvc.perform(get("/portfolio/get?id=1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Test Portfolio"))
                .andExpect(jsonPath("$.description").value("Sample description"));

        verify(portfolioService, times(1)).getPortfolioById(1L);
    }

    @Test
    void testGetAllPortfolios() throws Exception {
        when(portfolioService.getAllPortfolios()).thenReturn(List.of(portfolio));

        mockMvc.perform(get("/portfolio/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Test Portfolio"))
                .andExpect(jsonPath("$[0].description").value("Sample description"));

        verify(portfolioService, times(1)).getAllPortfolios();
    }

    @Test
    void testUpdatePortfolio() throws Exception {
        Portfolio updatedPortfolio = new Portfolio(1L, "Updated Portfolio", "Updated description");
        when(portfolioService.updatePortfolio(eq(1L), any(Portfolio.class))).thenReturn(updatedPortfolio);

        mockMvc.perform(put("/portfolio/update?id=1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedPortfolio)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Updated Portfolio"))
                .andExpect(jsonPath("$.description").value("Updated description"));

        verify(portfolioService, times(1)).updatePortfolio(eq(1L), any(Portfolio.class));
    }

    @Test
    void testDeletePortfolio() throws Exception {
        when(portfolioService.deletePortfolio(1L)).thenReturn(true);

        mockMvc.perform(delete("/portfolio/delete?id=1"))
                .andExpect(status().isNoContent());

        verify(portfolioService, times(1)).deletePortfolio(1L);
    }

    @Test
    void testDeletePortfolioNotFound() throws Exception {
        when(portfolioService.deletePortfolio(1L)).thenReturn(false);

        mockMvc.perform(delete("/portfolio/delete?id=1"))
                .andExpect(status().isNotFound());

        verify(portfolioService, times(1)).deletePortfolio(1L);
    }
}
