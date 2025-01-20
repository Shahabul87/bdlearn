"use client";

import { PrivateDetailsSettingsPage } from "./private-details";
import { motion } from "framer-motion";
import { useCurrentUser } from "@/hooks/use-current-user";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { cn } from "@/lib/utils";

const SettingsPage = () => {
  const user = useCurrentUser();
  
  // Convert undefined to null to match expected type
  const userForHeader = user ? {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isTwoFactorEnabled: user.isTwoFactorEnabled,
    isOAuth: user.isOAuth
  } : null;

  return (
    <>
      <ConditionalHeader user={userForHeader} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "min-h-screen pt-20",
          "bg-white dark:bg-gray-900",
          "text-gray-900 dark:text-gray-100"
        )}
      >
        <PrivateDetailsSettingsPage />
      </motion.div>
    </>
  );
}

export default SettingsPage;