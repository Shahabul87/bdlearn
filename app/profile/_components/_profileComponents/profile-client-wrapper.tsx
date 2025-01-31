"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import ProfileHeader from "../ProfileHeader";
import { ProfileTabs } from "./profile-tabs";
import TabContent from "../TabContent";
import { AddTabModal } from "./add-tab-modal";
import type { ProfileProps } from "../types";
import { defaultTabs, getIcon } from "./profile-utils";

export function ProfileClientWrapper(props: ProfileProps) {
  const [selectedTab, setSelectedTab] = useState("IDEAS");
  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabData, setNewTabData] = useState({ label: '', icon: 'Folder' });
  const [customTabs, setCustomTabs] = useState(props.customTabs);

  useEffect(() => {
    const storedTab = localStorage.getItem(`selectedTab-${props.userId}`);
    if (storedTab) setSelectedTab(storedTab);
  }, [props.userId]);

  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
    localStorage.setItem(`selectedTab-${props.userId}`, tabId);
  };

  const handleAddCustomTab = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/custom-tabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: newTabData.label,
          icon: newTabData.icon,
          userId: props.userId
        }),
      });

      if (response.ok) {
        const newTab = await response.json();
        setCustomTabs(prev => [...prev, newTab]);
        setIsAddingTab(false);
        setNewTabData({ label: '', icon: 'Folder' });
      }
    } catch (error) {
      console.error('Error creating custom tab:', error);
    }
  };

  const handleDeleteTab = async (tabId: string) => {
    try {
      await fetch(`/api/custom-tabs/${tabId}`, { method: 'DELETE' });
      setCustomTabs(prev => prev.filter(tab => tab.id !== tabId));
    } catch (error) {
      console.error('Error deleting tab:', error);
    }
  };

  const allTabs = [
    ...defaultTabs,
    ...customTabs.map(tab => ({
      id: tab.id,
      label: tab.label,
      icon: getIcon(tab.icon),
      isDefault: false
    }))
  ];

  return (
    <SidebarDemo>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileHeader {...props} />
        </motion.div>
        
        <ProfileTabs
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
          onAddTab={() => setIsAddingTab(true)}
          onDeleteTab={handleDeleteTab}
          allTabs={allTabs}
          userId={props.userId}
        />

        {isAddingTab && (
          <AddTabModal
            isOpen={isAddingTab}
            onClose={() => setIsAddingTab(false)}
            newTabData={newTabData}
            onSubmit={handleAddCustomTab}
            onTabDataChange={setNewTabData}
          />
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
            <TabContent
              selectedTab={selectedTab}
              {...props}
            />
          </div>
        </motion.div>
      </div>
    </SidebarDemo>
  );
} 