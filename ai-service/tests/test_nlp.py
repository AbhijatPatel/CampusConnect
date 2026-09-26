from app.services.skill_extractor import extract_skills_from_text
from app.services.nlp_service import match_job_profile, compute_nlp_similarity

def test_skill_extraction():
    text = "Proficient in Java, Spring Boot, MySQL, Docker, and DSA with Git version control."
    skills = extract_skills_from_text(text)
    assert "Java" in skills
    assert "Spring Boot" in skills
    assert "MySQL" in skills
    assert "Docker" in skills
    assert "DSA" in skills

def test_nlp_similarity():
    doc1 = "Expert Java software engineer with Spring Boot REST microservices and MySQL database experience."
    doc2 = "Looking for a Java developer experienced in Spring Boot microservices, REST APIs and MySQL."
    sim = compute_nlp_similarity(doc1, doc2)
    assert sim > 40.0, f"Expected similarity > 40%, got {sim}"

def test_match_job_profile():
    student_skills = ["Java", "Spring Boot", "MySQL", "React", "DSA"]
    required_skills = ["Java", "Spring Boot", "MySQL", "Docker", "AWS"]
    job_desc = "We need a strong Java backend developer with Spring Boot and database skills."
    resume_text = "Built several microservices in Java and Spring Boot with MySQL."

    result = match_job_profile(student_skills, required_skills, job_desc, resume_text)
    assert result["required_skills_match"] == 60.0
    assert "Java" in result["matching_skills"]
    assert "Docker" in result["missing_skills"]
    assert "AWS" in result["missing_skills"]
    assert result["match_score"] > 50.0
