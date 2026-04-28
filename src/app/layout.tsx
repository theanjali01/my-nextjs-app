import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Anjali Shrestha",
  description: "A journal of travel, presence, and small discoveries.",
  openGraph: {
    title: "Anjali Shrestha",
    description: "A journal of travel, presence, and small discoveries.",
    url: "https://www.anjalishrestha.com.np",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${lora.variable}`}>
      <body className="min-h-screen" style={{ background: "var(--cream)" }}>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t py-10 text-center text-sm" style={{
          borderColor: "var(--sand)",
          color: "var(--stone-dark)",
          background: "var(--cream-dark)",
        }}>
          <p>© {new Date().getFullYear()} Anjali Shrestha &nbsp;·&nbsp; Made with care in Nepal</p>
        </footer>
      </body>
    </html>
  );
}
