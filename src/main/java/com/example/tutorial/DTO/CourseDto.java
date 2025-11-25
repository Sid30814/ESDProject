package com.example.tutorial.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CourseDto {
    private Long id;
    private String code;
    private String name;
    private Long domainId;
    private String facultyName;
}
