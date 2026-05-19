import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper";

const ADSENSE_CLIENT = "ca-pub-6030517042679335";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anjalishrestha.com.np"),
  title: "Anjali Shrestha",
  description: "A journal of travel, presence, and small discoveries from Nepal.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  authors: [{ name: "Anjali Shrestha", url: "https://www.anjalishrestha.com.np" }],
  creator: "Anjali Shrestha",
  publisher: "Anjali Shrestha",
  openGraph: {
    title: "Anjali Shrestha",
    description: "A journal of travel, presence, and small discoveries.",
    url: "https://www.anjalishrestha.com.np",
    siteName: "Anjali Shrestha",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${lora.variable}`}>
      <head>
        <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
        <link rel="alternate" type="application/rss+xml" title="Anjali Shrestha — Journal" href="/rss.xml" />
        <Script
          id="adsense-init"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ minHeight: "100vh", background: "var(--cream)" }}>
        <NavbarWrapper />
        <main>{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
