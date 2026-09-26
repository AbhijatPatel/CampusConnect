from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List, Dict, Any, Tuple
from app.services.skill_extractor import extract_skills_from_text
from app.services.ollama_service import generate_with_qwen

def compute_nlp_similarity(text1: str, text2: str) -> float:
    """
    Computes TF-IDF Cosine Similarity between two texts.
    Returns percentage (0 - 100).
    """
    if not text1 or not text2:
        return 0.0

    vectorizer = TfidfVectorizer(stop_words='english')
    try:
        tfidf_matrix = vectorizer.fit_transform([text1, text2])
        sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        return round(float(sim) * 100.0, 1)
    except Exception:
        return 50.0

def match_job_profile(student_skills: List[str], required_skills: List[str], job_description: str, resume_text: str) -> Dict[str, Any]:
    norm_student = {s.strip().lower() for s in student_skills}
    matching: List[str] = []
    missing: List[str] = []

    for req in required_skills:
        if req.strip().lower() in norm_student:
            matching.append(req)
        else:
            missing.append(req)

    req_match_pct = 100.0 if not required_skills else round((len(matching) / len(required_skills)) * 100.0, 1)

    # Compute NLP Similarity between candidate's text and job description
    candidate_doc = f"{resume_text} {' '.join(student_skills)}"
    job_doc = f"{job_description} {' '.join(required_skills)}"
    nlp_sim = compute_nlp_similarity(candidate_doc, job_doc)

    # Overall AI match score (65% skills + 35% NLP content similarity)
    overall_match = round((req_match_pct * 0.65) + (nlp_sim * 0.35), 1)

    # Try Ollama Qwen for personalized recruiter advice if available
    llm_prompt = f"Candidate skills: {', '.join(student_skills)}. Job requires: {', '.join(required_skills)}. Missing: {', '.join(missing)}. Provide a 1-sentence recommendation."
    ai_explanation = generate_with_qwen(llm_prompt)

    if not ai_explanation:
        if req_match_pct >= 80:
            ai_explanation = f"Strong match: Candidate matches {len(matching)} of {len(required_skills)} required core skills with high stack alignment."
        elif req_match_pct >= 50:
            ai_explanation = f"Moderate match: Possesses core foundations ({', '.join(matching[:3])}), but lacks {', '.join(missing[:2])}."
        else:
            ai_explanation = f"Noticeable skill gap: Missing primary requirements ({', '.join(missing[:3])}). Recommended to upskill before applying."

    recommendation = "Strong match" if overall_match >= 75 else "Moderate match" if overall_match >= 50 else "Skill gap identified"

    return {
        "match_score": overall_match,
        "matching_skills": matching,
        "missing_skills": missing,
        "recommendation": recommendation,
        "required_skills_match": req_match_pct,
        "nlp_similarity": nlp_sim,
        "explanation": ai_explanation
    }
