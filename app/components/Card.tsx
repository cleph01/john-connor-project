import { ReactNode } from "react";

interface CardProps {
  title?: string;
  className?: string;
  children: ReactNode;
  variant?: "default" | "terminal" | "bordered";
}

const Card = ({
  title,
  className = "",
  children,
  variant = "default",
}: CardProps) => {
  const variants = {
    default: "terminal-card",
    terminal: "terminal-card hex-corner",
    bordered: "bg-terminal border border-ash",
  };

  return (
    <div className={`${variants[variant]} p-6 ${className}`}>
      {title && (
        <>
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-ash">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-crimson/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-warning/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-phosphor/80" />
            </div>
            <span className="text-text-muted text-xs font-mono ml-2">
              {title}
            </span>
          </div>
        </>
      )}
      {children}
    </div>
  );
};

export default Card;
