package com.campusconnect.service;

import com.campusconnect.dto.JobDto;
import com.campusconnect.entity.*;
import com.campusconnect.exception.BadRequestException;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.mapper.EntityDtoMappers;
import com.campusconnect.repository.JobRepository;
import com.campusconnect.repository.RecruiterRepository;
import com.campusconnect.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final RecruiterRepository recruiterRepository;
    private final StudentRepository studentRepository;
    private final AiMatchingService aiMatchingService;

    public JobService(JobRepository jobRepository, RecruiterRepository recruiterRepository, StudentRepository studentRepository, AiMatchingService aiMatchingService) {
        this.jobRepository = jobRepository;
        this.recruiterRepository = recruiterRepository;
        this.studentRepository = studentRepository;
        this.aiMatchingService = aiMatchingService;
    }


    public Page<JobDto> getAllJobs(String keyword, String location, String jobType, Double maxCgpa, Pageable pageable) {
        Page<Job> jobPage;
        if (keyword != null || location != null || jobType != null || maxCgpa != null) {
            jobPage = jobRepository.searchJobs(JobStatus.PUBLISHED, keyword, location, jobType, maxCgpa, pageable);
        } else {
            jobPage = jobRepository.findByStatus(JobStatus.PUBLISHED, pageable);
        }

        List<JobDto> dtoList = jobPage.getContent().stream()
                .map(EntityDtoMappers::mapToJobDto)
                .collect(Collectors.toList());

        return new PageImpl<>(dtoList, pageable, jobPage.getTotalElements());
    }

    public JobDto getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        return EntityDtoMappers.mapToJobDto(job);
    }

    public List<JobDto> getJobsByRecruiter(Long recruiterUserId) {
        Recruiter recruiter = recruiterRepository.findByUserId(recruiterUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter profile not found"));
        return jobRepository.findByRecruiterId(recruiter.getId()).stream()
                .map(EntityDtoMappers::mapToJobDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public JobDto createJob(Long recruiterUserId, JobDto dto) {
        Recruiter recruiter = recruiterRepository.findByUserId(recruiterUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter profile not found"));

        Job job = Job.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .company(recruiter.getCompany())
                .recruiter(recruiter)
                .location(dto.getLocation())
                .salaryRange(dto.getSalaryRange())
                .jobType(dto.getJobType() != null ? dto.getJobType() : "Full-Time")
                .minCgpa(dto.getMinCgpa() != null ? dto.getMinCgpa() : 6.0)
                .requiredExperienceYears(dto.getRequiredExperienceYears() != null ? dto.getRequiredExperienceYears() : 0.0)
                .deadline(dto.getDeadline())
                .requiredSkills(dto.getRequiredSkills() != null ? dto.getRequiredSkills() : new ArrayList<>())
                .preferredSkills(dto.getPreferredSkills() != null ? dto.getPreferredSkills() : new ArrayList<>())
                .status(JobStatus.PUBLISHED)
                .build();

        job = jobRepository.save(job);
        return EntityDtoMappers.mapToJobDto(job);
    }

    @Transactional
    public JobDto updateJob(Long id, Long recruiterUserId, JobDto dto) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found: " + id));

        Recruiter recruiter = recruiterRepository.findByUserId(recruiterUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter not found"));

        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new BadRequestException("Unauthorized: You can only edit your own company's jobs.");
        }

        job.setTitle(dto.getTitle());
        job.setDescription(dto.getDescription());
        job.setLocation(dto.getLocation());
        job.setSalaryRange(dto.getSalaryRange());
        job.setJobType(dto.getJobType());
        job.setMinCgpa(dto.getMinCgpa());
        job.setRequiredExperienceYears(dto.getRequiredExperienceYears());
        job.setDeadline(dto.getDeadline());
        if (dto.getRequiredSkills() != null) job.setRequiredSkills(dto.getRequiredSkills());
        if (dto.getPreferredSkills() != null) job.setPreferredSkills(dto.getPreferredSkills());
        if (dto.getStatus() != null) {
            try {
                job.setStatus(JobStatus.valueOf(dto.getStatus()));
            } catch (Exception ignored) {}
        }

        job = jobRepository.save(job);
        return EntityDtoMappers.mapToJobDto(job);
    }

    @Transactional
    public void deleteJob(Long id, Long recruiterUserId) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found: " + id));
        jobRepository.delete(job);
    }

    public List<JobDto> getRecommendedJobsForStudent(Long studentUserId) {
        Student student = studentRepository.findByUserId(studentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

        List<Job> allJobs = jobRepository.findAll();
        List<JobDto> recommended = new ArrayList<>();

        for (Job job : allJobs) {
            if (job.getStatus() == JobStatus.PUBLISHED) {
                JobDto dto = EntityDtoMappers.mapToJobDto(job);
                Map<String, Object> matchResult = aiMatchingService.calculateJobMatch(
                        student,
                        job.getRequiredSkills(),
                        job.getDescription()
                );
                dto.setAiMatchPercentage(Double.parseDouble(matchResult.get("match_score").toString()));
                recommended.add(dto);
            }
        }

        // Sort descending by AI match percentage
        recommended.sort((a, b) -> Double.compare(
                b.getAiMatchPercentage() != null ? b.getAiMatchPercentage() : 0.0,
                a.getAiMatchPercentage() != null ? a.getAiMatchPercentage() : 0.0
        ));

        return recommended;
    }
}
