"use client";

import { motion } from "framer-motion";

interface AddTabModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  newTabData: {
    label: string;
    icon: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onTabDataChange: (data: { label: string; icon: string }) => void;
}

export function AddTabModal({
  isOpen,
  onClose,
  userId,
  newTabData,
  onSubmit,
  onTabDataChange
}: AddTabModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-500/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md mx-4 shadow-xl"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create Custom Tab</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300 block mb-2">Tab Name</label>
            <input
              type="text"
              value={newTabData.label}
              onChange={(e) => onTabDataChange({ ...newTabData, label: e.target.value })}
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter tab name"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300 block mb-2">Icon</label>
            <select
              value={newTabData.icon}
              onChange={(e) => onTabDataChange({ ...newTabData, icon: e.target.value })}
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Folder">Folder</option>
              <option value="File">File</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 dark:hover:bg-purple-400"
            >
              Create Tab
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 