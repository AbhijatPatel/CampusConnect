package com.campusconnect.controller;

import com.campusconnect.dto.ApiResponse;
import com.campusconnect.entity.Recruiter;
import com.campusconnect.security.UserPrincipal;
import com.campusconnect.service.RecruiterService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/recruiter")
public class RecruiterController {

    private final RecruiterService recruiterService;

    public RecruiterController(RecruiterService recruiterService) {
        this.recruiterService = recruiterService;
    }


    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Recruiter>> getProfile(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Recruiter recruiter = recruiterService.getRecruiterByUserId(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(recruiter));
    }

    @GetMapping("/analytics")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAnalytics(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Map<String, Object> analytics = recruiterService.getRecruitmentAnalytics(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(analytics));
    }
}
