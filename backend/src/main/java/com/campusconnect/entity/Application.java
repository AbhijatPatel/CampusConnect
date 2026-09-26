package com.campusconnect.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"job_id", "student_id"})
})
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.APPLIED;

    private Double overallScore;
    private Double skillMatchScore;
    private Double nlpMatchScore;
    private Double experienceScore;
    private Double cgpaScore;

    @Column(columnDefinition = "TEXT")
    private String rankingExplanation;

    @CreationTimestamp
    private LocalDateTime appliedAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Application() {}

    public Application(Long id, Job job, Student student, ApplicationStatus status, Double overallScore, Double skillMatchScore, Double nlpMatchScore, Double experienceScore, Double cgpaScore, String rankingExplanation, LocalDateTime appliedAt, LocalDateTime updatedAt) {
        this.id = id;
        this.job = job;
        this.student = student;
        this.status = status != null ? status : ApplicationStatus.APPLIED;
        this.overallScore = overallScore;
        this.skillMatchScore = skillMatchScore;
        this.nlpMatchScore = nlpMatchScore;
        this.experienceScore = experienceScore;
        this.cgpaScore = cgpaScore;
        this.rankingExplanation = rankingExplanation;
        this.appliedAt = appliedAt;
        this.updatedAt = updatedAt;
    }

    public static ApplicationBuilder builder() {
        return new ApplicationBuilder();
    }

    public static class ApplicationBuilder {
        private Long id;
        private Job job;
        private Student student;
        private ApplicationStatus status = ApplicationStatus.APPLIED;
        private Double overallScore;
        private Double skillMatchScore;
        private Double nlpMatchScore;
        private Double experienceScore;
        private Double cgpaScore;
        private String rankingExplanation;
        private LocalDateTime appliedAt;
        private LocalDateTime updatedAt;

        public ApplicationBuilder id(Long id) { this.id = id; return this; }
        public ApplicationBuilder job(Job job) { this.job = job; return this; }
        public ApplicationBuilder student(Student student) { this.student = student; return this; }
        public ApplicationBuilder status(ApplicationStatus status) { this.status = status; return this; }
        public ApplicationBuilder overallScore(Double overallScore) { this.overallScore = overallScore; return this; }
        public ApplicationBuilder skillMatchScore(Double skillMatchScore) { this.skillMatchScore = skillMatchScore; return this; }
        public ApplicationBuilder nlpMatchScore(Double nlpMatchScore) { this.nlpMatchScore = nlpMatchScore; return this; }
        public ApplicationBuilder experienceScore(Double experienceScore) { this.experienceScore = experienceScore; return this; }
        public ApplicationBuilder cgpaScore(Double cgpaScore) { this.cgpaScore = cgpaScore; return this; }
        public ApplicationBuilder rankingExplanation(String rankingExplanation) { this.rankingExplanation = rankingExplanation; return this; }
        public ApplicationBuilder appliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; return this; }
        public ApplicationBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Application build() {
            return new Application(id, job, student, status, overallScore, skillMatchScore, nlpMatchScore, experienceScore, cgpaScore, rankingExplanation, appliedAt, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }

    public Double getOverallScore() { return overallScore; }
    public void setOverallScore(Double overallScore) { this.overallScore = overallScore; }

    public Double getSkillMatchScore() { return skillMatchScore; }
    public void setSkillMatchScore(Double skillMatchScore) { this.skillMatchScore = skillMatchScore; }

    public Double getNlpMatchScore() { return nlpMatchScore; }
    public void setNlpMatchScore(Double nlpMatchScore) { this.nlpMatchScore = nlpMatchScore; }

    public Double getExperienceScore() { return experienceScore; }
    public void setExperienceScore(Double experienceScore) { this.experienceScore = experienceScore; }

    public Double getCgpaScore() { return cgpaScore; }
    public void setCgpaScore(Double cgpaScore) { this.cgpaScore = cgpaScore; }

    public String getRankingExplanation() { return rankingExplanation; }
    public void setRankingExplanation(String rankingExplanation) { this.rankingExplanation = rankingExplanation; }

    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
