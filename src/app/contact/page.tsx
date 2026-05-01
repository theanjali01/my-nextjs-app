"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "white",
    border: "1px solid var(--sand)",
    borderRadius: "0.25rem",
    fontSize: "1rem",
    color: "var(--ink)",
    fontFamily: "inherit",
    outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <section className="section">
        <div style={{ maxWidth: "560px", margin: "0 auto", width: "100%" }}>
          <p className="section-label">Contact</p>
          <h1 style={{
            fontFamily: "var(--font-lora), Georgia, serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 400,
            color: "var(--ink)",
            lineHeight: 1.2,
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
          }}>
            Say hello.
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--ink-light)", lineHeight: 1.75, marginBottom: "3rem" }}>
            Whether it&apos;s about travel, software, or something you read here — I&apos;d love to hear from you.
          </p>

          {status === "sent" ? (
            <div style={{
              padding: "2rem",
              background: "white",
              border: "1px solid var(--sand)",
              borderRadius: "0.375rem",
              textAlign: "center",
            }}>
              <p style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "1.25rem", color: "var(--ink)", marginBottom: "0.5rem" }}>
                Thank you.
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--ink-light)" }}>
                I&apos;ll write back when I can.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--stone-dark)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--stone-dark)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--stone-dark)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...inputStyle, resize: "vertical" }}
                  placeholder="What's on your mind?"
                />
              </div>

              {status === "error" && (
                <p style={{ fontSize: "0.875rem", color: "var(--terracotta)" }}>
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  padding: "0.875rem 2rem",
                  background: "var(--ink)",
                  color: "var(--cream)",
                  border: "none",
                  borderRadius: "0.25rem",
                  fontSize: "0.9375rem",
                  fontFamily: "inherit",
                  cursor: status === "sending" ? "wait" : "pointer",
                  alignSelf: "flex-start",
                  letterSpacing: "0.04em",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
