package com.campusconnect.dto;


public class CertificationDto {
    private Long id;
    private String name;
    private String issuingOrganization;
    private String issueDate;
    private String credentialUrl;

    public CertificationDto() {}

    public CertificationDto(Long id, String name, String issuingOrganization, String issueDate, String credentialUrl) {
        this.id = id;
        this.name = name;
        this.issuingOrganization = issuingOrganization;
        this.issueDate = issueDate;
        this.credentialUrl = credentialUrl;
    }

    public static CertificationDtoBuilder builder() {
        return new CertificationDtoBuilder();
    }

    public static class CertificationDtoBuilder {
        private Long id;
        private String name;
        private String issuingOrganization;
        private String issueDate;
        private String credentialUrl;

        public CertificationDtoBuilder id(Long id) { this.id = id; return this; }
        public CertificationDtoBuilder name(String name) { this.name = name; return this; }
        public CertificationDtoBuilder issuingOrganization(String issuingOrganization) { this.issuingOrganization = issuingOrganization; return this; }
        public CertificationDtoBuilder issueDate(String issueDate) { this.issueDate = issueDate; return this; }
        public CertificationDtoBuilder credentialUrl(String credentialUrl) { this.credentialUrl = credentialUrl; return this; }

        public CertificationDto build() {
            return new CertificationDto(id, name, issuingOrganization, issueDate, credentialUrl);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIssuingOrganization() { return issuingOrganization; }
    public void setIssuingOrganization(String issuingOrganization) { this.issuingOrganization = issuingOrganization; }

    public String getIssueDate() { return issueDate; }
    public void setIssueDate(String issueDate) { this.issueDate = issueDate; }

    public String getCredentialUrl() { return credentialUrl; }
    public void setCredentialUrl(String credentialUrl) { this.credentialUrl = credentialUrl; }

}