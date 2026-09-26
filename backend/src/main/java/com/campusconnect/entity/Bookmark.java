package com.campusconnect.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookmarks", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"student_id", "job_id"})
})
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public Bookmark() {}

    public Bookmark(Long id, Student student, Job job, LocalDateTime createdAt) {
        this.id = id;
        this.student = student;
        this.job = job;
        this.createdAt = createdAt;
    }

    public static BookmarkBuilder builder() {
        return new BookmarkBuilder();
    }

    public static class BookmarkBuilder {
        private Long id;
        private Student student;
        private Job job;
        private LocalDateTime createdAt;

        public BookmarkBuilder id(Long id) { this.id = id; return this; }
        public BookmarkBuilder student(Student student) { this.student = student; return this; }
        public BookmarkBuilder job(Job job) { this.job = job; return this; }
        public BookmarkBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Bookmark build() {
            return new Bookmark(id, student, job, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
