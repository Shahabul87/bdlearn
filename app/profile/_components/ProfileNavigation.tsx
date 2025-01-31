"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { defaultTabs } from "./defaultTabs";

interface ProfileNavigationProps {
  selectedTab: string;
  onTabChange: (tabId: string) => void;
}

export const ProfileNavigation = ({ selectedTab, onTabChange }: ProfileNavigationProps) => {
  return (
    <div className="sticky top-20 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full overflow-x-auto lg:overflow-visible no-scrollbar">
          <div className="flex w-full lg:justify-center min-w-full">
            {defaultTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex-1 lg:flex-initial lg:min-w-[120px] flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                    selectedTab === tab.id
                      ? "border-purple-500 text-purple-600 dark:text-purple-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  )}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}; 