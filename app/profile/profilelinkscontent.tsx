import React from 'react';
import { ProfileLinkForm } from './profile-link-form';
import { ProfileLink } from '@prisma/client';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfileLinksContentProps {
  userId: string;
  profileLinks: ProfileLink[];
}

export const ProfileLinksContent: React.FC<ProfileLinksContentProps> = ({ userId, profileLinks }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 sm:p-6 rounded-xl backdrop-blur-sm shadow-xl",
        "bg-white/50 dark:bg-gray-900/50",
        "border border-gray-200/50 dark:border-gray-700/50"
      )}
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
        Profile Links
      </h2>

      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
        <ProfileLinkForm userId={userId} profileLinks={profileLinks} />
      </div>
    </motion.div>
  );
};

export default ProfileLinksContent;
