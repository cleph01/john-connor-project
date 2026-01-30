import type { Metadata } from "next";
import { Share_Tech_Mono, Orbitron } from "next/font/google";
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

export const metadata: Metadata = {
  title: "John Connor Project | Digital Resistance Network",
  description: "Equipping individuals and communities with the knowledge and tools to defend against AI-driven digital threats. Join the resistance.",
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
    </html>
  );
}
