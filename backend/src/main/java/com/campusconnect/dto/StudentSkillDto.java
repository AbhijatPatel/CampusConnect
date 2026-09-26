package com.campusconnect.dto;


public class StudentSkillDto {
    private Long id;
    private String skillName;
    private String proficiencyLevel;
    private Double yearsOfExperience;

    public StudentSkillDto() {}

    public StudentSkillDto(Long id, String skillName, String proficiencyLevel, Double yearsOfExperience) {
        this.id = id;
        this.skillName = skillName;
        this.proficiencyLevel = proficiencyLevel;
        this.yearsOfExperience = yearsOfExperience;
    }

    public static StudentSkillDtoBuilder builder() {
        return new StudentSkillDtoBuilder();
    }

    public static class StudentSkillDtoBuilder {
        private Long id;
        private String skillName;
        private String proficiencyLevel;
        private Double yearsOfExperience;

        public StudentSkillDtoBuilder id(Long id) { this.id = id; return this; }
        public StudentSkillDtoBuilder skillName(String skillName) { this.skillName = skillName; return this; }
        public StudentSkillDtoBuilder proficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; return this; }
        public StudentSkillDtoBuilder yearsOfExperience(Double yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; return this; }

        public StudentSkillDto build() {
            return new StudentSkillDto(id, skillName, proficiencyLevel, yearsOfExperience);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    public Double getYearsOfExperience() { return yearsOfExperience; }
    public void setYearsOfExperience(Double yearsOfExperience) { this.yearsOfExperience = yearsOfExperience; }

}