import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Journal — Anjali Shrestha",
  description: "A journal of travel, presence, and small discoveries.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen pt-28 pb-24 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-3xl mx-auto">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--stone-dark)", letterSpacing: "0.15em" }}>
          Journal
        </p>
        <h1 className="text-4xl font-normal mb-4" style={{ fontFamily: "var(--font-lora)", color: "var(--ink)", letterSpacing: "-0.02em" }}>
          All entries
        </h1>
        <p className="text-base mb-16" style={{ color: "var(--ink-light)" }}>
          Slow writing from the places I go and the thoughts I can&apos;t shake.
        </p>

        {posts.length === 0 ? (
          <p style={{ color: "var(--stone-dark)" }}>Nothing here yet. Check back soon.</p>
        ) : (
          <div>
            {posts.map((post, i) => (
              <div key={post.slug}>
                {i > 0 && <div className="h-px" style={{ background: "var(--sand)" }} />}
                <Link href={`/blog/${post.slug}`} className="group flex items-start justify-between py-8 gap-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-normal mb-2 transition-colors group-hover:text-[var(--terracotta)]"
                      style={{ fontFamily: "var(--font-lora)", color: "var(--ink)", lineHeight: 1.4 }}>
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--ink-light)" }}>
                      {post.description}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs tracking-wide" style={{ color: "var(--stone-dark)" }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-xs flex-shrink-0 mt-1" style={{ color: "var(--stone)", fontFamily: "var(--font-geist-mono)" }}>
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
