import React, { useEffect, useState } from "react";

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

export default function TimetableView() {
    const [domainList, setDomainList] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState("");
    const [rows, setRows] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [conflicts, setConflicts] = useState({});

    useEffect(() => {
        loadDomains();
    }, []);

    async function loadDomains() {
        try {
            const res = await fetch("/api/domains");
            const data = await res.json();
            setDomainList(data.map((d) => d.name));
        } catch (err) {
            console.error("Failed to load domains", err);
        }
    }

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

            const slots = {};
            data.forEach((r) => {
                if (!r.time) return;
                const [start, end] = r.time.split("-");
                slots[`${start}-${end}`] = { start, end, label: `${start} - ${end}` };
            });

            setTimeSlots(
                Object.values(slots).sort((a, b) => a.start.localeCompare(b.start))
            );

            setConflicts(detectConflicts(data));

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    function detectConflicts(data) {
        const map = {};
        const out = {};

        data.forEach((r, idx) => {
            if (!r.time) return;

            const [start, end] = r.time.split("-");
            const day = r.day;
            const key = `${day}|${start}-${end}`;

            if (!map[key]) map[key] = [];
            map[key].push({ ...r, _idx: idx });
        });

        Object.values(map).forEach((list) => {
            if (list.length <= 1) return;
            const roomCount = {};
            const facCount = {};

            list.forEach((i) => {
                roomCount[i.room] = (roomCount[i.room] || 0) + 1;
                facCount[i.faculty] = (facCount[i.faculty] || 0) + 1;
            });

            list.forEach((i) => {
                let problems = [];
                if (roomCount[i.room] > 1) problems.push("room");
                if (facCount[i.faculty] > 1) problems.push("faculty");

                if (problems.length) out[i._idx] = problems;
            });
        });

        return out;
    }

    function buildGrid() {
        const grid = {};
        rows.forEach((r, idx) => {
            if (!r.time) return;

            const [start, end] = r.time.split("-");
            const key = `${r.day}|${start}-${end}`;

            if (!grid[key]) grid[key] = [];
            grid[key].push({ ...r, _idx: idx });
        });
        return grid;
    }

    const grid = buildGrid();

    return (
        <div className="card">
            {/* HEADER */}
            <h2>Timetable</h2>

            {/* DOMAIN DROPDOWN */}
            <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "14px", color: "#555" }}>
                    Select Domain
                </label>
                <br />

                <select
                    value={selectedDomain}
                    onChange={(e) => {
                        const domain = e.target.value;
                        setSelectedDomain(domain);
                        fetchData(domain);
                    }}
                    style={{
                        marginTop: "6px",
                        padding: "10px",
                        width: "250px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "15px",
                        background: "white",
                        boxShadow: "0px 2px 4px rgba(0,0,0,0.05)"
                    }}
                >
                    <option value="">-- Choose Domain --</option>
                    {domainList.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
            </div>

            {/* EMPTY MESSAGE */}
            {!selectedDomain && (
                <p style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#666"
                }}>
                    Please select a domain to view its timetable.
                </p>
            )}

            {/* LOADING */}
            {loading && selectedDomain && (
                <p style={{ padding: "10px" }}>Loading...</p>
            )}

            {/* TIMETABLE GRID */}
            {!loading && selectedDomain && (
                <div style={{
                    overflowX: "auto",
                    borderRadius: "10px",
                    border: "1px solid #eee"
                }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ background: "#f0f4ff" }}>
                            <th style={thStyle}>Day / Time</th>
                            {timeSlots.map((ts) => (
                                <th key={ts.label} style={thStyle}>
                                    {ts.label}
                                </th>
                            ))}
                        </tr>
                        </thead>

                        <tbody>
                        {DAYS.map((day) => (
                            <tr key={day}>
                                <td style={{
                                    ...tdStyle,
                                    background: "#fafafa",
                                    fontWeight: "600",
                                }}>
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
                                                                ? "#ffe6e6"
                                                                : "#f9f9f9",
                                                            border: conflicts[it._idx]
                                                                ? "1px solid #ff6b6b"
                                                                : "1px solid #ddd",
                                                            padding: "10px",
                                                            borderRadius: "8px",
                                                            marginBottom: "10px",
                                                            boxShadow: "0px 2px 6px rgba(0,0,0,0.08)"
                                                        }}
                                                    >
                                                        <strong>
                                                            {it.course_code ? `${it.course_code} — ` : ""}
                                                            {it.course_name}
                                                        </strong>
                                                        <br />
                                                        <small style={{ color: "#555" }}>
                                                            {it.faculty} • Room: {it.room}
                                                        </small>

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

/* CELL STYLING */

const thStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    fontWeight: "600",
    fontSize: "14px",
    textAlign: "center",
    background: "#f7faff"
};

const tdStyle = {
    padding: "12px",
    border: "1px solid #eee",
    verticalAlign: "top",
};
