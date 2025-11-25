package com.example.tutorial.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimetableDto {

    private Long id;
    private Long courseId;
    private String day;
    private String time;
    private String room;

    private String courseName;
    private String courseCode;
    private String facultyName;
}
