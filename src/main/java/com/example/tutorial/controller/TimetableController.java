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

    // OLD — keep working
    @GetMapping("/{courseId}")
    public List<TimetableDto> getTimetable(@PathVariable Long courseId) {
        return service.getTimetableByCourse(courseId);
    }

    // NEW — domain timetable for grid view
    @GetMapping
    public List<Map<String,Object>> getTimetableByDomain(
            @RequestParam(required = false) String domain
    ) {
        return service.getTimetableByDomain(domain);
    }
}
