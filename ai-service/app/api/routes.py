from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional, List
import io

from app.models.schemas import (
    ResumeAnalysisRequest, ResumeAnalysisResponse,
    JobMatchRequest, JobMatchResponse,
    SkillExtractionRequest, SkillExtractionResponse
)
from app.services.skill_extractor import extract_skills_from_text
from app.services.nlp_service import match_job_profile, compute_nlp_similarity

router = APIRouter(prefix="/api/v1")

@router.post("/extract-skills", response_model=SkillExtractionResponse)
def extract_skills_endpoint(payload: SkillExtractionRequest):
    skills = extract_skills_from_text(payload.text)
    return SkillExtractionResponse(skills=skills, count=len(skills))

@router.post("/match-job", response_model=JobMatchResponse)
def match_job_endpoint(payload: JobMatchRequest):
    result = match_job_profile(
        student_skills=payload.student_skills,
        required_skills=payload.required_skills,
        job_description=payload.job_description or "",
        resume_text=payload.resume_text or ""
    )
    return JobMatchResponse(**result)

@router.post("/analyze-resume", response_model=ResumeAnalysisResponse)
async def analyze_resume_endpoint(
    file: Optional[UploadFile] = File(None),
    resume_text: Optional[str] = Form(None)
):
    text_content = resume_text or ""
    if file:
        content = await file.read()
        try:
            text_content = content.decode("utf-8", errors="ignore")
        except Exception:
            text_content = file.filename

    extracted = extract_skills_from_text(text_content)
    
    # Calculate score based on breadth of skills and content length
    score = min(95.0, 50.0 + len(extracted) * 6.5)
    
    improvements = []
    if "Docker" not in extracted and "Kubernetes" not in extracted:
        improvements.append("Add containerization tools (Docker, Kubernetes) to strengthen deployment profile.")
    if "AWS" not in extracted and "GCP" not in extracted:
        improvements.append("Highlight public cloud infrastructure or hands-on projects with AWS.")
    if "DSA" not in extracted:
        improvements.append("Explicitly state problem solving / Data Structures & Algorithms proficiency.")

    summary = f"Extracted {len(extracted)} technical skills from candidate resume. Overall alignment rating: {score}/100."

    return ResumeAnalysisResponse(
        extracted_skills=extracted,
        resume_score=score,
        summary=summary,
        suggested_improvements=improvements
    )
