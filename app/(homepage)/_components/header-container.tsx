"use client"

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

interface HeaderContainerProps {
  children: React.ReactNode;
  mobileMenu?: React.ReactNode;
  isMenuOpen?: boolean;
}

export const HeaderContainer = ({ 
  children, 
  mobileMenu,
  isMenuOpen 
}: HeaderContainerProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    setIsMounted(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg dark:bg-gray-900/95 dark:backdrop-blur-md dark:shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/90 dark:backdrop-blur-sm dark:border-gray-800'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {children}
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && mobileMenu}
      </AnimatePresence>
    </header>
  );
}; 