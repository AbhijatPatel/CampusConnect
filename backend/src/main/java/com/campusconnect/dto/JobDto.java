package com.campusconnect.dto;

import java.util.List;

public class JobDto {
    private Long id;
    private String title;
    private String description;
    private Long companyId;
    private String companyName;
    private String companyLogoUrl;
    private Long recruiterId;
    private String recruiterName;
    private String location;
    private String salaryRange;
    private String jobType;
    private Double minCgpa;
    private Double requiredExperienceYears;
    private String deadline;
    private List<String> requiredSkills;
    private List<String> preferredSkills;
    private String status;
    private String createdAt;
    private Double aiMatchPercentage;

    public JobDto() {}

    public JobDto(Long id, String title, String description, Long companyId, String companyName, String companyLogoUrl, Long recruiterId, String recruiterName, String location, String salaryRange, String jobType, Double minCgpa, Double requiredExperienceYears, String deadline, List<String> requiredSkills, List<String> preferredSkills, String status, String createdAt, Double aiMatchPercentage) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.companyId = companyId;
        this.companyName = companyName;
        this.companyLogoUrl = companyLogoUrl;
        this.recruiterId = recruiterId;
        this.recruiterName = recruiterName;
        this.location = location;
        this.salaryRange = salaryRange;
        this.jobType = jobType;
        this.minCgpa = minCgpa;
        this.requiredExperienceYears = requiredExperienceYears;
        this.deadline = deadline;
        this.requiredSkills = requiredSkills;
        this.preferredSkills = preferredSkills;
        this.status = status;
        this.createdAt = createdAt;
        this.aiMatchPercentage = aiMatchPercentage;
    }

    public static JobDtoBuilder builder() {
        return new JobDtoBuilder();
    }

    public static class JobDtoBuilder {
        private Long id;
        private String title;
        private String description;
        private Long companyId;
        private String companyName;
        private String companyLogoUrl;
        private Long recruiterId;
        private String recruiterName;
        private String location;
        private String salaryRange;
        private String jobType;
        private Double minCgpa;
        private Double requiredExperienceYears;
        private String deadline;
        private List<String> requiredSkills;
        private List<String> preferredSkills;
        private String status;
        private String createdAt;
        private Double aiMatchPercentage;

        public JobDtoBuilder id(Long id) { this.id = id; return this; }
        public JobDtoBuilder title(String title) { this.title = title; return this; }
        public JobDtoBuilder description(String description) { this.description = description; return this; }
        public JobDtoBuilder companyId(Long companyId) { this.companyId = companyId; return this; }
        public JobDtoBuilder companyName(String companyName) { this.companyName = companyName; return this; }
        public JobDtoBuilder companyLogoUrl(String companyLogoUrl) { this.companyLogoUrl = companyLogoUrl; return this; }
        public JobDtoBuilder recruiterId(Long recruiterId) { this.recruiterId = recruiterId; return this; }
        public JobDtoBuilder recruiterName(String recruiterName) { this.recruiterName = recruiterName; return this; }
        public JobDtoBuilder location(String location) { this.location = location; return this; }
        public JobDtoBuilder salaryRange(String salaryRange) { this.salaryRange = salaryRange; return this; }
        public JobDtoBuilder jobType(String jobType) { this.jobType = jobType; return this; }
        public JobDtoBuilder minCgpa(Double minCgpa) { this.minCgpa = minCgpa; return this; }
        public JobDtoBuilder requiredExperienceYears(Double requiredExperienceYears) { this.requiredExperienceYears = requiredExperienceYears; return this; }
        public JobDtoBuilder deadline(String deadline) { this.deadline = deadline; return this; }
        public JobDtoBuilder requiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; return this; }
        public JobDtoBuilder preferredSkills(List<String> preferredSkills) { this.preferredSkills = preferredSkills; return this; }
        public JobDtoBuilder status(String status) { this.status = status; return this; }
        public JobDtoBuilder createdAt(String createdAt) { this.createdAt = createdAt; return this; }
        public JobDtoBuilder aiMatchPercentage(Double aiMatchPercentage) { this.aiMatchPercentage = aiMatchPercentage; return this; }

        public JobDto build() {
            return new JobDto(id, title, description, companyId, companyName, companyLogoUrl, recruiterId, recruiterName, location, salaryRange, jobType, minCgpa, requiredExperienceYears, deadline, requiredSkills, preferredSkills, status, createdAt, aiMatchPercentage);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getCompanyLogoUrl() { return companyLogoUrl; }
    public void setCompanyLogoUrl(String companyLogoUrl) { this.companyLogoUrl = companyLogoUrl; }

    public Long getRecruiterId() { return recruiterId; }
    public void setRecruiterId(Long recruiterId) { this.recruiterId = recruiterId; }

    public String getRecruiterName() { return recruiterName; }
    public void setRecruiterName(String recruiterName) { this.recruiterName = recruiterName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSalaryRange() { return salaryRange; }
    public void setSalaryRange(String salaryRange) { this.salaryRange = salaryRange; }

    public String getJobType() { return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }

    public Double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(Double minCgpa) { this.minCgpa = minCgpa; }

    public Double getRequiredExperienceYears() { return requiredExperienceYears; }
    public void setRequiredExperienceYears(Double requiredExperienceYears) { this.requiredExperienceYears = requiredExperienceYears; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }

    public List<String> getPreferredSkills() { return preferredSkills; }
    public void setPreferredSkills(List<String> preferredSkills) { this.preferredSkills = preferredSkills; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public Double getAiMatchPercentage() { return aiMatchPercentage; }
    public void setAiMatchPercentage(Double aiMatchPercentage) { this.aiMatchPercentage = aiMatchPercentage; }

}