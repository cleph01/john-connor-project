import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission",
  description: "Our mission: Education, Network building, Decentralization, Advocacy, and Community empowerment to defend against AI-driven digital threats.",
  openGraph: {
    title: "Our Mission | John Connor Project",
    description: "Education, Network building, Decentralization, Advocacy, and Community empowerment to defend against AI-driven threats.",
  },
};

export default function MissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
