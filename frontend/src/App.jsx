import React, { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./components/Navbar";
import DomainList from "./components/DomainList";
import CourseList from "./components/CourseList";
import Timetable from "./components/TimetableView";
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

    // Fetch logged-in user
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

    // Load domains only when logged in
    useEffect(() => {
        if (user) {
            api.get("/domains").then(res => setDomains(res.data));
        }
    }, [user]);

    // 👇 DOMAIN CLICK — loads courses + timetable (merged)
    const loadDomainData = async (domainId) => {
        setSelectedDomain(domainId);
        setSelectedCourse(null);

        setStudents([]);

        // Load courses
        const c = await api.get(`/courses/${domainId}`);
        setCourses(c.data);

        // Load timetable for the domain
        const t = await api.get(`/timetable/domain/${domainId}`);
        setTimetable(t.data);
    };

    // 👇 COURSE CLICK — loads enrolled students ONLY
    const loadCourseData = async (courseId) => {
        setSelectedCourse(courseId);

        const s = await api.get(`/students/${courseId}`);
        setStudents(s.data);
    };

    // ============ LOGIN LOADING ============
    if (loadingUser) return <div>Loading...</div>;

    // ============ LOGIN PAGE ============
    if (!user) {
        const bgImage = "/campus.jpg";

        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.85)",
                        padding: "40px",
                        borderRadius: "12px",
                        textAlign: "center",
                        width: "400px",
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
                        backdropFilter: "blur(6px)"
                    }}
                >
                    <h2 style={{ marginBottom: "10px" }}>Welcome to Academic ERP</h2>
                    <p style={{ marginBottom: "25px" }}>
                        Please login using your Google account
                    </p>

                    <a href="http://localhost:8080/oauth2/authorization/google">
                        <button
                            style={{
                                backgroundColor: "#4285F4",
                                color: "#fff",
                                padding: "12px 18px",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                cursor: "pointer",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <img
                                src="https://developers.google.com/identity/images/g-logo.png"
                                alt="Google"
                                style={{ width: "20px", height: "20px" }}
                            />
                            Login with Google
                        </button>
                    </a>
                </div>
            </div>
        );
    }

    // ============ MAIN LOGGED IN UI ============
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

                {/* MAIN CONTENT */}
                <div className="content-area">
                    <Timetable timetable={timetable} />
                    <StudentList students={students} />
                </div>

            </div>
        </>
    );
}
