const API_URL = "http://localhost:8080/auth";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid email or password");
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
}

export async function signup(email: string, password: string) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  return res.text();
}

// 🔥 FIXED FORGOT PASSWORD
export async function forgotPassword(email: string) {
  const res = await fetch(
    `${API_URL}/forgot-password?email=${email}`, // ✅ IMPORTANT FIX
    {
      method: "POST"
    }
  );

  if (!res.ok) {
    throw new Error("Reset failed");
  }

  return res.text();
}