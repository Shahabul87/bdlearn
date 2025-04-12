"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export const Logo = () => {
  return (
    <Link href="/">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2"
      >
        <BookOpen className="h-6 w-6 text-purple-500" />
        <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          bdLearn
        </span>
      </motion.div>
    </Link>
  );
}; 