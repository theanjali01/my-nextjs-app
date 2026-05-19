import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag} — Anjali Shrestha`,
    description: `Journal entries tagged with #${tag}.`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((p) => p.tags.includes(tag));

  if (posts.length === 0) notFound();

  return (
    <div style={{ minHeight: "100vh", paddingTop: "7rem", paddingBottom: "6rem", background: "var(--cream)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 1.5rem" }}>
        <Link href="/journal" style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          fontSize: "0.8125rem", letterSpacing: "0.04em",
          color: "var(--stone-dark)", textDecoration: "none",
          marginBottom: "2.5rem",
        }}>
          ← Journal
        </Link>

        <p className="section-label">Tag</p>
        <h1 style={{
          fontFamily: "var(--font-lora), Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 2.75rem)",
          fontWeight: 400,
          color: "var(--ink)",
          letterSpacing: "-0.02em",
          marginBottom: "0.75rem",
        }}>
          #{tag}
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--ink-light)", marginBottom: "4rem", lineHeight: 1.6 }}>
          {posts.length} {posts.length === 1 ? "entry" : "entries"}.
        </p>

        <div>
          {posts.map((post, i) => (
            <div key={post.slug}>
              {i > 0 && <div style={{ height: "1px", background: "var(--sand)" }} />}
              <Link href={`/journal/${post.slug}`} className="post-row" style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontFamily: "var(--font-lora), Georgia, serif",
                    fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)",
                    marginBottom: "0.5rem", lineHeight: 1.4,
                  }}>{post.title}</h2>
                  <p style={{ fontSize: "0.9rem", color: "var(--ink-light)", lineHeight: 1.65 }}>
                    {post.description}
                  </p>
                </div>
                <div style={{
                  fontSize: "0.75rem", color: "var(--stone)",
                  fontFamily: "var(--font-geist-mono), monospace",
                  flexShrink: 0, paddingTop: "0.25rem",
                }}>{post.date}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
