package com.example.tutorial.controller;

import com.example.tutorial.DTO.TimetableDto;
import com.example.tutorial.service.TimetableService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/timetable")
public class TimetableController {

    private final TimetableService service;

    public TimetableController(TimetableService service) {
        this.service = service;
    }

    @GetMapping("/{courseId}")
    public List<TimetableDto> getTimetable(@PathVariable Long courseId) {
        return service.getTimetableByCourse(courseId);
    }

    // FIXED ENDPOINT
    @GetMapping("/domain/{domainId}")
    public List<Map<String,Object>> getTimetableByDomain(@PathVariable Long domainId) {
        return service.getTimetableByDomain(domainId);
    }
}
