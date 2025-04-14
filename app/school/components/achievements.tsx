"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Award, Trophy, ArrowRight } from "lucide-react";
import { useLanguage, LanguageText } from "./language-provider";

// Achievement interface
interface Achievement {
  id: string;
  titleEn: string;
  titleBn: string;
  dateEn: string;
  dateBn: string;
  descriptionEn: string;
  descriptionBn: string;
  type: "academic" | "sports" | "cultural" | "competition";
  imageSrc: string;
  path: string;
}

export function Achievements() {
  const { language } = useLanguage();
  
  // Sample achievements data
  const achievements: Achievement[] = [
    {
      id: "ach1",
      titleEn: "National Math Olympiad Winner",
      titleBn: "জাতীয় গণিত অলিম্পিয়াড বিজয়ী",
      dateEn: "October 12, 2023",
      dateBn: "১২ অক্টোবর, ২০২৩",
      descriptionEn: "Our student Rahim Ahmed won first place in the National Mathematics Olympiad Junior Category",
      descriptionBn: "আমাদের ছাত্র রহিম আহমেদ জাতীয় গণিত অলিম্পিয়াডের জুনিয়র ক্যাটাগরিতে প্রথম স্থান অর্জন করেছে",
      type: "academic",
      imageSrc: "/images/math-olympiad.jpg",
      path: "/school/achievements/math-olympiad"
    },
    {
      id: "ach2",
      titleEn: "Divisional Cricket Championship",
      titleBn: "বিভাগীয় ক্রিকেট চ্যাম্পিয়নশিপ",
      dateEn: "September 25, 2023",
      dateBn: "২৫ সেপ্টেম্বর, ২০২৩",
      descriptionEn: "School cricket team became champions in the Divisional School Cricket Tournament",
      descriptionBn: "স্কুল ক্রিকেট দল বিভাগীয় স্কুল ক্রিকেট টুর্নামেন্টে চ্যাম্পিয়ন হয়েছে",
      type: "sports",
      imageSrc: "/images/cricket-championship.jpg",
      path: "/school/achievements/cricket-championship"
    },
    {
      id: "ach3",
      titleEn: "National Science Project Award",
      titleBn: "জাতীয় বিজ্ঞান প্রকল্প পুরস্কার",
      dateEn: "October 5, 2023",
      dateBn: "৫ অক্টোবর, ২০২৩",
      descriptionEn: "Our students won the best project award at the National Science Fair",
      descriptionBn: "আমাদের শিক্ষার্থীরা জাতীয় বিজ্ঞান মেলায় সেরা প্রকল্প পুরস্কার জিতেছে",
      type: "academic",
      imageSrc: "/images/science-project.jpg",
      path: "/school/achievements/science-project"
    }
  ];

  // Get achievement type color
  const getAchievementTypeColor = (type: Achievement["type"]) => {
    switch(type) {
      case "academic":
        return "bg-blue-600";
      case "sports":
        return "bg-green-600";
      case "cultural":
        return "bg-purple-600";
      case "competition":
        return "bg-amber-600";
    }
  };

  // Get achievement type icon
  const getAchievementTypeIcon = (type: Achievement["type"]) => {
    switch(type) {
      case "academic":
      case "competition":
        return <Trophy className="h-4 w-4 text-white" />;
      case "sports":
      case "cultural":
        return <Award className="h-4 w-4 text-white" />;
    }
  };

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
    <section className="h-full">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            <LanguageText bn="সাফল্য ও অর্জন" en="Recognition & Achievements" />
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            <LanguageText 
              bn="আমাদের শিক্ষার্থীদের সাম্প্রতিক সাফল্য"
              en="Recent achievements of our students"
            />
          </p>
        </div>
        <Link 
          href="/school/achievements" 
          className="flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
        >
          <LanguageText bn="সব অর্জন দেখুন" en="View all achievements" />
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {achievements.slice(0, 2).map((achievement) => (
          <motion.div 
            key={achievement.id} 
            variants={itemVariants}
            className="h-full"
          >
            <Link href={achievement.path} className="block h-full">
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row h-full">
                <div className="relative h-48 md:h-auto md:w-1/3 flex-shrink-0">
                  <Image
                    src={achievement.imageSrc}
                    alt={language === "bn" ? achievement.titleBn : achievement.titleEn}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    onError={(e) => {
                      // If image fails to load, show gradient background
                      const target = e.currentTarget.parentElement;
                      if (target) {
                        const classes = "bg-gradient-to-r from-amber-500 to-orange-600".split(' ');
                        classes.forEach(cls => target.classList.add(cls));
                      }
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className={`absolute top-3 left-3 p-1.5 rounded-full ${getAchievementTypeColor(achievement.type)}`}>
                    {getAchievementTypeIcon(achievement.type)}
                  </div>
                </div>
                
                <div className="p-5 flex-grow">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {language === "bn" ? achievement.dateBn : achievement.dateEn}
                  </div>
                  
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-2">
                    {language === "bn" ? achievement.titleBn : achievement.titleEn}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {language === "bn" ? achievement.descriptionBn : achievement.descriptionEn}
                  </p>
                  
                  <div className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center">
                    <LanguageText bn="বিস্তারিত দেখুন" en="View details" />
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
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