"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
  id: number; slug: string; title: string;
  description: string; published: boolean; created_at: string;
  views: number;
}

type Filter = "all" | "published" | "drafts";

const S = {
  wrap: { maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem" },
  card: { background: "#fff", border: "1px solid #EDE8E0", borderRadius: "0.75rem" },
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [busyId, setBusyId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/posts").then(r => r.json()).then(d => { setPosts(d); setLoading(false); });
  }, []);

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    setPosts(p => p.filter(x => x.id !== id));
  }

  async function handleTogglePublish(post: Post) {
    setBusyId(post.id);
    const next = !post.published;
    const res = await fetch(`/api/admin/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: next }),
    });
    if (res.ok) {
      setPosts(p => p.map(x => x.id === post.id ? { ...x, published: next } : x));
    }
    setBusyId(null);
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  const published = posts.filter(p => p.published).length;
  const drafts = posts.filter(p => !p.published).length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views ?? 0), 0);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter(p => filter === "all" ? true : filter === "published" ? p.published : !p.published)
      .filter(p => !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q));
  }, [posts, query, filter]);

  return (
    <div style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <div style={S.wrap}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="20" fill="#BB764E"/>
              <text x="50%" y="60%" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="50" fontWeight="bold" fill="#F7F4EF">a.</text>
            </svg>
            <div>
              <h1 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#2C2620" }}>Journal</h1>
              <p style={{ fontSize: "0.75rem", color: "#9E9080" }}>Your writing, all in one place</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.625rem" }}>
            <Link href="/" style={{ fontSize: "0.8125rem", color: "#9E9080", textDecoration: "none", padding: "0.5rem 0.875rem", border: "1px solid #D9CFC0", borderRadius: "0.5rem" }}>
              ← Site
            </Link>
            <Link href="/admin/messages" style={{ fontSize: "0.8125rem", color: "#9E9080", textDecoration: "none", padding: "0.5rem 0.875rem", border: "1px solid #D9CFC0", borderRadius: "0.5rem" }}>
              Messages
            </Link>
            <Link href="/admin/posts/new" style={{ fontSize: "0.8125rem", color: "#FFF8F4", background: "#BB764E", textDecoration: "none", padding: "0.5rem 0.875rem", borderRadius: "0.5rem", fontWeight: 500 }}>
              + New entry
            </Link>
            <button onClick={handleLogout} style={{ fontSize: "0.8125rem", color: "#9E9080", background: "none", border: "1px solid #D9CFC0", borderRadius: "0.5rem", padding: "0.5rem 0.875rem", cursor: "pointer" }}>
              Sign out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total entries", value: posts.length },
            { label: "Published", value: published },
            { label: "Drafts", value: drafts },
            { label: "Total views", value: totalViews.toLocaleString() },
          ].map(s => (
            <div key={s.label} style={{ ...S.card, padding: "1.25rem 1.5rem" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 600, color: "#2C2620", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.8125rem", color: "#9E9080", marginTop: "0.375rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters + search */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "0.875rem" }}>
          <div style={{ display: "flex", gap: "0.375rem" }}>
            {(["all", "published", "drafts"] as Filter[]).map(f => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    fontSize: "0.8125rem",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "0.5rem",
                    border: `1px solid ${active ? "#BB764E" : "#D9CFC0"}`,
                    background: active ? "#BB764E" : "#fff",
                    color: active ? "#FFF8F4" : "#5C5145",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search entries…"
            style={{
              flex: "0 1 240px",
              fontSize: "0.8125rem",
              padding: "0.5rem 0.75rem",
              border: "1px solid #D9CFC0",
              borderRadius: "0.5rem",
              background: "#fff",
              color: "#2C2620",
              outline: "none",
            }}
          />
        </div>

        {/* Posts list */}
        <div style={S.card}>
          <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #EDE8E0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#2C2620" }}>
              Entries {visible.length !== posts.length && <span style={{ color: "#9E9080", fontWeight: 400 }}>· {visible.length} of {posts.length}</span>}
            </span>
          </div>

          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#9E9080", fontSize: "0.875rem" }}>Loading…</div>
          ) : visible.length === 0 ? (
            <div style={{ padding: "4rem", textAlign: "center" }}>
              {posts.length === 0 ? (
                <>
                  <p style={{ color: "#9E9080", fontSize: "0.9375rem", marginBottom: "1rem" }}>No entries yet.</p>
                  <Link href="/admin/posts/new" style={{ fontSize: "0.875rem", color: "#BB764E", textDecoration: "none" }}>Write your first entry →</Link>
                </>
              ) : (
                <p style={{ color: "#9E9080", fontSize: "0.9375rem" }}>No entries match.</p>
              )}
            </div>
          ) : (
            visible.map((post, i) => (
              <div key={post.id} style={{
                padding: "1.125rem 1.5rem",
                borderTop: i === 0 ? "none" : "1px solid #EDE8E0",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                opacity: busyId === post.id ? 0.5 : 1,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: "0.6875rem", fontWeight: 500, padding: "0.15rem 0.5rem", borderRadius: "100px",
                      background: post.published ? "#EDFAF3" : "#FEF9EC",
                      color: post.published ? "#1A7A4A" : "#92610A",
                      border: `1px solid ${post.published ? "#B6EDD4" : "#F5DFAB"}`,
                    }}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#C4BAA8", fontFamily: "var(--font-geist-mono), monospace" }}>
                      {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#9E9080", fontFamily: "var(--font-geist-mono), monospace" }}>
                      {(post.views ?? 0).toLocaleString()} {post.views === 1 ? "view" : "views"}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#2C2620", marginBottom: "0.125rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {post.title}
                  </p>
                  <p style={{ fontSize: "0.8125rem", color: "#9E9080", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {post.description}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button
                    onClick={() => handleTogglePublish(post)}
                    disabled={busyId === post.id}
                    style={{ fontSize: "0.8125rem", color: post.published ? "#92610A" : "#1A7A4A", background: "none", border: "1px solid #D9CFC0", borderRadius: "0.375rem", padding: "0.375rem 0.75rem", cursor: "pointer" }}
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                  <Link href={`/journal/${post.slug}`} target="_blank" style={{ fontSize: "0.8125rem", color: "#9E9080", textDecoration: "none", padding: "0.375rem 0.75rem", border: "1px solid #D9CFC0", borderRadius: "0.375rem" }}>
                    View
                  </Link>
                  <Link href={`/admin/posts/${post.id}`} style={{ fontSize: "0.8125rem", color: "#BB764E", textDecoration: "none", padding: "0.375rem 0.75rem", border: "1px solid #D9CFC0", borderRadius: "0.375rem" }}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(post.id, post.title)} style={{ fontSize: "0.8125rem", color: "#B5453A", background: "none", border: "1px solid #EDE8E0", borderRadius: "0.375rem", padding: "0.375rem 0.75rem", cursor: "pointer" }}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
