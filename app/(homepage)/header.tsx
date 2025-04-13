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
  BookOpen,
  ChevronRight,
  School,
  GraduationCap,
  Building2,
  School2,
  Smartphone, 
  TrendingUp, 
  Share2, 
  Search, 
  Atom,
  Calculator
} from 'lucide-react';
import { Logo } from './_components/logo';
import { SearchBar } from './_components/search-bar';
import { ThemeToggle } from './_components/theme-toggle';
import { NavItem, MobileNavItem } from './_components/nav-item';
import { HeaderContainer } from './_components/header-container';
import { MobileMenu } from './_components/mobile-menu';
import { IconDisplay } from './_components/icon-display';

// Define the menu items
const menuItems = [
  {
    title: 'শিক্ষাঙ্গন',
    href: '/courses',
    icon: BookMarked,
  },
  {
    title: 'বিষয়সমূহ',
    href: '/subjects',
    icon: BookOpen,
  },
  {
    title: 'দক্ষশিক্ষা',
    href: '/skilldevelopment',
    icon: Layout,
  },
  {
    title: 'ব্লগ',
    href: '/blog',
    icon: FileText,
  },
];

const courseSubmenuItems = [
  {
    title: 'স্কুল',
    href: '/courses/school',
    icon: School,
    description: 'Class 6 to 12 courses',
    subItems: [
      {
        title: 'প্রাথমিক',
        href: '/school/primary',
        icon: School2,
        description: 'Class 1 to 5',
        subItems: [
          {
            title: 'প্রথম শ্রেণী',
            href: '/school/primary/class-1',
            icon: BookOpen,
            description: 'Class One',
          },
          {
            title: 'দ্বিতীয় শ্রেণী',
            href: '/school/primary/class-2',
            icon: BookOpen,
            description: 'Class Two',
          },
          {
            title: 'তৃতীয় শ্রেণী',
            href: '/school/primary/class-3',
            icon: BookOpen,
            description: 'Class Three',
          },
        ]
      },
      {
        title: 'হাই স্কুল',
        href: '/school/high',
        icon: BookOpen,
        description: 'Class 6 to 10',
      },
    ]
  },
  {
    title: 'কলেজ',
    href: '/college',
    icon: GraduationCap,
    description: 'Undergraduate courses',
  },
  {
    title: 'বিশ্ববিদ্যালয়',
    href: '/university',
    icon: Building2,
    description: 'Graduate & Post-graduate',
  },
];

const skillSubmenuItems = [
  {
    title: 'ওয়েব ডেভেলপমেন্ট',
    href: '/skilldevelopment/web',
    icon: Layout,
    description: 'Full Stack Development',
  },
  {
    title: 'মোবাইল অ্যাপ',
    href: '/skilldevelopment/mobile',
    icon: Smartphone,
    description: 'App Development',
  },
  {
    title: 'ডিজিটাল মার্কেটিং',
    href: '/skilldevelopment/marketing',
    icon: TrendingUp,
    description: 'Digital Marketing',
  },
];

const subjectSubmenuItems = [
  {
    title: 'বিজ্ঞান',
    href: '/subjects/science',
    icon: Atom,
    description: 'Science',
  },
  {
    title: 'গণিত',
    href: '/subjects/math',
    icon: Calculator,
    description: 'Mathematics',
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

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
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 dark:bg-gray-800/50 text-gray-200 hover:bg-gray-700 transition-colors"
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
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white transition-all duration-300"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </motion.div>
            </Link>
            
            <div className="pt-2">
              <ThemeToggle size="lg" className="w-full py-2 flex items-center justify-center" />
            </div>
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
          <div key={item.title} className="relative group">
            <NavItem 
              title={item.title} 
              href={item.href} 
              icon={item.icon} 
            />

            {/* Dropdown Menu for Courses */}
            {item.title === 'শিক্ষাঙ্গন' && (
              <div className="absolute left-0 mt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-40">
                <div className="relative top-0">
                  {/* Dropdown Arrow */}
                  <div className="absolute top-0 left-6 -translate-y-2 w-4 h-4 bg-white/95 dark:bg-gray-900/95 transform rotate-45 dark:ring-gray-800 ring-gray-200" />
                  
                  {/* Dropdown Content */}
                  <div className="relative mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl p-2 ring-1 ring-gray-200 dark:ring-gray-800 shadow-xl">
                    {courseSubmenuItems.map((subItem) => (
                      <SubmenuItem 
                        key={subItem.title}
                        item={subItem}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Dropdown Menu for Subjects */}
            {item.title === 'বিষয়সমূহ' && (
              <div className="absolute left-0 mt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-40">
                <div className="relative top-0">
                  <div className="absolute top-0 left-6 -translate-y-2 w-4 h-4 bg-white/95 dark:bg-gray-900/95 transform rotate-45 dark:ring-gray-800 ring-gray-200" />
                  <div className="relative mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl p-2 ring-1 ring-gray-200 dark:ring-gray-800 shadow-xl">
                    {subjectSubmenuItems.map((subItem) => (
                      <SubmenuItem 
                        key={subItem.title}
                        item={subItem}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Dropdown Menu for Skill Development */}
            {item.title === 'দক্ষশিক্ষা' && (
              <div className="absolute left-0 mt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-40">
                <div className="relative top-0">
                  <div className="absolute top-0 left-6 -translate-y-2 w-4 h-4 bg-white/95 dark:bg-gray-900/95 transform rotate-45 dark:ring-gray-800 ring-gray-200" />
                  <div className="relative mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl p-2 ring-1 ring-gray-200 dark:ring-gray-800 shadow-xl">
                    {skillSubmenuItems.map((subItem) => (
                      <SubmenuItem 
                        key={subItem.title}
                        item={subItem}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
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
          <div className="ml-1">
            <ThemeToggle size="lg" className="flex items-center justify-center" />
          </div>
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

// Helper component for submenu items
interface SubmenuItemProps {
  item: {
    title: string;
    href: string;
    icon: any;
    description?: string;
    subItems?: any[];
  };
}

const SubmenuItem = ({ item }: SubmenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group/submenu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        href={item.href}
        onClick={(e) => {
          if (item.subItems) {
            // If it has subItems, prevent default behavior only on mobile
            if (window.innerWidth < 768) {
              e.preventDefault();
            }
          }
        }}
        className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
      >
        <motion.div whileHover={{ x: 4 }} className="flex items-start gap-3 w-full">
          <IconDisplay icon={item.icon} title={item.title} />
          <div className="flex flex-col flex-1">
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              {item.title}
            </span>
            {item.description && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.description}
              </span>
            )}
          </div>
          {item.subItems && (
            <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400 self-center transition-transform duration-200 group-hover/submenu:text-blue-500 dark:group-hover/submenu:text-cyan-400 group-hover/submenu:translate-x-1" />
          )}
        </motion.div>
      </Link>

      {/* Sub-submenu */}
      {item.subItems && isHovered && (
        <div className="absolute top-0 left-full opacity-100 visible transition-all duration-200 w-64 ml-2 z-50">
          <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl p-2 ring-1 ring-gray-200 dark:ring-gray-800 shadow-xl">
            {item.subItems.map((subSubItem) => (
              <SubmenuItem 
                key={subSubItem.title}
                item={subSubItem}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

