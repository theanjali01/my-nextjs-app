"use client";

import { useEffect, useState } from "react";

export default function ViewTracker({ slug, initial }: { slug: string; initial: number }) {
  const [views, setViews] = useState(initial);

  useEffect(() => {
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((r) => r.json())
      .then((d) => { if (d.views) setViews(d.views); })
      .catch(() => {});
  }, [slug]);

  if (!views) return null;

  return (
    <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "var(--text-dim)" }}>
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  );
}
