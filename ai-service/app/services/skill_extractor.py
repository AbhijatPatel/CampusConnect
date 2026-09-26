import re
from typing import List, Set

SKILL_TAXONOMY = {
    # Languages
    "java", "python", "javascript", "typescript", "c++", "c#", "go", "golang", "ruby", "php", "swift", "kotlin", "rust",
    # Frameworks
    "spring", "spring boot", "django", "flask", "fastapi", "react", "next.js", "angular", "vue", "express", "node.js",
    # Databases
    "mysql", "postgresql", "mongodb", "redis", "cassandra", "sqlite", "oracle", "sql server",
    # Cloud & DevOps
    "docker", "kubernetes", "aws", "azure", "gcp", "ci/cd", "jenkins", "terraform", "ansible", "git", "github", "linux",
    # CS Fundamentals & DSA
    "dsa", "data structures", "algorithms", "system design", "oop", "object oriented programming", "rest apis", "microservices",
    # AI / ML
    "machine learning", "deep learning", "nlp", "pytorch", "tensorflow", "scikit-learn", "pandas", "numpy", "transformers", "ollama", "qwen"
}

def extract_skills_from_text(text: str) -> List[str]:
    """
    Extracts known technical skills from text using token matching and n-gram analysis.
    """
    if not text:
        return []

    lowered = " " + text.lower() + " "
    found_skills: Set[str] = set()

    for skill in SKILL_TAXONOMY:
        # Match as whole word or phrase
        pattern = r'(?<![a-zA-Z0-9])' + re.escape(skill) + r'(?![a-zA-Z0-9])'
        if re.search(pattern, lowered):
            # Normalize title casing
            if skill in {"dsa", "aws", "gcp", "ci/cd", "oop", "nlp", "sql"}:
                found_skills.add(skill.upper())
            elif skill == "spring boot":
                found_skills.add("Spring Boot")
            elif skill == "fastapi":
                found_skills.add("FastAPI")
            elif skill == "mysql":
                found_skills.add("MySQL")
            elif skill == "postgresql":
                found_skills.add("PostgreSQL")
            elif skill == "mongodb":
                found_skills.add("MongoDB")
            elif skill == "node.js":
                found_skills.add("Node.js")
            else:
                found_skills.add(skill.title())

    return sorted(list(found_skills))
