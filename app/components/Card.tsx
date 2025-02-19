
// Card Component
import { ReactNode } from "react";

const Card = ({ className = "", children }: { className?: string; children: ReactNode }) => {
    return (
      <div className={`bg-gray-800 text-gray-300 mt-6 max-w-3xl shadow-lg p-6 rounded-lg ${className}`}>
        {children}
      </div>
    );
  };

  export default Card;