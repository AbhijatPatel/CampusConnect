package com.campusconnect.service;

import com.campusconnect.dto.*;
import com.campusconnect.entity.*;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.mapper.EntityDtoMappers;
import com.campusconnect.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final StorageService storageService;
    private final AiMatchingService aiMatchingService;
    private final StudentSkillRepository studentSkillRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;

    public StudentService(StudentRepository studentRepository,
                          UserRepository userRepository,
                          StorageService storageService,
                          AiMatchingService aiMatchingService,
                          StudentSkillRepository studentSkillRepository,
                          ProjectRepository projectRepository,
                          ExperienceRepository experienceRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.storageService = storageService;
        this.aiMatchingService = aiMatchingService;
        this.studentSkillRepository = studentSkillRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
    }

    public StudentProfileDto getStudentByUserId(Long userId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for user: " + userId));
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    @Transactional
    public StudentProfileDto updateProfile(Long userId, StudentProfileDto dto) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found for user: " + userId));

        // Update user basic info (name, phone)
        if (student.getUser() != null) {
            boolean userChanged = false;
            if (dto.getFullName() != null && !dto.getFullName().isBlank()) {
                student.getUser().setFullName(dto.getFullName().trim());
                userChanged = true;
            }
            if (dto.getPhone() != null) {
                student.getUser().setPhone(dto.getPhone().trim());
                userChanged = true;
            }
            if (userChanged) {
                userRepository.save(student.getUser());
            }
        }

        if (dto.getCgpa() != null) student.setCgpa(dto.getCgpa());
        if (dto.getUniversity() != null) student.setUniversity(dto.getUniversity());
        if (dto.getBranch() != null) student.setBranch(dto.getBranch());
        if (dto.getPassoutYear() != null) student.setPassoutYear(dto.getPassoutYear());
        if (dto.getLocation() != null) student.setLocation(dto.getLocation());
        if (dto.getBio() != null) student.setBio(dto.getBio());

        recalculateCompleteness(student);
        student = studentRepository.save(student);
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    @Transactional
    public StudentProfileDto addSkill(Long userId, StudentSkillDto skillDto) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        StudentSkill skill = StudentSkill.builder()
                .student(student)
                .skillName(skillDto.getSkillName().trim())
                .proficiencyLevel(skillDto.getProficiencyLevel() != null ? skillDto.getProficiencyLevel() : "Intermediate")
                .yearsOfExperience(skillDto.getYearsOfExperience() != null ? skillDto.getYearsOfExperience() : 1.0)
                .build();

        skill = studentSkillRepository.save(skill);
        student.getSkills().add(skill);
        recalculateCompleteness(student);
        student = studentRepository.save(student);
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    @Transactional
    public StudentProfileDto updateSkill(Long userId, Long skillId, StudentSkillDto skillDto) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        StudentSkill skill = studentSkillRepository.findById(skillId).orElse(null);
        if (skill != null) {
            if (skillDto.getSkillName() != null && !skillDto.getSkillName().isBlank()) {
                skill.setSkillName(skillDto.getSkillName().trim());
            }
            if (skillDto.getProficiencyLevel() != null) {
                skill.setProficiencyLevel(skillDto.getProficiencyLevel());
            }
            if (skillDto.getYearsOfExperience() != null) {
                skill.setYearsOfExperience(skillDto.getYearsOfExperience());
            }
            studentSkillRepository.save(skill);
        }

        for (StudentSkill s : student.getSkills()) {
            if (s.getId() != null && s.getId().equals(skillId)) {
                if (skillDto.getSkillName() != null && !skillDto.getSkillName().isBlank()) {
                    s.setSkillName(skillDto.getSkillName().trim());
                }
                if (skillDto.getProficiencyLevel() != null) {
                    s.setProficiencyLevel(skillDto.getProficiencyLevel());
                }
                if (skillDto.getYearsOfExperience() != null) {
                    s.setYearsOfExperience(skillDto.getYearsOfExperience());
                }
                break;
            }
        }
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    @Transactional
    public StudentProfileDto deleteSkill(Long userId, Long skillId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        student.getSkills().removeIf(s -> s.getId() != null && s.getId().equals(skillId));
        studentSkillRepository.deleteById(skillId);
        recalculateCompleteness(student);
        student = studentRepository.save(student);
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    @Transactional
    public StudentProfileDto addProject(Long userId, ProjectDto projectDto) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        Project project = Project.builder()
                .student(student)
                .title(projectDto.getTitle().trim())
                .description(projectDto.getDescription())
                .techStack(projectDto.getTechStack())
                .projectUrl(projectDto.getProjectUrl())
                .githubUrl(projectDto.getGithubUrl())
                .build();

        project = projectRepository.save(project);
        student.getProjects().add(project);
        recalculateCompleteness(student);
        student = studentRepository.save(student);
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    @Transactional
    public StudentProfileDto updateProject(Long userId, Long projectId, ProjectDto projectDto) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        Project project = projectRepository.findById(projectId).orElse(null);
        if (project != null) {
            if (projectDto.getTitle() != null && !projectDto.getTitle().isBlank()) {
                project.setTitle(projectDto.getTitle().trim());
            }
            if (projectDto.getDescription() != null) {
                project.setDescription(projectDto.getDescription());
            }
            if (projectDto.getTechStack() != null) {
                project.setTechStack(projectDto.getTechStack());
            }
            if (projectDto.getGithubUrl() != null) {
                project.setGithubUrl(projectDto.getGithubUrl());
            }
            if (projectDto.getProjectUrl() != null) {
                project.setProjectUrl(projectDto.getProjectUrl());
            }
            projectRepository.save(project);
        }

        for (Project p : student.getProjects()) {
            if (p.getId() != null && p.getId().equals(projectId)) {
                if (projectDto.getTitle() != null && !projectDto.getTitle().isBlank()) {
                    p.setTitle(projectDto.getTitle().trim());
                }
                if (projectDto.getDescription() != null) {
                    p.setDescription(projectDto.getDescription());
                }
                if (projectDto.getTechStack() != null) {
                    p.setTechStack(projectDto.getTechStack());
                }
                if (projectDto.getGithubUrl() != null) {
                    p.setGithubUrl(projectDto.getGithubUrl());
                }
                if (projectDto.getProjectUrl() != null) {
                    p.setProjectUrl(projectDto.getProjectUrl());
                }
                break;
            }
        }
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    @Transactional
    public StudentProfileDto deleteProject(Long userId, Long projectId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        student.getProjects().removeIf(p -> p.getId() != null && p.getId().equals(projectId));
        projectRepository.deleteById(projectId);
        recalculateCompleteness(student);
        student = studentRepository.save(student);
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    @Transactional
    public StudentProfileDto addExperience(Long userId, ExperienceDto expDto) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        Experience exp = Experience.builder()
                .student(student)
                .companyName(expDto.getCompanyName())
                .roleTitle(expDto.getRoleTitle())
                .startDate(expDto.getStartDate())
                .endDate(expDto.getEndDate())
                .description(expDto.getDescription())
                .isInternship(expDto.getIsInternship() != null ? expDto.getIsInternship() : true)
                .durationMonths(expDto.getDurationMonths() != null ? expDto.getDurationMonths() : 3.0)
                .build();

        exp = experienceRepository.save(exp);
        student.getExperiences().add(exp);
        recalculateCompleteness(student);
        student = studentRepository.save(student);
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    @Transactional
    public StudentProfileDto updateExperience(Long userId, Long expId, ExperienceDto expDto) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        Experience exp = experienceRepository.findById(expId).orElse(null);
        if (exp != null) {
            if (expDto.getCompanyName() != null) exp.setCompanyName(expDto.getCompanyName());
            if (expDto.getRoleTitle() != null) exp.setRoleTitle(expDto.getRoleTitle());
            if (expDto.getStartDate() != null) exp.setStartDate(expDto.getStartDate());
            if (expDto.getEndDate() != null) exp.setEndDate(expDto.getEndDate());
            if (expDto.getDescription() != null) exp.setDescription(expDto.getDescription());
            if (expDto.getIsInternship() != null) exp.setIsInternship(expDto.getIsInternship());
            if (expDto.getDurationMonths() != null) exp.setDurationMonths(expDto.getDurationMonths());
            experienceRepository.save(exp);
        }

        for (Experience e : student.getExperiences()) {
            if (e.getId() != null && e.getId().equals(expId)) {
                if (expDto.getCompanyName() != null) e.setCompanyName(expDto.getCompanyName());
                if (expDto.getRoleTitle() != null) e.setRoleTitle(expDto.getRoleTitle());
                if (expDto.getStartDate() != null) e.setStartDate(expDto.getStartDate());
                if (expDto.getEndDate() != null) e.setEndDate(expDto.getEndDate());
                if (expDto.getDescription() != null) e.setDescription(expDto.getDescription());
                if (expDto.getIsInternship() != null) e.setIsInternship(expDto.getIsInternship());
                if (expDto.getDurationMonths() != null) e.setDurationMonths(expDto.getDurationMonths());
                break;
            }
        }
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    @Transactional
    public StudentProfileDto deleteExperience(Long userId, Long expId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        student.getExperiences().removeIf(e -> e.getId() != null && e.getId().equals(expId));
        experienceRepository.deleteById(expId);
        recalculateCompleteness(student);
        student = studentRepository.save(student);
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    @Transactional
    public StudentProfileDto uploadResume(Long userId, MultipartFile file) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        String resumeUrl = storageService.storeFile(file, "resumes");
        student.setResumeUrl(resumeUrl);

        // Send to AI service for parsing & NLP skill extraction
        aiMatchingService.processResumeText(student, file);

        student = studentRepository.save(student);
        return EntityDtoMappers.mapToStudentProfileDto(student);
    }

    private void recalculateCompleteness(Student student) {
        int score = 40;
        if (student.getCgpa() != null) score += 10;
        if (student.getUniversity() != null) score += 10;
        if (student.getSkills() != null && !student.getSkills().isEmpty()) score += 15;
        if (student.getProjects() != null && !student.getProjects().isEmpty()) score += 15;
        if (student.getResumeUrl() != null) score += 10;
        student.setProfileCompleteness(Math.min(100, score));
    }
}
