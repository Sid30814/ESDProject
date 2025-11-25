package com.example.tutorial.repository;

import com.example.tutorial.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // Fetch students by course id (used by frontend when user selects a course)
    List<Student> findByCourseId(Long courseId);

    // If you still need domain-based lookup, keep this too
    @Query("SELECT s FROM Student s WHERE s.course.domain.id = :domainId")
    List<Student> findByDomainId(@Param("domainId") Long domainId);
}
