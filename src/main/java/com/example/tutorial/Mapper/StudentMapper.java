package com.example.tutorial.Mapper;

import com.example.tutorial.DTO.StudentDto;
import com.example.tutorial.entity.Student;

public class StudentMapper {

    public static StudentDto toDto(Student s) {

        String email = s.getEmail();
        if (email == null || email.isEmpty()) {
            email = (s.getFirstName().toLowerCase() + "." +
                    s.getLastName().toLowerCase() + "@iiitb.ac.in");
        }

        return StudentDto.builder()
                .id(s.getId())
                .rollNumber(s.getRollNumber())
                .firstName(s.getFirstName())
                .lastName(s.getLastName())
                .email(email)
                .build();
    }

    public static Student toEntity(StudentDto dto) {

        Student s = new Student();
        s.setId(dto.getId());
        s.setRollNumber(dto.getRollNumber());
        s.setFirstName(dto.getFirstName());
        s.setLastName(dto.getLastName());

        // Auto-generate email if needed
        if (dto.getEmail() == null || dto.getEmail().isEmpty()) {
            s.setEmail(dto.getFirstName().toLowerCase() + "." +
                    dto.getLastName().toLowerCase() + "@iiitb.ac.in");
        } else {
            s.setEmail(dto.getEmail());
        }

        return s;
    }
}
