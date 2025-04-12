"use client"

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ThemeToggle = ({ size = 'md', className = '' }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  const sizeClasses = {
    sm: 'p-1.5 w-4 h-4',
    md: 'p-2 w-5 h-5',
    lg: 'p-2.5 w-6 h-6',
  };

  const iconSize = sizeClasses[size];

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`rounded-lg dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className={`${iconSize} text-yellow-500`} />
      ) : (
        <Moon className={`${iconSize} text-blue-400`} />
      )}
    </button>
  );
}; 