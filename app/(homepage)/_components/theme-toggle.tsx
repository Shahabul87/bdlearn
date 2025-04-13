"use client"

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ThemeToggle = ({ size = 'md', className = '' }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only render the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  const containerClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  const iconSize = sizeClasses[size];
  const containerSize = containerClasses[size];

  if (!mounted) {
    return (
      <div className={`${containerSize} rounded-lg bg-gray-200 dark:bg-gray-800 ${className}`}>
        <div className={`${iconSize}`}></div>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`${containerSize} rounded-lg ${theme === 'dark' 
        ? 'bg-gray-800 hover:bg-gray-700 ring-1 ring-gray-700' 
        : 'bg-gray-200 hover:bg-gray-300 ring-1 ring-gray-300'
      } transition-all duration-200 ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className={`${iconSize} text-yellow-400`} />
      ) : (
        <Moon className={`${iconSize} text-indigo-600`} />
      )}
    </motion.button>
  );
}; 