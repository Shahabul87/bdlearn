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
      {/* Header */}
      <div className="flex justify-between items-center bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Code Scripts
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your code snippets and scripts
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Script
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap items-center bg-white/30 dark:bg-gray-900/30 p-4 rounded-lg">
        <Input
          placeholder="Search scripts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          icon={<Search className="w-4 h-4 text-gray-400" />}
        />
        <div className="flex bg-white/50 dark:bg-gray-800/50 rounded-lg p-1">
          {["all", "javascript", "python", "other"].map((lang) => (
            <Button
              key={lang}
              variant={language === lang ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage(lang as typeof language)}
              className={cn(
                language === lang 
                  ? "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300" 
                  : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400",
                "capitalize"
              )}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-full text-center py-16 bg-white/30 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-800"
        >
          <FileCode className="w-16 h-16 mx-auto mb-4 text-purple-500 dark:text-purple-400 opacity-50" />
          <p className="text-gray-600 dark:text-gray-400">
            No scripts added yet. Start by adding your first code script!
          </p>
          <Button 
            variant="outline" 
            className="mt-4 border-purple-500/50 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 font-medium"
            onClick={() => {}}
          >
            Add Your First Script
          </Button>
        </motion.div>
      </div>
    </div>
  );
}; 