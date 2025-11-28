package com.example.tutorial.service.impl;

import com.example.tutorial.DTO.CourseDto;
import com.example.tutorial.Mapper.CourseMapper;
import com.example.tutorial.repository.CourseRepository;
import com.example.tutorial.service.CourseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository repo;

    public CourseServiceImpl(CourseRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<CourseDto> getCoursesByDomain(Long domainId) {
        return repo.findByDomainId(domainId)
                .stream()
                .map(CourseMapper::toDto)
                .collect(Collectors.toList());
    }
}
