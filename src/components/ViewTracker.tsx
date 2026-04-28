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
    <span style={{ color: "var(--stone-dark)", fontFamily: "var(--font-geist-mono)", fontSize: "0.8125rem" }}>
      {views.toLocaleString()} {views === 1 ? "read" : "reads"}
    </span>
  );
}
