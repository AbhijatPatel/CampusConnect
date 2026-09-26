package com.campusconnect.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Student student;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String techStack;
    private String projectUrl;
    private String githubUrl;

    public Project() {}

    public Project(Long id, Student student, String title, String description, String techStack, String projectUrl, String githubUrl) {
        this.id = id;
        this.student = student;
        this.title = title;
        this.description = description;
        this.techStack = techStack;
        this.projectUrl = projectUrl;
        this.githubUrl = githubUrl;
    }

    public static ProjectBuilder builder() {
        return new ProjectBuilder();
    }

    public static class ProjectBuilder {
        private Long id;
        private Student student;
        private String title;
        private String description;
        private String techStack;
        private String projectUrl;
        private String githubUrl;

        public ProjectBuilder id(Long id) { this.id = id; return this; }
        public ProjectBuilder student(Student student) { this.student = student; return this; }
        public ProjectBuilder title(String title) { this.title = title; return this; }
        public ProjectBuilder description(String description) { this.description = description; return this; }
        public ProjectBuilder techStack(String techStack) { this.techStack = techStack; return this; }
        public ProjectBuilder projectUrl(String projectUrl) { this.projectUrl = projectUrl; return this; }
        public ProjectBuilder githubUrl(String githubUrl) { this.githubUrl = githubUrl; return this; }

        public Project build() {
            return new Project(id, student, title, description, techStack, projectUrl, githubUrl);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTechStack() { return techStack; }
    public void setTechStack(String techStack) { this.techStack = techStack; }

    public String getProjectUrl() { return projectUrl; }
    public void setProjectUrl(String projectUrl) { this.projectUrl = projectUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
}
