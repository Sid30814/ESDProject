package com.example.tutorial.repository;

import com.example.tutorial.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // NEW: fetch students using many-to-many join
    @Query("SELECT s FROM Student s JOIN s.courses c WHERE c.id = :courseId")
    List<Student> findStudentsByCourseId(@Param("courseId") Long courseId);

    // If needed later
    @Query("SELECT s FROM Student s WHERE s.domain.id = :domainId")
    List<Student> findByDomainId(@Param("domainId") Long domainId);
}
