"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from "next-themes";
import { 
  Menu, 
  X, 
  BookOpen,
  Layout,
  User,
  BookMarked,
  LogIn,
  UserPlus,
  Sun,
  Moon
} from 'lucide-react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []); 

  if (!isMounted) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 dark:bg-gray-900/90 bg-white/90 backdrop-blur-sm dark:border-gray-800 border-gray-200 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <BookOpen className="h-6 w-6 text-purple-500" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              LearnHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link href="/features" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="/discover" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              Discover
            </Link>
            <Link href="/about" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/get-started" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              Get Started
            </Link>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Link href="/auth/login">
                <motion.div
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </motion.div>
              </Link>
              <Link href="/auth/register">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </motion.div>
              </Link>
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-400" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 mr-2 rounded-lg dark:bg-gray-800/80 bg-gray-100/80 dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-400" />
              )}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg dark:bg-gray-800/80 bg-gray-100/80 dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors dark:text-white text-gray-900"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 w-full md:hidden overflow-hidden"
          >
            <div className="px-4 py-3 dark:bg-gray-900/95 bg-white/95 backdrop-blur-sm dark:border-gray-800 border-gray-200 border-b shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
              <nav className="flex flex-col items-center space-y-3">
                <Link href="/features" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors text-center w-full">
                  Features
                </Link>
                <Link href="/discover" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors text-center w-full">
                  Discover
                </Link>
                <Link href="/about" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors text-center w-full">
                  About
                </Link>
                <Link href="/get-started" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors text-center w-full">
                  Get Started
                </Link>
                <div className="flex flex-col items-center space-y-3 pt-3 dark:border-gray-800 border-gray-200 border-t w-full">
                  <Link href="/auth/login" className="w-full max-w-[200px]">
                    <motion.div className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors w-full">
                      <LogIn className="w-4 h-4" />
                      <span className="font-medium">Login</span>
                    </motion.div>
                  </Link>
                  <Link href="/auth/register" className="w-full max-w-[200px]">
                    <motion.div className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors w-full">
                      <UserPlus className="w-4 h-4" />
                      <span className="font-medium">Sign Up</span>
                    </motion.div>
                  </Link>
                  <button 
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg dark:bg-gray-800/80 bg-gray-100/80 dark:hover:bg-gray-700 hover:bg-gray-200 dark:text-white text-gray-900 transition-colors w-full max-w-[200px]"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 text-blue-400" />
                        <span className="font-medium">Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

