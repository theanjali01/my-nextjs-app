"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

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
  input: { width: "100%", padding: "0.75rem 1rem", border: "1px solid #D9CFC0", borderRadius: "0.625rem", background: "#fff", color: "#2C2620", fontSize: "0.9375rem", outline: "none", boxSizing: "border-box" as const, fontFamily: "inherit" },
  card: { background: "#fff", border: "1px solid #EDE8E0", borderRadius: "0.75rem", padding: "1.5rem" },
};

function rotateImageFile(file: File, degrees: number): Promise<File> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const rad = (degrees * Math.PI) / 180;
      const sin = Math.abs(Math.sin(rad));
      const cos = Math.abs(Math.cos(rad));
      const w = img.width * cos + img.height * sin;
      const h = img.width * sin + img.height * cos;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.translate(w / 2, h / 2);
      ctx.rotate(rad);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        resolve(new File([blob!], file.name, { type: "image/jpeg" }));
      }, "image/jpeg", 0.92);
    };
    img.src = url;
  });
}

export default function PostEditor({ mode, postId, initial = empty }: PostEditorProps) {
  const [form, setForm] = useState({ ...empty, ...initial });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [coverPreview, setCoverPreview] = useState<string>(initial?.coverImage ?? "");
  const [pendingCoverFile, setPendingCoverFile] = useState<File | null>(null);
  const [coverRotation, setCoverRotation] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const insertRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  function set(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function uploadFile(file: File): Promise<string> {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d.error ?? "Upload failed. Make sure Vercel Blob is set up.");
    }
    const data = await res.json();
    return data.url as string;
  }

  function handleCoverSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingCoverFile(file);
    setCoverRotation(0);
    const reader = new FileReader();
    reader.onload = ev => setCoverPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function rotateCover(deg: number) {
    if (!pendingCoverFile) return;
    const newRot = (coverRotation + deg + 360) % 360;
    setCoverRotation(newRot);
    const rotated = await rotateImageFile(pendingCoverFile, deg);
    setPendingCoverFile(rotated);
    const reader = new FileReader();
    reader.onload = ev => setCoverPreview(ev.target?.result as string);
    reader.readAsDataURL(rotated);
  }

  function removeCover() {
    setCoverPreview("");
    setPendingCoverFile(null);
    setCoverRotation(0);
    set("coverImage", "");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function insertImageIntoContent(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile(file);
      const md = `\n\n![${file.name.replace(/\.[^.]+$/, "")}](${url})\n\n`;
      const ta = textareaRef.current;
      if (ta) {
        const start = ta.selectionStart ?? form.content.length;
        const newContent = form.content.slice(0, start) + md + form.content.slice(start);
        set("content", newContent);
      } else {
        set("content", form.content + md);
      }
    } catch (err) {
      setError((err as Error).message);
    }
    if (insertRef.current) insertRef.current.value = "";
  }

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newVal = form.content.slice(0, start) + "  " + form.content.slice(end);
      set("content", newVal);
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 2; });
    }
  }, [form.content]);

  async function handleSave(published: boolean) {
    setSaving(true);
    setError("");
    try {
      let coverUrl = form.coverImage;
      if (pendingCoverFile) {
        coverUrl = await uploadFile(pendingCoverFile);
        set("coverImage", coverUrl);
      }
      const payload = {
        ...form,
        cover_image: coverUrl,
        tags: form.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
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
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  }

  const previewHtml = form.content
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^---$/gm, "<hr/>")
    .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>").replace(/$/, "</p>");

  return (
    <div style={{ paddingTop: "3rem", paddingBottom: "5rem", background: "#FAFAF8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <button onClick={() => router.push("/admin")} style={{ fontSize: "0.8125rem", color: "#9E9080", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
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

        {/* Title — big, distraction-free */}
        <div style={{ marginBottom: "1.25rem" }}>
          <input
            style={{ ...S.input, fontSize: "1.75rem", fontWeight: 700, border: "none", background: "transparent", padding: "0.5rem 0", borderBottom: "2px solid #EDE8E0", borderRadius: 0 }}
            value={form.title}
            placeholder="Entry title…"
            onChange={e => { set("title", e.target.value); if (mode === "new") set("slug", autoSlug(e.target.value)); }}
          />
        </div>

        {/* Cover image */}
        <div style={{ ...S.card, marginBottom: "1.25rem" }}>
          <label style={S.label}>Cover image</label>
          {coverPreview ? (
            <div>
              <div style={{ position: "relative", marginBottom: "0.75rem" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverPreview} alt="Cover preview" style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "0.5rem", display: "block" }} />
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button onClick={() => rotateCover(-90)} style={{ fontSize: "0.8125rem", padding: "0.375rem 0.75rem", background: "#F5F0E8", border: "1px solid #D9CFC0", borderRadius: "0.375rem", cursor: "pointer", color: "#5C5148" }}>
                  ↺ Rotate left
                </button>
                <button onClick={() => rotateCover(90)} style={{ fontSize: "0.8125rem", padding: "0.375rem 0.75rem", background: "#F5F0E8", border: "1px solid #D9CFC0", borderRadius: "0.375rem", cursor: "pointer", color: "#5C5148" }}>
                  ↻ Rotate right
                </button>
                <button onClick={removeCover} style={{ fontSize: "0.8125rem", padding: "0.375rem 0.75rem", background: "#FEF0EE", border: "1px solid #F5C6C0", borderRadius: "0.375rem", cursor: "pointer", color: "#B5453A", marginLeft: "auto" }}>
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ width: "100%", padding: "2.5rem", border: "2px dashed #D9CFC0", borderRadius: "0.625rem", background: "#FAFAF8", color: "#9E9080", fontSize: "0.875rem", cursor: "pointer", textAlign: "center" }}>
              {uploading ? "Uploading…" : "Click to upload cover photo"}
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleCoverSelect} style={{ display: "none" }} />
        </div>

        {/* Meta */}
        <div style={{ ...S.card, marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={S.label}>Subtitle / description</label>
            <input style={S.input} value={form.description} placeholder="A one-line summary shown in the listing…"
              onChange={e => set("description", e.target.value)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={S.label}>Slug (URL path)</label>
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
          <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", borderBottom: "1px solid #EDE8E0", paddingBottom: "0" }}>
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
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.75rem", color: "#BB764E", cursor: "pointer", padding: "0.375rem 0.75rem", border: "1px solid #D9CFC0", borderRadius: "0.375rem", background: "#fff" }}>
                <input ref={insertRef} type="file" accept="image/*" onChange={insertImageIntoContent} style={{ display: "none" }} />
                {uploading ? "Uploading…" : "＋ Insert image"}
              </label>
            </div>
          </div>

          {tab === "write" ? (
            <div>
              <div style={{ fontSize: "0.75rem", color: "#C4BAA8", marginBottom: "0.75rem", lineHeight: 1.6 }}>
                Markdown supported: <code style={{ background: "#F5F0E8", padding: "0 4px", borderRadius: 3 }}>**bold**</code> &nbsp;
                <code style={{ background: "#F5F0E8", padding: "0 4px", borderRadius: 3 }}>*italic*</code> &nbsp;
                <code style={{ background: "#F5F0E8", padding: "0 4px", borderRadius: 3 }}>&gt; quote</code> &nbsp;
                <code style={{ background: "#F5F0E8", padding: "0 4px", borderRadius: 3 }}>## heading</code> &nbsp;
                <code style={{ background: "#F5F0E8", padding: "0 4px", borderRadius: 3 }}>---</code> divider
              </div>
              <textarea
                ref={textareaRef}
                value={form.content}
                onChange={e => set("content", e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={"Start writing…\n\nThe drive into Mustang begins somewhere after Kagbeni…"}
                spellCheck
                style={{
                  width: "100%", minHeight: "560px", border: "none", outline: "none",
                  resize: "vertical", fontSize: "1rem", lineHeight: 2,
                  color: "#2C2620", background: "transparent",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ) : (
            <div style={{ minHeight: "560px" }}>
              {form.content ? (
                <div className="prose" style={{ maxWidth: "none" }}
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              ) : (
                <p style={{ color: "#C4BAA8", fontSize: "0.9375rem" }}>Nothing to preview yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Bottom publish bar */}
        <div style={{ ...S.card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#2C2620" }}>
              {form.published ? "Published" : "Draft"}
            </p>
            <p style={{ fontSize: "0.8125rem", color: "#9E9080" }}>
              {form.published ? "Visible to readers." : "Only you can see this."}
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
