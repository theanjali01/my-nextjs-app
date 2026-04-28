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
    <div className="min-h-screen px-6 pt-32 pb-24 relative z-10">
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 30% at 50% 0%, rgba(213,110,60,0.08) 0%, transparent 60%)",
      }} />

      <article className="max-w-3xl mx-auto relative">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm mb-12 transition-colors" style={{ color: "var(--text-dim)" }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>

        <header className="mb-12">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
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
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
            {post.title}
          </h1>
          {post.description && (
            <p className="text-xl leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>{post.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm" style={{ color: "var(--text-dim)" }}>
            <span className="font-mono">{post.date}</span>
            <span>·</span>
            <span>Anjali Shrestha</span>
            <span>·</span>
            <ViewTracker slug={slug} initial={initialViews} />
          </div>
          <div className="mt-8 h-px" style={{
            background: "linear-gradient(to right, rgba(213,110,60,0.5), rgba(201,133,58,0.2), transparent)",
          }} />
        </header>

        <div className="prose">
          <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>

        <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm transition-colors" style={{ color: "var(--orange-light)" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
