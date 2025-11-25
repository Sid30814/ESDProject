package com.example.tutorial.controller;

import com.example.tutorial.DTO.DomainDto;
import com.example.tutorial.service.DomainService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/domains")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DomainController {

    private final DomainService service;

    public DomainController(DomainService service) {
        this.service = service;
    }

    @GetMapping
    public List<DomainDto> getDomains() {
        return service.getAllDomains();
    }
}
