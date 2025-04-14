"use client";

import React from "react";
import { Bell, CircleUser } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

export function HeaderControls() {
  return (
    <div className="flex items-center space-x-3">
      {/* Notifications */}
      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <Bell className="h-5 w-5" />
      </button>
      
      {/* User profile */}
      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <CircleUser className="h-5 w-5" />
      </button>
      
      {/* Theme toggle */}
      <ThemeToggle />
      
      {/* Language switcher */}
      <LanguageSwitcher />
    </div>
  );
} 