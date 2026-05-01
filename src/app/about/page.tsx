import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Anjali Shrestha",
  description: "Software developer from Nepal. I travel when I can and write about what I find.",
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <section className="section">
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "5rem",
            alignItems: "start",
          }} className="about-grid">

            {/* Text */}
            <div>
              <p className="section-label">About</p>
              <h1 style={{
                fontFamily: "var(--font-lora), Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 400,
                color: "var(--ink)",
                lineHeight: 1.2,
                marginBottom: "2.5rem",
                letterSpacing: "-0.02em",
              }}>
                Hi, I&apos;m Anjali.
              </h1>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--ink-light)" }}>
                <p>
                  I&apos;m a software developer from Nepal — I spend my days building things on a computer,
                  and my time off trying to get as far from a screen as possible.
                </p>
                <p>
                  Mustang, Langtang, backroads that don&apos;t show up on maps. I travel when I can,
                  usually to places with bad signal and good light. I&apos;ve learned more from being
                  somewhere quiet than from most things I&apos;ve read.
                </p>
                <p>
                  This journal is where I write about what I notice — not just the places, but what
                  they leave behind. The texture of a room. The way light changes in an afternoon.
                  The things you only see when you put your phone down.
                </p>
                <p>
                  It&apos;s not a travel guide. More like letters I write to myself so I don&apos;t forget.
                </p>
              </div>

              <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                <Link href="/journal" className="link-arrow">Read the journal →</Link>
                <Link href="/contact" className="link-arrow">Get in touch →</Link>
              </div>
            </div>

            {/* Photo */}
            <div style={{
              borderRadius: "0.375rem",
              overflow: "hidden",
              border: "1px solid var(--sand)",
            }}>
              <Image
                src="/images/mustang/IMG_0877.jpg"
                alt="Anjali Shrestha above the Mustang valley"
                width={680}
                height={906}
                style={{ width: "100%", height: "auto", display: "block" }}
                priority
              />
            </div>
          </div>

          <div>
          </div>

        </div>
      </section>
    </div>
  );
}
