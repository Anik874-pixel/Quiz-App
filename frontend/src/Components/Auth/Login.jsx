import React, { useState, useRef } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const errorRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("username", email.trim());
      params.append("password", password.trim());

      const res = await axios.post(`${API}/auth/login`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", res.data.access_token);
      setSuccess("Login successful! Redirecting...");
      setError("");

      setTimeout(() => {
        navigate("/domains");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
      setSuccess("");
      if (errorRef.current) {
        errorRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Welcome Back!</h2>
        <p className="auth-subtitle">Log in to continue your quiz journey ✨</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="auth-error" ref={errorRef}>
            ❌ {error}
          </p>
        )}
        {success && <p className="auth-success">✅ {success}</p>}
      </div>
    </div>
  );
};

export default Login;
