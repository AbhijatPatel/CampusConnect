package com.campusconnect.controller;

import com.campusconnect.dto.*;
import com.campusconnect.entity.ResumeAnalysis;
import com.campusconnect.entity.Student;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.ResumeAnalysisRepository;
import com.campusconnect.repository.StudentRepository;
import com.campusconnect.security.UserPrincipal;
import com.campusconnect.service.JobService;
import com.campusconnect.service.StudentService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;
    private final JobService jobService;
    private final StudentRepository studentRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;

    public StudentController(StudentService studentService, JobService jobService, StudentRepository studentRepository, ResumeAnalysisRepository resumeAnalysisRepository) {
        this.studentService = studentService;
        this.jobService = jobService;
        this.studentRepository = studentRepository;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<StudentProfileDto>> getProfile(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        StudentProfileDto profile = studentService.getStudentByUserId(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(profile));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<StudentProfileDto>> updateProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody StudentProfileDto dto) {
        StudentProfileDto updated = studentService.updateProfile(userPrincipal.getId(), dto);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updated));
    }

    @PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<StudentProfileDto>> uploadResume(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam("file") MultipartFile file) {
        StudentProfileDto updated = studentService.uploadResume(userPrincipal.getId(), file);
        return ResponseEntity.ok(ApiResponse.success("Resume uploaded and analyzed successfully", updated));
    }

    // Skills: Add, Update, Delete
    @PostMapping("/skills")
    public ResponseEntity<ApiResponse<StudentProfileDto>> addSkill(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody StudentSkillDto skillDto) {
        StudentProfileDto updated = studentService.addSkill(userPrincipal.getId(), skillDto);
        return ResponseEntity.ok(ApiResponse.success("Skill added successfully", updated));
    }

    @PutMapping("/skills/{skillId}")
    public ResponseEntity<ApiResponse<StudentProfileDto>> updateSkill(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long skillId,
            @RequestBody StudentSkillDto skillDto) {
        StudentProfileDto updated = studentService.updateSkill(userPrincipal.getId(), skillId, skillDto);
        return ResponseEntity.ok(ApiResponse.success("Skill updated successfully", updated));
    }

    @DeleteMapping("/skills/{skillId}")
    public ResponseEntity<ApiResponse<StudentProfileDto>> deleteSkill(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long skillId) {
        StudentProfileDto updated = studentService.deleteSkill(userPrincipal.getId(), skillId);
        return ResponseEntity.ok(ApiResponse.success("Skill deleted successfully", updated));
    }

    // Projects: Add, Update, Delete
    @PostMapping("/projects")
    public ResponseEntity<ApiResponse<StudentProfileDto>> addProject(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody ProjectDto projectDto) {
        StudentProfileDto updated = studentService.addProject(userPrincipal.getId(), projectDto);
        return ResponseEntity.ok(ApiResponse.success("Project added successfully", updated));
    }

    @PutMapping("/projects/{projectId}")
    public ResponseEntity<ApiResponse<StudentProfileDto>> updateProject(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long projectId,
            @RequestBody ProjectDto projectDto) {
        StudentProfileDto updated = studentService.updateProject(userPrincipal.getId(), projectId, projectDto);
        return ResponseEntity.ok(ApiResponse.success("Project updated successfully", updated));
    }

    @DeleteMapping("/projects/{projectId}")
    public ResponseEntity<ApiResponse<StudentProfileDto>> deleteProject(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long projectId) {
        StudentProfileDto updated = studentService.deleteProject(userPrincipal.getId(), projectId);
        return ResponseEntity.ok(ApiResponse.success("Project deleted successfully", updated));
    }

    // Experiences: Add, Update, Delete
    @PostMapping("/experiences")
    public ResponseEntity<ApiResponse<StudentProfileDto>> addExperience(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody ExperienceDto expDto) {
        StudentProfileDto updated = studentService.addExperience(userPrincipal.getId(), expDto);
        return ResponseEntity.ok(ApiResponse.success("Experience added successfully", updated));
    }

    @PutMapping("/experiences/{expId}")
    public ResponseEntity<ApiResponse<StudentProfileDto>> updateExperience(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long expId,
            @RequestBody ExperienceDto expDto) {
        StudentProfileDto updated = studentService.updateExperience(userPrincipal.getId(), expId, expDto);
        return ResponseEntity.ok(ApiResponse.success("Experience updated successfully", updated));
    }

    @DeleteMapping("/experiences/{expId}")
    public ResponseEntity<ApiResponse<StudentProfileDto>> deleteExperience(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long expId) {
        StudentProfileDto updated = studentService.deleteExperience(userPrincipal.getId(), expId);
        return ResponseEntity.ok(ApiResponse.success("Experience deleted successfully", updated));
    }

    @GetMapping("/recommendations")
    public ResponseEntity<ApiResponse<List<JobDto>>> getRecommendedJobs(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<JobDto> recommended = jobService.getRecommendedJobsForStudent(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(recommended));
    }

    @GetMapping("/resume-analysis")
    public ResponseEntity<ApiResponse<ResumeAnalysis>> getResumeAnalysis(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Student student = studentRepository.findByUserId(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));
        ResumeAnalysis analysis = resumeAnalysisRepository.findByStudentId(student.getId()).orElse(null);
        return ResponseEntity.ok(ApiResponse.success(analysis));
    }
}
