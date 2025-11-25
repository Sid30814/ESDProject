package com.example.tutorial.Mapper;

import com.example.tutorial.DTO.StudentDto;
import com.example.tutorial.entity.Student;

public class StudentMapper {

    public static StudentDto toDto(Student s) {
        return StudentDto.builder()
                .id(s.getId())
                .rollNumber(s.getRollNumber())
                .firstName(s.getFirstName())
                .lastName(s.getLastName())
                .courseId(s.getCourse() != null ? s.getCourse().getId() : null)
                .build();
    }

    public static Student toEntity(StudentDto dto) {
        Student s = new Student();
        s.setId(dto.getId());
        s.setRollNumber(dto.getRollNumber());
        s.setFirstName(dto.getFirstName());
        s.setLastName(dto.getLastName());
        return s;
    }
}
