export default function StudentList({ students }) {
    return (
        <div className="card">
            <h2>Enrolled Students</h2>

            {students.length === 0 && <p>No students found</p>}

            {students.map(s => (
                <div key={s.id} className="item">
                    <strong>{s.rollNumber}</strong> — {s.firstName} {s.lastName}
                    {s.email && (
                        <span style={{ color: "#666", marginLeft: "6px" }}>
                            ({s.email})
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
