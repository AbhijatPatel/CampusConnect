package com.campusconnect.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String website;
    private String location;
    private String logoUrl;
    private String industry;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public Company() {}

    public Company(Long id, String name, String description, String website, String location, String logoUrl, String industry, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.website = website;
        this.location = location;
        this.logoUrl = logoUrl;
        this.industry = industry;
        this.createdAt = createdAt;
    }

    public static CompanyBuilder builder() {
        return new CompanyBuilder();
    }

    public static class CompanyBuilder {
        private Long id;
        private String name;
        private String description;
        private String website;
        private String location;
        private String logoUrl;
        private String industry;
        private LocalDateTime createdAt;

        public CompanyBuilder id(Long id) { this.id = id; return this; }
        public CompanyBuilder name(String name) { this.name = name; return this; }
        public CompanyBuilder description(String description) { this.description = description; return this; }
        public CompanyBuilder website(String website) { this.website = website; return this; }
        public CompanyBuilder location(String location) { this.location = location; return this; }
        public CompanyBuilder logoUrl(String logoUrl) { this.logoUrl = logoUrl; return this; }
        public CompanyBuilder industry(String industry) { this.industry = industry; return this; }
        public CompanyBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Company build() {
            return new Company(id, name, description, website, location, logoUrl, industry, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
