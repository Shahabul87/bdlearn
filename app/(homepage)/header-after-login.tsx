"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  BookOpen,
  Sun,
  Moon,
} from 'lucide-react';
import { MobileMenuButton } from './components/mobile-menu-button';
import { NotificationsPopover } from './_components/notifications-popover';
import { MessagesPopover } from './_components/messages-popover';
import { UserMenu } from './_components/user-menu';

interface HeaderAfterLoginProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

export const HeaderAfterLogin = ({ user }: HeaderAfterLoginProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const dashboardLink = user?.role === "ADMIN" ? "/dashboard/admin" : "/user";

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
          <Link href="/" className="flex items-center space-x-2 pl-8 md:pl-0">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-500" />
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              bdGenAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-3 lg:space-x-6">
            <Link href="/features" className="text-sm lg:text-base dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="/discover" className="text-sm lg:text-base dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              Discover
            </Link>
            <Link href="/about" className="text-sm lg:text-base dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-sm lg:text-base dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors">
              Blog
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 md:p-2 rounded-lg dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              )}
            </button>

            {/* Hide these components on mobile (<768px) */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              <NotificationsPopover />
              <MessagesPopover />
              <UserMenu user={user} />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MobileMenuButton 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
                dashboardLink={dashboardLink}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

