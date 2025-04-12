"use client"

import { motion } from 'framer-motion';

interface MobileMenuProps {
  children: React.ReactNode;
}

export const MobileMenu = ({ children }: MobileMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="md:hidden bg-gray-900/95 backdrop-blur-md dark:bg-gray-900/95 dark:backdrop-blur-md"
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-2">
          {children}
        </nav>
      </div>
    </motion.div>
  );
}; 