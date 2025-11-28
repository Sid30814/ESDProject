import React, { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./components/Navbar";
import DomainList from "./components/DomainList";
import CourseList from "./components/CourseList";
import TimetableView from "./components/TimetableView";
import StudentList from "./components/StudentList";

export default function App() {

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const [domains, setDomains] = useState([]);
    const [courses, setCourses] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [students, setStudents] = useState([]);

    const [selectedDomain, setSelectedDomain] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    // --------------------- FETCH LOGGED-IN USER ---------------------
    useEffect(() => {
        api.get("/user")
            .then(res => {
                setUser(res.data);
                setLoadingUser(false);
            })
            .catch(() => {
                setUser(null);
                setLoadingUser(false);
            });
    }, []);

    // --------------------- FETCH DOMAINS WHEN LOGGED-IN ---------------------
    useEffect(() => {
        if (user) {
            api.get("/domains").then(res => setDomains(res.data));
        }
    }, [user]);

    // ---------------------------------------------------------
    // DOMAIN CLICK → loads courses + full domain-wise timetable
    // ---------------------------------------------------------
    const loadDomainData = async (domainId) => {
        setSelectedDomain(domainId);
        setSelectedCourse(null);
        setStudents([]);

        // Fetch all courses under selected domain
        const c = await api.get(`/courses/${domainId}`);
        setCourses(c.data);

        // Fetch full timetable for the selected domain
        const t = await api.get(`/timetable/domain/${domainId}`);
        setTimetable(t.data);
    };

    // ---------------------------------------------------------
    // COURSE CLICK → loads enrolled students
    // ---------------------------------------------------------
    const loadCourseData = async (courseId) => {
        setSelectedCourse(courseId);

        const s = await api.get(`/students/${courseId}`);
        setStudents(s.data);
    };

    // --------------------- LOADING ---------------------
    if (loadingUser) return <div>Loading...</div>;

    // --------------------- LOGIN PAGE (INLINE UI) ---------------------
    if (!user) {
        const bgImage = "/19198406.jpg";

        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backdropFilter: "blur(3px)"
                }}
            >
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.85)",
                        padding: "40px",
                        borderRadius: "16px",
                        textAlign: "center",
                        width: "420px",
                        boxShadow: "0 4px 25px rgba(0,0,0,0.3)",
                        animation: "fadeIn 0.8s",
                    }}
                >
                    <h2 style={{ fontSize: "26px", marginBottom: "10px", color: "#333" }}>
                        Welcome to Academic ERP
                    </h2>

                    <p style={{ marginBottom: "25px", color: "#555", fontSize: "15px" }}>
                        Login using your IIITB Google account
                    </p>

                    <a href="http://localhost:8080/oauth2/authorization/google">
                        <button
                            style={{
                                backgroundColor: "#4285F4",
                                color: "white",
                                padding: "12px 18px",
                                borderRadius: "10px",
                                border: "none",
                                fontSize: "17px",
                                width: "100%",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "12px",
                                transition: "0.3s",
                            }}
                            onMouseOver={(e) => e.target.style.transform = "scale(1.03)"}
                            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                        >
                            <img
                                src="https://developers.google.com/identity/images/g-logo.png"
                                alt="Google"
                                style={{ width: "22px", height: "22px" }}
                            />
                            Sign in with Google
                        </button>
                    </a>
                </div>
            </div>
        );
    }

    // --------------------- MAIN DASHBOARD ---------------------
    return (
        <>
            <Navbar user={user} />

            <div className="layout">

                {/* LEFT SIDEBAR */}
                <div className="sidebar">
                    <DomainList
                        domains={domains}
                        selectedDomain={selectedDomain}
                        onSelect={loadDomainData}
                    />

                    <CourseList
                        courses={courses}
                        selectedCourse={selectedCourse}
                        onSelect={loadCourseData}
                    />
                </div>

                {/* RIGHT CONTENT AREA */}
                <div className="content-area">
                    <TimetableView timetable={timetable} />
                    <StudentList students={students} />
                </div>
            </div>
        </>
    );
}
