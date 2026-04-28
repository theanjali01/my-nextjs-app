import Link from "next/link";
import { getRecentPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getRecentPosts(4);

  return (
    <>
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col justify-end px-6 pb-20 pt-32" style={{ background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto w-full">
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "var(--stone-dark)", letterSpacing: "0.15em" }}>
            Nepal &nbsp;·&nbsp; Wanderer &nbsp;·&nbsp; Writer
          </p>
          <h1 className="text-5xl md:text-6xl font-normal leading-[1.15] mb-8" style={{
            fontFamily: "var(--font-lora)",
            color: "var(--ink)",
            letterSpacing: "-0.02em",
          }}>
            Living slowly,<br />
            <em>noticing more.</em>
          </h1>
          <p className="text-lg leading-relaxed max-w-xl mb-10" style={{ color: "var(--ink-light)" }}>
            I write about the places I wander, the things I lose, and what stays with me when I return.
            Sometimes it&apos;s a mountain. Sometimes just a moment of light.
          </p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm tracking-wide group" style={{ color: "var(--terracotta)", letterSpacing: "0.05em" }}>
            Read the journal
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* Thin line */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px" style={{ background: "var(--sand)" }} />
      </div>

      {/* Featured — Mustang */}
      <section className="py-20 px-6" style={{ background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-10" style={{ color: "var(--stone-dark)", letterSpacing: "0.15em" }}>
            Latest entry
          </p>

          <Link href="/blog/mustang-and-the-lost-footage" className="group block">
            {/* Image placeholder — replace src once you share photos */}
            <div className="w-full aspect-[16/9] rounded-sm overflow-hidden mb-6" style={{ background: "var(--cream-dark)" }}>
              <div className="w-full h-full flex items-center justify-center" style={{ color: "var(--stone)" }}>
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs opacity-50">Your Mustang photo goes here</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--stone-dark)", letterSpacing: "0.12em" }}>
                Travel &nbsp;·&nbsp; April 2026
              </p>
              <h2 className="text-2xl md:text-3xl font-normal leading-snug mb-4 transition-colors group-hover:text-[var(--terracotta)]" style={{
                fontFamily: "var(--font-lora)",
                color: "var(--ink)",
              }}>
                Mustang and the Lost Footage
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--ink-light)" }}>
                I lost every video I took in Mustang. The wind, the prayer flags, the ochre cliffs at dusk —
                gone from my hard drive. What I didn&apos;t expect was how little it mattered once I stopped grieving the loss.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm mt-5 group-hover:gap-2.5 transition-all" style={{ color: "var(--terracotta)" }}>
                Read the story <span>→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Recent posts */}
      {posts.length > 0 && (
        <section className="py-20 px-6 border-t" style={{ borderColor: "var(--sand)", background: "var(--cream-dark)" }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-xs tracking-widest uppercase mb-12" style={{ color: "var(--stone-dark)", letterSpacing: "0.15em" }}>
              From the journal
            </p>
            <div className="space-y-0">
              {posts.map((post, i) => (
                <div key={post.slug}>
                  {i > 0 && <div className="h-px" style={{ background: "var(--sand)" }} />}
                  <Link href={`/blog/${post.slug}`} className="group flex items-baseline justify-between py-6 gap-6">
                    <div>
                      <h3 className="text-lg font-normal leading-snug mb-1.5 transition-colors group-hover:text-[var(--terracotta)]" style={{
                        fontFamily: "var(--font-lora)",
                        color: "var(--ink)",
                      }}>
                        {post.title}
                      </h3>
                      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--stone-dark)" }}>
                        {post.description}
                      </p>
                    </div>
                    <div className="text-xs flex-shrink-0" style={{ color: "var(--stone)", fontFamily: "var(--font-geist-mono)" }}>
                      {post.date}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t" style={{ borderColor: "var(--sand)" }}>
              <Link href="/blog" className="text-sm tracking-wide group inline-flex items-center gap-2" style={{ color: "var(--terracotta)", letterSpacing: "0.05em" }}>
                All entries <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* About */}
      <section id="about" className="py-24 px-6 border-t" style={{ borderColor: "var(--sand)", background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            {/* Portrait placeholder */}
            <div className="w-32 h-32 rounded-full overflow-hidden" style={{ background: "var(--cream-dark)", border: "1px solid var(--sand)" }}>
              <div className="w-full h-full flex items-center justify-center" style={{ color: "var(--stone)" }}>
                <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "var(--stone-dark)", letterSpacing: "0.15em" }}>
              About
            </p>
            <h2 className="text-2xl font-normal mb-6" style={{ fontFamily: "var(--font-lora)", color: "var(--ink)" }}>
              Hi, I&apos;m Anjali.
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--ink-light)" }}>
              <p>
                I&apos;m from Nepal, and I spend a lot of time wandering places that don&apos;t have good phone signal.
                Mustang, Langtang, the backroads that don&apos;t show up on maps.
              </p>
              <p>
                This journal is where I process what I see and feel. It&apos;s not a travel guide —
                it&apos;s more like letters to myself, written so I don&apos;t forget the texture of things.
              </p>
              <p>
                By day I work in tech. But this space is for the other part of life — the slower, quieter one.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
