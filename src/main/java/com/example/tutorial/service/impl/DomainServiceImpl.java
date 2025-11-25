package com.example.tutorial.service.impl;

import com.example.tutorial.DTO.DomainDto;
import com.example.tutorial.entity.Domain;
import com.example.tutorial.repository.DomainRepository;
import com.example.tutorial.service.DomainService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DomainServiceImpl implements DomainService {

    private final DomainRepository repo;

    public DomainServiceImpl(DomainRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<DomainDto> getAllDomains() {
        return repo.findAll()
                .stream()
                .map(domain -> DomainDto.builder()
                        .id(domain.getId())
                        .name(domain.getName())
                        .build()
                )
                .collect(Collectors.toList());
    }
}
