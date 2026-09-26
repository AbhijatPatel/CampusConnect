package com.campusconnect.dto;


public class JwtAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private Long id;
    private String email;
    private String fullName;
    private String role;
    private Long studentId;
    private Long recruiterId;

    public JwtAuthResponse() {}

    public JwtAuthResponse(String accessToken, String tokenType, Long id, String email, String fullName, String role, Long studentId, Long recruiterId) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.studentId = studentId;
        this.recruiterId = recruiterId;
    }

    public static JwtAuthResponseBuilder builder() {
        return new JwtAuthResponseBuilder();
    }

    public static class JwtAuthResponseBuilder {
        private String accessToken;
        private String tokenType = "Bearer";
        private Long id;
        private String email;
        private String fullName;
        private String role;
        private Long studentId;
        private Long recruiterId;

        public JwtAuthResponseBuilder accessToken(String accessToken) { this.accessToken = accessToken; return this; }
        public JwtAuthResponseBuilder tokenType(String tokenType) { this.tokenType = tokenType; return this; }
        public JwtAuthResponseBuilder id(Long id) { this.id = id; return this; }
        public JwtAuthResponseBuilder email(String email) { this.email = email; return this; }
        public JwtAuthResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public JwtAuthResponseBuilder role(String role) { this.role = role; return this; }
        public JwtAuthResponseBuilder studentId(Long studentId) { this.studentId = studentId; return this; }
        public JwtAuthResponseBuilder recruiterId(Long recruiterId) { this.recruiterId = recruiterId; return this; }

        public JwtAuthResponse build() {
            return new JwtAuthResponse(accessToken, tokenType, id, email, fullName, role, studentId, recruiterId);
        }
    }

    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getRecruiterId() { return recruiterId; }
    public void setRecruiterId(Long recruiterId) { this.recruiterId = recruiterId; }

}