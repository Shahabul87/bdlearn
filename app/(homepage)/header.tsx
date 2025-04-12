"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  LogIn,
  UserPlus,
  Layout,
  BookMarked,
  FileText,
  BookOpen
} from 'lucide-react';
import { Logo } from './_components/logo';
import { SearchBar } from './_components/search-bar';
import { ThemeToggle } from './_components/theme-toggle';
import { NavItem, MobileNavItem } from './_components/nav-item';
import { HeaderContainer } from './_components/header-container';
import { MobileMenu } from './_components/mobile-menu';

// Define the menu items
const menuItems = [
  {
    title: 'Features',
    href: '/features',
    icon: Layout,
  },
  {
    title: 'Discover',
    href: '/discover',
    icon: BookMarked,
  },
  {
    title: 'About',
    href: '/about',
    icon: FileText,
  },
  {
    title: 'Get Started',
    href: '/get-started',
    icon: BookOpen,
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderContainer
      isMenuOpen={isMenuOpen}
      mobileMenu={
        <MobileMenu>
          {menuItems.map((item) => (
            <MobileNavItem 
              key={item.title} 
              title={item.title} 
              href={item.href} 
              icon={item.icon}
              onClick={() => setIsMenuOpen(false)}
            />
          ))}
          
          <div className="pt-4 flex flex-col gap-3">
            <Link 
              href="/auth/login"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              >
                <LogIn className="w-4 h-4 text-cyan-400" />
                <span>Login</span>
              </motion.div>
            </Link>
            
            <Link 
              href="/auth/register"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </motion.div>
            </Link>
          </div>
        </MobileMenu>
      }
    >
      {/* Logo and Search Bar */}
      <div className="flex items-center gap-6">
        <Logo />
        <SearchBar />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
        {menuItems.map((item) => (
          <NavItem 
            key={item.title} 
            title={item.title} 
            href={item.href} 
            icon={item.icon} 
          />
        ))}

        {/* Auth Buttons */}
        <div className="flex items-center gap-3 pl-4">
          <Link href="/auth/login">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 dark:bg-gray-800/50 text-gray-200 dark:text-gray-200 hover:bg-gray-700/70 transition-colors"
            >
              <LogIn className="w-4 h-4 text-cyan-400" />
              <span>Login</span>
            </motion.div>
          </Link>
          <Link href="/auth/register">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white transition-all duration-300"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </motion.div>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </motion.button>
    </HeaderContainer>
  );
};

