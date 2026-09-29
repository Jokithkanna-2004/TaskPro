import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = () => {
    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setSuccess("Reset link sent to your email");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <div className="auth-form">
          <input
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="auth-btn" onClick={handleReset}>
            Send Reset Link
          </button>
        </div>

        <div className="auth-links">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
