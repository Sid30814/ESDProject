package com.example.tutorial.repository;

import com.example.tutorial.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    // FIX: This is what frontend & backend expect
    List<Course> findByDomainId(Long domainId);
}