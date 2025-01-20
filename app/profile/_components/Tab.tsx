// Tab.tsx
"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface TabProps {
  label: string;
  icon: LucideIcon;
  isSelected: boolean;
  onClick: () => void;
  isCustom?: boolean;
  onDelete?: () => void;
}

const Tab: React.FC<TabProps> = ({
  label,
  icon: Icon,
  isSelected,
  onClick,
  isCustom,
  onDelete
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200",
        isSelected
          ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white shadow-lg shadow-purple-500/20"
          : "bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600/50",
        "border border-transparent",
        !isSelected && "hover:border-gray-200 dark:hover:border-gray-600"
      )}
    >
      <Icon className={cn(
        "w-4 h-4",
        isSelected ? "text-white" : "text-gray-500 dark:text-gray-400"
      )} />
      <span className="text-sm font-medium">{label}</span>
      {isCustom && onDelete && (
        <X
          className={cn(
            "w-4 h-4 ml-1",
            isSelected ? "text-white/70 hover:text-white" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      )}
    </motion.button>
  );
};

export default Tab;
