export default function Timetable({ timetable }) {
    return (
        <div className="card">
            <h2>Timetable</h2>

            {timetable.length === 0 && <p>Select a course</p>}

            {timetable.map(t => (
                <div key={t.id} className="item">
                    <strong>{t.day} — {t.time}</strong>
                    <br />
                    Room: {t.room}
                </div>
            ))}
        </div>
    );
}
