"use client";

import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LogoutButton } from '@/components/auth/logout-button';
import { LayoutDashboard, User, Settings, LogOut } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileMenuButton = ({ isOpen, setIsOpen }: MobileMenuButtonProps) => {
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 md:hidden rounded-lg dark:bg-gray-800/80 bg-gray-100/80 dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors dark:text-white text-gray-900"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed top-[64px] left-0 right-0 w-full h-[calc(100vh-64px)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50"
          >
            <div className="h-full overflow-y-auto px-4 py-6">
              <nav className="flex flex-col items-center justify-center h-full max-w-md mx-auto space-y-8">
                {/* Main Navigation Links */}
                <div className="flex flex-col items-center space-y-6 w-full">
                  <Link href="/features" 
                    className="text-lg font-medium text-center w-full py-2 px-4 rounded-lg
                      dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900
                      hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                    Features
                  </Link>
                  <Link href="/discover" 
                    className="text-lg font-medium text-center w-full py-2 px-4 rounded-lg
                      dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900
                      hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                    Discover
                  </Link>
                  <Link href="/about" 
                    className="text-lg font-medium text-center w-full py-2 px-4 rounded-lg
                      dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900
                      hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                    About
                  </Link>
                  <Link href="/blog" 
                    className="text-lg font-medium text-center w-full py-2 px-4 rounded-lg
                      dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900
                      hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                    Blog
                  </Link>
                </div>

                {/* User Actions */}
                <div className="w-full pt-6 border-t dark:border-gray-800 border-gray-200">
                  <div className="flex flex-col items-center space-y-4">
                    <Link href="/user" 
                      className="flex items-center justify-center w-full p-3 rounded-lg
                        dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900
                        hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                      <LayoutDashboard className="w-5 h-5 mr-3" />
                      <span className="text-lg">Dashboard</span>
                    </Link>
                    <Link href="/profile" 
                      className="flex items-center justify-center w-full p-3 rounded-lg
                        dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900
                        hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                      <User className="w-5 h-5 mr-3" />
                      <span className="text-lg">Profile</span>
                    </Link>
                    <Link href="/settings" 
                      className="flex items-center justify-center w-full p-3 rounded-lg
                        dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900
                        hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                      <Settings className="w-5 h-5 mr-3" />
                      <span className="text-lg">Settings</span>
                    </Link>
                    <LogoutButton className="w-full">
                      <div className="flex items-center justify-center w-full p-3 rounded-lg
                        dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900
                        hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all">
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="text-lg">Logout</span>
                      </div>
                    </LogoutButton>
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 