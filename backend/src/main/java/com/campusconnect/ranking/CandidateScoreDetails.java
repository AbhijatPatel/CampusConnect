package com.campusconnect.ranking;

import java.util.List;

public class CandidateScoreDetails {
    private Long candidateId;
    private Long studentId;
    private Long applicationId;
    private String candidateName;
    private String email;
    private String branch;
    private Double cgpa;
    private Double experienceYears;
    private Integer projectCount;
    private Double overallScore;

    private Double skillMatchScore;
    private Double nlpMatchScore;
    private Double experienceScore;
    private Double cgpaScore;
    private Double projectScore;
    private Double eligibilityScore;

    private List<String> matchingSkills;
    private List<String> missingSkills;
    private String rankingExplanation;
    private Integer rank;
    private String applicationStatus;

    public CandidateScoreDetails() {}

    public CandidateScoreDetails(Long candidateId, Long studentId, Long applicationId, String candidateName, String email, String branch, Double cgpa, Double experienceYears, Integer projectCount, Double overallScore, Double skillMatchScore, Double nlpMatchScore, Double experienceScore, Double cgpaScore, Double projectScore, Double eligibilityScore, List<String> matchingSkills, List<String> missingSkills, String rankingExplanation, Integer rank, String applicationStatus) {
        this.candidateId = candidateId;
        this.studentId = studentId;
        this.applicationId = applicationId;
        this.candidateName = candidateName;
        this.email = email;
        this.branch = branch;
        this.cgpa = cgpa;
        this.experienceYears = experienceYears;
        this.projectCount = projectCount;
        this.overallScore = overallScore;
        this.skillMatchScore = skillMatchScore;
        this.nlpMatchScore = nlpMatchScore;
        this.experienceScore = experienceScore;
        this.cgpaScore = cgpaScore;
        this.projectScore = projectScore;
        this.eligibilityScore = eligibilityScore;
        this.matchingSkills = matchingSkills;
        this.missingSkills = missingSkills;
        this.rankingExplanation = rankingExplanation;
        this.rank = rank;
        this.applicationStatus = applicationStatus;
    }

    public static CandidateScoreDetailsBuilder builder() {
        return new CandidateScoreDetailsBuilder();
    }

    public static class CandidateScoreDetailsBuilder {
        private Long candidateId;
        private Long studentId;
        private Long applicationId;
        private String candidateName;
        private String email;
        private String branch;
        private Double cgpa;
        private Double experienceYears;
        private Integer projectCount;
        private Double overallScore;
        private Double skillMatchScore;
        private Double nlpMatchScore;
        private Double experienceScore;
        private Double cgpaScore;
        private Double projectScore;
        private Double eligibilityScore;
        private List<String> matchingSkills;
        private List<String> missingSkills;
        private String rankingExplanation;
        private Integer rank;
        private String applicationStatus;

        public CandidateScoreDetailsBuilder candidateId(Long candidateId) { this.candidateId = candidateId; return this; }
        public CandidateScoreDetailsBuilder studentId(Long studentId) { this.studentId = studentId; return this; }
        public CandidateScoreDetailsBuilder applicationId(Long applicationId) { this.applicationId = applicationId; return this; }
        public CandidateScoreDetailsBuilder candidateName(String candidateName) { this.candidateName = candidateName; return this; }
        public CandidateScoreDetailsBuilder email(String email) { this.email = email; return this; }
        public CandidateScoreDetailsBuilder branch(String branch) { this.branch = branch; return this; }
        public CandidateScoreDetailsBuilder cgpa(Double cgpa) { this.cgpa = cgpa; return this; }
        public CandidateScoreDetailsBuilder experienceYears(Double experienceYears) { this.experienceYears = experienceYears; return this; }
        public CandidateScoreDetailsBuilder projectCount(Integer projectCount) { this.projectCount = projectCount; return this; }
        public CandidateScoreDetailsBuilder overallScore(Double overallScore) { this.overallScore = overallScore; return this; }
        public CandidateScoreDetailsBuilder skillMatchScore(Double skillMatchScore) { this.skillMatchScore = skillMatchScore; return this; }
        public CandidateScoreDetailsBuilder nlpMatchScore(Double nlpMatchScore) { this.nlpMatchScore = nlpMatchScore; return this; }
        public CandidateScoreDetailsBuilder experienceScore(Double experienceScore) { this.experienceScore = experienceScore; return this; }
        public CandidateScoreDetailsBuilder cgpaScore(Double cgpaScore) { this.cgpaScore = cgpaScore; return this; }
        public CandidateScoreDetailsBuilder projectScore(Double projectScore) { this.projectScore = projectScore; return this; }
        public CandidateScoreDetailsBuilder eligibilityScore(Double eligibilityScore) { this.eligibilityScore = eligibilityScore; return this; }
        public CandidateScoreDetailsBuilder matchingSkills(List<String> matchingSkills) { this.matchingSkills = matchingSkills; return this; }
        public CandidateScoreDetailsBuilder missingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; return this; }
        public CandidateScoreDetailsBuilder rankingExplanation(String rankingExplanation) { this.rankingExplanation = rankingExplanation; return this; }
        public CandidateScoreDetailsBuilder rank(Integer rank) { this.rank = rank; return this; }
        public CandidateScoreDetailsBuilder applicationStatus(String applicationStatus) { this.applicationStatus = applicationStatus; return this; }

        public CandidateScoreDetails build() {
            return new CandidateScoreDetails(candidateId, studentId, applicationId, candidateName, email, branch, cgpa, experienceYears, projectCount, overallScore, skillMatchScore, nlpMatchScore, experienceScore, cgpaScore, projectScore, eligibilityScore, matchingSkills, missingSkills, rankingExplanation, rank, applicationStatus);
        }
    }

    public Long getCandidateId() { return candidateId; }
    public void setCandidateId(Long candidateId) { this.candidateId = candidateId; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }

    public String getCandidateName() { return candidateName; }
    public void setCandidateName(String candidateName) { this.candidateName = candidateName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public Double getCgpa() { return cgpa; }
    public void setCgpa(Double cgpa) { this.cgpa = cgpa; }

    public Double getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Double experienceYears) { this.experienceYears = experienceYears; }

    public Integer getProjectCount() { return projectCount; }
    public void setProjectCount(Integer projectCount) { this.projectCount = projectCount; }

    public Double getOverallScore() { return overallScore; }
    public void setOverallScore(Double overallScore) { this.overallScore = overallScore; }

    public Double getSkillMatchScore() { return skillMatchScore; }
    public void setSkillMatchScore(Double skillMatchScore) { this.skillMatchScore = skillMatchScore; }

    public Double getNlpMatchScore() { return nlpMatchScore; }
    public void setNlpMatchScore(Double nlpMatchScore) { this.nlpMatchScore = nlpMatchScore; }

    public Double getExperienceScore() { return experienceScore; }
    public void setExperienceScore(Double experienceScore) { this.experienceScore = experienceScore; }

    public Double getCgpaScore() { return cgpaScore; }
    public void setCgpaScore(Double cgpaScore) { this.cgpaScore = cgpaScore; }

    public Double getProjectScore() { return projectScore; }
    public void setProjectScore(Double projectScore) { this.projectScore = projectScore; }

    public Double getEligibilityScore() { return eligibilityScore; }
    public void setEligibilityScore(Double eligibilityScore) { this.eligibilityScore = eligibilityScore; }

    public List<String> getMatchingSkills() { return matchingSkills; }
    public void setMatchingSkills(List<String> matchingSkills) { this.matchingSkills = matchingSkills; }

    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }

    public String getRankingExplanation() { return rankingExplanation; }
    public void setRankingExplanation(String rankingExplanation) { this.rankingExplanation = rankingExplanation; }

    public Integer getRank() { return rank; }
    public void setRank(Integer rank) { this.rank = rank; }

    public String getApplicationStatus() { return applicationStatus; }
    public void setApplicationStatus(String applicationStatus) { this.applicationStatus = applicationStatus; }
}
