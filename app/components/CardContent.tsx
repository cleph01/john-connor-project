import { ReactNode } from "react";

interface CardContentProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  index?: number;
}

const CardContent = ({
  title,
  description,
  children,
  index,
}: CardContentProps) => {
  return (
    <div className="terminal-card p-6 h-full group transition-all duration-300 hover:border-crimson hover:shadow-[0_0_30px_rgba(255,23,68,0.1)]">
      {/* Header with optional index */}
      <div className="flex items-start justify-between mb-4">
        {title && (
          <h3 className="font-display text-lg text-crimson group-hover:text-glow-crimson transition-all">
            {title}
          </h3>
        )}
        {index !== undefined && (
          <span className="font-mono text-xs text-text-muted">
            [{String(index).padStart(2, "0")}]
          </span>
        )}
      </div>

      {description && (
        <p className="font-mono text-sm text-text-secondary leading-relaxed mb-4">
          {description}
        </p>
      )}

      {children}
    </div>
  );
};

export default CardContent;
