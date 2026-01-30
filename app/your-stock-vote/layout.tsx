import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shareholder Proxy Voting",
  description: "Use your shareholder voting rights to influence corporate AI and privacy policies. Tools and resources for proxy voting on tech company decisions.",
  keywords: ["proxy voting", "shareholder activism", "corporate AI policy", "tech company voting", "ESG voting"],
  openGraph: {
    title: "Shareholder Proxy Voting | John Connor Project",
    description: "Use your shareholder voting rights to influence corporate AI and privacy policies.",
  },
};

export default function YourStockVoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
