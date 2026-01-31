import type { Metadata } from "next";
import { Share_Tech_Mono, Orbitron } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "./components/Nav";

const shareTechMono = Share_Tech_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
});

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const siteUrl = "https://johnconnorproject.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "John Connor Project | Digital Resistance Network",
    template: "%s | John Connor Project",
  },
  description: "Connecting communities with cybersecurity professionals to defend against AI-driven digital threats. Find local experts or join the resistance.",
  keywords: ["cybersecurity", "AI threats", "digital privacy", "scam protection", "tech support", "community security", "deepfake protection"],
  authors: [{ name: "John Connor Project" }],
  creator: "John Connor Project",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "John Connor Project",
    title: "John Connor Project | Digital Resistance Network",
    description: "Connecting communities with cybersecurity professionals to defend against AI-driven digital threats.",
    images: [
      {
        url: "/logo-skull-hero.png",
        width: 800,
        height: 800,
        alt: "John Connor Project - Digital Resistance Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Connor Project | Digital Resistance Network",
    description: "Connecting communities with cybersecurity professionals to defend against AI-driven digital threats.",
    images: ["/logo-skull-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "John Connor Project",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${shareTechMono.variable} ${orbitron.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
      <GoogleAnalytics gaId="G-JMSZBC5NK9" />
    </html>
  );
}
