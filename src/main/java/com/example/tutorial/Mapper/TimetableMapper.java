package com.example.tutorial.Mapper;

import com.example.tutorial.DTO.TimetableDto;
import com.example.tutorial.entity.TimetableEntry;

public class TimetableMapper {

    public static TimetableDto toDto(TimetableEntry t) {

        return TimetableDto.builder()
                .id(t.getId())
                .courseId(t.getCourse().getId())
                .day(t.getDay())
                .time(t.getTime())
                .room(t.getRoom())
                .courseCode(t.getCourse().getCode())
                .courseName(t.getCourse().getName())
                .facultyName(
                        t.getCourse().getFaculty() != null
                                ? t.getCourse().getFaculty().getFirstName()
                                + " " +
                                t.getCourse().getFaculty().getLastName()
                                : "Unknown"
                )
                .build();
    }
}
