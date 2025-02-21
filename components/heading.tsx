import React from 'react';
import { cn } from "@/lib/utils";

interface HeadingProps {
  tag?: keyof JSX.IntrinsicElements; // Allows passing any valid HTML tag like h1, h2, etc.
  text: string; // The heading text
  className?: string; // Optional: Allows passing custom classes
  variant?: 'default' | 'gradient' | 'simple';
}

export const Heading: React.FC<HeadingProps> = ({ 
  tag: Tag = 'h1', 
  text, 
  className = '',
  variant = 'default'
}) => {
  const baseStyles = "font-bold mb-4";
  
  const variants = {
    default: "text-gray-900 dark:text-gray-100",
    gradient: "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100",
    simple: "text-gray-800 dark:text-gray-200"
  };

  return (
    <div className="flex items-center justify-center mb-5">
      <Tag className={cn(
        baseStyles,
        variants[variant],
        className
      )}>
        {text}
      </Tag>
    </div>
  );
};

