package com.campusconnect.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "interviews")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    private String interviewDate;
    private String locationOrLink;
    
    @Column(columnDefinition = "TEXT")
    private String notes;

    private String status = "SCHEDULED";

    @CreationTimestamp
    private LocalDateTime createdAt;

    public Interview() {}

    public Interview(Long id, Application application, String interviewDate, String locationOrLink, String notes, String status, LocalDateTime createdAt) {
        this.id = id;
        this.application = application;
        this.interviewDate = interviewDate;
        this.locationOrLink = locationOrLink;
        this.notes = notes;
        this.status = status != null ? status : "SCHEDULED";
        this.createdAt = createdAt;
    }

    public static InterviewBuilder builder() {
        return new InterviewBuilder();
    }

    public static class InterviewBuilder {
        private Long id;
        private Application application;
        private String interviewDate;
        private String locationOrLink;
        private String notes;
        private String status = "SCHEDULED";
        private LocalDateTime createdAt;

        public InterviewBuilder id(Long id) { this.id = id; return this; }
        public InterviewBuilder application(Application application) { this.application = application; return this; }
        public InterviewBuilder interviewDate(String interviewDate) { this.interviewDate = interviewDate; return this; }
        public InterviewBuilder locationOrLink(String locationOrLink) { this.locationOrLink = locationOrLink; return this; }
        public InterviewBuilder notes(String notes) { this.notes = notes; return this; }
        public InterviewBuilder status(String status) { this.status = status; return this; }
        public InterviewBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Interview build() {
            return new Interview(id, application, interviewDate, locationOrLink, notes, status, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Application getApplication() { return application; }
    public void setApplication(Application application) { this.application = application; }

    public String getInterviewDate() { return interviewDate; }
    public void setInterviewDate(String interviewDate) { this.interviewDate = interviewDate; }

    public String getLocationOrLink() { return locationOrLink; }
    public void setLocationOrLink(String locationOrLink) { this.locationOrLink = locationOrLink; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
