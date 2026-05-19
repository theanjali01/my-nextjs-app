import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Anjali Shrestha",
  description: "How this site handles your data, cookies, and third-party services.",
};

const LAST_UPDATED = "May 19, 2026";

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <section className="section">
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>
          <p className="section-label">Privacy</p>
          <h1 style={{
            fontFamily: "var(--font-lora), Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 400,
            color: "var(--ink)",
            lineHeight: 1.2,
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}>
            Privacy Policy
          </h1>
          <p style={{ color: "var(--stone-dark)", fontFamily: "var(--font-geist-mono), monospace", fontSize: "0.8125rem", marginBottom: "3rem" }}>
            Last updated: {LAST_UPDATED}
          </p>

          <div className="prose" style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--ink-light)" }}>
            <p>
              This is a personal journal published at <strong>anjalishrestha.com.np</strong> (&quot;the site&quot;).
              I try to collect as little about you as possible. This page explains what is collected, why, and what your choices are.
            </p>

            <h2>What I collect directly</h2>
            <p>
              If you send a message through the <Link href="/contact">contact form</Link>, I store your name, email, and message
              so I can read it and reply. That data lives in a private database and is not shared with anyone.
            </p>
            <p>
              For each journal entry, the site keeps a simple view counter (a number — no information about who viewed it).
            </p>

            <h2>Cookies</h2>
            <p>
              This site does not set tracking cookies of its own. Third-party services described below may set their own cookies in your browser.
            </p>

            <h2>Third-party services</h2>
            <p>
              <strong>Google AdSense.</strong> The site displays ads through Google AdSense. Google and its partners may use cookies and similar
              technologies to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising by
              visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
              You can also opt out of a third-party vendor&apos;s use of cookies for personalised advertising by visiting{" "}
              <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
              Google&apos;s privacy policy is available at{" "}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/ads</a>.
            </p>
            <p>
              <strong>Hosting.</strong> The site is hosted on Vercel, which may log basic request information (IP address, user agent, timestamp)
              for security and performance. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel&apos;s privacy policy</a>.
            </p>

            <h2>Children</h2>
            <p>
              This site is not directed to children under 13, and I do not knowingly collect personal information from them.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask me to delete any message you sent through the contact form at any time. Write to me at{" "}
              <a href="mailto:anjalish6061@gmail.com">anjalish6061@gmail.com</a>.
            </p>

            <h2>Changes</h2>
            <p>
              If this policy changes in any meaningful way, I&apos;ll update the date at the top of the page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
