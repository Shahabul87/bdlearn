"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  ChevronRight,
  BookOpen,
  Layout,
  User,
  BookMarked,
  FileText,
  School,
  GraduationCap,
  Building2,
  School2,
  Smartphone, 
  TrendingUp, 
  Share2, 
  Search, 
  Atom,
  Calculator,
  LogOut
} from 'lucide-react';
import { LogoutButton } from '@/components/auth/logout-button';
import { NotificationsPopover } from './_components/notifications-popover';
import { MessagesPopover } from './_components/messages-popover';
import { UserMenu } from './_components/user-menu';
import { ThemeToggle } from './_components/theme-toggle';
import { Logo } from './_components/logo';
import { SearchBar } from './_components/search-bar';
import { NavItem, MobileNavItem } from './_components/nav-item';
import { HeaderContainer } from './_components/header-container';
import { MobileMenu } from './_components/mobile-menu';
import { IconDisplay } from './_components/icon-display';
import { SubmenuContainer } from './_components/submenu-container';
import { useSubmenuPosition } from './_components/use-submenu-position';

interface HeaderAfterLoginProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

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
    title: 'দক্ষশিক্ষা ',
    href: '/skilldevelopment',
    icon: BookOpen,
  },
  {
    title: 'ব্লগ',
    href: '/blog',
    icon: FileText,
  },
  {
    title: 'ড্যাশবোর্ড',
    href: '/dashboard',
    icon: User,
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
          {
            title: 'চতুর্থ শ্রেণী',
            href: '/school/primary/class-4',
            icon: BookOpen,
            description: 'Class Four',
          },
          {
            title: 'পঞ্চম শ্রেণী',
            href: '/school/primary/class-5',
            icon: BookOpen,
            description: 'Class Five',
          },
        ]
      },
      {
        title: 'হাই স্কুল',
        href: '/school/high',
        icon: BookOpen,
        description: 'Class 6 to 10',
        subItems: [
          {
            title: 'ষষ্ঠ শ্রেণী',
            href: '/school/high/class-6',
            icon: BookOpen,
            description: 'Class Six',
          },
          {
            title: 'সপ্তম শ্রেণী',
            href: '/school/high/class-7',
            icon: BookOpen,
            description: 'Class Seven',
          },
          {
            title: 'অষ্টম শ্রেণী',
            href: '/school/high/class-8',
            icon: BookOpen,
            description: 'Class Eight',
          },
          {
            title: 'নবম শ্রেণী',
            href: '/school/high/class-9',
            icon: BookOpen,
            description: 'Class Nine',
          },
          {
            title: 'দশম শ্রেণী',
            href: '/school/high/class-10',
            icon: BookOpen,
            description: 'Class Ten',
          },
        ]
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
    subItems: [
      {
        title: 'ফ্রন্ট-এন্ড',
        href: '/skilldevelopment/web/frontend',
        icon: BookOpen,
        description: 'HTML, CSS, JavaScript, React',
      },
      {
        title: 'ব্যাক-এন্ড',
        href: '/skilldevelopment/web/backend',
        icon: BookOpen,
        description: 'Node.js, Python, Database',
      }
    ]
  },
  {
    title: 'মোবাইল অ্যাপ',
    href: '/skilldevelopment/mobile',
    icon: Smartphone,
    description: 'App Development',
    subItems: [
      {
        title: 'অ্যান্ড্রয়েড',
        href: '/skilldevelopment/mobile/android',
        icon: BookOpen,
        description: 'Java, Kotlin, Android Studio',
      },
      {
        title: 'আইওএস',
        href: '/skilldevelopment/mobile/ios',
        icon: BookOpen,
        description: 'Swift, SwiftUI, Xcode',
      }
    ]
  },
  {
    title: 'ডিজিটাল মার্কেটিং',
    href: '/skilldevelopment/marketing',
    icon: TrendingUp,
    description: 'Digital Marketing',
    subItems: [
      {
        title: 'সোশ্যাল মিডিয়া',
        href: '/skilldevelopment/marketing/social',
        icon: Share2,
        description: 'Facebook, Instagram, LinkedIn',
      },
      {
        title: 'এসইও',
        href: '/skilldevelopment/marketing/seo',
        icon: Search,
        description: 'Search Engine Optimization',
      }
    ]
  },
];

const subjectSubmenuItems = [
  {
    title: 'বিজ্ঞান',
    href: '/subjects/science',
    icon: Atom,
    description: 'Science',
    subItems: [
      {
        title: 'পদার্থবিজ্ঞান',
        href: '/subjects/science/physics',
        icon: Atom,
        description: 'Physics',
      },
      {
        title: 'রসায়ন',
        href: '/subjects/science/chemistry',
        icon: Atom,
        description: 'Chemistry',
      },
      {
        title: 'জীববিজ্ঞান',
        href: '/subjects/science/biology',
        icon: Atom,
        description: 'Biology',
      }
    ]
  },
  {
    title: 'গণিত',
    href: '/subjects/math',
    icon: Calculator,
    description: 'Mathematics',
    subItems: [
      {
        title: 'বীজগণিত',
        href: '/subjects/math/algebra',
        icon: Calculator,
        description: 'Algebra',
      },
      {
        title: 'জ্যামিতি',
        href: '/subjects/math/geometry',
        icon: Calculator,
        description: 'Geometry',
      },
      {
        title: 'ক্যালকুলাস',
        href: '/subjects/math/calculus',
        icon: Calculator,
        description: 'Calculus',
      }
    ]
  },
];

export const HeaderAfterLogin = ({ user }: HeaderAfterLoginProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const dashboardLink = user?.role === "ADMIN" ? "/dashboard/admin" : "/user";

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
          
          <div className="pt-4 flex items-center gap-4">
            <NotificationsPopover />
            <MessagesPopover />
            <UserMenu user={user} />
          </div>

          <div className="pt-2">
            <div className="mb-3">
              <ThemeToggle size="sm" className="w-full flex items-center justify-center py-2" />
            </div>
            <LogoutButton>
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg transition-colors duration-200 text-center"
              >
                Logout
              </motion.div>
            </LogoutButton>
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
            {item.title === 'দক্ষশিক্ষা ' && (
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

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <div className="ml-1">
            <ThemeToggle size="sm" />
          </div>

          {/* Hide these components on mobile (<768px) */}
          <div className="hidden md:flex items-center gap-4">
            <NotificationsPopover />
            <MessagesPopover />
            <UserMenu user={user} />
          </div>

          {/* Logout Button */}
          <div className="hidden md:block relative ml-4">
            <LogoutButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            </LogoutButton>
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

