"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Trophy, BookOpen, GraduationCap } from "lucide-react";
import { useLanguage } from "./language-provider";

export function StatisticsGrid() {
  const { language } = useLanguage();
  
  // Education statistics
  const statistics = [
    {
      icon: Users,
      titleBn: "মোট শিক্ষার্থী",
      titleEn: "Total Students",
      valueBn: "৪ কোটি +",
      valueEn: "40 million +",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      icon: GraduationCap,
      titleBn: "শিক্ষা প্রতিষ্ঠান",
      titleEn: "Educational Institutions",
      valueBn: "২ লাখ +",
      valueEn: "200,000 +",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30"
    },
    {
      icon: BookOpen,
      titleBn: "পাঠ্যক্রম",
      titleEn: "Curricula",
      valueBn: "৬ পদ্ধতি",
      valueEn: "6 Systems",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      icon: Trophy,
      titleBn: "সাক্ষরতার হার",
      titleEn: "Literacy Rate",
      valueBn: "৭৬.৮%",
      valueEn: "76.8%",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30"
    }
  ];

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistics.map((stat, index) => (
          <motion.div
            key={index}
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-start">
              <div className={`p-3 rounded-lg mr-4 ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "bn" ? stat.titleBn : stat.titleEn}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {language === "bn" ? stat.valueBn : stat.valueEn}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 