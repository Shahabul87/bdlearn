"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  PlusCircle, 
  BookOpen, 
  BarChart2, 
  MessageSquare,
  Users,
  Settings,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    labelBn: "কোর্স তৈরি করুন",
    labelEn: "Create Course",
    href: "/dashboard/teacher/create",
    icon: PlusCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    borderColor: "border-emerald-200 dark:border-emerald-500/20"
  },
  {
    labelBn: "আমার কোর্স",
    labelEn: "My Courses",
    href: "/dashboard/teacher/courses",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    borderColor: "border-blue-200 dark:border-blue-500/20"
  },
  {
    labelBn: "শিক্ষার্থী বিশ্লেষণ",
    labelEn: "Analytics",
    href: "/dashboard/teacher/analytics",
    icon: BarChart2,
    color: "text-violet-600",
    bgColor: "bg-violet-50 dark:bg-violet-500/10",
    borderColor: "border-violet-200 dark:border-violet-500/20"
  },
  {
    labelBn: "কুইজ ফলাফল",
    labelEn: "Quiz Results",
    href: "/dashboard/teacher/analytics?tab=quiz",
    icon: FileText,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    borderColor: "border-amber-200 dark:border-amber-500/20"
  },
  {
    labelBn: "বার্তা",
    labelEn: "Messages",
    href: "/dashboard/teacher/messages",
    icon: MessageSquare,
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-500/10",
    borderColor: "border-pink-200 dark:border-pink-500/20"
  },
  {
    labelBn: "শিক্ষার্থী",
    labelEn: "Students",
    href: "/dashboard/teacher/students",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-500/10",
    borderColor: "border-orange-200 dark:border-orange-500/20"
  },
  {
    labelBn: "সেটিংস",
    labelEn: "Settings",
    href: "/dashboard/teacher/settings",
    icon: Settings,
    color: "text-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-500/10",
    borderColor: "border-gray-200 dark:border-gray-500/20"
  }
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {actions.map((action, index) => (
        <motion.div
          key={action.labelEn}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            href={action.href}
            className={cn(
              "group relative p-4 h-full",
              "flex flex-col items-center justify-center gap-2",
              "rounded-xl border",
              action.bgColor,
              action.borderColor,
              "hover:shadow-lg",
              "transition-all duration-300"
            )}
          >
            <action.icon className={cn("w-8 h-8", action.color)} />
            <span className={cn(
              "text-base font-bold",
              action.color,
              "text-center"
            )}>
              {action.labelBn}
            </span>
            <span className={cn(
              "text-xs font-medium text-gray-600 dark:text-gray-300",
              "group-hover:text-gray-900 dark:group-hover:text-white",
              "transition-colors"
            )}>
              {action.labelEn}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}; 