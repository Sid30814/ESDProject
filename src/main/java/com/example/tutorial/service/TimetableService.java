package com.example.tutorial.service;

import com.example.tutorial.DTO.TimetableDto;
import java.util.List;

public interface TimetableService {
    List<TimetableDto> getTimetableByCourse(Long courseId);
}
