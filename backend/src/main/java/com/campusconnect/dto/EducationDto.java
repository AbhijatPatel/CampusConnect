package com.campusconnect.dto;


public class EducationDto {
    private Long id;
    private String degree;
    private String institution;
    private String fieldOfStudy;
    private Integer startYear;
    private Integer endYear;
    private Double score;

    public EducationDto() {}

    public EducationDto(Long id, String degree, String institution, String fieldOfStudy, Integer startYear, Integer endYear, Double score) {
        this.id = id;
        this.degree = degree;
        this.institution = institution;
        this.fieldOfStudy = fieldOfStudy;
        this.startYear = startYear;
        this.endYear = endYear;
        this.score = score;
    }

    public static EducationDtoBuilder builder() {
        return new EducationDtoBuilder();
    }

    public static class EducationDtoBuilder {
        private Long id;
        private String degree;
        private String institution;
        private String fieldOfStudy;
        private Integer startYear;
        private Integer endYear;
        private Double score;

        public EducationDtoBuilder id(Long id) { this.id = id; return this; }
        public EducationDtoBuilder degree(String degree) { this.degree = degree; return this; }
        public EducationDtoBuilder institution(String institution) { this.institution = institution; return this; }
        public EducationDtoBuilder fieldOfStudy(String fieldOfStudy) { this.fieldOfStudy = fieldOfStudy; return this; }
        public EducationDtoBuilder startYear(Integer startYear) { this.startYear = startYear; return this; }
        public EducationDtoBuilder endYear(Integer endYear) { this.endYear = endYear; return this; }
        public EducationDtoBuilder score(Double score) { this.score = score; return this; }

        public EducationDto build() {
            return new EducationDto(id, degree, institution, fieldOfStudy, startYear, endYear, score);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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