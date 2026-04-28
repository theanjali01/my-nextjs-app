import Link from "next/link";
import { getRecentPosts } from "@/lib/blog";

const projects = [
  {
    title: "Portfolio & Blog",
    description: "This site — built with Next.js 16, Tailwind CSS, and MDX. Deployed on Vercel with a custom .com.np domain via Cloudflare.",
    tags: ["Next.js", "Tailwind", "MDX", "Vercel"],
    href: "https://github.com/theanjali01/my-nextjs-app",
  },
  {
    title: "Coming Soon",
    description: "Working on something exciting. Stay tuned.",
    tags: ["TBD"],
    href: "#",
  },
];

export default async function Home() {
  const posts = await getRecentPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-16">
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-violet-400 text-sm font-mono mb-4 tracking-wider uppercase">Hello, world —</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            I&apos;m{" "}
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Anjali Shrestha
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-10">
            Developer, writer, and builder of things on the web. I craft clean interfaces and share what I learn along the way.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-colors"
            >
              Read the blog
            </Link>
            <Link
              href="#projects"
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white rounded-xl font-medium transition-colors"
            >
              See my work
            </Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto w-full mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-violet-400 text-sm font-mono mb-3 tracking-wider uppercase">About me</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">A little bit about me</h2>
          <div className="grid md:grid-cols-2 gap-12 text-gray-400 leading-relaxed text-[1.05rem]">
            <div className="space-y-4">
              <p>
                I&apos;m a developer based in Nepal, passionate about building thoughtful products that solve real problems. I love working at the intersection of design and engineering.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m writing about what I&apos;ve learned — from technical deep-dives to thoughts on building in public.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                I work primarily with <span className="text-white font-medium">TypeScript, React, and Next.js</span>, and I&apos;m always exploring new tools and frameworks.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-violet-400 text-sm font-mono mb-3 tracking-wider uppercase">Work</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Selected projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-violet-300 transition-colors">{project.title}</h3>
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-violet-400 transition-colors mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-violet-500/10 text-violet-300 rounded text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      {posts.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-violet-400 text-sm font-mono mb-3 tracking-wider uppercase">Writing</p>
                <h2 className="text-3xl md:text-4xl font-bold">Recent posts</h2>
              </div>
              <Link href="/blog" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                View all →
              </Link>
            </div>
            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/50 transition-all"
                >
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-violet-300 transition-colors mb-1">{post.title}</h3>
                    <p className="text-gray-400 text-sm">{post.description}</p>
                  </div>
                  <div className="mt-3 md:mt-0 md:ml-8 flex-shrink-0 text-sm text-gray-500 font-mono">{post.date}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-violet-400 text-sm font-mono mb-3 tracking-wider uppercase">Get in touch</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let&apos;s work together</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:antbytelabs@gmail.com"
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-colors"
            >
              Send an email
            </a>
            <a
              href="https://github.com/theanjali01"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white rounded-xl font-medium transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
