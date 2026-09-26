package com.campusconnect.repository;

import com.campusconnect.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByStudentId(Long studentId);
    Optional<Bookmark> findByStudentIdAndJobId(Long studentId, Long jobId);
    Boolean existsByStudentIdAndJobId(Long studentId, Long jobId);
    void deleteByStudentIdAndJobId(Long studentId, Long jobId);
}
