package com.campusconnect.controller;

import com.campusconnect.dto.ApiResponse;
import com.campusconnect.ranking.CandidateScoreDetails;
import com.campusconnect.ranking.WeightConfig;
import com.campusconnect.service.RankingEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter/jobs")
public class RankingController {

    private final RankingEngineService rankingEngineService;

    public RankingController(RankingEngineService rankingEngineService) {
        this.rankingEngineService = rankingEngineService;
    }


    @GetMapping("/{id}/ranked-candidates")
    public ResponseEntity<ApiResponse<List<CandidateScoreDetails>>> getRankedCandidates(
            @PathVariable Long id,
            @RequestParam(required = false) Double skillMatchWeight,
            @RequestParam(required = false) Double nlpSimilarityWeight,
            @RequestParam(required = false) Double experienceWeight,
            @RequestParam(required = false) Double cgpaWeight,
            @RequestParam(required = false) Double projectsWeight,
            @RequestParam(required = false) Double eligibilityWeight) {

        WeightConfig weights = WeightConfig.builder()
                .skillMatchWeight(skillMatchWeight != null ? skillMatchWeight : 0.40)
                .nlpSimilarityWeight(nlpSimilarityWeight != null ? nlpSimilarityWeight : 0.20)
                .experienceWeight(experienceWeight != null ? experienceWeight : 0.15)
                .cgpaWeight(cgpaWeight != null ? cgpaWeight : 0.10)
                .projectsWeight(projectsWeight != null ? projectsWeight : 0.10)
                .eligibilityWeight(eligibilityWeight != null ? eligibilityWeight : 0.05)
                .build();

        List<CandidateScoreDetails> ranked = rankingEngineService.getRankedCandidatesForJob(id, weights);
        return ResponseEntity.ok(ApiResponse.success("Candidates ranked successfully using DSA Max-Heap PriorityQueue", ranked));
    }
}
