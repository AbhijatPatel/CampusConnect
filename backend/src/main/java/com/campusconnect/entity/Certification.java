package com.campusconnect.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "certifications")
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;

    private String name;
    private String issuingOrganization;
    private String issueDate;
    private String credentialUrl;

    public Certification() {}

    public Certification(Long id, Student student, String name, String issuingOrganization, String issueDate, String credentialUrl) {
        this.id = id;
        this.student = student;
        this.name = name;
        this.issuingOrganization = issuingOrganization;
        this.issueDate = issueDate;
        this.credentialUrl = credentialUrl;
    }

    public static CertificationBuilder builder() {
        return new CertificationBuilder();
    }

    public static class CertificationBuilder {
        private Long id;
        private Student student;
        private String name;
        private String issuingOrganization;
        private String issueDate;
        private String credentialUrl;

        public CertificationBuilder id(Long id) { this.id = id; return this; }
        public CertificationBuilder student(Student student) { this.student = student; return this; }
        public CertificationBuilder name(String name) { this.name = name; return this; }
        public CertificationBuilder issuingOrganization(String issuingOrganization) { this.issuingOrganization = issuingOrganization; return this; }
        public CertificationBuilder issueDate(String issueDate) { this.issueDate = issueDate; return this; }
        public CertificationBuilder credentialUrl(String credentialUrl) { this.credentialUrl = credentialUrl; return this; }

        public Certification build() {
            return new Certification(id, student, name, issuingOrganization, issueDate, credentialUrl);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIssuingOrganization() { return issuingOrganization; }
    public void setIssuingOrganization(String issuingOrganization) { this.issuingOrganization = issuingOrganization; }

    public String getIssueDate() { return issueDate; }
    public void setIssueDate(String issueDate) { this.issueDate = issueDate; }

    public String getCredentialUrl() { return credentialUrl; }
    public void setCredentialUrl(String credentialUrl) { this.credentialUrl = credentialUrl; }
}
