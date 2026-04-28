"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b" style={{
      background: "rgba(12,12,20,0.85)",
      backdropFilter: "blur(16px)",
      borderColor: "rgba(255,255,255,0.06)",
    }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight" style={{
          background: "linear-gradient(135deg, #E8915E 0%, #C9853A 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          anjali.
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm transition-colors" style={{
              color: pathname === l.href ? "#F2EDE8" : "#8B8580",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#F2EDE8")}
            onMouseLeave={e => (e.currentTarget.style.color = pathname === l.href ? "#F2EDE8" : "#8B8580")}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu"
          style={{ color: "#8B8580" }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{
          background: "rgba(12,12,20,0.98)",
          borderColor: "rgba(255,255,255,0.06)",
        }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm transition-colors" style={{ color: "#8B8580" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
