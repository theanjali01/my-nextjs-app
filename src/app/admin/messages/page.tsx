"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Message {
  id: number; name: string; email: string; message: string; created_at: string;
}

const S = {
  wrap: { maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem" },
  card: { background: "#fff", border: "1px solid #EDE8E0", borderRadius: "0.75rem" },
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/messages").then(r => r.json()).then(d => { setMessages(d); setLoading(false); });
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setMessages(m => m.filter(x => x.id !== id));
  }

  return (
    <div style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <div style={S.wrap}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div>
            <Link href="/admin" style={{ fontSize: "0.8125rem", color: "#9E9080", textDecoration: "none" }}>← Back</Link>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#2C2620", marginTop: "0.5rem" }}>Messages</h1>
            <p style={{ fontSize: "0.8125rem", color: "#9E9080" }}>{messages.length} message{messages.length === 1 ? "" : "s"} from your readers</p>
          </div>
        </div>

        <div style={S.card}>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#9E9080", fontSize: "0.875rem" }}>Loading…</div>
          ) : messages.length === 0 ? (
            <div style={{ padding: "4rem", textAlign: "center", color: "#9E9080", fontSize: "0.9375rem" }}>No messages yet.</div>
          ) : (
            messages.map((m, i) => (
              <div key={m.id} style={{
                padding: "1.25rem 1.5rem",
                borderTop: i === 0 ? "none" : "1px solid #EDE8E0",
              }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "0.5rem", gap: "1rem" }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#2C2620" }}>{m.name}</span>
                    <a href={`mailto:${m.email}`} style={{ fontSize: "0.8125rem", color: "#BB764E", marginLeft: "0.625rem", textDecoration: "none" }}>{m.email}</a>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#C4BAA8", fontFamily: "var(--font-geist-mono), monospace", flexShrink: 0 }}>
                    {new Date(m.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "#4A4036", lineHeight: 1.65, whiteSpace: "pre-wrap", marginBottom: "0.75rem" }}>
                  {m.message}
                </p>
                <button
                  onClick={() => handleDelete(m.id)}
                  style={{ fontSize: "0.75rem", color: "#B5453A", background: "none", border: "1px solid #EDE8E0", borderRadius: "0.375rem", padding: "0.25rem 0.625rem", cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
