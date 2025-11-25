import React from "react";

export default function UserInfo({ user }) {
    return (
        <div className="card">
            <h2>User Info</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <img src={user.picture} width="80" style={{ borderRadius: "50%" }} />
        </div>
    );
}
