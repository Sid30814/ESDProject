package com.example.tutorial.repository;

import com.example.tutorial.entity.TimetableEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface TimetableRepository extends JpaRepository<TimetableEntry, Long> {
    List<TimetableEntry> findByCourseId(Long courseId);
}
