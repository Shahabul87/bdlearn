"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Code, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const ScriptsContent = ({ userId }: { userId: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState<"all" | "javascript" | "python" | "other">("all");

  return (
    <div className="space-y-6">
      {/* Header - Made responsive */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center bg-white/50 dark:bg-gray-900/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Code Scripts
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Manage your code snippets and scripts
          </p>
        </div>
        <Button 
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
        >
          <Plus className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">New Script</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>

      {/* Filters - Made responsive */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center bg-white/30 dark:bg-gray-900/30 p-3 sm:p-4 rounded-lg">
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <Input
            placeholder="Search scripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            icon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>
        <div className="flex overflow-x-auto no-scrollbar bg-white/50 dark:bg-gray-800/50 rounded-lg p-1">
          {["all", "javascript", "python", "other"].map((lang) => (
            <Button
              key={lang}
              variant={language === lang ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage(lang as typeof language)}
              className={cn(
                "flex-1 sm:flex-none min-w-[80px] sm:min-w-0",
                language === lang 
                  ? "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300" 
                  : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400",
                "capitalize text-xs sm:text-sm whitespace-nowrap"
              )}
            >
              {lang === "javascript" ? "JS" : lang.charAt(0).toUpperCase() + lang.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Content - Made responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-full text-center py-8 sm:py-16 px-4 bg-white/30 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-800"
        >
          <FileCode className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-purple-500 dark:text-purple-400 opacity-50" />
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
            No scripts added yet. Start by adding your first code script!
          </p>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto border-purple-500/50 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 font-medium"
            onClick={() => {}}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Script
          </Button>
        </motion.div>
      </div>
    </div>
  );
}; 