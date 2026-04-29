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
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" aria-label="Home">
          <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#BB764E"/>
            <text x="50%" y="60%" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="50" fontWeight="bold" fill="#F7F4EF">a.</text>
          </svg>
        </Link>

        {/* Desktop */}
        <div className="nav-links" style={{ display: "flex" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`nav-link${pathname === l.href ? " active" : ""}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle — hidden on md+ via inline */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ display: "none", color: "var(--stone-dark)", background: "none", border: "none", cursor: "pointer" }}
          className="mobile-toggle"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div style={{
          borderTop: "1px solid var(--sand)",
          background: "var(--cream)",
          padding: "1.25rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="nav-link">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
