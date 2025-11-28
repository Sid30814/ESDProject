package com.example.tutorial.service;

import com.example.tutorial.DTO.TimetableDto;

import java.util.List;
import java.util.Map;

public interface TimetableService {

    List<TimetableDto> getTimetableByCourse(Long courseId);

    List<Map<String,Object>> getTimetableByDomain(Long domainId);
}
