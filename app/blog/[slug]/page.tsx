import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  getPostBySlug,
  generateStaticParams as generateBlogParams,
} from "@/lib/blog";
import { mdxComponents } from "@/lib/mdx-components";
import TableOfContents from "@/app/components/TableOfContents";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateBlogParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    keywords: post.frontmatter.tags,
    authors: [{ name: post.frontmatter.author }],
    openGraph: {
      title: `${post.frontmatter.title} | John Connor Project`,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <main className="min-h-screen bg-void relative">
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[200px]" />

      <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link href="/" className="hover:text-crimson transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-crimson transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-crimson truncate max-w-[200px]">
              {frontmatter.title}
            </span>
          </div>
        </div>

        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-ash bg-terminal/50 mb-6">
            <span className="w-1.5 h-1.5 bg-phosphor rounded-full animate-pulse" />
            <span className="text-phosphor text-xs font-mono uppercase tracking-widest">
              Transmission Active
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-crimson text-glow-crimson mb-6">
            {frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-text-muted mb-6">
            <span className="flex items-center gap-2">
              <span className="text-phosphor">@</span>
              {frontmatter.author}
            </span>
            <span className="text-ash">|</span>
            <span>
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-ash">|</span>
            <span>{frontmatter.readingTime} min read</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="px-2 py-0.5 font-mono text-xs border border-ash text-text-muted hover:border-crimson hover:text-crimson transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
          <div className="terminal-card p-6 sm:p-8">
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
              }}
            />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents content={content} />
            </div>
          </aside>
        </div>

        <footer className="mt-12 pt-8 border-t border-ash">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link
              href="/blog"
              className="font-mono text-sm text-phosphor hover:text-glow-phosphor transition-all"
            >
              ← Back to all transmissions
            </Link>
            <Link href="/get-involved" className="btn-resistance px-4 py-2">
              <span className="relative z-10">Join the Resistance</span>
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
