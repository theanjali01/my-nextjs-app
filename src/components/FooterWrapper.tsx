"use client";

import { usePathname } from "next/navigation";

export default function FooterWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Anjali Shrestha &nbsp;·&nbsp; Made with care in Nepal
    </footer>
  );
}
