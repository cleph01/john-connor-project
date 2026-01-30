import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the John Connor Project - a grassroots movement connecting cybersecurity professionals with communities to defend against AI-driven digital threats.",
  openGraph: {
    title: "About the John Connor Project",
    description: "A grassroots movement connecting cybersecurity professionals with communities to defend against AI-driven digital threats.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
