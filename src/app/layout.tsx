import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#0f0f0f] text-gray-100 antialiased">
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-white/10 mt-24 py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Anjali Shrestha. Built with Next.js & Tailwind.
        </footer>
      </body>
    </html>
  );
}
