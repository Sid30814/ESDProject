package com.example.tutorial.service;

import com.example.tutorial.DTO.CourseDto;
import java.util.List;

public interface CourseService {
    List<CourseDto> getCoursesByDomain(Long domainId);
}
