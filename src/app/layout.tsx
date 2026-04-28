import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anjali Shrestha — Developer & Writer",
  description: "Portfolio and blog of Anjali Shrestha — building things on the web.",
  openGraph: {
    title: "Anjali Shrestha",
    description: "Developer & Writer",
    url: "https://www.anjalishrestha.com.np",
    siteName: "Anjali Shrestha",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased relative">
        <Navbar />
        <main className="relative z-10">{children}</main>
        <footer className="relative z-10 border-t border-white/[0.06] mt-24 py-8 text-center text-sm" style={{ color: "var(--text-dim)" }}>
          © {new Date().getFullYear()} Anjali Shrestha &mdash; Built with Next.js &amp; Tailwind, hosted on Vercel.
        </footer>
      </body>
    </html>
  );
}
