package com.campusconnect.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;

    private String degree;
    private String institution;
    private String fieldOfStudy;
    private Integer startYear;
    private Integer endYear;
    private Double score;

    public Education() {}

    public Education(Long id, Student student, String degree, String institution, String fieldOfStudy, Integer startYear, Integer endYear, Double score) {
        this.id = id;
        this.student = student;
        this.degree = degree;
        this.institution = institution;
        this.fieldOfStudy = fieldOfStudy;
        this.startYear = startYear;
        this.endYear = endYear;
        this.score = score;
    }

    public static EducationBuilder builder() {
        return new EducationBuilder();
    }

    public static class EducationBuilder {
        private Long id;
        private Student student;
        private String degree;
        private String institution;
        private String fieldOfStudy;
        private Integer startYear;
        private Integer endYear;
        private Double score;

        public EducationBuilder id(Long id) { this.id = id; return this; }
        public EducationBuilder student(Student student) { this.student = student; return this; }
        public EducationBuilder degree(String degree) { this.degree = degree; return this; }
        public EducationBuilder institution(String institution) { this.institution = institution; return this; }
        public EducationBuilder fieldOfStudy(String fieldOfStudy) { this.fieldOfStudy = fieldOfStudy; return this; }
        public EducationBuilder startYear(Integer startYear) { this.startYear = startYear; return this; }
        public EducationBuilder endYear(Integer endYear) { this.endYear = endYear; return this; }
        public EducationBuilder score(Double score) { this.score = score; return this; }

        public Education build() {
            return new Education(id, student, degree, institution, fieldOfStudy, startYear, endYear, score);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }

    public String getFieldOfStudy() { return fieldOfStudy; }
    public void setFieldOfStudy(String fieldOfStudy) { this.fieldOfStudy = fieldOfStudy; }

    public Integer getStartYear() { return startYear; }
    public void setStartYear(Integer startYear) { this.startYear = startYear; }

    public Integer getEndYear() { return endYear; }
    public void setEndYear(Integer endYear) { this.endYear = endYear; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
}
