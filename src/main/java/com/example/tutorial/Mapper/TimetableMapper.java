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
                .courseName(t.getCourse().getName())
                .courseCode(t.getCourse().getCode())
                .facultyName(t.getCourse().getFacultyName())
                .build();
    }
}