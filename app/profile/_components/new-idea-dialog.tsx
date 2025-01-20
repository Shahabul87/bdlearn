"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface NewIdeaDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export const NewIdeaDialog = ({ open, onClose, userId }: NewIdeaDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    visibility: "private",
    tags: [] as string[],
    currentTag: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const addTag = () => {
    if (formData.currentTag.trim() && !formData.tags.includes(formData.currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ""
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  if (!open) return null;

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
          "w-full max-w-2xl rounded-2xl p-6",
          "bg-white dark:bg-gray-900",
          "border border-gray-200 dark:border-gray-800",
          "shadow-xl"
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Create New Idea
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              placeholder="Enter idea title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 min-h-[120px]"
              placeholder="Describe your idea..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                placeholder="e.g., Technology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Visibility
              </label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                className={cn(
                  "w-full rounded-lg px-4 py-2",
                  "bg-gray-50 dark:bg-gray-800",
                  "border border-gray-200 dark:border-gray-700",
                  "text-gray-900 dark:text-gray-100",
                  "focus:ring-2 focus:ring-purple-500"
                )}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="collaborative">Collaborative</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "px-2 py-1 rounded-lg text-sm",
                    "bg-purple-50 dark:bg-purple-500/10",
                    "text-purple-600 dark:text-purple-300",
                    "flex items-center gap-1"
                  )}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-purple-700 dark:hover:text-purple-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={formData.currentTag}
                onChange={(e) => setFormData(prev => ({ ...prev, currentTag: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                placeholder="Add tags..."
              />
              <Button
                type="button"
                onClick={addTag}
                variant="outline"
                className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white"
            >
              Create Idea
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}; 