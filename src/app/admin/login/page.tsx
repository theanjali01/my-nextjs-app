"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Wrong password.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#FAFAF8", padding: "1.5rem",
    }}>
      <div style={{ width: "100%", maxWidth: "360px" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "1rem" }}>
            <rect width="100" height="100" rx="20" fill="#BB764E"/>
            <text x="50%" y="60%" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="50" fontWeight="bold" fill="#F7F4EF">a.</text>
          </svg>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#2C2620", marginBottom: "0.25rem" }}>Welcome back</h1>
          <p style={{ fontSize: "0.875rem", color: "#9E9080" }}>Sign in to manage your journal</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoFocus
            style={{
              width: "100%", padding: "0.875rem 1rem", marginBottom: "0.75rem",
              border: "1px solid #D9CFC0", borderRadius: "0.625rem",
              background: "#fff", color: "#2C2620", fontSize: "0.9375rem",
              outline: "none", boxSizing: "border-box",
            }}
          />
          {error && <p style={{ fontSize: "0.8125rem", color: "#B5453A", marginBottom: "0.75rem" }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "0.875rem", border: "none", borderRadius: "0.625rem",
              background: "#BB764E", color: "#FFF8F4", fontSize: "0.9375rem",
              fontWeight: 500, cursor: "pointer", opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
