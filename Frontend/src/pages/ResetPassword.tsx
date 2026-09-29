import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {

  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {

      const res = await fetch(
        `http://localhost:8080/auth/reset-password/${token}?password=${password}`,
        {
          method: "POST"
        }
      );

      const data = await res.text();

      setMessage("✅ Password updated successfully");

      // redirect to login after 2 sec
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to reset password");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <br /><br />

      <button onClick={handleReset}>
        Reset Password
      </button>

      <p>{message}</p>
    </div>
  );
}