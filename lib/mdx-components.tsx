import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

export const mdxComponents: MDXComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="font-display text-3xl sm:text-4xl text-crimson text-glow-crimson mt-12 mb-6 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children, id }: { children?: ReactNode; id?: string }) => (
    <h2
      id={id}
      className="font-display text-2xl text-crimson mt-10 mb-4 scroll-mt-24 flex items-center gap-2"
    >
      <span className="text-ash">//</span> {children}
    </h2>
  ),
  h3: ({ children, id }: { children?: ReactNode; id?: string }) => (
    <h3
      id={id}
      className="font-display text-lg text-phosphor mt-8 mb-3 scroll-mt-24"
    >
      {children}
    </h3>
  ),

  p: ({ children }: { children?: ReactNode }) => (
    <p className="font-mono text-sm text-text-secondary leading-relaxed mb-4">
      {children}
    </p>
  ),

  a: ({ href, children }: { href?: string; children?: ReactNode }) => {
    const isExternal = href?.startsWith("http");
    return (
      <Link
        href={href || "#"}
        className="text-electric hover:text-glow-electric transition-all underline underline-offset-4"
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </Link>
    );
  },

  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="font-mono text-sm text-text-secondary space-y-2 mb-4 pl-4">
      {children}
    </ul>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="flex items-start gap-2">
      <span className="text-phosphor mt-0.5">→</span>
      <span>{children}</span>
    </li>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="font-mono text-sm text-text-secondary space-y-2 mb-4 pl-4 list-decimal list-inside">
      {children}
    </ol>
  ),

  pre: ({ children }: { children?: ReactNode }) => (
    <pre className="terminal-card p-4 my-6 overflow-x-auto text-sm">
      {children}
    </pre>
  ),
  code: ({
    children,
    className,
  }: {
    children?: ReactNode;
    className?: string;
  }) => {
    const isInline = !className;
    return isInline ? (
      <code className="bg-terminal px-1.5 py-0.5 text-phosphor font-mono text-sm border border-ash">
        {children}
      </code>
    ) : (
      <code className={`${className} font-mono text-sm`}>{children}</code>
    );
  },

  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="terminal-card p-4 my-6 border-l-4 border-l-crimson">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-warning">!</span>
        <span className="font-display text-xs text-warning uppercase tracking-wider">
          Transmission
        </span>
      </div>
      <div className="font-mono text-sm text-text-secondary italic">
        {children}
      </div>
    </blockquote>
  ),

  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-6">
      <img src={src} alt={alt || ""} className="w-full border border-ash" />
      {alt && (
        <figcaption className="mt-2 text-center font-mono text-xs text-text-muted">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  hr: () => <div className="section-divider my-8" />,

  table: ({ children }: { children?: ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full font-mono text-sm border border-ash">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="bg-terminal px-4 py-2 text-left text-crimson border border-ash">
      {children}
    </th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="px-4 py-2 text-text-secondary border border-ash">
      {children}
    </td>
  ),

  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="text-text-primary font-semibold">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="text-electric italic">{children}</em>
  ),
};
