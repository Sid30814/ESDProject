package com.example.tutorial.repository;

import com.example.tutorial.entity.TimetableEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface TimetableRepository extends JpaRepository<TimetableEntry, Long> {

    List<TimetableEntry> findByCourseId(Long courseId);

    @Query("""
        SELECT 
            c.code AS course_code,
            c.name AS course_name,
            CONCAT(f.firstName, ' ', f.lastName) AS faculty,
            d.name AS domain,
            t.day AS day,
            t.time AS time,
            t.room AS room
        FROM TimetableEntry t
        JOIN Course c ON t.course.id = c.id
        JOIN Domain d ON c.domain.id = d.id
        JOIN Faculty f ON c.faculty.id = f.id
        WHERE d.id = :domainId
        ORDER BY t.day, t.time
    """)
    List<Map<String,Object>> findTimetableByDomain(Long domainId);


    @Query("""
        SELECT 
            c.code AS course_code,
            c.name AS course_name,
            CONCAT(f.firstName, ' ', f.lastName) AS faculty,
            d.name AS domain,
            t.day AS day,
            t.time AS time,
            t.room AS room
        FROM TimetableEntry t
        JOIN Course c ON t.course.id = c.id
        JOIN Domain d ON c.domain.id = d.id
        JOIN Faculty f ON c.faculty.id = f.id
        ORDER BY t.day, t.time
    """)
    List<Map<String,Object>> findAllTimetable();
}
