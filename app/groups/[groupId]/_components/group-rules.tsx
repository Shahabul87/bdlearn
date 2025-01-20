"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface GroupRulesProps {
  rules: string[];
}

export const GroupRules = ({ rules }: GroupRulesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
        <AlertCircle className="w-5 h-5" />
        <h3 className="font-semibold">Group Rules</h3>
      </div>
      <ul className="mt-4 space-y-3">
        {rules.map((rule, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="font-medium text-gray-900 dark:text-white">
              {index + 1}.
            </span>
            <span className="text-gray-600 dark:text-gray-300">{rule}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}; 