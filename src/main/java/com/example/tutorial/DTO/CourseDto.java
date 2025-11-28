package com.example.tutorial.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDto {
    private Long id;
    private String code;
    private String name;
    private String facultyName; // added for display
}
