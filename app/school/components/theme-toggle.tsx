"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./client-theme-provider";

export function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();
  
  return (
    <button 
      onClick={toggleDarkMode}
      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
} 