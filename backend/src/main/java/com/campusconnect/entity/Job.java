package com.campusconnect.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne
    @JoinColumn(name = "recruiter_id", nullable = false)
    private Recruiter recruiter;

    private String location;
    private String salaryRange;
    private String jobType;
    private Double minCgpa;
    private Double requiredExperienceYears;
    private String deadline;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_required_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill")
    private List<String> requiredSkills = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_preferred_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill")
    private List<String> preferredSkills = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private JobStatus status = JobStatus.PUBLISHED;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Job() {}

    public Job(Long id, String title, String description, Company company, Recruiter recruiter, String location, String salaryRange, String jobType, Double minCgpa, Double requiredExperienceYears, String deadline, List<String> requiredSkills, List<String> preferredSkills, JobStatus status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.company = company;
        this.recruiter = recruiter;
        this.location = location;
        this.salaryRange = salaryRange;
        this.jobType = jobType;
        this.minCgpa = minCgpa;
        this.requiredExperienceYears = requiredExperienceYears;
        this.deadline = deadline;
        this.requiredSkills = requiredSkills != null ? requiredSkills : new ArrayList<>();
        this.preferredSkills = preferredSkills != null ? preferredSkills : new ArrayList<>();
        this.status = status != null ? status : JobStatus.PUBLISHED;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static JobBuilder builder() {
        return new JobBuilder();
    }

    public static class JobBuilder {
        private Long id;
        private String title;
        private String description;
        private Company company;
        private Recruiter recruiter;
        private String location;
        private String salaryRange;
        private String jobType;
        private Double minCgpa;
        private Double requiredExperienceYears;
        private String deadline;
        private List<String> requiredSkills = new ArrayList<>();
        private List<String> preferredSkills = new ArrayList<>();
        private JobStatus status = JobStatus.PUBLISHED;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public JobBuilder id(Long id) { this.id = id; return this; }
        public JobBuilder title(String title) { this.title = title; return this; }
        public JobBuilder description(String description) { this.description = description; return this; }
        public JobBuilder company(Company company) { this.company = company; return this; }
        public JobBuilder recruiter(Recruiter recruiter) { this.recruiter = recruiter; return this; }
        public JobBuilder location(String location) { this.location = location; return this; }
        public JobBuilder salaryRange(String salaryRange) { this.salaryRange = salaryRange; return this; }
        public JobBuilder jobType(String jobType) { this.jobType = jobType; return this; }
        public JobBuilder minCgpa(Double minCgpa) { this.minCgpa = minCgpa; return this; }
        public JobBuilder requiredExperienceYears(Double requiredExperienceYears) { this.requiredExperienceYears = requiredExperienceYears; return this; }
        public JobBuilder deadline(String deadline) { this.deadline = deadline; return this; }
        public JobBuilder requiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; return this; }
        public JobBuilder preferredSkills(List<String> preferredSkills) { this.preferredSkills = preferredSkills; return this; }
        public JobBuilder status(JobStatus status) { this.status = status; return this; }
        public JobBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public JobBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Job build() {
            return new Job(id, title, description, company, recruiter, location, salaryRange, jobType, minCgpa, requiredExperienceYears, deadline, requiredSkills, preferredSkills, status, createdAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }

    public Recruiter getRecruiter() { return recruiter; }
    public void setRecruiter(Recruiter recruiter) { this.recruiter = recruiter; }

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

    public JobStatus getStatus() { return status; }
    public void setStatus(JobStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
