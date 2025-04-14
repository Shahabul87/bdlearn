"use client";

import React from "react";
import { useLanguage } from "./language-provider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-md p-1">
      <button
        onClick={() => setLanguage("bn")}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          language === "bn"
            ? "bg-white dark:bg-gray-600 shadow-sm text-purple-700 dark:text-purple-300"
            : "bg-transparent text-gray-600 dark:text-gray-300"
        }`}
      >
        বাংলা
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          language === "en"
            ? "bg-white dark:bg-gray-600 shadow-sm text-purple-700 dark:text-purple-300"
            : "bg-transparent text-gray-600 dark:text-gray-300"
        }`}
      >
        English
      </button>
    </div>
  );
} 