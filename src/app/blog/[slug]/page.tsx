import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/blog";
import { getViews } from "@/lib/db";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import ViewTracker from "@/components/ViewTracker";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Anjali Shrestha`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const initialViews = await getViews(slug);

  return (
    <div style={{ minHeight: "100vh", paddingTop: "7rem", paddingBottom: "6rem", background: "var(--cream)" }}>
      <article style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 1.5rem" }}>

        <Link href="/blog" style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          fontSize: "0.8125rem", letterSpacing: "0.04em",
          color: "var(--stone-dark)", textDecoration: "none",
          marginBottom: "3.5rem",
        }}>
          ← Journal
        </Link>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            {post.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-lora), Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 400,
          lineHeight: 1.2,
          color: "var(--ink)",
          letterSpacing: "-0.02em",
          marginBottom: "1rem",
        }}>
          {post.title}
        </h1>

        {/* Lede */}
        {post.description && (
          <p style={{
            fontFamily: "var(--font-lora), Georgia, serif",
            fontSize: "1.2rem",
            fontStyle: "italic",
            color: "var(--ink-light)",
            lineHeight: 1.65,
            marginBottom: "1.75rem",
          }}>
            {post.description}
          </p>
        )}

        {/* Meta */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          paddingBottom: "2.5rem",
          borderBottom: "1px solid var(--sand)",
          marginBottom: "3rem",
          fontSize: "0.8125rem",
          color: "var(--stone-dark)",
          fontFamily: "var(--font-geist-mono), monospace",
          flexWrap: "wrap",
        }}>
          <span>{post.date}</span>
          <span>·</span>
          <span>Anjali Shrestha</span>
          <span>·</span>
          <ViewTracker slug={slug} initial={initialViews} />
        </div>

        {/* Content */}
        <div className="prose">
          <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>

        {/* Back */}
        <div style={{ marginTop: "4rem", paddingTop: "2.5rem", borderTop: "1px solid var(--sand)" }}>
          <Link href="/blog" className="link-arrow">← Back to all entries</Link>
        </div>
      </article>
    </div>
  );
}
