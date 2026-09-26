package com.campusconnect.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    private Double cgpa;
    private String university;
    private String branch;
    private Integer passoutYear;
    private String location;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String resumeUrl;
    
    @Column(columnDefinition = "TEXT")
    private String resumeText;

    private Integer profileCompleteness = 50;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentSkill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Education> educationList = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> projects = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Experience> experiences = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Certification> certifications = new ArrayList<>();

    public Student() {}

    public Student(Long id, User user, Double cgpa, String university, String branch, Integer passoutYear, String location, String bio, String resumeUrl, String resumeText, Integer profileCompleteness, List<StudentSkill> skills, List<Education> educationList, List<Project> projects, List<Experience> experiences, List<Certification> certifications) {
        this.id = id;
        this.user = user;
        this.cgpa = cgpa;
        this.university = university;
        this.branch = branch;
        this.passoutYear = passoutYear;
        this.location = location;
        this.bio = bio;
        this.resumeUrl = resumeUrl;
        this.resumeText = resumeText;
        this.profileCompleteness = profileCompleteness != null ? profileCompleteness : 50;
        this.skills = skills != null ? skills : new ArrayList<>();
        this.educationList = educationList != null ? educationList : new ArrayList<>();
        this.projects = projects != null ? projects : new ArrayList<>();
        this.experiences = experiences != null ? experiences : new ArrayList<>();
        this.certifications = certifications != null ? certifications : new ArrayList<>();
    }

    public static StudentBuilder builder() {
        return new StudentBuilder();
    }

    public static class StudentBuilder {
        private Long id;
        private User user;
        private Double cgpa;
        private String university;
        private String branch;
        private Integer passoutYear;
        private String location;
        private String bio;
        private String resumeUrl;
        private String resumeText;
        private Integer profileCompleteness = 50;
        private List<StudentSkill> skills = new ArrayList<>();
        private List<Education> educationList = new ArrayList<>();
        private List<Project> projects = new ArrayList<>();
        private List<Experience> experiences = new ArrayList<>();
        private List<Certification> certifications = new ArrayList<>();

        public StudentBuilder id(Long id) { this.id = id; return this; }
        public StudentBuilder user(User user) { this.user = user; return this; }
        public StudentBuilder cgpa(Double cgpa) { this.cgpa = cgpa; return this; }
        public StudentBuilder university(String university) { this.university = university; return this; }
        public StudentBuilder branch(String branch) { this.branch = branch; return this; }
        public StudentBuilder passoutYear(Integer passoutYear) { this.passoutYear = passoutYear; return this; }
        public StudentBuilder location(String location) { this.location = location; return this; }
        public StudentBuilder bio(String bio) { this.bio = bio; return this; }
        public StudentBuilder resumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; return this; }
        public StudentBuilder resumeText(String resumeText) { this.resumeText = resumeText; return this; }
        public StudentBuilder profileCompleteness(Integer profileCompleteness) { this.profileCompleteness = profileCompleteness; return this; }
        public StudentBuilder skills(List<StudentSkill> skills) { this.skills = skills; return this; }
        public StudentBuilder educationList(List<Education> educationList) { this.educationList = educationList; return this; }
        public StudentBuilder projects(List<Project> projects) { this.projects = projects; return this; }
        public StudentBuilder experiences(List<Experience> experiences) { this.experiences = experiences; return this; }
        public StudentBuilder certifications(List<Certification> certifications) { this.certifications = certifications; return this; }

        public Student build() {
            return new Student(id, user, cgpa, university, branch, passoutYear, location, bio, resumeUrl, resumeText, profileCompleteness, skills, educationList, projects, experiences, certifications);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public Integer getPassoutYear() { return passoutYear; }
    public void setPassoutYear(Integer passoutYear) { this.passoutYear = passoutYear; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public String getResumeText() { return resumeText; }
    public void setResumeText(String resumeText) { this.resumeText = resumeText; }

    public Integer getProfileCompleteness() { return profileCompleteness; }
    public void setProfileCompleteness(Integer profileCompleteness) { this.profileCompleteness = profileCompleteness; }

    public List<StudentSkill> getSkills() { return skills; }
    public void setSkills(List<StudentSkill> skills) { this.skills = skills; }

    public List<Education> getEducationList() { return educationList; }
    public void setEducationList(List<Education> educationList) { this.educationList = educationList; }

    public List<Project> getProjects() { return projects; }
    public void setProjects(List<Project> projects) { this.projects = projects; }

    public List<Experience> getExperiences() { return experiences; }
    public void setExperiences(List<Experience> experiences) { this.experiences = experiences; }

    public List<Certification> getCertifications() { return certifications; }
    public void setCertifications(List<Certification> certifications) { this.certifications = certifications; }
}
