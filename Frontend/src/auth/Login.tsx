import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setError("");
      const data = await login(email, password);

//  SAVE JWT TOKEN
localStorage.setItem("token", data.token);

//  SAVE REAL USER INFO (ADD THIS)
localStorage.setItem("email", email);

// optional (if backend sends name later)
if (data.name) {
  localStorage.setItem("name", data.name);
}

navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <p className="auth-subtitle">Welcome back</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-form">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn" onClick={handleLogin}>
            Login
          </button>
        </div>

        <div className="auth-links">
          <Link to="/forgot">Forgot Password?</Link><br />
          <Link to="/signup">Create account</Link>
        </div>
      </div>
    </div>
  );
}
