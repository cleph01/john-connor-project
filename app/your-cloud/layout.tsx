import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Self-Hosted Cloud Storage",
  description: "Take control of your data with self-hosted cloud storage. Learn about NAS systems, home servers, and alternatives to Big Tech cloud services.",
  keywords: ["NAS setup", "self-hosted cloud", "home server", "Synology", "private cloud storage", "data sovereignty"],
  openGraph: {
    title: "Self-Hosted Cloud Storage | John Connor Project",
    description: "Take control of your data with self-hosted cloud storage using NAS systems and home servers.",
  },
};

export default function YourCloudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
