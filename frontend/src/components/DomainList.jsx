export default function DomainList({ domains, selectedDomain, onSelect }) {
    return (
        <div className="card">
            <h2>Domains</h2>

            {domains.map(d => (
                <div
                    key={d.id}
                    className={`item ${selectedDomain === d.id ? "selected" : ""}`}
                    onClick={() => onSelect(d.id)}
                >
                    {d.name}
                </div>
            ))}
        </div>
    );
}
