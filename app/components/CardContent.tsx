import { ReactNode } from "react";

interface CardContentProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

const CardContent = ({
  title,
  description,
  children,
}: CardContentProps) => {
  return (
    <div className="bg-gray-800 text-gray-300 rounded-2xl shadow-md p-4 sm:p-6 md:p-8 w-full">
      {title && (
        <h2 className="text-lg font-bold text-red-500 mb-2 text-center sm:text-xl md:text-2xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-sm text-gray-400 mb-4 leading-relaxed sm:text-base md:text-lg">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export default CardContent;
