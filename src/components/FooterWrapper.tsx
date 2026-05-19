"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdSlot from "./AdSlot";

export default function FooterWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <>
    <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 1.5rem 2rem" }}>
      <AdSlot slot="0987654321" />
    </div>
    <footer className="footer">
      © {new Date().getFullYear()} Anjali Shrestha. All rights reserved. &nbsp;·&nbsp; Made with care in Nepal
      &nbsp;·&nbsp;
      <Link
        href="/privacy"
        style={{ color: "inherit", textDecoration: "underline", textDecorationThickness: "1px", textUnderlineOffset: "3px" }}
      >
        Privacy
      </Link>
      &nbsp;·&nbsp;
      <a
        href="https://ko-fi.com/anjalishrestha"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "inherit", textDecoration: "underline", textDecorationThickness: "1px", textUnderlineOffset: "3px" }}
      >
        Buy me a chai
      </a>
      &nbsp;·&nbsp;
      <span style={{ color: "inherit" }}>
        eSewa <span style={{ fontFamily: "var(--font-geist-mono), monospace" }}>9843084954</span>
      </span>
    </footer>
    </>
  );
}
