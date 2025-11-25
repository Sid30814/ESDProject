package com.example.tutorial.service.impl;

import com.example.tutorial.DTO.CourseDto;
import com.example.tutorial.entity.Course;
import com.example.tutorial.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository repo;

    public CourseService(CourseRepository repo) {
        this.repo = repo;
    }

    public List<CourseDto> getCoursesByDomain(Long domainId) {
        return repo.findByDomainId(domainId)
                .stream()
                .map(c -> new CourseDto(
                        c.getId(),
                        c.getCode(),
                        c.getName(),
                        c.getDomain().getId(),
                        c.getFacultyName()
                ))
                .collect(Collectors.toList());
    }
}
