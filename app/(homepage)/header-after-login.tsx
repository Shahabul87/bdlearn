"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  BookOpen,
  Sun,
  Moon,
  Bell,
  MessageSquare,
  LayoutDashboard,
} from 'lucide-react';
import { LogoutButton } from '@/components/auth/logout-button';

interface HeaderAfterLoginProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export const HeaderAfterLogin = ({ user }: HeaderAfterLoginProps) => {
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
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 pl-12 md:pl-0">
            <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-purple-500" />
            <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              LearnHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/features" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="/discover" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              Discover
            </Link>
            <Link href="/about" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/blog" className="dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              Blog
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
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

            {/* Notifications */}
            <button className="p-2 rounded-lg dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors dark:text-white text-gray-900">
              <Bell className="w-5 h-5" />
            </button>

            {/* Messages */}
            <button className="p-2 rounded-lg dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors dark:text-white text-gray-900">
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* User Menu */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center space-x-2 dark:text-white text-gray-900"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white">
                  {user?.name?.[0] || "U"}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-lg dark:bg-gray-900 bg-white border dark:border-gray-800 border-gray-200 shadow-lg overflow-hidden"
                  >
                    <div className="py-2">
                      <Link
                        href="/user"
                        className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100"
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4 mr-2" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        <span>Settings</span>
                      </Link>
                      <LogoutButton className="w-full">
                        <div className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100">
                          <LogOut className="w-4 h-4 mr-2" />
                          <span>Logout</span>
                        </div>
                      </LogoutButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden rounded-lg dark:bg-gray-800/80 bg-gray-100/80 dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors dark:text-white text-gray-900"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 w-full"
          >
            <div className="px-4 py-3 dark:bg-gray-900/95 bg-white/95 backdrop-blur-sm dark:border-gray-800 border-gray-200 border-b shadow-lg">
              <nav className="flex flex-col items-center space-y-3">
                <Link href="/features" className="w-full text-center dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900">
                  Features
                </Link>
                <Link href="/discover" className="w-full text-center dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900">
                  Discover
                </Link>
                <Link href="/about" className="w-full text-center dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900">
                  About
                </Link>
                <Link href="/blog" className="w-full text-center dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900">
                  Blog
                </Link>
                <div className="w-full pt-3 dark:border-gray-800 border-gray-200 border-t">
                  <Link 
                    href="/user" 
                    className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    href="/profile" 
                    className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900"
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                  <Link href="/settings" className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900">
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                  <LogoutButton className="w-full">
                    <div className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900">
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Logout</span>
                    </div>
                  </LogoutButton>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

