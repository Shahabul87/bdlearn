"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandYoutube,
  IconBrandTwitch,
  IconBrandDiscord,
  IconBrandTiktok,
  IconWorld,
} from "@tabler/icons-react";

interface ProfileLinkProps {
  profileLink: {
    id: string;
    userId: string;
    platform: string;
    url: string;
    position: number | null;
    createdAt: Date;
    updatedAt: Date;
  }
}

const platformIcons: { [key: string]: React.ReactNode } = {
  facebook: <IconBrandFacebook className="w-5 h-5" />,
  twitter: <IconBrandTwitter className="w-5 h-5" />,
  instagram: <IconBrandInstagram className="w-5 h-5" />,
  linkedin: <IconBrandLinkedin className="w-5 h-5" />,
  github: <IconBrandGithub className="w-5 h-5" />,
  youtube: <IconBrandYoutube className="w-5 h-5" />,
  twitch: <IconBrandTwitch className="w-5 h-5" />,
  discord: <IconBrandDiscord className="w-5 h-5" />,
  tiktok: <IconBrandTiktok className="w-5 h-5" />,
  website: <IconWorld className="w-5 h-5" />,
};

const MySocialMediaCard = ({ profileLink }: ProfileLinkProps) => {
  const platform = profileLink.platform.toLowerCase();
  const icon = platformIcons[platform] || platformIcons.website;

  // Ensure URL has protocol
  const getValidUrl = (url: string) => {
    try {
      new URL(url);
      return url;
    } catch {
      return `https://${url}`;
    }
  };

  const validUrl = getValidUrl(profileLink.url);

  return (
    <Link 
      href={validUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        window.open(validUrl, '_blank', 'noopener,noreferrer');
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative p-4 rounded-xl transition-all duration-300",
          "group hover:shadow-lg",
          "dark:bg-gray-900/50 dark:hover:bg-gray-800/50",
          "bg-white hover:bg-gray-50",
          "border",
          "dark:border-gray-800 dark:hover:border-gray-700",
          "border-gray-200 hover:border-gray-300"
        )}
      >
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          {/* Platform Icon */}
          <div className={cn(
            "p-2 rounded-lg transition-colors duration-300",
            "dark:bg-gray-800 dark:group-hover:bg-gray-700",
            "bg-gray-100 group-hover:bg-gray-200"
          )}>
            <span className={cn(
              "transition-colors duration-300",
              platform === "facebook" && "text-blue-500",
              platform === "twitter" && "text-sky-500",
              platform === "instagram" && "text-pink-500",
              platform === "linkedin" && "text-blue-600",
              platform === "github" && "dark:text-gray-200 text-gray-800",
              platform === "youtube" && "text-red-500",
              platform === "twitch" && "text-purple-500",
              platform === "discord" && "text-indigo-500",
              platform === "tiktok" && "dark:text-gray-200 text-gray-800",
              platform === "website" && "text-emerald-500"
            )}>
              {icon}
            </span>
          </div>

          {/* Platform Name */}
          <div className="flex flex-col">
            <span className={cn(
              "text-sm font-medium capitalize",
              "dark:text-gray-200 text-gray-700",
              "group-hover:text-transparent group-hover:bg-clip-text",
              "group-hover:bg-gradient-to-r",
              platform === "facebook" && "group-hover:from-blue-600 group-hover:to-blue-400",
              platform === "twitter" && "group-hover:from-sky-600 group-hover:to-sky-400",
              platform === "instagram" && "group-hover:from-pink-600 group-hover:to-purple-400",
              platform === "linkedin" && "group-hover:from-blue-700 group-hover:to-blue-500",
              platform === "github" && "dark:group-hover:from-gray-200 dark:group-hover:to-gray-400 group-hover:from-gray-700 group-hover:to-gray-900",
              platform === "youtube" && "group-hover:from-red-600 group-hover:to-red-400",
              platform === "twitch" && "group-hover:from-purple-600 group-hover:to-purple-400",
              platform === "discord" && "group-hover:from-indigo-600 group-hover:to-indigo-400",
              platform === "tiktok" && "dark:group-hover:from-gray-200 dark:group-hover:to-gray-400 group-hover:from-gray-700 group-hover:to-gray-900",
              platform === "website" && "group-hover:from-emerald-600 group-hover:to-emerald-400"
            )}>
              {platform}
            </span>
          </div>

          {/* Arrow indicator */}
          <motion.span 
            className={cn(
              "ml-auto text-lg opacity-0 group-hover:opacity-100 transition-opacity",
              "dark:text-gray-400 text-gray-600"
            )}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            →
          </motion.span>
        </motion.div>

        {/* Subtle gradient background on hover */}
        <div className={cn(
          "absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-gradient-to-br",
          platform === "facebook" && "from-blue-500/5 to-blue-500/10",
          platform === "twitter" && "from-sky-500/5 to-sky-500/10",
          platform === "instagram" && "from-pink-500/5 to-purple-500/10",
          platform === "linkedin" && "from-blue-600/5 to-blue-600/10",
          platform === "github" && "from-gray-500/5 to-gray-500/10",
          platform === "youtube" && "from-red-500/5 to-red-500/10",
          platform === "twitch" && "from-purple-500/5 to-purple-500/10",
          platform === "discord" && "from-indigo-500/5 to-indigo-500/10",
          platform === "tiktok" && "from-gray-500/5 to-gray-500/10",
          platform === "website" && "from-emerald-500/5 to-emerald-500/10"
        )} />
      </motion.div>
    </Link>
  );
};

export default MySocialMediaCard;
