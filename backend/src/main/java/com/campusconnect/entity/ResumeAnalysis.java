package com.campusconnect.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "resume_analysis")
public class ResumeAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private Double score;

    @Column(columnDefinition = "TEXT")
    private String extractedSkills;

    @Column(columnDefinition = "TEXT")
    private String missingSkills;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @CreationTimestamp
    private LocalDateTime analyzedAt;

    public ResumeAnalysis() {}

    public ResumeAnalysis(Long id, Student student, Double score, String extractedSkills, String missingSkills, String summary, LocalDateTime analyzedAt) {
        this.id = id;
        this.student = student;
        this.score = score;
        this.extractedSkills = extractedSkills;
        this.missingSkills = missingSkills;
        this.summary = summary;
        this.analyzedAt = analyzedAt;
    }

    public static ResumeAnalysisBuilder builder() {
        return new ResumeAnalysisBuilder();
    }

    public static class ResumeAnalysisBuilder {
        private Long id;
        private Student student;
        private Double score;
        private String extractedSkills;
        private String missingSkills;
        private String summary;
        private LocalDateTime analyzedAt;

        public ResumeAnalysisBuilder id(Long id) { this.id = id; return this; }
        public ResumeAnalysisBuilder student(Student student) { this.student = student; return this; }
        public ResumeAnalysisBuilder score(Double score) { this.score = score; return this; }
        public ResumeAnalysisBuilder extractedSkills(String extractedSkills) { this.extractedSkills = extractedSkills; return this; }
        public ResumeAnalysisBuilder missingSkills(String missingSkills) { this.missingSkills = missingSkills; return this; }
        public ResumeAnalysisBuilder summary(String summary) { this.summary = summary; return this; }
        public ResumeAnalysisBuilder analyzedAt(LocalDateTime analyzedAt) { this.analyzedAt = analyzedAt; return this; }

        public ResumeAnalysis build() {
            return new ResumeAnalysis(id, student, score, extractedSkills, missingSkills, summary, analyzedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }

    public String getExtractedSkills() { return extractedSkills; }
    public void setExtractedSkills(String extractedSkills) { this.extractedSkills = extractedSkills; }

    public String getMissingSkills() { return missingSkills; }
    public void setMissingSkills(String missingSkills) { this.missingSkills = missingSkills; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public LocalDateTime getAnalyzedAt() { return analyzedAt; }
    public void setAnalyzedAt(LocalDateTime analyzedAt) { this.analyzedAt = analyzedAt; }
}
