package com.campusconnect.service;

import com.campusconnect.entity.Application;
import com.campusconnect.entity.ApplicationStatus;
import com.campusconnect.entity.Job;
import com.campusconnect.entity.Recruiter;
import com.campusconnect.exception.ResourceNotFoundException;
import com.campusconnect.repository.ApplicationRepository;
import com.campusconnect.repository.JobRepository;
import com.campusconnect.repository.RecruiterRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecruiterService {

    private final RecruiterRepository recruiterRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public RecruiterService(RecruiterRepository recruiterRepository, JobRepository jobRepository, ApplicationRepository applicationRepository) {
        this.recruiterRepository = recruiterRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }


    public Recruiter getRecruiterByUserId(Long userId) {
        return recruiterRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruiter profile not found"));
    }

    public Map<String, Object> getRecruitmentAnalytics(Long userId) {
        Recruiter recruiter = getRecruiterByUserId(userId);
        List<Job> jobs = jobRepository.findByRecruiterId(recruiter.getId());

        int totalApplications = 0;
        int underReview = 0;
        int shortlisted = 0;
        int interview = 0;
        int selected = 0;
        int rejected = 0;

        for (Job job : jobs) {
            List<Application> apps = applicationRepository.findByJobId(job.getId());
            totalApplications += apps.size();
            for (Application app : apps) {
                if (app.getStatus() == ApplicationStatus.UNDER_REVIEW) underReview++;
                else if (app.getStatus() == ApplicationStatus.SHORTLISTED) shortlisted++;
                else if (app.getStatus() == ApplicationStatus.INTERVIEW) interview++;
                else if (app.getStatus() == ApplicationStatus.SELECTED) selected++;
                else if (app.getStatus() == ApplicationStatus.REJECTED) rejected++;
            }
        }

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("activeJobs", jobs.size());
        analytics.put("totalApplications", totalApplications);
        analytics.put("underReview", underReview);
        analytics.put("shortlisted", shortlisted);
        analytics.put("interview", interview);
        analytics.put("selected", selected);
        analytics.put("rejected", rejected);

        return analytics;
    }
}
