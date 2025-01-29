// SettingsContent.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { getUserDetails } from '@/app/actions/get-user-details';
import { PrivateSettingsPage } from "../(protected)/settings/private-details-for-profile";
import { ProfileLinkCreationPage } from "./profile-links-creation";
import { motion } from "framer-motion";
import { Settings, User, CreditCard, Bell, Shield, Globe, Lock } from "lucide-react";
import { AccountAndBilling } from './_components/AccountAndBilling';
import { NotificationsSettings } from './_components/NotificationsSettings';
import { PrivacyAndSecurity } from './_components/PrivacyAndSecurity';
import { PublicDetails } from './_components/PublicDetails';
import { User as PrismaUser, ProfileLink } from "@prisma/client";

interface SettingsContentProps {
  userDetails: (PrismaUser & {
    profileLinks: ProfileLink[];
  }) | null;
}

export const SettingsContent = ({ userDetails: initialUserDetails }: SettingsContentProps) => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [selectedSettingsTab, setSelectedSettingsTab] = useState("Profile");
  const [selectedProfileSection, setSelectedProfileSection] = useState("Public Details");

  const settingsTabs = [
    { id: "Profile", icon: User },
    { id: "Account and Billing", icon: CreditCard },
    { id: "Notifications Settings", icon: Bell },
    { id: "Privacy and Security", icon: Shield }
  ];

  const profileSections = [
    { id: "Public Details", icon: Globe },
    { id: "Private Details", icon: Lock }
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await getUserDetails(initialUserDetails?.id || "");
        setUserDetails(user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [initialUserDetails?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin">
          <Settings className="w-8 h-8 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    );
  }

  const renderProfileContent = () => {
    switch (selectedProfileSection) {
      case "Public Details":
        return <PublicDetails userDetails={userDetails} />;
      case "Private Details":
        return <PrivateSettingsPage />;
      default:
        return null;
    }
  };

  const renderTabContent = () => {
    switch (selectedSettingsTab) {
      case "Profile":
        return (
          <div className="space-y-6">
            {/* Profile Section Tabs */}
            <div className="flex gap-2 p-1 bg-gray-100/80 dark:bg-gray-800/80 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
              {profileSections.map((section) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200
                      ${selectedProfileSection === section.id 
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                      }
                    `}
                    onClick={() => setSelectedProfileSection(section.id)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.id}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Profile Section Content */}
            <motion.div
              key={selectedProfileSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderProfileContent()}
            </motion.div>
          </div>
        );
      case "Account and Billing":
        return <AccountAndBilling />;
      case "Notifications Settings":
        return <NotificationsSettings />;
      case "Privacy and Security":
        return <PrivacyAndSecurity />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Main Settings Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        {settingsTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200
                ${selectedSettingsTab === tab.id 
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
                }
              `}
              onClick={() => setSelectedSettingsTab(tab.id)}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.id}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={selectedSettingsTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white/80 dark:bg-gray-900/80 rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-6"
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default SettingsContent;

