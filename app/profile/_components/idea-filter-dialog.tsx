"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IdeaFilterDialogProps {
  open: boolean;
  onClose: () => void;
  filters: {
    status: string;
    category: string;
    visibility: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const IdeaFilterDialog = ({ 
  open, 
  onClose, 
  filters, 
  onFiltersChange 
}: IdeaFilterDialogProps) => {
  if (!open) return null;

  const filterOptions = {
    status: ["all", "draft", "published", "archived"],
    visibility: ["all", "public", "private", "collaborative"],
    category: ["all", "Technology", "Business", "Education", "Health", "Other"]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-500/20 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full max-w-md rounded-2xl p-6",
          "bg-white dark:bg-gray-900",
          "border border-gray-200 dark:border-gray-800",
          "shadow-xl"
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Filter Ideas
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.status.map((status) => (
                <button
                  key={status}
                  onClick={() => onFiltersChange({ ...filters, status })}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium capitalize",
                    "transition-colors duration-200",
                    filters.status === status
                      ? "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Visibility Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Visibility
            </label>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.visibility.map((visibility) => (
                <button
                  key={visibility}
                  onClick={() => onFiltersChange({ ...filters, visibility })}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium capitalize",
                    "transition-colors duration-200",
                    filters.visibility === visibility
                      ? "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  {visibility}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.category.map((category) => (
                <button
                  key={category}
                  onClick={() => onFiltersChange({ ...filters, category })}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium",
                    "transition-colors duration-200",
                    filters.category === category
                      ? "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Button
              variant="outline"
              onClick={() => onFiltersChange({ status: "all", visibility: "all", category: "all" })}
              className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Reset Filters
            </Button>
            <Button
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}; 