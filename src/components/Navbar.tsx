"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Journal" },
  { href: "/#about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b" style={{
      background: "rgba(247,244,239,0.92)",
      backdropFilter: "blur(12px)",
      borderColor: "var(--sand)",
    }}>
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-base tracking-wide" style={{
          fontFamily: "var(--font-lora)",
          color: "var(--ink)",
          fontStyle: "italic",
        }}>
          Anjali Shrestha
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm tracking-wide transition-colors" style={{
              color: pathname === l.href ? "var(--terracotta)" : "var(--stone-dark)",
              letterSpacing: "0.04em",
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu"
          style={{ color: "var(--stone-dark)" }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t px-6 py-5 flex flex-col gap-5" style={{
          background: "var(--cream)",
          borderColor: "var(--sand)",
        }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm tracking-wide" style={{ color: "var(--ink-light)", letterSpacing: "0.04em" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
