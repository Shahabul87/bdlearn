"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { defaultTabs } from "./defaultTabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface ProfileNavigationProps {
  selectedTab: string;
  onTabChange: (tabId: string) => void;
}

export const ProfileNavigation = ({ selectedTab, onTabChange }: ProfileNavigationProps) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    const navContainer = document.querySelector('#profile-nav-container');
    if (navContainer) {
      setShowLeftArrow(navContainer.scrollLeft > 0);
      setShowRightArrow(
        navContainer.scrollLeft < navContainer.scrollWidth - navContainer.clientWidth
      );
    }
  };

  useEffect(() => {
    const navContainer = document.querySelector('#profile-nav-container');
    if (navContainer) {
      navContainer.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      // Check on window resize
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      navContainer?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const navContainer = document.querySelector('#profile-nav-container');
    if (navContainer) {
      navContainer.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
      <nav className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-8 relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full 
              bg-white/80 backdrop-blur-sm border border-gray-200
              dark:bg-gray-800/90 dark:border-gray-700
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition-all duration-200
              shadow-md
              lg:hidden"
          >
            <ChevronLeft className="w-4 h-4 dark:text-gray-300 text-gray-700" />
          </button>
        )}

        {/* Navigation Container */}
        <div 
          id="profile-nav-container"
          className="flex w-full overflow-x-auto lg:overflow-visible no-scrollbar mx-6 lg:mx-0"
        >
          <div className="flex w-full lg:justify-center min-w-full">
            {defaultTabs.map((tab, index) => {
              const Icon = tab.icon;
              const isLastItem = index === defaultTabs.length - 1;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex-1 lg:flex-initial lg:min-w-[120px] flex items-center justify-center gap-1 px-3 sm:px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                    isLastItem && "pr-8 sm:pr-12",
                    selectedTab === tab.id
                      ? "border-purple-500 text-purple-600 dark:text-purple-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  )}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full 
              bg-white/80 backdrop-blur-sm border border-gray-200
              dark:bg-gray-800/90 dark:border-gray-700
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition-all duration-200
              shadow-md
              lg:hidden"
          >
            <ChevronRight className="w-4 h-4 dark:text-gray-300 text-gray-700" />
          </button>
        )}
      </nav>
    </div>
  );
}; 