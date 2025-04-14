"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  School2, 
  School, 
  BookText, 
  GraduationCap, 
  BrainCircuit, 
  Landmark
} from "lucide-react";
import { useLanguage, LanguageText } from "./language-provider";

export function EducationCategories() {
  const { language } = useLanguage();
  
  const categories = [
    {
      id: "primary",
      titleBn: "প্রাথমিক শিক্ষা",
      titleEn: "Primary Education",
      descriptionBn: "১ম থেকে ৫ম শ্রেণি",
      descriptionEn: "Class 1 to 5",
      icon: School2,
      path: "/school/primary",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      borderColor: "border-green-200 dark:border-green-800/60",
      hoverBg: "hover:bg-green-50 dark:hover:bg-green-900/20"
    },
    {
      id: "junior",
      titleBn: "নিম্ন মাধ্যমিক শিক্ষা",
      titleEn: "Junior Secondary",
      descriptionBn: "৬ষ্ঠ থেকে ৮ম শ্রেণি",
      descriptionEn: "Class 6 to 8",
      icon: School,
      path: "/school/junior",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800/60",
      hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
    },
    {
      id: "secondary",
      titleBn: "মাধ্যমিক শিক্ষা",
      titleEn: "Secondary Education",
      descriptionBn: "৯ম থেকে ১০ম শ্রেণি",
      descriptionEn: "Class 9 to 10",
      icon: BookText,
      path: "/school/secondary",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      borderColor: "border-purple-200 dark:border-purple-800/60",
      hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-900/20"
    },
    {
      id: "higher-secondary",
      titleBn: "উচ্চ মাধ্যমিক শিক্ষা",
      titleEn: "Higher Secondary",
      descriptionBn: "১১শ থেকে ১২শ শ্রেণি",
      descriptionEn: "Class 11 to 12",
      icon: GraduationCap,
      path: "/school/higher-secondary",
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      borderColor: "border-red-200 dark:border-red-800/60",
      hoverBg: "hover:bg-red-50 dark:hover:bg-red-900/20"
    },
    {
      id: "vocational",
      titleBn: "কারিগরি শিক্ষা",
      titleEn: "Vocational Education",
      descriptionBn: "এসএসসি ও এইচএসসি (ভোকেশনাল)",
      descriptionEn: "SSC and HSC (Vocational)",
      icon: BrainCircuit,
      path: "/school/vocational",
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      borderColor: "border-amber-200 dark:border-amber-800/60",
      hoverBg: "hover:bg-amber-50 dark:hover:bg-amber-900/20"
    },
    {
      id: "madrasa",
      titleBn: "মাদ্রাসা শিক্ষা",
      titleEn: "Madrasa Education",
      descriptionBn: "ইবতেদায়ী থেকে কামিল",
      descriptionEn: "Ebtedayee to Kamil",
      icon: Landmark,
      path: "/school/madrasa",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30", 
      borderColor: "border-emerald-200 dark:border-emerald-800/60",
      hoverBg: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          <LanguageText 
            bn="শিক্ষার বিভাগসমূহ" 
            en="Educational Categories" 
          />
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          <LanguageText 
            bn="বাংলাদেশে শিক্ষার বিভিন্ন স্তর সম্পর্কে জানুন এবং অ্যাক্সেস করুন"
            en="Explore and access various levels of education in Bangladesh"
          />
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={itemVariants}>
            <Link href={category.path}>
              <div className={`group border ${category.borderColor} rounded-xl p-6 ${category.hoverBg} transition-colors h-full flex flex-col`}>
                <div className="flex items-start mb-4">
                  <div className={`p-3 rounded-lg mr-4 ${category.bgColor}`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium text-lg group-hover:${category.color}`}>
                      {language === "bn" ? category.titleBn : category.titleEn}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {language === "bn" ? category.descriptionBn : category.descriptionEn}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 