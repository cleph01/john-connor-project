import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Cybersecurity Help",
  description: "Connect with verified cybersecurity professionals in your area. Get help with home network security, scam protection, privacy setup, and more.",
  keywords: ["find cybersecurity help", "local tech support", "scam protection help", "computer security expert near me", "privacy consultant"],
  openGraph: {
    title: "Find Cybersecurity Help | John Connor Project",
    description: "Connect with verified cybersecurity professionals in your area for home network security, scam protection, and privacy setup.",
  },
};

export default function FindHelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
