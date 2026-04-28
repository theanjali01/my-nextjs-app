"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PostEditorProps {
  mode: "new" | "edit";
  postId?: number;
  initial?: {
    title: string; slug: string; description: string;
    content: string; tags: string; published: boolean;
  };
}

const defaultInitial = { title: "", slug: "", description: "", content: "", tags: "", published: false };

export default function PostEditor({ mode, postId, initial = defaultInitial }: PostEditorProps) {
  const [form, setForm] = useState(initial);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSave(published: boolean) {
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      published,
    };
    const url = mode === "edit" ? `/api/admin/posts/${postId}` : "/api/admin/posts";
    const method = mode === "edit" ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error ?? "Something went wrong.");
      setSaving(false);
    }
  }

  const inputStyle = {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
  };

  const labelStyle = { color: "var(--text-muted)", fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: "0.4rem", display: "block" };

  return (
    <div className="min-h-screen px-6 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => router.push("/admin")} className="flex items-center gap-2 text-sm mb-2 transition-colors" style={{ color: "var(--text-dim)" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to dashboard
            </button>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              {mode === "new" ? "New post" : "Edit post"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setPreview(!preview)}
              className="text-sm px-4 py-2 rounded-lg border transition-all" style={{
                borderColor: "var(--border)", color: "var(--text-muted)",
              }}>
              {preview ? "Edit" : "Preview"}
            </button>
            <button onClick={() => handleSave(false)} disabled={saving}
              className="text-sm px-4 py-2 rounded-lg border transition-all disabled:opacity-50" style={{
                borderColor: "rgba(213,110,60,0.3)", color: "var(--orange-light)",
              }}>
              Save draft
            </button>
            <button onClick={() => handleSave(true)} disabled={saving}
              className="text-sm px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50" style={{
                background: "linear-gradient(135deg, #D56E3C 0%, #C9853A 100%)",
                color: "#FFF8F4",
              }}>
              {saving ? "Publishing…" : "Publish"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
            {error}
          </div>
        )}

        {preview ? (
          /* Preview pane */
          <div className="rounded-2xl border p-8 min-h-96" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>{form.title || "Untitled"}</h2>
            {form.description && <p className="text-lg mb-6" style={{ color: "var(--text-muted)" }}>{form.description}</p>}
            <div className="prose" dangerouslySetInnerHTML={{ __html: form.content.replace(/\n/g, "<br/>") }} />
          </div>
        ) : (
          /* Edit form */
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label style={labelStyle}>Title</label>
                <input
                  style={inputStyle}
                  value={form.title}
                  onChange={(e) => {
                    set("title", e.target.value);
                    if (mode === "new") set("slug", autoSlug(e.target.value));
                  }}
                  placeholder="My awesome post"
                />
              </div>
              <div>
                <label style={labelStyle}>Slug</label>
                <input
                  style={inputStyle}
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  placeholder="my-awesome-post"
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Description</label>
              <input
                style={inputStyle}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="A short summary shown in the blog listing…"
              />
            </div>

            <div>
              <label style={labelStyle}>Tags (comma-separated)</label>
              <input
                style={inputStyle}
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="nepal, domain, cloudflare"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label style={{ ...labelStyle, marginBottom: 0 }}>Content (Markdown)</label>
                <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
                  {form.content.length} chars
                </span>
              </div>
              <textarea
                style={{ ...inputStyle, minHeight: "520px", resize: "vertical", fontFamily: "var(--font-geist-mono), monospace", lineHeight: "1.7", fontSize: "0.8125rem", borderRadius: "0.75rem" }}
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder={`# My Post Title\n\nStart writing in **Markdown**...\n\n## Section\n\nMore content here.`}
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
