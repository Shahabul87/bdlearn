"use client";

import { motion } from "framer-motion";
import ProfileHeader from "./ProfileHeader";

interface AnimatedHeaderProps {
  userId: string;
  username?: string;
  avatarUrl?: string;
  joinDate?: string;
}

export const AnimatedHeader = ({ userId, username, avatarUrl, joinDate }: AnimatedHeaderProps) => {
  return (
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
  );
}; 