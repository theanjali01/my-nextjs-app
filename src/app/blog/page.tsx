import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Anjali Shrestha",
  description: "Thoughts on development, design, and building on the web.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        <p className="text-violet-400 text-sm font-mono mb-3 tracking-wider uppercase">Writing</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-gray-400 mb-16 text-lg">Thoughts on development, design, and building on the web.</p>

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg mb-2">No posts yet.</p>
            <p className="text-gray-600 text-sm">Check back soon — something is brewing.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-start justify-between p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/50 transition-all"
              >
                <div className="flex-1">
                  <h2 className="font-semibold text-xl group-hover:text-violet-300 transition-colors mb-2">{post.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-violet-500/10 text-violet-300 rounded text-xs font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-3 md:mt-0 md:ml-8 flex-shrink-0 text-sm text-gray-500 font-mono">{post.date}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
