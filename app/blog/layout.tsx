import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Updates, insights, and analysis on AI threats, digital security, and community defense from the John Connor Project.",
  keywords: [
    "cybersecurity blog",
    "AI threats",
    "digital security",
    "privacy",
    "community defense",
  ],
  openGraph: {
    title: "Resistance Blog | John Connor Project",
    description:
      "Updates, insights, and analysis on AI threats, digital security, and community defense.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
