package com.campusconnect.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "experiences")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;

    private String companyName;
    private String roleTitle;
    private String startDate;
    private String endDate;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Boolean isInternship = true;
    private Double durationMonths;

    public Experience() {}

    public Experience(Long id, Student student, String companyName, String roleTitle, String startDate, String endDate, String description, Boolean isInternship, Double durationMonths) {
        this.id = id;
        this.student = student;
        this.companyName = companyName;
        this.roleTitle = roleTitle;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.isInternship = isInternship != null ? isInternship : true;
        this.durationMonths = durationMonths;
    }

    public static ExperienceBuilder builder() {
        return new ExperienceBuilder();
    }

    public static class ExperienceBuilder {
        private Long id;
        private Student student;
        private String companyName;
        private String roleTitle;
        private String startDate;
        private String endDate;
        private String description;
        private Boolean isInternship = true;
        private Double durationMonths;

        public ExperienceBuilder id(Long id) { this.id = id; return this; }
        public ExperienceBuilder student(Student student) { this.student = student; return this; }
        public ExperienceBuilder companyName(String companyName) { this.companyName = companyName; return this; }
        public ExperienceBuilder roleTitle(String roleTitle) { this.roleTitle = roleTitle; return this; }
        public ExperienceBuilder startDate(String startDate) { this.startDate = startDate; return this; }
        public ExperienceBuilder endDate(String endDate) { this.endDate = endDate; return this; }
        public ExperienceBuilder description(String description) { this.description = description; return this; }
        public ExperienceBuilder isInternship(Boolean isInternship) { this.isInternship = isInternship; return this; }
        public ExperienceBuilder durationMonths(Double durationMonths) { this.durationMonths = durationMonths; return this; }

        public Experience build() {
            return new Experience(id, student, companyName, roleTitle, startDate, endDate, description, isInternship, durationMonths);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getRoleTitle() { return roleTitle; }
    public void setRoleTitle(String roleTitle) { this.roleTitle = roleTitle; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getIsInternship() { return isInternship; }
    public void setIsInternship(Boolean isInternship) { this.isInternship = isInternship; }

    public Double getDurationMonths() { return durationMonths; }
    public void setDurationMonths(Double durationMonths) { this.durationMonths = durationMonths; }
}
