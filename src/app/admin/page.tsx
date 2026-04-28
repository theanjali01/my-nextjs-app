"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
  id: number; slug: string; title: string;
  description: string; published: boolean; created_at: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function loadPosts() {
    const res = await fetch("/api/admin/posts");
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  }

  useEffect(() => { loadPosts(); }, []);

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    setPosts((p) => p.filter((x) => x.id !== id));
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen px-6 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Admin
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Manage your blog posts</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/blog" className="text-sm px-4 py-2 rounded-lg border transition-all" style={{
              borderColor: "var(--border)", color: "var(--text-muted)",
            }}>
              View blog ↗
            </Link>
            <Link href="/admin/posts/new" className="text-sm px-4 py-2 rounded-lg font-medium transition-all" style={{
              background: "linear-gradient(135deg, #D56E3C 0%, #C9853A 100%)",
              color: "#FFF8F4",
            }}>
              + New post
            </Link>
            <button onClick={handleLogout} className="text-sm px-4 py-2 rounded-lg border transition-all" style={{
              borderColor: "rgba(239,68,68,0.3)", color: "#f87171",
            }}>
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total posts", value: posts.length },
            { label: "Published", value: posts.filter(p => p.published).length },
            { label: "Drafts", value: posts.filter(p => !p.published).length },
          ].map((s) => (
            <div key={s.label} className="p-5 rounded-2xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{s.value}</div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Posts table */}
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <div className="px-6 py-4 border-b" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
            <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>Posts</h2>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center" style={{ color: "var(--text-muted)" }}>Loading…</div>
          ) : posts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="mb-3" style={{ color: "var(--text-muted)" }}>No posts yet.</p>
              <Link href="/admin/posts/new" className="text-sm" style={{ color: "var(--orange-light)" }}>
                Write your first post →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-white/[0.02]">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-0.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono ${
                        post.published
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}>
                        {post.published ? "published" : "draft"}
                      </span>
                      <p className="text-xs font-mono truncate" style={{ color: "var(--text-dim)" }}>/{post.slug}</p>
                    </div>
                    <h3 className="font-medium truncate" style={{ color: "var(--text-primary)" }}>{post.title}</h3>
                    <p className="text-sm truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{post.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <Link href={`/blog/${post.slug}`} className="text-xs px-3 py-1.5 rounded-lg border transition-all" style={{
                      borderColor: "var(--border)", color: "var(--text-muted)",
                    }}>
                      View
                    </Link>
                    <Link href={`/admin/posts/${post.id}`} className="text-xs px-3 py-1.5 rounded-lg border transition-all" style={{
                      borderColor: "rgba(213,110,60,0.3)", color: "var(--orange-light)",
                    }}>
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(post.id, post.title)}
                      className="text-xs px-3 py-1.5 rounded-lg border transition-all" style={{
                        borderColor: "rgba(239,68,68,0.2)", color: "#f87171",
                      }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
