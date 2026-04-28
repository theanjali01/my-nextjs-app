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
    <div className="min-h-screen pt-28 pb-24 px-6" style={{ background: "var(--cream)" }}>
      <article className="max-w-3xl mx-auto">

        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm mb-14 transition-colors hover:text-[var(--terracotta)]"
          style={{ color: "var(--stone-dark)", letterSpacing: "0.04em" }}>
          ← Journal
        </Link>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex gap-3 mb-5">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs tracking-wide" style={{ color: "var(--stone-dark)" }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-normal leading-tight mb-5" style={{
          fontFamily: "var(--font-lora)",
          color: "var(--ink)",
          letterSpacing: "-0.02em",
        }}>
          {post.title}
        </h1>

        {/* Lede */}
        {post.description && (
          <p className="text-xl leading-relaxed mb-8" style={{
            color: "var(--ink-light)",
            fontFamily: "var(--font-lora)",
            fontStyle: "italic",
          }}>
            {post.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 pb-10 border-b mb-12 text-sm" style={{
          borderColor: "var(--sand)",
          color: "var(--stone-dark)",
          fontFamily: "var(--font-geist-mono)",
        }}>
          <span>{post.date}</span>
          <span>·</span>
          <span>Anjali Shrestha</span>
          <span>·</span>
          <ViewTracker slug={slug} initial={initialViews} />
        </div>

        {/* Content */}
        <div className="prose">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* Footer */}
        <div className="mt-16 pt-10 border-t" style={{ borderColor: "var(--sand)" }}>
          <Link href="/blog" className="text-sm tracking-wide group inline-flex items-center gap-2 transition-colors hover:text-[var(--terracotta)]"
            style={{ color: "var(--stone-dark)", letterSpacing: "0.05em" }}>
            ← Back to all entries
          </Link>
        </div>
      </article>
    </div>
  );
}
