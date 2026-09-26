package com.campusconnect.dto;


public class ApplicationDto {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private String companyName;
    private String location;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private String studentBranch;
    private Double studentCgpa;
    private String status;
    private Double overallScore;
    private Double skillMatchScore;
    private Double nlpMatchScore;
    private String rankingExplanation;
    private String appliedAt;

    public ApplicationDto() {}

    public ApplicationDto(Long id, Long jobId, String jobTitle, String companyName, String location, Long studentId, String studentName, String studentEmail, String studentBranch, Double studentCgpa, String status, Double overallScore, Double skillMatchScore, Double nlpMatchScore, String rankingExplanation, String appliedAt) {
        this.id = id;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.location = location;
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.studentBranch = studentBranch;
        this.studentCgpa = studentCgpa;
        this.status = status;
        this.overallScore = overallScore;
        this.skillMatchScore = skillMatchScore;
        this.nlpMatchScore = nlpMatchScore;
        this.rankingExplanation = rankingExplanation;
        this.appliedAt = appliedAt;
    }

    public static ApplicationDtoBuilder builder() {
        return new ApplicationDtoBuilder();
    }

    public static class ApplicationDtoBuilder {
        private Long id;
        private Long jobId;
        private String jobTitle;
        private String companyName;
        private String location;
        private Long studentId;
        private String studentName;
        private String studentEmail;
        private String studentBranch;
        private Double studentCgpa;
        private String status;
        private Double overallScore;
        private Double skillMatchScore;
        private Double nlpMatchScore;
        private String rankingExplanation;
        private String appliedAt;

        public ApplicationDtoBuilder id(Long id) { this.id = id; return this; }
        public ApplicationDtoBuilder jobId(Long jobId) { this.jobId = jobId; return this; }
        public ApplicationDtoBuilder jobTitle(String jobTitle) { this.jobTitle = jobTitle; return this; }
        public ApplicationDtoBuilder companyName(String companyName) { this.companyName = companyName; return this; }
        public ApplicationDtoBuilder location(String location) { this.location = location; return this; }
        public ApplicationDtoBuilder studentId(Long studentId) { this.studentId = studentId; return this; }
        public ApplicationDtoBuilder studentName(String studentName) { this.studentName = studentName; return this; }
        public ApplicationDtoBuilder studentEmail(String studentEmail) { this.studentEmail = studentEmail; return this; }
        public ApplicationDtoBuilder studentBranch(String studentBranch) { this.studentBranch = studentBranch; return this; }
        public ApplicationDtoBuilder studentCgpa(Double studentCgpa) { this.studentCgpa = studentCgpa; return this; }
        public ApplicationDtoBuilder status(String status) { this.status = status; return this; }
        public ApplicationDtoBuilder overallScore(Double overallScore) { this.overallScore = overallScore; return this; }
        public ApplicationDtoBuilder skillMatchScore(Double skillMatchScore) { this.skillMatchScore = skillMatchScore; return this; }
        public ApplicationDtoBuilder nlpMatchScore(Double nlpMatchScore) { this.nlpMatchScore = nlpMatchScore; return this; }
        public ApplicationDtoBuilder rankingExplanation(String rankingExplanation) { this.rankingExplanation = rankingExplanation; return this; }
        public ApplicationDtoBuilder appliedAt(String appliedAt) { this.appliedAt = appliedAt; return this; }

        public ApplicationDto build() {
            return new ApplicationDto(id, jobId, jobTitle, companyName, location, studentId, studentName, studentEmail, studentBranch, studentCgpa, status, overallScore, skillMatchScore, nlpMatchScore, rankingExplanation, appliedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public String getStudentBranch() { return studentBranch; }
    public void setStudentBranch(String studentBranch) { this.studentBranch = studentBranch; }

    public Double getStudentCgpa() { return studentCgpa; }
    public void setStudentCgpa(Double studentCgpa) { this.studentCgpa = studentCgpa; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getOverallScore() { return overallScore; }
    public void setOverallScore(Double overallScore) { this.overallScore = overallScore; }

    public Double getSkillMatchScore() { return skillMatchScore; }
    public void setSkillMatchScore(Double skillMatchScore) { this.skillMatchScore = skillMatchScore; }

    public Double getNlpMatchScore() { return nlpMatchScore; }
    public void setNlpMatchScore(Double nlpMatchScore) { this.nlpMatchScore = nlpMatchScore; }

    public String getRankingExplanation() { return rankingExplanation; }
    public void setRankingExplanation(String rankingExplanation) { this.rankingExplanation = rankingExplanation; }

    public String getAppliedAt() { return appliedAt; }
    public void setAppliedAt(String appliedAt) { this.appliedAt = appliedAt; }

}