import React from "react";

export default function LoginButton({ user }) {
    return (
        <div>
            {!user ? (
                <a href="http://localhost:8080/oauth2/authorization/google">
                    <button className="login-btn">Login with Google</button>
                </a>
            ) : (
                <a href="http://localhost:8080/logout">
                    <button className="login-btn logout">Logout</button>
                </a>
            )}
        </div>
    );
}
