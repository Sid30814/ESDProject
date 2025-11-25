package com.example.tutorial.entity;

import jakarta.persistence.*;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String name;

    @Column(nullable = false)
    private String facultyName;  // <--- PREVENTS null in DB

    @ManyToOne
    @JoinColumn(name = "domain_id")
    private Domain domain;
}
