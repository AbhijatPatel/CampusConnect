package com.campusconnect.dto;


public class ProjectDto {
    private Long id;
    private String title;
    private String description;
    private String techStack;
    private String projectUrl;
    private String githubUrl;

    public ProjectDto() {}

    public ProjectDto(Long id, String title, String description, String techStack, String projectUrl, String githubUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.techStack = techStack;
        this.projectUrl = projectUrl;
        this.githubUrl = githubUrl;
    }

    public static ProjectDtoBuilder builder() {
        return new ProjectDtoBuilder();
    }

    public static class ProjectDtoBuilder {
        private Long id;
        private String title;
        private String description;
        private String techStack;
        private String projectUrl;
        private String githubUrl;

        public ProjectDtoBuilder id(Long id) { this.id = id; return this; }
        public ProjectDtoBuilder title(String title) { this.title = title; return this; }
        public ProjectDtoBuilder description(String description) { this.description = description; return this; }
        public ProjectDtoBuilder techStack(String techStack) { this.techStack = techStack; return this; }
        public ProjectDtoBuilder projectUrl(String projectUrl) { this.projectUrl = projectUrl; return this; }
        public ProjectDtoBuilder githubUrl(String githubUrl) { this.githubUrl = githubUrl; return this; }

        public ProjectDto build() {
            return new ProjectDto(id, title, description, techStack, projectUrl, githubUrl);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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