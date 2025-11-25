package com.example.tutorial.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rollNumber;
    private String firstName;
    private String lastName;

    // Student should reference Course so Builder has course(...) method
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
}
