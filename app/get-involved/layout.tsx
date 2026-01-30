import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Resistance",
  description: "Register as a cybersecurity professional to help protect your community from AI-driven threats. Join our network of verified technologists making a difference.",
  keywords: ["volunteer cybersecurity", "tech volunteer", "help community security", "cybersecurity professional registration"],
  openGraph: {
    title: "Join the Resistance | John Connor Project",
    description: "Register as a cybersecurity professional to help protect your community from AI-driven threats.",
  },
};

export default function GetInvolvedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
