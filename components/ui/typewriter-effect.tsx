"use client";

import React from 'react';

interface Word {
  text: string;
  className?: string;
}

interface TypewriterEffectSmoothProps {
  words: Word[];
}

export const TypewriterEffectSmooth: React.FC<TypewriterEffectSmoothProps> = ({ words }) => {
  return (
    <h1 className="text-4xl lg:text-6xl font-bold p-8 text-center">
      {words.map((word, index) => (
        <span key={index} className={`transition-colors duration-300 ${word.className || 'text-white'}`}>
          {word.text}{' '}
        </span>
      ))}
    </h1>
  );
};
