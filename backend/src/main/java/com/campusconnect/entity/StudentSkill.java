package com.campusconnect.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "student_skills")
public class StudentSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;

    @Column(nullable = false)
    private String skillName;

    private String proficiencyLevel;
    private Double yearsOfExperience;

    public StudentSkill() {}

    public StudentSkill(Long id, Student student, String skillName, String proficiencyLevel, Double yearsOfExperience) {
        this.id = id;
        this.student = student;
        this.skillName = skillName;
        this.proficiencyLevel = proficiencyLevel;
        this.yearsOfExperience = yearsOfExperience;
    }

    public static StudentSkillBuilder builder() {
        return new StudentSkillBuilder();
    }

    public static class StudentSkillBuilder {
        private Long id;
        private Student student;
        private String skillName;
        private String proficiencyLevel;
        private Double yearsOfExperience;

        public StudentSkillBuilder id(Long id) { this.id = id; return this; }
        public StudentSkillBuilder student(Student student) { this.student = student; return this; }
        public StudentSkillBuilder skillName(String skillName) { this.skillName = skillName; return this; }
        public StudentSkillBuilder proficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; return this; }
        public StudentSkillBuilder yearsOfExperience(Double yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; return this; }

        public StudentSkill build() {
            return new StudentSkill(id, student, skillName, proficiencyLevel, yearsOfExperience);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    public Double getYearsOfExperience() { return yearsOfExperience; }
    public void setYearsOfExperience(Double yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; }
}
