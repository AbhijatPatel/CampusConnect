package com.campusconnect.util;

import com.campusconnect.entity.*;
import com.campusconnect.ranking.CandidateScoreDetails;
import com.campusconnect.ranking.DsaRankingEngine;
import com.campusconnect.ranking.WeightConfig;
import com.campusconnect.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class SeedDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CompanyRepository companyRepository;
    private final RecruiterRepository recruiterRepository;
    private final StudentRepository studentRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final PasswordEncoder passwordEncoder;
    private final DsaRankingEngine dsaRankingEngine;
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(SeedDataInitializer.class);

    public SeedDataInitializer(UserRepository userRepository, RoleRepository roleRepository, CompanyRepository companyRepository, RecruiterRepository recruiterRepository, StudentRepository studentRepository, JobRepository jobRepository, ApplicationRepository applicationRepository, PasswordEncoder passwordEncoder, DsaRankingEngine dsaRankingEngine) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.companyRepository = companyRepository;
        this.recruiterRepository = recruiterRepository;
        this.studentRepository = studentRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.passwordEncoder = passwordEncoder;
        this.dsaRankingEngine = dsaRankingEngine;
    }


    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already initialized with seed data.");
            return;
        }

        log.info("Initializing CampusConnect seed dataset with 10 students, 3 recruiters, 5 companies, 15 jobs, and 30 applications...");

        // 1. Roles
        Role studentRole = roleRepository.save(Role.builder().name(RoleName.ROLE_STUDENT).build());
        Role recruiterRole = roleRepository.save(Role.builder().name(RoleName.ROLE_RECRUITER).build());
        Role adminRole = roleRepository.save(Role.builder().name(RoleName.ROLE_ADMIN).build());

        // 2. Admin User
        userRepository.save(User.builder()
                .fullName("System Administrator")
                .email("admin@campusconnect.com")
                .password(passwordEncoder.encode("admin123"))
                .role(adminRole)
                .phone("+91 9876543210")
                .build());

        // 3. 5 Companies
        Company c1 = companyRepository.save(Company.builder().name("TechNova Solutions").description("Tier-1 Product & Cloud Engineering Leader").location("Noida, UP").website("https://technova.io").industry("IT / SaaS").build());
        Company c2 = companyRepository.save(Company.builder().name("CloudVibe Systems").description("Next-generation DevOps and Kubernetes Infrastructure").location("Bengaluru, KA").website("https://cloudvibe.dev").industry("Cloud & DevOps").build());
        Company c3 = companyRepository.save(Company.builder().name("DataSphere Analytics").description("Big Data and AI Decision Intelligence Suite").location("Hyderabad, TS").website("https://datasphere.ai").industry("AI & Data Science").build());
        Company c4 = companyRepository.save(Company.builder().name("QuantumEdge Infotech").description("Enterprise Microservices & Fintech Solutions").location("Pune, MH").website("https://quantumedge.com").industry("Fintech").build());
        Company c5 = companyRepository.save(Company.builder().name("CyberPulse Networks").description("Zero-Trust Security & Network Resilience").location("Gurugram, HR").website("https://cyberpulse.io").industry("Cybersecurity").build());

        // 4. 3 Recruiters
        User rUser1 = userRepository.save(User.builder().fullName("Rajesh Mehra").email("recruiter1@technova.com").password(passwordEncoder.encode("password123")).role(recruiterRole).phone("+91 9811002233").build());
        Recruiter r1 = recruiterRepository.save(Recruiter.builder().user(rUser1).company(c1).designation("Senior Talent Acquisition Lead").department("Engineering Hiring").build());

        User rUser2 = userRepository.save(User.builder().fullName("Simran Kaur").email("recruiter2@cloudvibe.com").password(passwordEncoder.encode("password123")).role(recruiterRole).phone("+91 9822113344").build());
        Recruiter r2 = recruiterRepository.save(Recruiter.builder().user(rUser2).company(c2).designation("Head of Campus Hiring").department("People Ops").build());

        User rUser3 = userRepository.save(User.builder().fullName("Arjun Deshmukh").email("recruiter3@datasphere.com").password(passwordEncoder.encode("password123")).role(recruiterRole).phone("+91 9833224455").build());
        Recruiter r3 = recruiterRepository.save(Recruiter.builder().user(rUser3).company(c3).designation("Lead Recruiter").department("AI Talent").build());

        // 5. 10 Students with realistic profiles
        String[][] studentData = {
                {"Abhijat Patel", "abhijat@gmail.com", "8.9", "Delhi Technological University", "Computer Science", "2025", "Noida"},
                {"Priya Sharma", "priya@gmail.com", "9.2", "IIT Roorkee", "Information Technology", "2025", "Bengaluru"},
                {"Rohan Verma", "rohan@gmail.com", "7.8", "NIT Trichy", "Computer Engineering", "2025", "Hyderabad"},
                {"Ananya Iyer", "ananya@gmail.com", "8.6", "BITS Pilani", "Computer Science", "2025", "Bengaluru"},
                {"Siddharth Nair", "siddharth@gmail.com", "8.1", "VIT Vellore", "Software Engineering", "2025", "Chennai"},
                {"Sneha Gupta", "sneha@gmail.com", "7.5", "Manipal Institute of Tech", "Data Science", "2025", "Pune"},
                {"Aditya Roy", "aditya@gmail.com", "8.4", "Jadavpur University", "Computer Science", "2025", "Kolkata"},
                {"Pooja Kulkarni", "pooja@gmail.com", "7.2", "COEP Pune", "Information Technology", "2025", "Pune"},
                {"Vikram Malhotra", "vikram@gmail.com", "8.0", "Thapar University", "Computer Science", "2025", "Chandigarh"},
                {"Kavya Reddy", "kavya@gmail.com", "9.0", "IIIT Hyderabad", "AI & ML", "2025", "Hyderabad"}
        };

        List<Student> students = new ArrayList<>();
        List<List<String>> studentSkillsList = Arrays.asList(
                Arrays.asList("Java", "Spring Boot", "MySQL", "React", "Docker", "DSA", "REST APIs"),
                Arrays.asList("Python", "FastAPI", "Machine Learning", "PyTorch", "MySQL", "Docker", "Data Analysis"),
                Arrays.asList("JavaScript", "React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "HTML5"),
                Arrays.asList("Java", "Spring Boot", "Microservices", "PostgreSQL", "Kafka", "AWS", "DSA"),
                Arrays.asList("Go", "Docker", "Kubernetes", "Linux", "CI/CD", "AWS", "Prometheus"),
                Arrays.asList("Python", "Pandas", "SQL", "Tableau", "PowerBI", "Machine Learning", "Statistics"),
                Arrays.asList("Java", "Spring Boot", "MySQL", "React", "TypeScript", "Redis", "DSA"),
                Arrays.asList("HTML5", "CSS3", "JavaScript", "React", "Bootstrap", "Git", "Figma"),
                Arrays.asList("C++", "Java", "DSA", "System Design", "MySQL", "Linux", "Object Oriented Programming"),
                Arrays.asList("Python", "NLP", "PyTorch", "Transformers", "Ollama", "FastAPI", "Vector DB")
        );

        for (int i = 0; i < studentData.length; i++) {
            User sUser = userRepository.save(User.builder()
                    .fullName(studentData[i][0])
                    .email(studentData[i][1])
                    .password(passwordEncoder.encode("password123"))
                    .role(studentRole)
                    .phone("+91 9900" + (10000 + i))
                    .build());

            Student student = Student.builder()
                    .user(sUser)
                    .cgpa(Double.parseDouble(studentData[i][2]))
                    .university(studentData[i][3])
                    .branch(studentData[i][4])
                    .passoutYear(Integer.parseInt(studentData[i][5]))
                    .location(studentData[i][6])
                    .bio("Passionate engineering student specializing in software engineering, distributed systems, and modern technology.")
                    .profileCompleteness(88)
                    .build();

            // Add Skills
            for (String sk : studentSkillsList.get(i)) {
                student.getSkills().add(StudentSkill.builder()
                        .student(student)
                        .skillName(sk)
                        .proficiencyLevel("Intermediate")
                        .yearsOfExperience(1.5)
                        .build());
            }

            // Add Projects
            student.getProjects().add(Project.builder()
                    .student(student)
                    .title("Campus Placement Portal with AI")
                    .description("Full-stack web platform with automated candidate evaluation and real-time alerts.")
                    .techStack(String.join(", ", studentSkillsList.get(i).subList(0, Math.min(3, studentSkillsList.get(i).size()))))
                    .githubUrl("https://github.com/campus/" + studentData[i][0].toLowerCase().replace(" ", "-"))
                    .build());

            // Add Experience
            student.getExperiences().add(Experience.builder()
                    .student(student)
                    .companyName("Tech Innovators Internship")
                    .roleTitle("Software Engineering Intern")
                    .startDate("2024-05")
                    .endDate("2024-08")
                    .description("Contributed to microservices architecture and automated testing pipelines.")
                    .isInternship(true)
                    .durationMonths(4.0)
                    .build());

            students.add(studentRepository.save(student));
        }

        // 6. 15 Jobs
        List<Job> jobs = new ArrayList<>();
        Object[][] jobConfigs = {
                {"Java Backend Developer", c1, r1, "Noida", "₹8–12 LPA", "Full-Time", 7.0, 0.0, "2026-12-31",
                        Arrays.asList("Java", "Spring Boot", "MySQL", "REST APIs", "DSA"), Arrays.asList("Docker", "AWS", "Kafka")},
                {"Full-Stack Engineer (React + Spring)", c1, r1, "Noida / Remote", "₹10–14 LPA", "Full-Time", 7.5, 1.0, "2026-11-30",
                        Arrays.asList("React", "Java", "Spring Boot", "MySQL", "JavaScript"), Arrays.asList("Docker", "Tailwind CSS")},
                {"Frontend Engineer (React)", c1, r1, "Bengaluru", "₹7–10 LPA", "Full-Time", 6.5, 0.0, "2026-12-15",
                        Arrays.asList("React", "JavaScript", "HTML5", "Tailwind CSS"), Arrays.asList("TypeScript", "Redux")},
                {"DevOps & Cloud Engineer", c2, r2, "Bengaluru", "₹12–16 LPA", "Full-Time", 7.0, 1.0, "2026-12-20",
                        Arrays.asList("Docker", "Kubernetes", "Linux", "CI/CD", "AWS"), Arrays.asList("Go", "Terraform", "Prometheus")},
                {"Site Reliability Engineer Intern", c2, r2, "Bengaluru", "₹35k/mo Internship", "Internship", 7.0, 0.0, "2026-10-31",
                        Arrays.asList("Linux", "Docker", "Python", "Networking"), Arrays.asList("Kubernetes", "Bash")},
                {"Cloud Security Analyst", c2, r2, "Hyderabad", "₹9–13 LPA", "Full-Time", 7.5, 0.5, "2026-11-25",
                        Arrays.asList("AWS", "Linux", "Python", "Cybersecurity"), Arrays.asList("Docker", "Zero Trust")},
                {"Data Analyst", c3, r3, "Hyderabad", "₹7–10 LPA", "Full-Time", 6.5, 0.0, "2026-12-10",
                        Arrays.asList("SQL", "Python", "Pandas", "Tableau"), Arrays.asList("PowerBI", "Statistics")},
                {"AI / NLP Research Engineer", c3, r3, "Hyderabad", "₹14–18 LPA", "Full-Time", 8.0, 1.0, "2026-12-05",
                        Arrays.asList("Python", "PyTorch", "NLP", "Transformers", "FastAPI"), Arrays.asList("Ollama", "Vector DB", "Docker")},
                {"Machine Learning Intern", c3, r3, "Remote", "₹40k/mo Internship", "Internship", 7.5, 0.0, "2026-10-25",
                        Arrays.asList("Python", "Machine Learning", "Scikit-Learn", "Pandas"), Arrays.asList("FastAPI", "Docker")},
                {"Fintech Core Java Specialist", c4, r1, "Pune", "₹11–15 LPA", "Full-Time", 7.5, 1.0, "2026-12-31",
                        Arrays.asList("Java", "DSA", "Spring Boot", "Microservices", "Kafka"), Arrays.asList("PostgreSQL", "Redis")},
                {"QA Automation & Performance Tester", c4, r1, "Pune", "₹6–9 LPA", "Full-Time", 6.0, 0.0, "2026-11-15",
                        Arrays.asList("Java", "Selenium", "JUnit", "REST APIs"), Arrays.asList("Postman", "CI/CD")},
                {"Security Operations Center Analyst", c5, r2, "Gurugram", "₹8–11 LPA", "Full-Time", 6.5, 0.0, "2026-12-18",
                        Arrays.asList("Networking", "Linux", "Cybersecurity", "Python"), Arrays.asList("SIEM", "Wireshark")},
                {"Database Administrator (MySQL)", c1, r1, "Noida", "₹8–11 LPA", "Full-Time", 7.0, 1.0, "2026-12-10",
                        Arrays.asList("MySQL", "SQL", "Database Design", "Linux"), Arrays.asList("Replication", "Indexing")},
                {"API Platform Engineer (FastAPI/Python)", c3, r3, "Bengaluru", "₹9–13 LPA", "Full-Time", 7.0, 0.5, "2026-12-22",
                        Arrays.asList("Python", "FastAPI", "Docker", "REST APIs", "MySQL"), Arrays.asList("Pydantic", "Redis")},
                {"Software Development Engineer 1 (DSA)", c4, r1, "Pune", "₹13–17 LPA", "Full-Time", 8.0, 0.0, "2026-12-31",
                        Arrays.asList("DSA", "Java", "System Design", "MySQL", "Algorithms"), Arrays.asList("C++", "Spring Boot")}
        };

        for (Object[] cfg : jobConfigs) {
            @SuppressWarnings("unchecked")
            List<String> reqSkills = (List<String>) cfg[9];
            @SuppressWarnings("unchecked")
            List<String> prefSkills = (List<String>) cfg[10];

            Job job = jobRepository.save(Job.builder()
                    .title((String) cfg[0])
                    .company((Company) cfg[1])
                    .recruiter((Recruiter) cfg[2])
                    .location((String) cfg[3])
                    .salaryRange((String) cfg[4])
                    .jobType((String) cfg[5])
                    .minCgpa((Double) cfg[6])
                    .requiredExperienceYears((Double) cfg[7])
                    .deadline((String) cfg[8])
                    .requiredSkills(reqSkills)
                    .preferredSkills(prefSkills)
                    .description("Join our high-performing team to build resilient, distributed systems. You will collaborate directly with engineering leaders on high-impact scalable products.")
                    .status(JobStatus.PUBLISHED)
                    .build());
            jobs.add(job);
        }

        // 7. 30 Realistic Applications with calculated DSA & NLP scores
        ApplicationStatus[] stages = {
                ApplicationStatus.APPLIED,
                ApplicationStatus.UNDER_REVIEW,
                ApplicationStatus.SHORTLISTED,
                ApplicationStatus.INTERVIEW,
                ApplicationStatus.SELECTED
        };

        int appCount = 0;
        for (int j = 0; j < jobs.size() && appCount < 30; j++) {
            Job currentJob = jobs.get(j);
            // Have 2-3 students apply to each job
            int studentsForJob = (j % 2 == 0) ? 3 : 2;
            for (int s = 0; s < studentsForJob && appCount < 30; s++) {
                int studentIdx = (j + s) % students.size();
                Student candidate = students.get(studentIdx);

                if (!applicationRepository.existsByJobIdAndStudentId(currentJob.getId(), candidate.getId())) {
                    CandidateScoreDetails score = dsaRankingEngine.calculateCandidateScore(
                            candidate, currentJob, null,
                            currentJob.getRequiredSkills(), currentJob.getPreferredSkills(),
                            currentJob.getMinCgpa() != null ? currentJob.getMinCgpa() : 0.0,
                            currentJob.getRequiredExperienceYears() != null ? currentJob.getRequiredExperienceYears() : 0.0,
                            new WeightConfig()
                    );

                    ApplicationStatus status = stages[(appCount % stages.length)];

                    Application app = Application.builder()
                            .job(currentJob)
                            .student(candidate)
                            .status(status)
                            .overallScore(score.getOverallScore())
                            .skillMatchScore(score.getSkillMatchScore())
                            .nlpMatchScore(score.getNlpMatchScore())
                            .experienceScore(score.getExperienceScore())
                            .cgpaScore(score.getCgpaScore())
                            .rankingExplanation(score.getRankingExplanation())
                            .build();

                    applicationRepository.save(app);
                    appCount++;
                }
            }
        }

        log.info("Successfully seeded CampusConnect with {} applications across 15 jobs!", appCount);
    }
}
