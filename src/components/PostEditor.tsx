"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PostEditorProps {
  mode: "new" | "edit";
  postId?: number;
  initial?: {
    title: string; slug: string; description: string;
    content: string; tags: string; published: boolean; coverImage?: string;
  };
}

const empty = { title: "", slug: "", description: "", content: "", tags: "", published: false, coverImage: "" };

const S = {
  label: { fontSize: "0.75rem", fontWeight: 500, color: "#9E9080", letterSpacing: "0.05em", textTransform: "uppercase" as const, display: "block", marginBottom: "0.4rem" },
  input: { width: "100%", padding: "0.75rem 1rem", border: "1px solid #D9CFC0", borderRadius: "0.625rem", background: "#fff", color: "#2C2620", fontSize: "0.9375rem", outline: "none", boxSizing: "border-box" as const },
  card: { background: "#fff", border: "1px solid #EDE8E0", borderRadius: "0.75rem", padding: "1.5rem" },
};

export default function PostEditor({ mode, postId, initial = empty }: PostEditorProps) {
  const [form, setForm] = useState({ ...empty, ...initial });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function set(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function uploadImage(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    return data.url as string;
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    set("coverImage", url);
  }

  async function insertImageIntoContent(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    const md = `\n![${file.name}](${url})\n`;
    set("content", form.content + md);
  }

  async function handleSave(published: boolean) {
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      cover_image: form.coverImage,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      published,
    };
    const url = mode === "edit" ? `/api/admin/posts/${postId}` : "/api/admin/posts";
    const method = mode === "edit" ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error ?? "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <div style={{ paddingTop: "3rem", paddingBottom: "5rem", background: "#FAFAF8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <button onClick={() => router.push("/admin")} style={{ fontSize: "0.8125rem", color: "#9E9080", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "0.375rem" }}>
            ← Dashboard
          </button>
          <div style={{ display: "flex", gap: "0.625rem" }}>
            <button onClick={() => handleSave(false)} disabled={saving} style={{ fontSize: "0.8125rem", color: "#BB764E", background: "#fff", border: "1px solid #D9CFC0", borderRadius: "0.5rem", padding: "0.5rem 1rem", cursor: "pointer", opacity: saving ? 0.6 : 1 }}>
              Save draft
            </button>
            <button onClick={() => handleSave(true)} disabled={saving} style={{ fontSize: "0.8125rem", color: "#FFF8F4", background: "#BB764E", border: "none", borderRadius: "0.5rem", padding: "0.5rem 1rem", fontWeight: 500, cursor: "pointer", opacity: saving ? 0.6 : 1 }}>
              {saving ? "Publishing…" : "Publish"}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ marginBottom: "1rem", padding: "0.75rem 1rem", background: "#FEF0EE", border: "1px solid #F5C6C0", borderRadius: "0.625rem", fontSize: "0.875rem", color: "#B5453A" }}>
            {error}
          </div>
        )}

        {/* Cover image */}
        <div style={{ ...S.card, marginBottom: "1.25rem" }}>
          <label style={S.label}>Cover image</label>
          {form.coverImage ? (
            <div style={{ position: "relative" }}>
              <Image src={form.coverImage} alt="Cover" width={720} height={400} style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "0.5rem", display: "block" }} />
              <button onClick={() => set("coverImage", "")} style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: "0.375rem", padding: "0.25rem 0.5rem", fontSize: "0.75rem", cursor: "pointer" }}>
                Remove
              </button>
            </div>
          ) : (
            <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ width: "100%", padding: "2.5rem", border: "2px dashed #D9CFC0", borderRadius: "0.625rem", background: "#FAFAF8", color: "#9E9080", fontSize: "0.875rem", cursor: "pointer", textAlign: "center" }}>
              {uploading ? "Uploading…" : "Click to upload cover photo"}
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleCoverUpload} style={{ display: "none" }} />
        </div>

        {/* Title & meta */}
        <div style={{ ...S.card, marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "1.125rem" }}>
          <div>
            <label style={S.label}>Title</label>
            <input style={{ ...S.input, fontSize: "1.25rem", fontWeight: 600 }} value={form.title} placeholder="Entry title…"
              onChange={e => { set("title", e.target.value); if (mode === "new") set("slug", autoSlug(e.target.value)); }} />
          </div>
          <div>
            <label style={S.label}>Subtitle / description</label>
            <input style={S.input} value={form.description} placeholder="A one-line summary shown in the listing…"
              onChange={e => set("description", e.target.value)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={S.label}>Slug (URL)</label>
              <input style={S.input} value={form.slug} placeholder="my-entry-title"
                onChange={e => set("slug", e.target.value)} />
            </div>
            <div>
              <label style={S.label}>Tags (comma separated)</label>
              <input style={S.input} value={form.tags} placeholder="travel, mustang, nepal"
                onChange={e => set("tags", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Content editor */}
        <div style={{ ...S.card, marginBottom: "1.25rem" }}>
          {/* Tab bar */}
          <div style={{ display: "flex", gap: "0", marginBottom: "1.25rem", borderBottom: "1px solid #EDE8E0", paddingBottom: "0" }}>
            {(["write", "preview"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                fontSize: "0.8125rem", fontWeight: 500, padding: "0.5rem 1rem",
                background: "none", border: "none", cursor: "pointer",
                color: tab === t ? "#BB764E" : "#9E9080",
                borderBottom: tab === t ? "2px solid #BB764E" : "2px solid transparent",
                marginBottom: "-1px", textTransform: "capitalize",
              }}>
                {t}
              </button>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
              <label style={{ ...S.label, margin: 0, cursor: "pointer", fontSize: "0.75rem", color: "#BB764E" }}>
                <input type="file" accept="image/*" onChange={insertImageIntoContent} style={{ display: "none" }} />
                {uploading ? "Uploading…" : "+ Insert image"}
              </label>
            </div>
          </div>

          {tab === "write" ? (
            <textarea
              value={form.content}
              onChange={e => set("content", e.target.value)}
              placeholder={"Start writing in Markdown…\n\nUse **bold**, *italic*, > blockquotes\n\n## Headings\n\nAnd so on."}
              spellCheck
              style={{
                width: "100%", minHeight: "480px", border: "none", outline: "none",
                resize: "vertical", fontSize: "0.9375rem", lineHeight: 1.8,
                color: "#2C2620", background: "transparent", fontFamily: "var(--font-geist-mono), monospace",
                boxSizing: "border-box",
              }}
            />
          ) : (
            <div style={{ minHeight: "480px" }}>
              {form.content ? (
                <div className="prose" style={{ maxWidth: "none" }}
                  dangerouslySetInnerHTML={{ __html: form.content
                    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
                    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
                    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*(.+?)\*/g, "<em>$1</em>")
                    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
                    .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" />')
                    .replace(/\n\n/g, "</p><p>")
                    .replace(/^/, "<p>").replace(/$/, "</p>")
                  }}
                />
              ) : (
                <p style={{ color: "#C4BAA8", fontSize: "0.9375rem" }}>Nothing to preview yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Publish status */}
        <div style={{ ...S.card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#2C2620" }}>
              {form.published ? "Published" : "Draft"}
            </p>
            <p style={{ fontSize: "0.8125rem", color: "#9E9080" }}>
              {form.published ? "Visible to readers on your journal." : "Only you can see this."}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.625rem" }}>
            <button onClick={() => handleSave(false)} disabled={saving} style={{ fontSize: "0.875rem", color: "#BB764E", background: "#fff", border: "1px solid #D9CFC0", borderRadius: "0.5rem", padding: "0.625rem 1.25rem", cursor: "pointer" }}>
              Save draft
            </button>
            <button onClick={() => handleSave(true)} disabled={saving} style={{ fontSize: "0.875rem", color: "#FFF8F4", background: "#BB764E", border: "none", borderRadius: "0.5rem", padding: "0.625rem 1.25rem", fontWeight: 500, cursor: "pointer" }}>
              {saving ? "…" : "Publish"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
