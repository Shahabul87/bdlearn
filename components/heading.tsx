import React from 'react';

interface HeadingProps {
  tag?: keyof JSX.IntrinsicElements; // Allows passing any valid HTML tag like h1, h2, etc.
  text: string; // The heading text
  className?: string; // Optional: Allows passing custom classes
}

export const Heading: React.FC<HeadingProps> = ({ tag: Tag = 'h1', text, className = '' }) => {
  return (
    <div className="flex items-center justify-center mb-5">
      <Tag className={`text-white/80 text-4xl lg:text-5xl font-bold mb-4 ${className}`}>
        {text}
      </Tag>
    </div>
  );
};

