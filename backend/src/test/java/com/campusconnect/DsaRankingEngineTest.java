package com.campusconnect;

import com.campusconnect.entity.*;
import com.campusconnect.ranking.CandidateScoreDetails;
import com.campusconnect.ranking.DsaRankingEngine;
import com.campusconnect.ranking.WeightConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

public class DsaRankingEngineTest {

    private DsaRankingEngine rankingEngine;
    private WeightConfig weights;
    private Job testJob;

    @BeforeEach
    void setUp() {
        rankingEngine = new DsaRankingEngine();
        weights = new WeightConfig(); // 40% skill, 20% nlp, 15% exp, 10% cgpa, 10% proj, 5% elig

        testJob = Job.builder()
                .id(1L)
                .title("Senior Backend Engineer")
                .requiredSkills(Arrays.asList("Java", "Spring Boot", "MySQL", "Docker"))
                .preferredSkills(Arrays.asList("AWS", "Kubernetes"))
                .minCgpa(7.5)
                .requiredExperienceYears(1.0)
                .build();
    }

    private Student createMockStudent(Long id, String name, double cgpa, List<String> skills, double expYears, int projectCount) {
        User user = User.builder().id(id).fullName(name).email(name.toLowerCase().replace(" ", "") + "@test.com").build();
        Student student = Student.builder()
                .id(id)
                .user(user)
                .cgpa(cgpa)
                .branch("Computer Science")
                .skills(new ArrayList<>())
                .projects(new ArrayList<>())
                .experiences(new ArrayList<>())
                .build();

        for (String s : skills) {
            student.getSkills().add(StudentSkill.builder().student(student).skillName(s).build());
        }

        for (int i = 0; i < projectCount; i++) {
            student.getProjects().add(Project.builder().student(student).title("Project " + i).build());
        }

        if (expYears > 0) {
            student.getExperiences().add(Experience.builder().student(student).durationMonths(expYears * 12).build());
        }

        return student;
    }

    @Test
    @DisplayName("Test 1: Perfect candidate scores highest in the PriorityQueue")
    void testPerfectCandidate() {
        Student perfect = createMockStudent(1L, "Alice Perfect", 9.8, Arrays.asList("Java", "Spring Boot", "MySQL", "Docker", "AWS", "Kubernetes"), 2.0, 4);
        Application app = Application.builder().id(101L).job(testJob).student(perfect).nlpMatchScore(98.0).build();

        List<CandidateScoreDetails> ranked = rankingEngine.rankCandidates(testJob, Collections.singletonList(app), weights);

        assertEquals(1, ranked.size());
        CandidateScoreDetails top = ranked.get(0);
        assertTrue(top.getOverallScore() >= 95.0, "Perfect candidate score should be >= 95.0");
        assertEquals(4, top.getMatchingSkills().size());
        assertEquals(0, top.getMissingSkills().size());
        assertTrue(top.getRankingExplanation().contains("Matches 4/4 required skills"));
    }

    @Test
    @DisplayName("Test 2: Partial skill match candidate gets proportional skill score")
    void testPartialSkillMatch() {
        Student partial = createMockStudent(2L, "Bob Partial", 8.0, Arrays.asList("Java", "Spring Boot"), 1.0, 2);
        Application app = Application.builder().id(102L).job(testJob).student(partial).nlpMatchScore(50.0).build();

        List<CandidateScoreDetails> ranked = rankingEngine.rankCandidates(testJob, Collections.singletonList(app), weights);

        assertEquals(1, ranked.size());
        CandidateScoreDetails details = ranked.get(0);
        assertEquals(2, details.getMatchingSkills().size());
        assertEquals(2, details.getMissingSkills().size());
        assertEquals(50.0, details.getSkillMatchScore());
    }

    @Test
    @DisplayName("Test 3: Missing all required skills results in 0% skill match")
    void testMissingRequiredSkills() {
        Student unaligned = createMockStudent(3L, "Charlie Python", 8.5, Arrays.asList("Python", "Django", "Postgres"), 1.0, 2);
        Application app = Application.builder().id(103L).job(testJob).student(unaligned).nlpMatchScore(10.0).build();

        List<CandidateScoreDetails> ranked = rankingEngine.rankCandidates(testJob, Collections.singletonList(app), weights);

        assertEquals(1, ranked.size());
        assertEquals(0.0, ranked.get(0).getSkillMatchScore());
        assertEquals(4, ranked.get(0).getMissingSkills().size());
    }

    @Test
    @DisplayName("Test 4: High CGPA but low skills should rank lower than high skills with adequate CGPA")
    void testHighCgpaVsHighSkill() {
        Student highCgpa = createMockStudent(4L, "Dave HighCGPA", 9.9, Arrays.asList("C++"), 0.0, 1);
        Student highSkill = createMockStudent(5L, "Eve HighSkill", 7.8, Arrays.asList("Java", "Spring Boot", "MySQL", "Docker"), 1.5, 3);

        Application app1 = Application.builder().id(104L).job(testJob).student(highCgpa).nlpMatchScore(20.0).build();
        Application app2 = Application.builder().id(105L).job(testJob).student(highSkill).nlpMatchScore(90.0).build();

        List<CandidateScoreDetails> ranked = rankingEngine.rankCandidates(testJob, Arrays.asList(app1, app2), weights);

        assertEquals(2, ranked.size());
        assertEquals("Eve HighSkill", ranked.get(0).getCandidateName(), "Candidate with high skill match should rank higher due to 40% weight");
        assertEquals(1, ranked.get(0).getRank());
        assertEquals(2, ranked.get(1).getRank());
    }

    @Test
    @DisplayName("Test 5: Empty candidate list returns empty result gracefully")
    void testEmptyCandidateList() {
        List<CandidateScoreDetails> ranked = rankingEngine.rankCandidates(testJob, Collections.emptyList(), weights);
        assertNotNull(ranked);
        assertTrue(ranked.isEmpty());
    }

    @Test
    @DisplayName("Test 6: Large dataset (100 candidates) ranking performance and heap ordering")
    void testLargeCandidateDataset() {
        List<Application> apps = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            List<String> skills = (i % 2 == 0) ? Arrays.asList("Java", "Spring Boot", "MySQL", "Docker") : Arrays.asList("Python", "Ruby");
            Student s = createMockStudent((long) i, "Candidate " + i, 6.0 + (i % 40) / 10.0, skills, (i % 5) * 0.5, i % 5);
            apps.add(Application.builder().id((long) (200 + i)).job(testJob).student(s).nlpMatchScore((double) (i % 100)).build());
        }

        long startTime = System.currentTimeMillis();
        List<CandidateScoreDetails> ranked = rankingEngine.rankCandidates(testJob, apps, weights);
        long duration = System.currentTimeMillis() - startTime;

        assertEquals(100, ranked.size());
        assertTrue(duration < 100, "Ranking 100 candidates should execute in less than 100ms via PriorityQueue");

        // Verify strictly descending overall score order
        for (int i = 0; i < ranked.size() - 1; i++) {
            assertTrue(ranked.get(i).getOverallScore() >= ranked.get(i + 1).getOverallScore(),
                    "Candidate at rank " + (i + 1) + " must have score >= candidate at rank " + (i + 2));
            assertEquals(i + 1, ranked.get(i).getRank());
        }
    }
}
