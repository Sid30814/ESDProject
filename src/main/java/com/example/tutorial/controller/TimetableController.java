package com.example.tutorial.controller;

import com.example.tutorial.DTO.TimetableDto;
import com.example.tutorial.service.TimetableService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
