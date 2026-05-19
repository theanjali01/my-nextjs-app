import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Now — Anjali Shrestha",
  description: "What I'm focused on at the moment.",
};

const LAST_UPDATED = "May 19, 2026";

export default function NowPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <section className="section">
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>

          <p className="section-label">Now</p>
          <h1 style={{
            fontFamily: "var(--font-lora), Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 400,
            color: "var(--ink)",
            lineHeight: 1.2,
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}>
            What I&apos;m up to right now
          </h1>
          <p style={{ color: "var(--stone-dark)", fontFamily: "var(--font-geist-mono), monospace", fontSize: "0.8125rem", marginBottom: "3rem" }}>
            Updated {LAST_UPDATED}. Inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>nownownow.com</a>.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--ink-light)" }}>
            <p>
              I&apos;m in <strong>Kathmandu</strong>, working from home most mornings and walking in the late
              afternoon when the light goes gold. Recently back from a slow trip to Mustang.
            </p>

            <div>
              <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "1.4rem", color: "var(--ink)", marginBottom: "0.75rem", fontWeight: 400 }}>
                Working on
              </h2>
              <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Writing more in the <Link href="/journal" style={{ color: "var(--accent)" }}>journal</Link> — aiming for one entry a week.</li>
                <li>Software work during the day. Side projects on weekends.</li>
                <li>Slowly editing footage from Mustang into something watchable.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "1.4rem", color: "var(--ink)", marginBottom: "0.75rem", fontWeight: 400 }}>
                Reading
              </h2>
              <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li><em>The Snow Leopard</em> — Peter Matthiessen. Re-reading.</li>
                <li><em>Four Thousand Weeks</em> — Oliver Burkeman.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "1.4rem", color: "var(--ink)", marginBottom: "0.75rem", fontWeight: 400 }}>
                Thinking about
              </h2>
              <p>
                How much of what I call &quot;productivity&quot; is really just avoiding the harder, slower work of paying attention.
                Also: where to go next. Probably somewhere in the hills.
              </p>
            </div>

            <div>
              <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: "1.4rem", color: "var(--ink)", marginBottom: "0.75rem", fontWeight: 400 }}>
                Not doing
              </h2>
              <p>
                Saying yes to things I don&apos;t want to do. Scrolling first thing in the morning. Pretending I&apos;ll catch up on every group chat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
