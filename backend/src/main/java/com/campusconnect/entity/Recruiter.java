package com.campusconnect.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "recruiters")
public class Recruiter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    private String designation;
    private String department;

    public Recruiter() {}

    public Recruiter(Long id, User user, Company company, String designation, String department) {
        this.id = id;
        this.user = user;
        this.company = company;
        this.designation = designation;
        this.department = department;
    }

    public static RecruiterBuilder builder() {
        return new RecruiterBuilder();
    }

    public static class RecruiterBuilder {
        private Long id;
        private User user;
        private Company company;
        private String designation;
        private String department;

        public RecruiterBuilder id(Long id) { this.id = id; return this; }
        public RecruiterBuilder user(User user) { this.user = user; return this; }
        public RecruiterBuilder company(Company company) { this.company = company; return this; }
        public RecruiterBuilder designation(String designation) { this.designation = designation; return this; }
        public RecruiterBuilder department(String department) { this.department = department; return this; }

        public Recruiter build() {
            return new Recruiter(id, user, company, designation, department);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
