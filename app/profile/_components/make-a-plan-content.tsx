"use client";

import { motion } from "framer-motion";
import { PlanHeader } from "./make-a-plan/header";
import { QuickActions } from "./make-a-plan/quick-actions";
import { PlanForm } from "./make-a-plan/plan-form";
import { ProgressTracking } from "./make-a-plan/progress-tracking";

interface MakeAPlanContentProps {
  userId: string;
}

export const MakeAPlanContent = ({ userId }: MakeAPlanContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <PlanHeader />
      <QuickActions />
      <PlanForm />
      <ProgressTracking />
    </motion.div>
  );
}; 