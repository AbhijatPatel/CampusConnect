package com.campusconnect.ranking;

import java.util.Comparator;

public class CandidateScoreComparator implements Comparator<CandidateScoreDetails> {

    @Override
    public int compare(CandidateScoreDetails c1, CandidateScoreDetails c2) {
        // Primary sort: Overall score descending
        int scoreCompare = Double.compare(c2.getOverallScore(), c1.getOverallScore());
        if (scoreCompare != 0) {
            return scoreCompare;
        }
        // Secondary tie-breaker: Skill match score descending
        int skillCompare = Double.compare(c2.getSkillMatchScore(), c1.getSkillMatchScore());
        if (skillCompare != 0) {
            return skillCompare;
        }
        // Tertiary tie-breaker: CGPA descending
        return Double.compare(c2.getCgpa() != null ? c2.getCgpa() : 0.0, c1.getCgpa() != null ? c1.getCgpa() : 0.0);
    }
}
