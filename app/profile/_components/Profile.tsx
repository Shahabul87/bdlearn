"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import ProfileHeader from "./ProfileHeader";
import Tab from "./Tab";
import TabContent from "./TabContent";
import {
  ProfileLink,
  FavoriteVideo,
  FavoriteAudio,
  FavoriteBlog,
  FavoriteArticle,
  Subscription,
} from "@prisma/client";
import { 
  Lightbulb, 
  Brain, 
  Code, 
  Link as LinkIcon, 
  Video, 
  Music, 
  FileText, 
  BookOpen, 
  Users, 
  UserPlus, 
  Settings, 
  Star, 
  PlusCircle, 
  Folder, 
  File 
} from "lucide-react";
import { db } from "@/lib/db";
import type { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  userId: string;
  username?: string;
  avatarUrl?: string;
  joinDate?: string;
  profileLinks: ProfileLink[];
  favoriteVideos: FavoriteVideo[];
  favoriteAudios: FavoriteAudio[];
  favoriteBlogs: FavoriteBlog[];
  favoriteArticles: FavoriteArticle[];
  subscriptions: Subscription[];
}

interface CustomTab {
  id: string;
  label: string;
  icon: string;
  userId: string;
  createdAt: Date;
}

const defaultTabs = [
  { id: "IDEAS", icon: Lightbulb, label: "Ideas", isDefault: true },
  { id: "MINDS", icon: Brain, label: "Minds", isDefault: true },
  { id: "SCRIPTS", icon: Code, label: "Scripts", isDefault: true },
  { id: "PROFILE LINKS", icon: LinkIcon, label: "Links", isDefault: true },
  { id: "VIDEOS", icon: Video, label: "Videos", isDefault: true },
  { id: "AUDIOS", icon: Music, label: "Audios", isDefault: true },
  { id: "ARTICLES", icon: FileText, label: "Articles", isDefault: true },
  { id: "BLOGS", icon: BookOpen, label: "Blogs", isDefault: true },
  { id: "FOLLOWERS", icon: Users, label: "Followers", isDefault: true },
  { id: "FOLLOWING", icon: UserPlus, label: "Following", isDefault: true },
  { id: "SETTINGS", icon: Settings, label: "Settings", isDefault: true },
  { id: "SUBSCRIPTION", icon: Star, label: "Premium", isDefault: true },
  { id: "BILLING", icon: Star, label: "Billing", isDefault: true },
];

export const Profile: React.FC<ProfileProps> = ({
  userId,
  username,
  avatarUrl,
  joinDate,
  profileLinks,
  favoriteVideos,
  favoriteAudios,
  favoriteBlogs,
  favoriteArticles,
  subscriptions,
}) => {
  const [selectedTab, setSelectedTab] = useState(() => {
    return "IDEAS";
  });

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

  const [customTabs, setCustomTabs] = useState<CustomTab[]>([]);
  const [isAddingTab, setIsAddingTab] = useState(false);

  const [newTabData, setNewTabData] = useState({
    label: '',
    icon: 'Folder'
  });

  const allTabs = [...defaultTabs, ...customTabs.map(tab => ({
    id: tab.id,
    label: tab.label,
    icon: getIcon(tab.icon),
    isDefault: false
  }))];

  const getIcon = (iconName: string): LucideIcon => {
    const icons: { [key: string]: LucideIcon } = {
      Folder: Folder,
      File: File,
    };
    return icons[iconName] || Folder;
  };

  const handleAddCustomTab = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/custom-tabs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          label: newTabData.label,
          icon: newTabData.icon,
          userId
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
      await fetch(`/api/custom-tabs/${tabId}`, {
        method: 'DELETE',
      });
      setCustomTabs(prev => prev.filter(tab => tab.id !== tabId));
    } catch (error) {
      console.error('Error deleting tab:', error);
    }
  };

  return (
    <SidebarDemo>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileHeader
              userId={userId}
              username={username}
              avatarUrl={avatarUrl}
              joinDate={joinDate}
            />
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <nav className="flex flex-wrap justify-center gap-2 p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="w-full px-4 py-2 md:hidden">
                <select 
                  value={selectedTab}
                  onChange={(e) => setSelectedTab(e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {allTabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label}
                    </option>
                  ))}
                </select>
              </div>
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
          </motion.div>

          {/* Custom Tab Modal */}
          {isAddingTab && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setIsAddingTab(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md mx-4 shadow-xl"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create Custom Tab</h3>
                <form onSubmit={handleAddCustomTab} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 block mb-2">Tab Name</label>
                    <input
                      type="text"
                      value={newTabData.label}
                      onChange={(e) => setNewTabData(prev => ({ ...prev, label: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter tab name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 block mb-2">Icon</label>
                    <select
                      value={newTabData.icon}
                      onChange={(e) => setNewTabData(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Folder">Folder</option>
                      <option value="File">File</option>
                    </select>
                  </div>
                  <div className="flex gap-2 justify-end mt-6">
                    <button
                      type="button"
                      onClick={() => setIsAddingTab(false)}
                      className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 dark:hover:bg-purple-400"
                    >
                      Create Tab
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Tab Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <TabContent
                selectedTab={selectedTab}
                userId={userId}
                profileLinks={profileLinks}
                favoriteVideos={favoriteVideos}
                favoriteAudios={favoriteAudios}
                favoriteBlogs={favoriteBlogs}
                favoriteArticles={favoriteArticles}
                subscriptions={subscriptions}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SidebarDemo>
  );
};

export default Profile;



