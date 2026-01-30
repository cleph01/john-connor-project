import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Resources",
  description: "Curated collection of privacy tools, security software, and resources to protect yourself online. VPNs, password managers, encrypted messaging, and more.",
  keywords: ["privacy tools", "security software", "VPN recommendations", "password manager", "encrypted messaging apps"],
  openGraph: {
    title: "Security Resources | John Connor Project",
    description: "Curated privacy tools, security software, and resources to protect yourself online.",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
