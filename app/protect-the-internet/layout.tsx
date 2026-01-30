import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decentralized Internet",
  description: "Building resilient communication networks with IP over HAM radio and mesh networking. Decentralized infrastructure for when traditional internet fails.",
  keywords: ["HAM radio internet", "mesh networking", "decentralized communication", "off-grid internet", "emergency communication"],
  openGraph: {
    title: "Decentralized Internet | John Connor Project",
    description: "Building resilient communication networks with HAM radio and mesh networking.",
  },
};

export default function ProtectTheInternetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
