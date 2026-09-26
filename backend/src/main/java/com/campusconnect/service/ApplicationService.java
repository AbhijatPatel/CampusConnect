package com.campusconnect.service;

import com.campusconnect.dto.ApplicationDto;
import com.campusconnect.entity.*;
import com.campusconnect.exception.BadRequestException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.ranking.CandidateScoreDetails;
import com.campusconnect.ranking.DsaRankingEngine;
import com.campusconnect.ranking.WeightConfig;
import com.campusconnect.repository.ApplicationRepository;
import com.campusconnect.repository.JobRepository;
import com.campusconnect.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final StudentRepository studentRepository;
    private final DsaRankingEngine dsaRankingEngine;
    private final AiMatchingService aiMatchingService;
    private final NotificationService notificationService;

    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository, StudentRepository studentRepository, DsaRankingEngine dsaRankingEngine, AiMatchingService aiMatchingService, NotificationService notificationService) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.studentRepository = studentRepository;
        this.dsaRankingEngine = dsaRankingEngine;
        this.aiMatchingService = aiMatchingService;
        this.notificationService = notificationService;
    }


    @Transactional
    public ApplicationDto applyForJob(Long studentUserId, Long jobId) {
        Student student = studentRepository.findByUserId(studentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (applicationRepository.existsByJobIdAndStudentId(jobId, student.getId())) {
            throw new BadRequestException("You have already applied for this job!");
        }

        // Calculate AI / NLP matching
        Map<String, Object> matchResult = aiMatchingService.calculateJobMatch(
                student, job.getRequiredSkills(), job.getDescription()
        );
        double nlpScore = Double.parseDouble(matchResult.get("nlp_similarity").toString());

        // Calculate DSA ranking engine score
        CandidateScoreDetails scoreDetails = dsaRankingEngine.calculateCandidateScore(
                student, job, null,
                job.getRequiredSkills(), job.getPreferredSkills(),
                job.getMinCgpa() != null ? job.getMinCgpa() : 0.0,
                job.getRequiredExperienceYears() != null ? job.getRequiredExperienceYears() : 0.0,
                new WeightConfig()
        );

        Application application = Application.builder()
                .job(job)
                .student(student)
                .status(ApplicationStatus.APPLIED)
                .overallScore(scoreDetails.getOverallScore())
                .skillMatchScore(scoreDetails.getSkillMatchScore())
                .nlpMatchScore(nlpScore)
                .experienceScore(scoreDetails.getExperienceScore())
                .cgpaScore(scoreDetails.getCgpaScore())
                .rankingExplanation(scoreDetails.getRankingExplanation())
                .build();

        application = applicationRepository.save(application);

        // Send notifications
        notificationService.sendNotification(
                student.getUser().getId(),
                "Application Submitted",
                "Your application for " + job.getTitle() + " at " + job.getCompany().getName() + " was submitted successfully.",
                "APPLICATION"
        );

        notificationService.sendNotification(
                job.getRecruiter().getUser().getId(),
                "New Candidate Applied",
                student.getUser().getFullName() + " applied for " + job.getTitle() + " with match score " + scoreDetails.getOverallScore() + "%.",
                "APPLICATION"
        );

        return mapToDto(application);
    }

    public List<ApplicationDto> getStudentApplications(Long studentUserId) {
        Student student = studentRepository.findByUserId(studentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        return applicationRepository.findByStudentId(student.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ApplicationDto> getJobApplications(Long jobId) {
        return applicationRepository.findByJobId(jobId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApplicationDto updateStatus(Long applicationId, String statusStr) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        ApplicationStatus newStatus;
        try {
            newStatus = ApplicationStatus.valueOf(statusStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid application status: " + statusStr);
        }

        application.setStatus(newStatus);
        application = applicationRepository.save(application);

        // Send status change notification to the student
        notificationService.sendNotification(
                application.getStudent().getUser().getId(),
                "Application Status Updated",
                "Your application for " + application.getJob().getTitle() + " is now in stage: " + newStatus.name(),
                "APPLICATION"
        );

        return mapToDto(application);
    }

    private ApplicationDto mapToDto(Application app) {
        return ApplicationDto.builder()
                .id(app.getId())
                .jobId(app.getJob().getId())
                .jobTitle(app.getJob().getTitle())
                .companyName(app.getJob().getCompany().getName())
                .location(app.getJob().getLocation())
                .studentId(app.getStudent().getId())
                .studentName(app.getStudent().getUser().getFullName())
                .studentEmail(app.getStudent().getUser().getEmail())
                .studentBranch(app.getStudent().getBranch())
                .studentCgpa(app.getStudent().getCgpa())
                .status(app.getStatus().name())
                .overallScore(app.getOverallScore())
                .skillMatchScore(app.getSkillMatchScore())
                .nlpMatchScore(app.getNlpMatchScore())
                .rankingExplanation(app.getRankingExplanation())
                .appliedAt(app.getAppliedAt() != null ? app.getAppliedAt().toString() : null)
                .build();
    }
}
