"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Users, 
  BookOpen, 
  Star, 
  TrendingUp,
  GraduationCap,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Chapter {
  sections: any[];
}

interface Course {
  chapters: Chapter[];
  enrollments: any[];
  reviews: any[];
}

interface StatsCardsProps {
  courses: Course[];
}

interface StatCardProps {
  labelBn: string;
  labelEn: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  index: number;
}

const StatCard = ({ 
  labelBn, 
  labelEn,
  value, 
  icon: Icon, 
  color, 
  bgColor, 
  borderColor,
  index 
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000; // Animation duration in ms
    const steps = 20; // Number of steps
    const stepDuration = duration / steps;
    const increment = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayValue(Math.min(currentStep * increment, value));
      
      if (currentStep === steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "rounded-xl p-6",
        "border",
        bgColor,
        borderColor,
        "hover:shadow-lg",
        "transition-all duration-300"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "p-3 rounded-lg",
          bgColor,
          "bg-opacity-50"
        )}>
          <Icon className={cn("w-10 h-10", color)} />
        </div>
        <div>
          <h3 className={cn(
            "text-xl font-bold",
            color
          )}>
            {labelBn}
          </h3>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {labelEn}
          </p>
          <p className={cn(
            "text-3xl font-bold",
            color
          )}>
            {displayValue.toLocaleString('en-US', { maximumFractionDigits: 1 })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const StatsCards = ({ courses }: StatsCardsProps) => {
  const totalStudents = courses.reduce((acc, course) => 
    acc + course.enrollments.length, 0
  );

  const totalReviews = courses.reduce((acc, course) => 
    acc + course.reviews.length, 0
  );

  const averageRating = totalReviews > 0
    ? courses.reduce((acc, course) => {
        const courseRatings = course.reviews.reduce((sum: number, review: any) => 
          sum + review.rating, 0
        );
        return acc + (courseRatings / (course.reviews.length || 1));
      }, 0) / (courses.length || 1)
    : 0;

  const totalSections = courses.reduce((acc: number, course: Course) =>
    acc + course.chapters.reduce((chAcc: number, chapter: Chapter) =>
      chAcc + chapter.sections.length, 0
    ), 0
  );

  const stats = [
    {
      labelBn: "মোট শিক্ষার্থী",
      labelEn: "Total Students",
      value: totalStudents,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-500/10",
      borderColor: "border-blue-200 dark:border-blue-500/20"
    },
    {
      labelBn: "সক্রিয় কোর্স",
      labelEn: "Active Courses",
      value: courses.length,
      icon: BookOpen,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
      borderColor: "border-emerald-200 dark:border-emerald-500/20"
    },
    {
      labelBn: "মোট বিভাগ",
      labelEn: "Total Sections",
      value: totalSections,
      icon: GraduationCap,
      color: "text-violet-600",
      bgColor: "bg-violet-50 dark:bg-violet-500/10",
      borderColor: "border-violet-200 dark:border-violet-500/20"
    },
    {
      labelBn: "গড় রেটিং",
      labelEn: "Average Rating",
      value: averageRating,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-500/10",
      borderColor: "border-yellow-200 dark:border-yellow-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.labelEn} {...stat} index={index} />
      ))}
    </div>
  );
}; 