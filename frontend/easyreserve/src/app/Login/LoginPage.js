import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginResult, setLoginResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setLoginResult("");
        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setLoginResult("Login failed");
                throw new Error(data.message || "Login failed");
            }
            setLoginResult("Login successful");
            console.log("Login successful", data);
            // Handle successful login, e.g., redirect or store token
        } catch (error) {
            console.error("Error:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                {loginResult && (
                    <div className={`login-result ${loginResult === "Login successful" ? "success" : "error"}`}>
                        {loginResult}
                    </div>
                )}
            </form>
        </div>
    );
};

export default LoginPage;
