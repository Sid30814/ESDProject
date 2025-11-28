package com.example.tutorial.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

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
    private String facultyName;

    @ManyToOne
    @JoinColumn(name = "domain_id")
    private Domain domain;

    @ManyToMany(mappedBy = "courses")
    private List<Student> students;
}
