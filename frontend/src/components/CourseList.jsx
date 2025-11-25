export default function CourseList({ courses, selectedCourse, onSelect }) {
    return (
        <div className="card">
            <h2>Courses</h2>

            {courses.length === 0 && <p>No courses</p>}

            {courses.map(c => (
                <div
                    key={c.id}
                    className={`item ${selectedCourse === c.id ? "selected" : ""}`}
                    onClick={() => onSelect(c.id)}
                >
                    <strong>{c.name}</strong>
                    <br />
                    <small>{c.facultyName}</small>
                </div>
            ))}
        </div>
    );
}
