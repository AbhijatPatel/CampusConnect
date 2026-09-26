package com.campusconnect.mapper;

import com.campusconnect.dto.*;
import com.campusconnect.entity.*;

import java.util.Collections;
import java.util.stream.Collectors;

public class EntityDtoMappers {

    public static StudentProfileDto mapToStudentProfileDto(Student student) {
        if (student == null) return null;

        return StudentProfileDto.builder()
                .id(student.getId())
                .userId(student.getUser().getId())
                .fullName(student.getUser().getFullName())
                .email(student.getUser().getEmail())
                .phone(student.getUser().getPhone())
                .cgpa(student.getCgpa())
                .university(student.getUniversity())
                .branch(student.getBranch())
                .passoutYear(student.getPassoutYear())
                .location(student.getLocation())
                .bio(student.getBio())
                .resumeUrl(student.getResumeUrl())
                .resumeText(student.getResumeText())
                .profileCompleteness(student.getProfileCompleteness())
                .skills(student.getSkills() != null ? student.getSkills().stream().map(EntityDtoMappers::mapToSkillDto).collect(Collectors.toList()) : Collections.emptyList())
                .educationList(student.getEducationList() != null ? student.getEducationList().stream().map(EntityDtoMappers::mapToEducationDto).collect(Collectors.toList()) : Collections.emptyList())
                .projects(student.getProjects() != null ? student.getProjects().stream().map(EntityDtoMappers::mapToProjectDto).collect(Collectors.toList()) : Collections.emptyList())
                .experiences(student.getExperiences() != null ? student.getExperiences().stream().map(EntityDtoMappers::mapToExperienceDto).collect(Collectors.toList()) : Collections.emptyList())
                .certifications(student.getCertifications() != null ? student.getCertifications().stream().map(EntityDtoMappers::mapToCertificationDto).collect(Collectors.toList()) : Collections.emptyList())
                .build();
    }

    public static StudentSkillDto mapToSkillDto(StudentSkill s) {
        return StudentSkillDto.builder()
                .id(s.getId())
                .skillName(s.getSkillName())
                .proficiencyLevel(s.getProficiencyLevel())
                .yearsOfExperience(s.getYearsOfExperience())
                .build();
    }

    public static EducationDto mapToEducationDto(Education e) {
        return EducationDto.builder()
                .id(e.getId())
                .degree(e.getDegree())
                .institution(e.getInstitution())
                .fieldOfStudy(e.getFieldOfStudy())
                .startYear(e.getStartYear())
                .endYear(e.getEndYear())
                .score(e.getScore())
                .build();
    }

    public static ProjectDto mapToProjectDto(Project p) {
        return ProjectDto.builder()
                .id(p.getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .techStack(p.getTechStack())
                .projectUrl(p.getProjectUrl())
                .githubUrl(p.getGithubUrl())
                .build();
    }

    public static ExperienceDto mapToExperienceDto(Experience ex) {
        return ExperienceDto.builder()
                .id(ex.getId())
                .companyName(ex.getCompanyName())
                .roleTitle(ex.getRoleTitle())
                .startDate(ex.getStartDate())
                .endDate(ex.getEndDate())
                .description(ex.getDescription())
                .isInternship(ex.getIsInternship())
                .durationMonths(ex.getDurationMonths())
                .build();
    }

    public static CertificationDto mapToCertificationDto(Certification c) {
        return CertificationDto.builder()
                .id(c.getId())
                .name(c.getName())
                .issuingOrganization(c.getIssuingOrganization())
                .issueDate(c.getIssueDate())
                .credentialUrl(c.getCredentialUrl())
                .build();
    }

    public static JobDto mapToJobDto(Job job) {
        if (job == null) return null;
        return JobDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .companyId(job.getCompany().getId())
                .companyName(job.getCompany().getName())
                .companyLogoUrl(job.getCompany().getLogoUrl())
                .recruiterId(job.getRecruiter().getId())
                .recruiterName(job.getRecruiter().getUser().getFullName())
                .location(job.getLocation())
                .salaryRange(job.getSalaryRange())
                .jobType(job.getJobType())
                .minCgpa(job.getMinCgpa())
                .requiredExperienceYears(job.getRequiredExperienceYears())
                .deadline(job.getDeadline())
                .requiredSkills(job.getRequiredSkills())
                .preferredSkills(job.getPreferredSkills())
                .status(job.getStatus().name())
                .createdAt(job.getCreatedAt() != null ? job.getCreatedAt().toString() : null)
                .build();
    }
}
