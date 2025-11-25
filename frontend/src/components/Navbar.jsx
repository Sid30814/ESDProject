import React from "react";
import LoginButton from "./LoginButton";

export default function Navbar({ user }) {
    return (
        <nav className="navbar">
            <h1>Academia ERP Portal</h1>

            {/* Show login/logout button on right side */}
            <LoginButton user={user} />
        </nav>
    );
}
