"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { BlogPostMeta } from "@/lib/blog";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setPosts(data.posts);
        setAllTags(data.tags);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.frontmatter.tags.includes(selectedTag))
    : posts;

  return (
    <main className="min-h-screen bg-void relative">
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link href="/" className="hover:text-crimson transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-crimson">Blog</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-ash bg-terminal/50 mb-6">
            <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
            <span className="text-crimson text-xs font-mono uppercase tracking-widest">
              Transmissions
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl text-crimson text-glow-crimson mb-6">
            Resistance Blog
          </h1>

          <p className="font-mono text-text-secondary max-w-2xl mx-auto">
            Updates, insights, and analysis from the front lines of digital
            defense.
          </p>
        </motion.div>

        {!loading && allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-12 justify-center"
          >
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border transition-all
                ${
                  !selectedTag
                    ? "bg-crimson/20 border-crimson text-crimson"
                    : "border-ash text-text-muted hover:border-crimson hover:text-crimson"
                }`}
            >
              All Posts
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 font-mono text-xs uppercase tracking-wider border transition-all
                  ${
                    selectedTag === tag
                      ? "bg-crimson/20 border-crimson text-crimson"
                      : "border-ash text-text-muted hover:border-crimson hover:text-crimson"
                  }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="terminal-card p-8 text-center">
            <p className="font-mono text-text-muted">
              Loading transmissions...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="terminal-card p-6 hover:border-crimson transition-colors group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs text-crimson">
                        [
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                        ]
                      </span>
                      <span className="text-ash">|</span>
                      <span className="font-mono text-xs text-text-muted">
                        {post.frontmatter.readingTime} min read
                      </span>
                    </div>

                    <h2 className="font-display text-xl text-text-primary group-hover:text-crimson transition-colors mb-2">
                      {post.frontmatter.title}
                    </h2>

                    <p className="font-mono text-sm text-text-secondary mb-4">
                      {post.frontmatter.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 font-mono text-xs border border-ash text-text-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 font-mono text-xs text-phosphor opacity-0 group-hover:opacity-100 transition-opacity">
                      → Read transmission
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="terminal-card p-8 text-center">
            <p className="font-mono text-text-muted">
              {posts.length === 0
                ? "No transmissions yet. Check back soon."
                : "No transmissions found for this filter."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
