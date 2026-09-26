package com.campusconnect.ranking;

import com.campusconnect.entity.Application;
import com.campusconnect.entity.Job;
import com.campusconnect.entity.Student;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class DsaRankingEngine {

    /**
     * Ranks candidates for a specific Job using a PriorityQueue (Max-Heap) and weighted priority scoring.
     */
    public List<CandidateScoreDetails> rankCandidates(Job job, List<Application> applications, WeightConfig weights) {
        if (applications == null || applications.isEmpty()) {
            return Collections.emptyList();
        }

        if (weights == null) {
            weights = new WeightConfig();
        }

        // Max-Heap Priority Queue for ranking candidates
        PriorityQueue<CandidateScoreDetails> maxHeap = new PriorityQueue<>(new CandidateScoreComparator());

        List<String> requiredSkills = job.getRequiredSkills() != null ? job.getRequiredSkills() : Collections.emptyList();
        List<String> preferredSkills = job.getPreferredSkills() != null ? job.getPreferredSkills() : Collections.emptyList();
        double minCgpa = job.getMinCgpa() != null ? job.getMinCgpa() : 0.0;
        double requiredExp = job.getRequiredExperienceYears() != null ? job.getRequiredExperienceYears() : 0.0;

        for (Application app : applications) {
            Student student = app.getStudent();
            CandidateScoreDetails scoreDetails = calculateCandidateScore(student, job, app, requiredSkills, preferredSkills, minCgpa, requiredExp, weights);
            maxHeap.add(scoreDetails);
        }

        // Extract ranked list from PriorityQueue
        List<CandidateScoreDetails> rankedList = new ArrayList<>();
        int rank = 1;
        while (!maxHeap.isEmpty()) {
            CandidateScoreDetails details = maxHeap.poll();
            details.setRank(rank++);
            rankedList.add(details);
        }

        return rankedList;
    }

    public CandidateScoreDetails calculateCandidateScore(Student student, Job job, Application app,
                                                         List<String> requiredSkills, List<String> preferredSkills,
                                                         double minCgpa, double requiredExp, WeightConfig weights) {
        // 1. Skill Match Calculation (HashSet for fast O(1) lookup)
        Set<String> studentSkillSet = student.getSkills().stream()
                .map(s -> s.getSkillName().trim().toLowerCase())
                .collect(Collectors.toSet());

        // Also add techStack keywords from projects if present
        if (student.getProjects() != null) {
            student.getProjects().forEach(p -> {
                if (p.getTechStack() != null) {
                    Arrays.stream(p.getTechStack().split("[,;|]"))
                            .map(String::trim)
                            .map(String::toLowerCase)
                            .forEach(studentSkillSet::add);
                }
            });
        }

        List<String> matchedSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();

        for (String reqSkill : requiredSkills) {
            String normSkill = reqSkill.trim().toLowerCase();
            if (studentSkillSet.contains(normSkill)) {
                matchedSkills.add(reqSkill);
            } else {
                missingSkills.add(reqSkill);
            }
        }

        double skillMatchPercent = requiredSkills.isEmpty() ? 100.0 :
                ((double) matchedSkills.size() / requiredSkills.size()) * 100.0;

        // Preferred skill bonus
        double preferredBonus = 0.0;
        if (!preferredSkills.isEmpty()) {
            long prefMatched = preferredSkills.stream()
                    .filter(s -> studentSkillSet.contains(s.trim().toLowerCase()))
                    .count();
            preferredBonus = ((double) prefMatched / preferredSkills.size()) * 10.0;
        }

        double finalSkillScore = Math.min(100.0, skillMatchPercent + preferredBonus);

        // 2. CGPA Score Calculation
        double studentCgpa = student.getCgpa() != null ? student.getCgpa() : 0.0;
        double cgpaScore = Math.min(100.0, (studentCgpa / 10.0) * 100.0);

        // 3. Experience Score Calculation
        double totalExpYears = 0.0;
        if (student.getExperiences() != null) {
            totalExpYears = student.getExperiences().stream()
                    .mapToDouble(e -> e.getDurationMonths() != null ? e.getDurationMonths() / 12.0 : 0.5)
                    .sum();
        }
        double expScore = requiredExp <= 0 ? Math.min(100.0, totalExpYears * 50.0) :
                Math.min(100.0, (totalExpYears / requiredExp) * 100.0);

        // 4. Projects Score Calculation
        int projectCount = student.getProjects() != null ? student.getProjects().size() : 0;
        double projectScore = Math.min(100.0, projectCount * 25.0); // 4 projects = 100%

        // 5. NLP Match Score (use app NLP score or calculate estimate)
        double nlpScore = app != null && app.getNlpMatchScore() != null ? app.getNlpMatchScore() : skillMatchPercent;

        // 6. Eligibility Score
        double eligibilityScore = 100.0;
        if (studentCgpa < minCgpa) {
            eligibilityScore -= 40.0; // penalty for low CGPA
        }

        // Weighted Aggregation using Map
        Map<String, Double> scoreMap = new HashMap<>();
        scoreMap.put("skill", finalSkillScore * weights.getSkillMatchWeight());
        scoreMap.put("nlp", nlpScore * weights.getNlpSimilarityWeight());
        scoreMap.put("exp", expScore * weights.getExperienceWeight());
        scoreMap.put("cgpa", cgpaScore * weights.getCgpaWeight());
        scoreMap.put("projects", projectScore * weights.getProjectsWeight());
        scoreMap.put("eligibility", eligibilityScore * weights.getEligibilityWeight());

        double overallScore = scoreMap.values().stream().mapToDouble(Double::doubleValue).sum();
        overallScore = Math.round(overallScore * 10.0) / 10.0; // round to 1 decimal

        // Generate Explainability Summary
        StringBuilder explanation = new StringBuilder();
        explanation.append("Matches ").append(matchedSkills.size()).append("/").append(requiredSkills.size()).append(" required skills (").append((int) skillMatchPercent).append("%). ");
        if (studentCgpa >= minCgpa) {
            explanation.append("Meets CGPA requirement (").append(studentCgpa).append(" >= ").append(minCgpa).append("). ");
        } else {
            explanation.append("Below CGPA threshold (").append(studentCgpa).append(" < ").append(minCgpa).append("). ");
        }
        if (projectCount > 0) {
            explanation.append("Built ").append(projectCount).append(" relevant project(s). ");
        }
        if (totalExpYears > 0) {
            explanation.append("Has ").append(String.format("%.1f", totalExpYears)).append(" yrs experience.");
        }

        return CandidateScoreDetails.builder()
                .candidateId(student.getUser().getId())
                .studentId(student.getId())
                .applicationId(app != null ? app.getId() : null)
                .candidateName(student.getUser().getFullName())
                .email(student.getUser().getEmail())
                .branch(student.getBranch() != null ? student.getBranch() : "Computer Science")
                .cgpa(studentCgpa)
                .experienceYears(totalExpYears)
                .projectCount(projectCount)
                .overallScore(overallScore)
                .skillMatchScore(Math.round(finalSkillScore * 10.0) / 10.0)
                .nlpMatchScore(Math.round(nlpScore * 10.0) / 10.0)
                .experienceScore(Math.round(expScore * 10.0) / 10.0)
                .cgpaScore(Math.round(cgpaScore * 10.0) / 10.0)
                .projectScore(Math.round(projectScore * 10.0) / 10.0)
                .eligibilityScore(Math.round(eligibilityScore * 10.0) / 10.0)
                .matchingSkills(matchedSkills)
                .missingSkills(missingSkills)
                .rankingExplanation(explanation.toString())
                .applicationStatus(app != null ? app.getStatus().name() : "NOT_APPLIED")
                .build();
    }
}
