package com.campusconnect.repository;

import com.campusconnect.entity.Application;
import com.campusconnect.entity.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudentId(Long studentId);
    
    List<Application> findByJobId(Long jobId);

    Page<Application> findByJobId(Long jobId, Pageable pageable);

    Optional<Application> findByJobIdAndStudentId(Long jobId, Long studentId);

    Boolean existsByJobIdAndStudentId(Long jobId, Long studentId);

    long countByStudentId(Long studentId);

    long countByStudentIdAndStatus(Long studentId, ApplicationStatus status);

    long countByJobId(Long jobId);

    long countByJobIdAndStatus(Long jobId, ApplicationStatus status);
}
