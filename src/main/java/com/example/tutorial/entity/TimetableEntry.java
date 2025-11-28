package com.example.tutorial.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class TimetableEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String day;
    private String time;
    private String room;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
}
