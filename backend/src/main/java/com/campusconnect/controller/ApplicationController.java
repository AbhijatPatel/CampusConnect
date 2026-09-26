package com.campusconnect.controller;

import com.campusconnect.dto.ApiResponse;
import com.campusconnect.dto.ApplicationDto;
import com.campusconnect.security.UserPrincipal;
import com.campusconnect.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }


    @PostMapping("/api/jobs/{id}/apply")
    public ResponseEntity<ApiResponse<ApplicationDto>> applyForJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        ApplicationDto application = applicationService.applyForJob(userPrincipal.getId(), id);
        return ResponseEntity.ok(ApiResponse.success("Application submitted successfully", application));
    }

    @GetMapping("/api/student/applications")
    public ResponseEntity<ApiResponse<List<ApplicationDto>>> getStudentApplications(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ApplicationDto> applications = applicationService.getStudentApplications(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(applications));
    }

    @GetMapping("/api/recruiter/jobs/{id}/applications")
    public ResponseEntity<ApiResponse<List<ApplicationDto>>> getJobApplications(
            @PathVariable Long id) {
        List<ApplicationDto> applications = applicationService.getJobApplications(id);
        return ResponseEntity.ok(ApiResponse.success(applications));
    }

    @PutMapping("/api/recruiter/applications/{id}/status")
    public ResponseEntity<ApiResponse<ApplicationDto>> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        ApplicationDto updated = applicationService.updateStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Status updated to " + status, updated));
    }
}
