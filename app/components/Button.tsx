import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "resistance" | "terminal" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const Button = ({
  variant = "resistance",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = "relative font-mono uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    resistance: "btn-resistance",
    terminal: "btn-terminal",
    ghost: "bg-transparent text-text-secondary hover:text-crimson border border-transparent hover:border-ash",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
