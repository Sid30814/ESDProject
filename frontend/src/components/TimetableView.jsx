import React, { useEffect, useState } from "react";

const DAYS = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

// Convert "08:00 AM" → 0800, "06:00 PM" → 1800
function to24HourFormat(timeStr) {
    const [time, ampm] = timeStr.trim().split(" ");
    let [h, m] = time.split(":").map(Number);

    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;

    return h * 100 + m;
}

export default function TimetableView() {
    const [domainList, setDomainList] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState("");
    const [rows, setRows] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [conflicts, setConflicts] = useState({});

    // Load domain names
    useEffect(() => {
        (async () => {
            const res = await fetch("/api/domains");
            const data = await res.json();
            setDomainList(data.map((d) => d.name));
        })();
    }, []);

    async function fetchData(domain) {
        if (!domain) {
            setRows([]);
            setTimeSlots([]);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`/api/timetable?domain=${encodeURIComponent(domain)}`);
            const data = await res.json();

            setRows(data);

            // Extract unique times
            const slotMap = {};
            data.forEach((r) => {
                const [start, end] = r.time.split("-");
                const s = start.trim();
                const e = end.trim();
                slotMap[`${s}-${e}`] = {
                    start: s,
                    end: e,
                    startInt: to24HourFormat(s)
                };
            });

            // Sort properly by real time
            setTimeSlots(
                Object.values(slotMap).sort((a, b) => a.startInt - b.startInt)
            );

            setConflicts(detectConflicts(data));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // Detect room & faculty conflicts
    function detectConflicts(data) {
        const map = {};
        const out = {};

        data.forEach((r, idx) => {
            const [start] = r.time.split("-");
            const key = `${r.day}|${start.trim()}`;
            if (!map[key]) map[key] = [];
            map[key].push({ ...r, _idx: idx });
        });

        Object.values(map).forEach((list) => {
            if (list.length <= 1) return;
            const roomCount = {};
            const facCount = {};

            list.forEach((x) => {
                roomCount[x.room] = (roomCount[x.room] || 0) + 1;
                facCount[x.faculty] = (facCount[x.faculty] || 0) + 1;
            });

            list.forEach((x) => {
                let problems = [];
                if (roomCount[x.room] > 1) problems.push("Room");
                if (facCount[x.faculty] > 1) problems.push("Faculty");

                if (problems.length) out[x._idx] = problems;
            });
        });

        return out;
    }

    // Build timetable grid
    function buildGrid() {
        const grid = {};

        rows.forEach((r, idx) => {
            const [start, end] = r.time.split("-");
            const key = `${r.day}|${start.trim()}-${end.trim()}`;
            if (!grid[key]) grid[key] = [];
            grid[key].push({ ...r, _idx: idx });
        });

        return grid;
    }

    const grid = buildGrid();

    return (
        <div className="card">
            <h2>Timetable</h2>

            {/* Domain Dropdown */}
            <div style={{ marginBottom: "20px" }}>
                <select
                    value={selectedDomain}
                    onChange={(e) => {
                        setSelectedDomain(e.target.value);
                        fetchData(e.target.value);
                    }}
                    style={{ padding: "10px", fontSize: "15px" }}
                >
                    <option value="">-- Select Domain --</option>
                    {domainList.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>

            {!selectedDomain && <p>Select a domain to view timetable.</p>}

            {loading && <p>Loading...</p>}

            {!loading && selectedDomain && (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ background: "#eef3ff" }}>
                            <th style={thStyle}>Day / Time</th>

                            {timeSlots.map((ts) => (
                                <th key={ts.start} style={thStyle}>
                                    {ts.start} - {ts.end}
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
                                                <span style={{ color: "#bbb" }}>—</span>
                                            ) : (
                                                list.map((it) => (
                                                    <div
                                                        key={it._idx}
                                                        style={{
                                                            background: conflicts[it._idx]
                                                                ? "#ffeaea"
                                                                : "#f9f9f9",
                                                            border: conflicts[it._idx]
                                                                ? "1px solid #ff4d4d"
                                                                : "1px solid #ddd",
                                                            padding: "8px",
                                                            borderRadius: "6px",
                                                            marginBottom: "8px"
                                                        }}
                                                    >
                                                        <b>{it.course_code} — {it.course_name}</b>
                                                        <br />
                                                        <small>{it.faculty} • Room {it.room}</small>

                                                        {conflicts[it._idx] && (
                                                            <div style={{ color: "red", fontSize: "12px" }}>
                                                                Conflict: {conflicts[it._idx].join(", ")}
                                                            </div>
                                                        )}
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
    fontWeight: "bold"
};

const tdStyle = {
    padding: "10px",
    border: "1px solid #eee",
    verticalAlign: "top"
};
