"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Tab from "./Tab";
import { AddTabModal } from "./_profileComponents/add-tab-modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TabManagerProps {
  defaultTabs: any[];
  customTabs: any[];
  userId: string;
  initialTab?: string;
}

export const TabManager = ({ defaultTabs, customTabs, userId, initialTab = "IDEAS" }: TabManagerProps) => {
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [isAddingTab, setIsAddingTab] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedTab = localStorage.getItem(`selectedTab-${userId}`);
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, [userId]);

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
    localStorage.setItem(`selectedTab-${userId}`, tabId);
  };

  const handleDeleteTab = async (tabId: string) => {
    try {
      await fetch(`/api/custom-tabs/${tabId}`, {
        method: 'DELETE',
      });
      toast.success("Tab deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete tab");
    }
  };

  const allTabs = [...defaultTabs, ...customTabs];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8"
    >
      <nav className="flex flex-wrap justify-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
        <div className="hidden md:flex flex-wrap justify-center gap-2">
          {allTabs.map((tab) => (
            <Tab
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              isSelected={selectedTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
              isCustom={!tab.isDefault}
              onDelete={!tab.isDefault ? () => handleDeleteTab(tab.id) : undefined}
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

      {isAddingTab && (
        <AddTabModal
          isOpen={isAddingTab}
          onClose={() => setIsAddingTab(false)}
          userId={userId}
          newTabData={{ label: '', icon: '' }}
          onSubmit={async (data) => {
            // Handle tab creation
            setIsAddingTab(false);
            router.refresh();
          }}
          onTabDataChange={(data) => {
            // Handle tab data changes
          }}
        />
      )}
    </motion.div>
  );
}; 