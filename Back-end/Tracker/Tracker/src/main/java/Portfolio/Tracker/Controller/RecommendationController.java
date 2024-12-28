package Portfolio.Tracker.Controller;

import Portfolio.Tracker.DTO.RecommendationDTO;
import Portfolio.Tracker.Service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {
    private final RecommendationService recommendationService;

    @GetMapping
    public List<RecommendationDTO> getRecommendations() {
        return recommendationService.getRecommendations();
    }
} 