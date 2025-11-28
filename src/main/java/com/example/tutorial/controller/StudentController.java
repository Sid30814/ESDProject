package com.example.tutorial.controller;

import com.example.tutorial.DTO.StudentDto;
import com.example.tutorial.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping("/{courseId}")
    public List<StudentDto> getStudentsByCourse(@PathVariable Long courseId) {
        return service.getStudentsByCourseId(courseId);
    }
}
