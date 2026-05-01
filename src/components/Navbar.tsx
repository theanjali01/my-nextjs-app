"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Floating pill nav — desktop */}
      <nav style={{
        position: "fixed",
        top: "1.25rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        background: scrolled ? "rgba(247,244,239,0.92)" : "rgba(247,244,239,0.6)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(217,207,192,0.6)",
        borderRadius: "100px",
        padding: "0.375rem 0.5rem",
        boxShadow: scrolled ? "0 4px 24px rgba(44,38,32,0.08)" : "none",
        transition: "background 0.3s, box-shadow 0.3s",
      }} className="pill-nav">

        {/* Logo dot */}
        <Link href="/" aria-label="Home" style={{ marginRight: "0.25rem" }}>
          <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#BB764E"/>
            <text x="50%" y="60%" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="50" fontWeight="bold" fill="#F7F4EF">a.</text>
          </svg>
        </Link>

        {links.slice(1).map((l) => {
          const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
          return (
            <Link key={l.href} href={l.href} style={{
              fontSize: "0.8125rem",
              letterSpacing: "0.02em",
              color: active ? "#BB764E" : "#5C5148",
              textDecoration: "none",
              padding: "0.375rem 0.875rem",
              borderRadius: "100px",
              background: active ? "rgba(187,118,78,0.1)" : "transparent",
              transition: "background 0.15s, color 0.15s",
              whiteSpace: "nowrap",
            }}>
              {l.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile hamburger — shown only on small screens */}
      <div className="mobile-nav-trigger" style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 51,
        display: "none",
      }}>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{
            width: "40px", height: "40px",
            background: "rgba(247,244,239,0.92)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(217,207,192,0.6)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(44,38,32,0.08)",
          }}
        >
          <svg width="16" height="16" fill="none" stroke="#5C5148" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(247,244,239,0.97)",
          backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: "2rem",
        }} className="mobile-nav-overlay">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              fontFamily: "var(--font-lora), Georgia, serif",
              fontSize: "2rem",
              fontWeight: 400,
              color: pathname === l.href ? "#BB764E" : "#2C2620",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
