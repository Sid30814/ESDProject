import React, { useMemo } from "react";

const DAYS = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

// Convert "08:00 AM" → 800, "07:00 PM" → 1900
function to24(timeStr) {
    const [time, ampm] = timeStr.trim().split(" ");
    let [h, m] = time.split(":").map(Number);

    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;

    return h * 100 + m;
}

export default function TimetableView({ timetable }) {

    // --------------- Extract Unique Time Slots ---------------
    const timeSlots = useMemo(() => {
        const slotMap = {};

        timetable.forEach((t) => {
            const [start, end] = t.time.split("-");
            slotMap[t.time] = {
                start: start.trim(),
                end: end.trim(),
                startInt: to24(start.trim())
            };
        });

        return Object.values(slotMap).sort((a, b) => a.startInt - b.startInt);
    }, [timetable]);

    // --------------- Build Grid ---------------
    const grid = useMemo(() => {
        const g = {};

        timetable.forEach((t, idx) => {
            const [start, end] = t.time.split("-");
            const key = `${t.day}|${start.trim()}-${end.trim()}`;

            if (!g[key]) g[key] = [];
            g[key].push({ ...t, _idx: idx });
        });

        return g;
    }, [timetable]);

    return (
        <div className="card">
            <h2>Timetable</h2>

            {timetable.length === 0 && (
                <p style={{ color: "#777" }}>Select a domain to view timetable.</p>
            )}

            {timetable.length > 0 && (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ background: "#eef3ff" }}>
                            <th style={thStyle}>Day / Time</th>

                            {timeSlots.map((ts) => (
                                <th key={ts.start} style={thStyle}>
                                    {ts.start} – {ts.end}
                                </th>
                            ))}
                        </tr>
                        </thead>

                        <tbody>
                        {DAYS.map((day) => (
                            <tr key={day}>
                                <td style={{ ...tdStyle, background: "#fafafa", fontWeight: "bold" }}>
                                    {day}
                                </td>

                                {timeSlots.map((ts) => {
                                    const key = `${day}|${ts.start}-${ts.end}`;
                                    const list = grid[key] || [];

                                    return (
                                        <td key={key} style={tdStyle}>
                                            {list.length === 0 ? (
                                                <span style={{ color: "#ccc" }}>—</span>
                                            ) : (
                                                list.map((it) => (
                                                    <div
                                                        key={it._idx}
                                                        style={{
                                                            border: "1px solid #ddd",
                                                            padding: "8px",
                                                            borderRadius: "6px",
                                                            background: "#f9f9f9",
                                                            marginBottom: "8px"
                                                        }}
                                                    >
                                                        <b>{it.course_code} — {it.course_name}</b>
                                                        <br />
                                                        <small>{it.faculty} • Room {it.room}</small>
                                                    </div>
                                                ))
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
    fontWeight: "bold",
    whiteSpace: "nowrap"
};

const tdStyle = {
    padding: "10px",
    border: "1px solid #eee",
    verticalAlign: "top",
    minWidth: "150px"
};
