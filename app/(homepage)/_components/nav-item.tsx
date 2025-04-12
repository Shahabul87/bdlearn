"use client"

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export const NavItem = ({ title, href, icon: Icon, onClick }: NavItemProps) => {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
    >
      <div className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/50">
        <Icon className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
      </div>
      <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300 dark:from-gray-200 dark:to-gray-400 dark:group-hover:from-cyan-400 dark:group-hover:to-purple-400">
        {title}
      </span>
    </Link>
  );
};

export const MobileNavItem = ({ title, href, icon: Icon, onClick }: NavItemProps) => {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
    >
      <div className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/50">
        <Icon className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
      </div>
      <span className="text-gray-700 dark:text-gray-200">
        {title}
      </span>
    </Link>
  );
}; 