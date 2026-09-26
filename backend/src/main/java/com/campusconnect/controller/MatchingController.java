package com.campusconnect.controller;

import com.campusconnect.dto.ApiResponse;
import com.campusconnect.entity.Job;
import com.campusconnect.entity.Student;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.JobRepository;
import com.campusconnect.repository.StudentRepository;
import com.campusconnect.security.UserPrincipal;
import com.campusconnect.service.AiMatchingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/matching")
public class MatchingController {

    private final AiMatchingService aiMatchingService;
    private final StudentRepository studentRepository;
    private final JobRepository jobRepository;

    public MatchingController(AiMatchingService aiMatchingService, StudentRepository studentRepository, JobRepository jobRepository) {
        this.aiMatchingService = aiMatchingService;
        this.studentRepository = studentRepository;
        this.jobRepository = jobRepository;
    }


    @PostMapping("/analyze")
    public ResponseEntity<ApiResponse<Map<String, Object>>> analyzeMatch(@RequestBody Map<String, Object> request) {
        // Direct call to AI Matching Service
        @SuppressWarnings("unchecked")
        java.util.List<String> reqSkills = request.get("required_skills") != null 
                ? (java.util.List<String>) request.get("required_skills") 
                : java.util.Collections.emptyList();

        Map<String, Object> result = aiMatchingService.calculateJobMatch(
                Student.builder().build(),
                reqSkills,
                (String) request.get("job_description")
        );
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getJobMatchForStudent(
            @PathVariable Long jobId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        Student student = studentRepository.findByUserId(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found: " + jobId));

        Map<String, Object> matchResult = aiMatchingService.calculateJobMatch(
                student,
                job.getRequiredSkills(),
                job.getDescription()
        );

        return ResponseEntity.ok(ApiResponse.success(matchResult));
    }
}
