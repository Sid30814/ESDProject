package com.example.tutorial.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDto {
    private Long id;
    private String rollNumber;
    private String firstName;
    private String lastName;
    private Long courseId;
}
