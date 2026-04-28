import Link from "next/link";
import { getRecentPosts } from "@/lib/blog";

const projects = [
  {
    title: "Portfolio & Blog",
    description: "This site — Next.js 16, Tailwind CSS, MDX blog, Neon Postgres, deployed on Vercel with a custom domain via Cloudflare.",
    tags: ["Next.js", "Tailwind", "MDX", "Neon", "Vercel"],
    href: "https://github.com/theanjali01/my-nextjs-app",
  },
  {
    title: "Coming Soon",
    description: "Working on something exciting. Stay tuned.",
    tags: ["TBD"],
    href: "#",
  },
];

const skills = ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "Python", "Docker"];

export default async function Home() {
  const posts = await getRecentPosts(3);

  return (
    <>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(213,110,60,0.12) 0%, transparent 60%)",
      }} />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-16 z-10">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: "var(--orange)" }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--orange)" }}>
              Developer &amp; Writer
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6" style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
            Hi, I&apos;m{" "}
            <span style={{
              background: "linear-gradient(135deg, #E8915E 0%, #D56E3C 40%, #C9853A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Anjali Shrestha
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl leading-relaxed mb-12" style={{ color: "var(--text-muted)" }}>
            I build thoughtful things on the web and write about what I learn. Based in Nepal, working globally.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/blog" className="px-6 py-3 rounded-xl text-sm font-medium transition-all" style={{
              background: "linear-gradient(135deg, #D56E3C 0%, #C9853A 100%)",
              color: "#FFF8F4",
              boxShadow: "0 0 24px rgba(213,110,60,0.25)",
            }}>
              Read the blog
            </Link>
            <Link href="#projects" className="px-6 py-3 rounded-xl text-sm font-medium border transition-all" style={{
              borderColor: "rgba(255,255,255,0.1)",
              color: "var(--text-muted)",
            }}>
              See my work
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "var(--text-dim)" }}>
          <span className="text-xs font-mono tracking-widest">scroll</span>
          <div className="w-px h-8 animate-pulse" style={{ background: "linear-gradient(to bottom, var(--orange), transparent)" }} />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(213,110,60,0.3), transparent)" }} />
      </div>

      {/* About */}
      <section id="about" className="py-28 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>About</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            A little about me
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-5 text-[1.05rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
              <p>
                I&apos;m a developer based in Nepal, passionate about building thoughtful products that sit at the intersection of design and engineering.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m writing — from technical deep-dives to thoughts on building in public. This blog is as much a learning tool for me as anything else.
              </p>
            </div>
            <div>
              <p className="text-sm mb-4" style={{ color: "var(--text-dim)" }}>Technologies I work with</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg text-sm border" style={{
                    background: "rgba(213,110,60,0.06)",
                    borderColor: "rgba(213,110,60,0.2)",
                    color: "#C4A898",
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-28 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Work</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Selected projects
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <section className="py-28 px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <SectionLabel>Writing</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                  Recent posts
                </h2>
              </div>
              <Link href="/blog" className="text-sm transition-colors pb-1" style={{ color: "var(--orange-light)" }}>
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border transition-all"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 transition-colors group-hover:text-[#E8915E]" style={{ color: "var(--text-primary)" }}>
                      {post.title}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{post.description}</p>
                  </div>
                  <div className="mt-3 md:mt-0 md:ml-8 flex-shrink-0 text-xs font-mono" style={{ color: "var(--text-dim)" }}>
                    {post.date}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="py-28 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Glow card */}
          <div className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden border" style={{
            background: "linear-gradient(135deg, rgba(213,110,60,0.08) 0%, rgba(12,12,20,0) 60%)",
            borderColor: "rgba(213,110,60,0.15)",
          }}>
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(213,110,60,0.1) 0%, transparent 70%)",
            }} />
            <SectionLabel>Get in touch</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 relative" style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
              Let&apos;s work together
            </h2>
            <p className="max-w-lg mx-auto mb-10 relative" style={{ color: "var(--text-muted)" }}>
              Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative">
              <a href="mailto:antbytelabs@gmail.com" className="px-7 py-3 rounded-xl text-sm font-medium transition-all" style={{
                background: "linear-gradient(135deg, #D56E3C 0%, #C9853A 100%)",
                color: "#FFF8F4",
                boxShadow: "0 0 32px rgba(213,110,60,0.3)",
              }}>
                Send an email
              </a>
              <a href="https://github.com/theanjali01" target="_blank" rel="noopener noreferrer"
                className="px-7 py-3 rounded-xl text-sm font-medium border transition-all" style={{
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "var(--text-muted)",
                }}>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-6" style={{ background: "var(--orange)" }} />
      <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--orange)" }}>{children}</span>
    </div>
  );
}

function ProjectCard({ title, description, tags, href }: { title: string; description: string; tags: string[]; href: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
      className="group block p-6 rounded-2xl border transition-all"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg transition-colors group-hover:text-[#E8915E]" style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>
        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 transition-colors group-hover:text-[#E8915E]" style={{ color: "var(--text-dim)" }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="px-2.5 py-0.5 rounded text-xs font-mono border" style={{
            background: "rgba(213,110,60,0.08)",
            borderColor: "rgba(213,110,60,0.18)",
            color: "#C4A898",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
