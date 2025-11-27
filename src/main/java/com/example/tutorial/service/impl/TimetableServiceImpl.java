package com.example.tutorial.service.impl;

import com.example.tutorial.DTO.TimetableDto;
import com.example.tutorial.Mapper.TimetableMapper;
import com.example.tutorial.repository.TimetableRepository;
import com.example.tutorial.service.TimetableService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TimetableServiceImpl implements TimetableService {

    private final TimetableRepository repository;

    public TimetableServiceImpl(TimetableRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<TimetableDto> getTimetableByCourse(Long courseId) {
        return repository.findByCourseId(courseId)
                .stream()
                .map(TimetableMapper::toDto)
                .collect(Collectors.toList());
    }

    // NEW
    @Override
    public List<Map<String, Object>> getTimetableByDomain(String domain) {

        if (domain == null || domain.isBlank()) {
            return repository.findAllTimetable();
        }

        return repository.findTimetableByDomain(domain);
    }
}
