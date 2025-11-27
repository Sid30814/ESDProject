package com.example.tutorial.repository;

import com.example.tutorial.entity.TimetableEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface TimetableRepository extends JpaRepository<TimetableEntry, Long> {

    // Existing endpoint
    List<TimetableEntry> findByCourseId(Long courseId);

    // NEW: domain timetable
    @Query("""
        SELECT new map(
            t.day AS day,
            t.time AS time,
            t.room AS room,
            c.code AS course_code,
            c.name AS course_name,
            c.facultyName AS faculty,
            d.name AS domain
        )
        FROM TimetableEntry t
        JOIN t.course c
        JOIN c.domain d
        WHERE d.name = :domain
        ORDER BY t.day, t.time
        """)
    List<Map<String, Object>> findTimetableByDomain(@Param("domain") String domain);


    // NEW: fetch ALL domains' timetables
    @Query("""
        SELECT new map(
            t.day AS day,
            t.time AS time,
            t.room AS room,
            c.code AS course_code,
            c.name AS course_name,
            c.facultyName AS faculty,
            d.name AS domain
        )
        FROM TimetableEntry t
        JOIN t.course c
        JOIN c.domain d
        ORDER BY d.name, t.day, t.time
        """)
    List<Map<String, Object>> findAllTimetable();
}
