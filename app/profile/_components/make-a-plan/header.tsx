"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export const PlanHeader = () => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="p-2 w-fit rounded-md bg-purple-50 dark:bg-purple-500/10">
        <Rocket className="h-5 w-5 text-purple-600 dark:text-purple-400" />
      </div>
      <div>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
          Create Your Learning Plan
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Set your learning goals and track your progress
        </p>
      </div>
    </div>
  );
}; 