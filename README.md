Academic ERP Portal — Full Stack (Spring Boot + React + MySQL)

A mini Academic ERP system that displays Domains → Courses → Enrolled Students and provides a weekly Timetable grid with faculty & room conflict detection.
Includes Google OAuth Login, dynamic roll number generation, domain-based course filtering, and a modern UI.
 Features
1) Authentication

Google OAuth2 login

Only whitelisted admin emails can access the dashboard

Unauthorized users are blocked and redirected

2) Academic Modules
Domains

MTech CSE, MTech ECE, MTech AI/DS

BTech CSE, BTech ECE, BTech AI/DS

IMTech CSE, IMTech ECE, IMTech AI/DS

Courses

Each course belongs to exactly one domain

Each course is taught by a faculty member

Frontend displays faculty names and course data

Students

Students belong to a domain

Students can enroll in multiple courses (Many-to-Many)

Roll numbers auto-generated according to program rules
Example:

MT2025001 (MTech)

BT2025401 (BTech)

IMT2025701 (IMTech)

3) Timetable

Displays weekly schedule in a grid

Sorted by real time (08:00 AM → 06:00 PM correctly)

Shows:

Course Code & Name

Faculty Name

Room


BACKEND STRUCTURE
src/main/java/com/example/tutorial
│
├── config
│   └── SecurityConfig.java        → Google OAuth2 security
│
├── controller
│   ├── DomainController.java
│   ├── CourseController.java
│   ├── StudentController.java
│   └── TimetableController.java
│
├── service
│   ├── DomainService.java
│   ├── CourseService.java
│   ├── StudentService.java
│   └── TimetableService.java
│
├── service/impl
│   ├── DomainServiceImpl.java
│   ├── CourseServiceImpl.java
│   ├── StudentServiceImpl.java
│   └── TimetableServiceImpl.java
│
├── repository
│   ├── DomainRepository.java
│   ├── CourseRepository.java
│   ├── FacultyRepository.java
│   ├── StudentRepository.java
│   └── TimetableRepository.java
│
├── entity
│   ├── Domain.java
│   ├── Course.java
│   ├── Faculty.java
│   ├── Student.java
│   └── TimetableEntry.java
│
└── DTO & Mapper
    └── TimetableDto, StudentDto, StudentMapper, TimetableMapper
    
FRONTEND STRUCTURE 
src/
├── components/
│   ├── Navbar.jsx
│   ├── DomainList.jsx
│   ├── CourseList.jsx
│   ├── TimetableView.jsx
│   └── StudentList.jsx
│
├── api.js
└── App.jsx
