package com.example.tutorial.service;

import com.example.tutorial.DTO.StudentDto;
import java.util.List;

public interface StudentService {
    List<StudentDto> getStudentsByCourseId(Long courseId);
}
