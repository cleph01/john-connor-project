import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Directory",
  description: "Browse our directory of verified cybersecurity and IT professionals. Find local experts to help protect your home, family, or small business from digital threats.",
  keywords: ["cybersecurity directory", "IT professionals near me", "verified tech experts", "local computer security help"],
  openGraph: {
    title: "Professional Directory | John Connor Project",
    description: "Find verified cybersecurity professionals in your area to help protect against digital threats.",
  },
};

export default function DirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
