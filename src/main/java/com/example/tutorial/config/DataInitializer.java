//package com.example.tutorial.config;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import com.example.tutorial.entity.*;
//import com.example.tutorial.repository.*;
//
//@Configuration
//public class DataInitializer {
//
//    @Bean
//    CommandLineRunner init(DomainRepository domainRepository,
//                           CourseRepository courseRepository,
//                           StudentRepository studentRepository,
//                           TimetableRepository timetableRepository) {
//
//        return args -> {
//
//            // ----------- DOMAINS -----------
//            Domain d1 = Domain.builder().name("MTech CSE").build();
//            Domain d2 = Domain.builder().name("MTech ECE").build();
//            domainRepository.save(d1);
//            domainRepository.save(d2);
//
//            // ----------- COURSES -----------
//            Course c1 = Course.builder()
//                    .code("CSE501")
//                    .name("Advanced Algorithms")
//                    .facultyName("Dr. Sharma")
//                    .domain(d1)
//                    .build();
//
//            Course c2 = Course.builder()
//                    .code("CSE502")
//                    .name("Operating Systems")
//                    .facultyName("Prof. Mehta")
//                    .domain(d1)
//                    .build();
//
//
//            courseRepository.save(c1);
//            courseRepository.save(c2);
//
//            // ----------- STUDENTS -----------
//            Student s1 = Student.builder()
//                    .rollNumber("CSE2001")
//                    .firstName("Amit")
//                    .lastName("Patel")
//                    .course(c1)                 // <– Students must reference Course, NOT Domain
//                    .build();
//
//            Student s2 = Student.builder()
//                    .rollNumber("CSE2002")
//                    .firstName("Neha")
//                    .lastName("Sharma")
//                    .course(c1)                 // <– Both enrolled in Course c1
//                    .build();
//
//            studentRepository.save(s1);
//            studentRepository.save(s2);
//
//            // ----------- TIMETABLE -----------
//            TimetableEntry t1 = TimetableEntry.builder()
//                    .course(c1)
//                    .day("Monday")
//                    .time("10:00-11:00")
//                    .room("A101")
//                    .build();
//
//            TimetableEntry t2 = TimetableEntry.builder()
//                    .course(c2)
//                    .day("Tuesday")
//                    .time("11:00-12:00")
//                    .room("B202")
//                    .build();
//
//            timetableRepository.save(t1);
//            timetableRepository.save(t2);
//        };
//    }
//}
