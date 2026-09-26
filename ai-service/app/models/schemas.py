from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ResumeAnalysisRequest(BaseModel):
    resume_text: str = Field(..., description="Raw text of student resume")
    existing_skills: Optional[List[str]] = Field(default=[], description="Already listed skills")

class ResumeAnalysisResponse(BaseModel):
    extracted_skills: List[str]
    resume_score: float
    summary: str
    suggested_improvements: List[str]

class JobMatchRequest(BaseModel):
    student_skills: List[str]
    required_skills: List[str]
    job_description: Optional[str] = ""
    resume_text: Optional[str] = ""

class JobMatchResponse(BaseModel):
    match_score: float
    matching_skills: List[str]
    missing_skills: List[str]
    recommendation: str
    required_skills_match: float
    nlp_similarity: float
    explanation: str

class SkillExtractionRequest(BaseModel):
    text: str

class SkillExtractionResponse(BaseModel):
    skills: List[str]
    count: int
