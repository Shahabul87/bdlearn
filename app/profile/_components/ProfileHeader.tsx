"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Users, Zap, Lightbulb, Code } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  userId: string;
  username?: string;
  avatarUrl?: string;
  joinDate?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userId, username, avatarUrl, joinDate }) => {
  const stats = [
    { label: "FOLLOWERS", value: "0", icon: Users },
    { label: "BOOSTS", value: "0", icon: Zap },
    { label: "IDEAS", value: "0", icon: Lightbulb },
    { label: "SCRIPTS", value: "0", icon: Code },
  ];

  return (
    <div className={cn(
      "relative w-full  p-8",
      "bg-white/50 dark:bg-gray-900/50",
      "border border-gray-200 dark:border-gray-800",
      "backdrop-blur-sm"
    )}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center gap-8"
      >
        {/* Avatar Section */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative group"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-500/20 relative">
            {avatarUrl ? (
              <Image 
                src={avatarUrl} 
                alt="Avatar" 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500 dark:text-white/50">
                  {username?.charAt(0) || "A"}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-8 h-8 text-white/70" />
            </div>
          </div>
        </motion.div>

        {/* User Info Section */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            {username || "Anonymous User"}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-1"
          >
            {joinDate && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Member since {joinDate}
              </p>
            )}
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              ID: {userId}
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-wrap justify-center gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="mb-2 flex justify-center">
                <stat.icon className="w-5 h-5 text-purple-500 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default ProfileHeader;