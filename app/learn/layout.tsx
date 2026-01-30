import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Digital Security",
  description: "Free cybersecurity education: DNS protection, network security, password management, encrypted communications, and AI threat awareness. Protect yourself and your family.",
  keywords: ["cybersecurity training", "digital security guide", "protect from hackers", "AI scam protection", "privacy tips", "home network security"],
  openGraph: {
    title: "Learn Digital Security | John Connor Project",
    description: "Free guides on DNS protection, network security, password management, and AI threat awareness.",
  },
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
