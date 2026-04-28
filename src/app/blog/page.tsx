import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Anjali Shrestha",
  description: "Thoughts on development, design, and building on the web.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen px-6 pt-32 pb-24 relative z-10">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(213,110,60,0.1) 0%, transparent 60%)",
      }} />

      <div className="max-w-3xl mx-auto relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-6" style={{ background: "var(--orange)" }} />
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--orange)" }}>Writing</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
          Blog
        </h1>
        <p className="mb-16 text-lg" style={{ color: "var(--text-muted)" }}>
          Thoughts on development, design, and building on the web.
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-24 rounded-2xl border" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
            <p className="text-lg mb-2" style={{ color: "var(--text-muted)" }}>No posts yet.</p>
            <p className="text-sm" style={{ color: "var(--text-dim)" }}>Check back soon — something is brewing.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-start justify-between p-6 rounded-2xl border transition-all"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="flex-1">
                  <h2 className="font-semibold text-xl mb-2 transition-colors group-hover:text-[#E8915E]"
                    style={{ color: "var(--text-primary)" }}>
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded text-xs font-mono border" style={{
                          background: "rgba(213,110,60,0.08)",
                          borderColor: "rgba(213,110,60,0.18)",
                          color: "#C4A898",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-3 md:mt-0 md:ml-8 flex-shrink-0 text-xs font-mono" style={{ color: "var(--text-dim)" }}>
                  {post.date}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
