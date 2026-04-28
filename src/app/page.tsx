import Link from "next/link";
import { getRecentPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getRecentPosts(4);

  return (
    <>
      {/* Hero */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 1.5rem 5rem",
        paddingTop: "7rem",
        background: "var(--cream)",
      }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>
          <p className="section-label">Nepal &nbsp;·&nbsp; Wanderer &nbsp;·&nbsp; Writer</p>
          <h1 style={{
            fontFamily: "var(--font-lora), Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            marginBottom: "1.5rem",
          }}>
            Living slowly,<br />
            <em>noticing more.</em>
          </h1>
          <p style={{
            fontSize: "1.1rem",
            lineHeight: 1.75,
            color: "var(--ink-light)",
            maxWidth: "38rem",
            marginBottom: "2.5rem",
          }}>
            I write about the places I wander, the things I lose, and what stays with me when I return.
            Sometimes it&apos;s a mountain. Sometimes just a moment of light.
          </p>
          <Link href="/blog" className="link-arrow">Read the journal →</Link>
        </div>
      </section>

      {/* Divider */}
      <div className="divider"><div className="divider-line" /></div>

      {/* Featured post — Mustang */}
      <section className="section" style={{ background: "var(--cream)" }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>
          <p className="section-label">Latest entry</p>

          <Link href="/blog/mustang-and-the-lost-footage" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            {/* Image — placeholder until you share photos */}
            <div className="img-placeholder" style={{ marginBottom: "1.75rem" }}>
              <span style={{ opacity: 0.4 }}>Your Mustang photo goes here</span>
            </div>

            <p className="section-label">Travel &nbsp;·&nbsp; April 2026</p>
            <h2 style={{
              fontFamily: "var(--font-lora), Georgia, serif",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 400,
              lineHeight: 1.3,
              color: "var(--ink)",
              marginBottom: "1rem",
              letterSpacing: "-0.01em",
              transition: "color 0.15s",
            }}
              className="featured-title">
              Mustang and the Lost Footage
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--ink-light)", marginBottom: "1.25rem" }}>
              I lost every video I took in Mustang. The wind, the prayer flags, the ochre cliffs at dusk —
              gone from my hard drive. What I didn&apos;t expect was how little it mattered once I stopped grieving the loss.
            </p>
            <span className="link-arrow">Read the story →</span>
          </Link>
        </div>
      </section>

      {/* Recent posts */}
      {posts.length > 0 && (
        <section className="section" style={{
          borderTop: "1px solid var(--sand)",
          background: "var(--cream-dark)",
        }}>
          <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>
            <p className="section-label">From the journal</p>

            <div>
              {posts.map((post, i) => (
                <div key={post.slug}>
                  {i > 0 && <div style={{ height: "1px", background: "var(--sand)" }} />}
                  <Link href={`/blog/${post.slug}`} className="post-row" style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: "var(--font-lora), Georgia, serif",
                        fontSize: "1.125rem",
                        fontWeight: 400,
                        color: "var(--ink)",
                        marginBottom: "0.375rem",
                        lineHeight: 1.4,
                        transition: "color 0.15s",
                      }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "var(--stone-dark)", lineHeight: 1.6 }}>
                        {post.description}
                      </p>
                    </div>
                    <div style={{
                      fontSize: "0.75rem",
                      color: "var(--stone)",
                      fontFamily: "var(--font-geist-mono), monospace",
                      flexShrink: 0,
                      paddingTop: "0.125rem",
                    }}>
                      {post.date}
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--sand)" }}>
              <Link href="/blog" className="link-arrow">All entries →</Link>
            </div>
          </div>
        </section>
      )}

      {/* About */}
      <section id="about" className="section" style={{ borderTop: "1px solid var(--sand)", background: "var(--cream)" }}>
        <div style={{
          maxWidth: "var(--max-w)", margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "auto 1fr", gap: "3rem", alignItems: "start",
        }}>
          {/* Portrait placeholder */}
          <div style={{
            width: "96px", height: "96px", borderRadius: "50%",
            background: "var(--cream-dark)", border: "1px solid var(--sand)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--stone)", flexShrink: 0,
          }}>
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.35 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <div>
            <p className="section-label">About</p>
            <h2 style={{
              fontFamily: "var(--font-lora), Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 400,
              color: "var(--ink)",
              marginBottom: "1.25rem",
            }}>
              Hi, I&apos;m Anjali.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1rem", lineHeight: 1.75, color: "var(--ink-light)" }}>
              <p>
                I&apos;m from Nepal, and I spend a lot of time in places without phone signal —
                Mustang, Langtang, backroads that don&apos;t show up on maps.
              </p>
              <p>
                This journal is where I slow down enough to write. It&apos;s not a travel guide.
                It&apos;s more like letters I write to myself so I don&apos;t forget the texture of things.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
