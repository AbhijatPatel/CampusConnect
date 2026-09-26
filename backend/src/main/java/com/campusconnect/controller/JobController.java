package com.campusconnect.controller;

import com.campusconnect.dto.ApiResponse;
import com.campusconnect.dto.JobDto;
import com.campusconnect.security.UserPrincipal;
import com.campusconnect.service.JobService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }


    @GetMapping("/api/jobs")
    public ResponseEntity<ApiResponse<Page<JobDto>>> getAllJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) Double maxCgpa,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<JobDto> jobs = jobService.getAllJobs(keyword, location, jobType, maxCgpa, pageable);

        return ResponseEntity.ok(ApiResponse.success(jobs));
    }

    @GetMapping("/api/jobs/{id}")
    public ResponseEntity<ApiResponse<JobDto>> getJobById(@PathVariable Long id) {
        JobDto job = jobService.getJobById(id);
        return ResponseEntity.ok(ApiResponse.success(job));
    }

    @GetMapping("/api/recruiter/jobs")
    public ResponseEntity<ApiResponse<List<JobDto>>> getRecruiterJobs(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<JobDto> jobs = jobService.getJobsByRecruiter(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(jobs));
    }

    @PostMapping("/api/recruiter/jobs")
    public ResponseEntity<ApiResponse<JobDto>> createJob(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody JobDto dto) {
        JobDto created = jobService.createJob(userPrincipal.getId(), dto);
        return ResponseEntity.ok(ApiResponse.success("Job posted successfully", created));
    }

    @PutMapping("/api/recruiter/jobs/{id}")
    public ResponseEntity<ApiResponse<JobDto>> updateJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody JobDto dto) {
        JobDto updated = jobService.updateJob(id, userPrincipal.getId(), dto);
        return ResponseEntity.ok(ApiResponse.success("Job updated successfully", updated));
    }

    @DeleteMapping("/api/recruiter/jobs/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        jobService.deleteJob(id, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Job deleted successfully", null));
    }
}
