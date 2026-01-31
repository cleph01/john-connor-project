import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://johnconnorproject.org";

  // Static pages with their priority and change frequency
  const staticPages = [
    { route: "", priority: 1.0, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/mission", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/get-involved", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/find-help", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/learn", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/blog", priority: 0.9, changeFrequency: "daily" as const },
    { route: "/directory", priority: 0.9, changeFrequency: "daily" as const },
    { route: "/resources", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/your-cloud", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/protect-the-internet", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/your-stock-vote", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  // Dynamic blog posts
  const posts = await getAllPosts();
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.route}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...blogPages,
  ];
}
