"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

interface UserMenuProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dashboardLink = user?.role === "ADMIN" ? "/dashboard/admin" : "/user";

  return (
    <div className="relative hidden md:block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center space-x-2 dark:text-white text-gray-900"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white">
          {user?.name?.[0] || "U"}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-48 rounded-lg dark:bg-gray-900 bg-white border dark:border-gray-800 border-gray-200 shadow-lg overflow-hidden z-50"
            >
              <div className="py-2">
                <Link
                  href={dashboardLink}
                  className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100"
                >
                  <User className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </Link>
                <LogoutButton className="w-full">
                  <div className="flex items-center px-4 py-2 dark:text-gray-300 text-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                  </div>
                </LogoutButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};