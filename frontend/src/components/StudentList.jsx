export default function StudentList({ students }) {
    return (
        <div className="card">
            <h2>Enrolled Students</h2>

            {students.length === 0 && <p>No students found</p>}

            {students.map(s => (
                <div key={s.id} className="item">
                    {s.rollNumber} — {s.firstName} {s.lastName}
                </div>
            ))}
        </div>
    );
}
