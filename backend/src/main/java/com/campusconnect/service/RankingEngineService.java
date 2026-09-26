package com.campusconnect.service;

import com.campusconnect.entity.Application;
import com.campusconnect.entity.Job;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.ranking.CandidateScoreDetails;
import com.campusconnect.ranking.DsaRankingEngine;
import com.campusconnect.ranking.WeightConfig;
import com.campusconnect.repository.ApplicationRepository;
import com.campusconnect.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingEngineService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final DsaRankingEngine dsaRankingEngine;

    public RankingEngineService(JobRepository jobRepository, ApplicationRepository applicationRepository, DsaRankingEngine dsaRankingEngine) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.dsaRankingEngine = dsaRankingEngine;
    }


    public List<CandidateScoreDetails> getRankedCandidatesForJob(Long jobId, WeightConfig weightConfig) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found: " + jobId));

        List<Application> applications = applicationRepository.findByJobId(jobId);
        return dsaRankingEngine.rankCandidates(job, applications, weightConfig);
    }
}
