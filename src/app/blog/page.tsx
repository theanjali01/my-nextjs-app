import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Journal — Anjali Shrestha",
  description: "A journal of travel, presence, and small discoveries.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  // Filter out old coding posts
  const journalPosts = posts.filter(p =>
    !["hello-world", "deploying-nextjs-to-vercel", "how-to-get-np-domain-cloudflare"].includes(p.slug)
  );

  return (
    <div style={{ minHeight: "100vh", paddingTop: "7rem", paddingBottom: "6rem", background: "var(--cream)" }}>
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 1.5rem" }}>
        <p className="section-label">Journal</p>
        <h1 style={{
          fontFamily: "var(--font-lora), Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 2.75rem)",
          fontWeight: 400,
          color: "var(--ink)",
          letterSpacing: "-0.02em",
          marginBottom: "0.75rem",
        }}>
          All entries
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--ink-light)", marginBottom: "4rem", lineHeight: 1.6 }}>
          Slow writing from the places I go and the thoughts I can&apos;t shake.
        </p>

        {journalPosts.length === 0 ? (
          <p style={{ color: "var(--stone-dark)" }}>Nothing here yet. Check back soon.</p>
        ) : (
          <div>
            {journalPosts.map((post, i) => (
              <div key={post.slug}>
                {i > 0 && <div style={{ height: "1px", background: "var(--sand)" }} />}
                <Link href={`/blog/${post.slug}`} className="post-row" style={{ display: "flex" }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{
                      fontFamily: "var(--font-lora), Georgia, serif",
                      fontSize: "1.25rem",
                      fontWeight: 400,
                      color: "var(--ink)",
                      marginBottom: "0.5rem",
                      lineHeight: 1.4,
                      transition: "color 0.15s",
                    }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: "0.9rem", color: "var(--ink-light)", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                      {post.description}
                    </p>
                    {post.tags.length > 0 && (
                      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        {post.tags.map(tag => (
                          <span key={tag} className="tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{
                    fontSize: "0.75rem",
                    color: "var(--stone)",
                    fontFamily: "var(--font-geist-mono), monospace",
                    flexShrink: 0,
                    paddingTop: "0.25rem",
                  }}>
                    {post.date}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
