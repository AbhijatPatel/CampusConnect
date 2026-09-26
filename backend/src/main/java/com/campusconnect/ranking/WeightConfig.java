package com.campusconnect.ranking;

public class WeightConfig {
    private double skillMatchWeight = 0.40;
    private double nlpSimilarityWeight = 0.20;
    private double experienceWeight = 0.15;
    private double cgpaWeight = 0.10;
    private double projectsWeight = 0.10;
    private double eligibilityWeight = 0.05;

    public WeightConfig() {}

    public WeightConfig(double skillMatchWeight, double nlpSimilarityWeight, double experienceWeight, double cgpaWeight, double projectsWeight, double eligibilityWeight) {
        this.skillMatchWeight = skillMatchWeight;
        this.nlpSimilarityWeight = nlpSimilarityWeight;
        this.experienceWeight = experienceWeight;
        this.cgpaWeight = cgpaWeight;
        this.projectsWeight = projectsWeight;
        this.eligibilityWeight = eligibilityWeight;
    }

    public static WeightConfigBuilder builder() {
        return new WeightConfigBuilder();
    }

    public static class WeightConfigBuilder {
        private double skillMatchWeight = 0.40;
        private double nlpSimilarityWeight = 0.20;
        private double experienceWeight = 0.15;
        private double cgpaWeight = 0.10;
        private double projectsWeight = 0.10;
        private double eligibilityWeight = 0.05;

        public WeightConfigBuilder skillMatchWeight(double skillMatchWeight) { this.skillMatchWeight = skillMatchWeight; return this; }
        public WeightConfigBuilder nlpSimilarityWeight(double nlpSimilarityWeight) { this.nlpSimilarityWeight = nlpSimilarityWeight; return this; }
        public WeightConfigBuilder experienceWeight(double experienceWeight) { this.experienceWeight = experienceWeight; return this; }
        public WeightConfigBuilder cgpaWeight(double cgpaWeight) { this.cgpaWeight = cgpaWeight; return this; }
        public WeightConfigBuilder projectsWeight(double projectsWeight) { this.projectsWeight = projectsWeight; return this; }
        public WeightConfigBuilder eligibilityWeight(double eligibilityWeight) { this.eligibilityWeight = eligibilityWeight; return this; }

        public WeightConfig build() {
            return new WeightConfig(skillMatchWeight, nlpSimilarityWeight, experienceWeight, cgpaWeight, projectsWeight, eligibilityWeight);
        }
    }

    public double getSkillMatchWeight() { return skillMatchWeight; }
    public void setSkillMatchWeight(double skillMatchWeight) { this.skillMatchWeight = skillMatchWeight; }

    public double getNlpSimilarityWeight() { return nlpSimilarityWeight; }
    public void setNlpSimilarityWeight(double nlpSimilarityWeight) { this.nlpSimilarityWeight = nlpSimilarityWeight; }

    public double getExperienceWeight() { return experienceWeight; }
    public void setExperienceWeight(double experienceWeight) { this.experienceWeight = experienceWeight; }

    public double getCgpaWeight() { return cgpaWeight; }
    public void setCgpaWeight(double cgpaWeight) { this.cgpaWeight = cgpaWeight; }

    public double getProjectsWeight() { return projectsWeight; }
    public void setProjectsWeight(double projectsWeight) { this.projectsWeight = projectsWeight; }

    public double getEligibilityWeight() { return eligibilityWeight; }
    public void setEligibilityWeight(double eligibilityWeight) { this.eligibilityWeight = eligibilityWeight; }
}
