package com.example.tutorial.service.impl;

import com.example.tutorial.DTO.StudentDto;
import com.example.tutorial.Mapper.StudentMapper;
import com.example.tutorial.repository.StudentRepository;
import com.example.tutorial.service.StudentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository repo;

    public StudentServiceImpl(StudentRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<StudentDto> getStudentsByCourseId(Long courseId) {
        return repo.findByCourseId(courseId)
                .stream()
                .map(StudentMapper::toDto)
                .collect(Collectors.toList());
    }
}
