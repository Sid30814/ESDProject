package com.example.tutorial.controller;

import com.example.tutorial.DTO.CourseDto;
import com.example.tutorial.service.impl.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping("/{domainId}")
    public List<CourseDto> getCourses(@PathVariable Long domainId) {
        return service.getCoursesByDomain(domainId);
    }
}