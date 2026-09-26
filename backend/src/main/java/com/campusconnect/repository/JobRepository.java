package com.campusconnect.repository;

import com.campusconnect.entity.Job;
import com.campusconnect.entity.JobStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {
    
    List<Job> findByRecruiterId(Long recruiterId);
    
    Page<Job> findByStatus(JobStatus status, Pageable pageable);

    @Query("SELECT j FROM Job j WHERE j.status = :status AND " +
           "(:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:jobType IS NULL OR j.jobType = :jobType) AND " +
           "(:maxCgpa IS NULL OR j.minCgpa <= :maxCgpa)")
    Page<Job> searchJobs(@Param("status") JobStatus status,
                         @Param("keyword") String keyword,
                         @Param("location") String location,
                         @Param("jobType") String jobType,
                         @Param("maxCgpa") Double maxCgpa,
                         Pageable pageable);
}
