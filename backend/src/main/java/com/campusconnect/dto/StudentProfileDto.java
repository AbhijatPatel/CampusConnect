package com.campusconnect.dto;

import java.util.List;

public class StudentProfileDto {
    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private Double cgpa;
    private String university;
    private String branch;
    private Integer passoutYear;
    private String location;
    private String bio;
    private String resumeUrl;
    private String resumeText;
    private Integer profileCompleteness;
    private List<StudentSkillDto> skills;
    private List<EducationDto> educationList;
    private List<ProjectDto> projects;
    private List<ExperienceDto> experiences;
    private List<CertificationDto> certifications;

    public StudentProfileDto() {}

    public StudentProfileDto(Long id, Long userId, String fullName, String email, String phone, Double cgpa, String university, String branch, Integer passoutYear, String location, String bio, String resumeUrl, String resumeText, Integer profileCompleteness, List<StudentSkillDto> skills, List<EducationDto> educationList, List<ProjectDto> projects, List<ExperienceDto> experiences, List<CertificationDto> certifications) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.cgpa = cgpa;
        this.university = university;
        this.branch = branch;
        this.passoutYear = passoutYear;
        this.location = location;
        this.bio = bio;
        this.resumeUrl = resumeUrl;
        this.resumeText = resumeText;
        this.profileCompleteness = profileCompleteness;
        this.skills = skills;
        this.educationList = educationList;
        this.projects = projects;
        this.experiences = experiences;
        this.certifications = certifications;
    }

    public static StudentProfileDtoBuilder builder() {
        return new StudentProfileDtoBuilder();
    }

    public static class StudentProfileDtoBuilder {
        private Long id;
        private Long userId;
        private String fullName;
        private String email;
        private String phone;
        private Double cgpa;
        private String university;
        private String branch;
        private Integer passoutYear;
        private String location;
        private String bio;
        private String resumeUrl;
        private String resumeText;
        private Integer profileCompleteness;
        private List<StudentSkillDto> skills;
        private List<EducationDto> educationList;
        private List<ProjectDto> projects;
        private List<ExperienceDto> experiences;
        private List<CertificationDto> certifications;

        public StudentProfileDtoBuilder id(Long id) { this.id = id; return this; }
        public StudentProfileDtoBuilder userId(Long userId) { this.userId = userId; return this; }
        public StudentProfileDtoBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public StudentProfileDtoBuilder email(String email) { this.email = email; return this; }
        public StudentProfileDtoBuilder phone(String phone) { this.phone = phone; return this; }
        public StudentProfileDtoBuilder cgpa(Double cgpa) { this.cgpa = cgpa; return this; }
        public StudentProfileDtoBuilder university(String university) { this.university = university; return this; }
        public StudentProfileDtoBuilder branch(String branch) { this.branch = branch; return this; }
        public StudentProfileDtoBuilder passoutYear(Integer passoutYear) { this.passoutYear = passoutYear; return this; }
        public StudentProfileDtoBuilder location(String location) { this.location = location; return this; }
        public StudentProfileDtoBuilder bio(String bio) { this.bio = bio; return this; }
        public StudentProfileDtoBuilder resumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; return this; }
        public StudentProfileDtoBuilder resumeText(String resumeText) { this.resumeText = resumeText; return this; }
        public StudentProfileDtoBuilder profileCompleteness(Integer profileCompleteness) { this.profileCompleteness = profileCompleteness; return this; }
        public StudentProfileDtoBuilder skills(List<StudentSkillDto> skills) { this.skills = skills; return this; }
        public StudentProfileDtoBuilder educationList(List<EducationDto> educationList) { this.educationList = educationList; return this; }
        public StudentProfileDtoBuilder projects(List<ProjectDto> projects) { this.projects = projects; return this; }
        public StudentProfileDtoBuilder experiences(List<ExperienceDto> experiences) { this.experiences = experiences; return this; }
        public StudentProfileDtoBuilder certifications(List<CertificationDto> certifications) { this.certifications = certifications; return this; }

        public StudentProfileDto build() {
            return new StudentProfileDto(id, userId, fullName, email, phone, cgpa, university, branch, passoutYear, location, bio, resumeUrl, resumeText, profileCompleteness, skills, educationList, projects, experiences, certifications);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

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

    public List<StudentSkillDto> getSkills() { return skills; }
    public void setSkills(List<StudentSkillDto> skills) { this.skills = skills; }

    public List<EducationDto> getEducationList() { return educationList; }
    public void setEducationList(List<EducationDto> educationList) { this.educationList = educationList; }

    public List<ProjectDto> getProjects() { return projects; }
    public void setProjects(List<ProjectDto> projects) { this.projects = projects; }

    public List<ExperienceDto> getExperiences() { return experiences; }
    public void setExperiences(List<ExperienceDto> experiences) { this.experiences = experiences; }

    public List<CertificationDto> getCertifications() { return certifications; }
    public void setCertifications(List<CertificationDto> certifications) { this.certifications = certifications; }

}