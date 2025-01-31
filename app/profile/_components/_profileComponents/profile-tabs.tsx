"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Tab from "../Tab";
import { defaultTabs, getIcon } from "./profile-utils";
import { AddTabModal } from "./add-tab-modal";
import type { LucideIcon } from 'lucide-react';

interface ProfileTabsProps {
  userId: string;
  onTabChange: (tabId: string) => void;
  selectedTab: string;
  onAddTab: () => void;
  onDeleteTab: (tabId: string) => void;
  allTabs: {
    id: string;
    icon: LucideIcon;
    label: string;
    isDefault: boolean;
  }[];
}

export function ProfileTabs({ userId, onTabChange, selectedTab, onAddTab, onDeleteTab, allTabs }: ProfileTabsProps) {
  const [isAddingTab, setIsAddingTab] = useState(false);

  // ... rest of your tabs logic

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <nav className="flex flex-wrap justify-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
          {/* Mobile View */}
          <div className="w-full px-4 py-2 md:hidden">
            <select 
              value={selectedTab}
              onChange={(e) => onTabChange(e.target.value)}
              className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {allTabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
          {/* Desktop View */}
          <div className="hidden md:flex flex-wrap justify-center gap-2">
            {allTabs.map((tab) => (
              <Tab
                key={tab.id}
                label={tab.label}
                icon={tab.icon}
                isSelected={selectedTab === tab.id}
                onClick={() => onTabChange(tab.id)}
                isCustom={!tab.isDefault}
                onDelete={!tab.isDefault ? () => onDeleteTab(tab.id) : undefined}
              />
            ))}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingTab(true)}
              className="px-4 py-2 rounded-lg flex items-center gap-2 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/50 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200 border border-transparent"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Add Tab</span>
            </motion.button>
          </div>
        </nav>
      </motion.div>
      <AddTabModal 
        isOpen={isAddingTab}
        onClose={() => setIsAddingTab(false)}
        userId={userId}
      />
    </>
  );
} 