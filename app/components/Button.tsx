// Button Component
import { ReactNode } from "react";

const Button = ({ className = "", children, ...props }: { className?: string; children: ReactNode; [key: string]: any }) => {
  return (
    <button
      className={`bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;