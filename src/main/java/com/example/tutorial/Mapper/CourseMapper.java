package com.example.tutorial.Mapper;

import com.example.tutorial.DTO.CourseDto;
import com.example.tutorial.entity.Course;

public class CourseMapper {

    public static CourseDto toDto(Course c) {

        String facultyName = null;
        if (c.getFaculty() != null) {
            facultyName =
                    c.getFaculty().getFirstName() + " " +
                            c.getFaculty().getLastName();
        }

        return CourseDto.builder()
                .id(c.getId())
                .code(c.getCode())
                .name(c.getName())
                .facultyName(facultyName)
                .build();
    }
}
