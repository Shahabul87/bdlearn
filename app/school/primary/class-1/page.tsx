"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, BookOpen, Clock, FileText, Video, Award, Star, Sparkles } from "lucide-react";
import { useLanguage } from "../../components/language-provider";

export default function ClassOnePage() {
  const { language } = useLanguage();
  
  // Define the subjects for class 1
  const subjects = [
    {
      id: "bangla",
      nameBn: "বাংলা",
      nameEn: "Bengali",
      iconBg: "bg-pink-100 dark:bg-pink-900/30",
      iconColor: "text-pink-600 dark:text-pink-400",
      icon: BookOpen,
      descriptionBn: "বাংলা ভাষা শেখার মৌলিক পাঠ",
      descriptionEn: "Basic lessons for learning Bengali language",
      lessonsCount: 24,
      path: "/school/primary/class-1/bangla",
      imagePath: "/images/subjects/bangla.jpg",
      emoji: "📚",
      bgGradient: "from-pink-400 to-red-400",
    },
    {
      id: "english",
      nameBn: "ইংরেজি",
      nameEn: "English",
      iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      icon: Book,
      descriptionBn: "প্রাথমিক ইংরেজি ভাষার শিক্ষা",
      descriptionEn: "Elementary English language education",
      lessonsCount: 20,
      path: "/school/primary/class-1/english",
      imagePath: "/images/subjects/english.jpg",
      emoji: "🔤",
      bgGradient: "from-cyan-400 to-blue-400",
    },
    {
      id: "math",
      nameBn: "গণিত",
      nameEn: "Mathematics",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      icon: FileText,
      descriptionBn: "সংখ্যা এবং প্রাথমিক গণিতের ধারণা",
      descriptionEn: "Numbers and basic mathematical concepts",
      lessonsCount: 18,
      path: "/school/primary/class-1/math",
      imagePath: "/images/subjects/math.jpg",
      emoji: "🔢",
      bgGradient: "from-amber-400 to-yellow-400",
    },
    {
      id: "science",
      nameBn: "পরিবেশ পরিচিতি",
      nameEn: "Environmental Studies",
      iconBg: "bg-lime-100 dark:bg-lime-900/30",
      iconColor: "text-lime-600 dark:text-lime-400",
      icon: Video,
      descriptionBn: "পরিবেশ সম্পর্কে প্রাথমিক জ্ঞান",
      descriptionEn: "Basic knowledge about the environment",
      lessonsCount: 15,
      path: "/school/primary/class-1/science",
      imagePath: "/images/subjects/science.jpg",
      emoji: "🌍",
      bgGradient: "from-lime-400 to-green-400",
    },
  ];

  // Define featured resources
  const featuredResources = [
    {
      id: "resource1",
      typeBn: "ভিডিও",
      typeEn: "Video",
      titleBn: "বর্ণ পরিচয়",
      titleEn: "Introduction to Bengali Alphabet",
      durationMinutes: 12,
      path: "/resources/bangla-alphabet",
      emoji: "🎬",
      color: "bg-purple-400",
    },
    {
      id: "resource2",
      typeBn: "অভ্যাস",
      typeEn: "Practice",
      titleBn: "সংখ্যা গণনা",
      titleEn: "Counting Numbers",
      durationMinutes: 8,
      path: "/resources/number-counting",
      emoji: "✏️",
      color: "bg-green-400",
    },
    {
      id: "resource3",
      typeBn: "উপাখ্যান",
      typeEn: "Story",
      titleBn: "নৈতিক গল্প সংকলন",
      titleEn: "Moral Stories Collection",
      durationMinutes: 15,
      path: "/resources/moral-stories",
      emoji: "📖",
      color: "bg-blue-400",
    },
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  const bubbleVariants = {
    animate: {
      scale: [0.9, 1.1, 0.9],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-10 right-10 text-4xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
      >
        🎈
      </motion.div>
      <motion.div 
        className="absolute top-40 left-5 text-3xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
        style={{ animationDelay: "1s" }}
      >
        🚀
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-20 text-4xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
        style={{ animationDelay: "0.5s" }}
      >
        ✨
      </motion.div>

      {/* Page Header */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-6 rounded-2xl shadow-lg relative overflow-hidden z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -right-10 -top-10 text-8xl opacity-20">🧒</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-yellow-300" />
          {language === "bn" ? "প্রথম শ্রেণী" : "Class One"}
        </h1>
        <p className="text-white/90 max-w-3xl mt-2 text-lg">
          {language === "bn" 
            ? "প্রথম শ্রেণীর সকল বিষয় এবং শিক্ষামূলক সামগ্রী এখানে পাবেন। মৌলিক দক্ষতা গড়ে তোলার জন্য প্রয়োজনীয় সব পাঠ্যসূচি এখানে সাজানো হয়েছে।" 
            : "Find all subjects and educational materials for Class One here. The curriculum designed to build fundamental skills is organized here."
          }
        </p>
      </motion.div>

      {/* Subjects Grid */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            {language === "bn" ? "বিষয়সমূহ" : "Subjects"}
          </h2>
          <Link href="/school/primary/class-1/subjects" 
            className="text-sm bg-indigo-100 dark:bg-indigo-900/40 px-4 py-2 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors flex items-center gap-1 font-medium"
          >
            {language === "bn" ? "সব দেখুন" : "View all"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform"
            >
              <Link href={subject.path}>
                <div className={`bg-gradient-to-br ${subject.bgGradient} h-36 relative flex items-center justify-center`}>
                  <motion.div 
                    className="text-6xl" 
                    variants={bubbleVariants}
                    animate="animate"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    {subject.emoji}
                  </motion.div>
                </div>
                <div className="p-5 bg-white dark:bg-gray-800">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                      {language === "bn" ? subject.nameBn : subject.nameEn}
                    </h3>
                    <div className={`p-2 rounded-full ${subject.iconBg}`}>
                      <subject.icon className={`w-5 h-5 ${subject.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {language === "bn" ? subject.descriptionBn : subject.descriptionEn}
                  </p>
                  <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-700/50 py-2 px-3 rounded-full w-fit">
                    <Book className="w-4 h-4 mr-2" />
                    <span>
                      {subject.lessonsCount} {language === "bn" ? "পাঠ" : "lessons"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Resources */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-2xl p-8 shadow-md relative z-10">
        <div className="absolute right-6 -top-4 text-4xl">🎯</div>
        <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6 flex items-center gap-2">
          <span className="text-2xl">🎮</span>
          {language === "bn" ? "বিশেষ শিক্ষামূলক সামগ্রী" : "Featured Learning Resources"}
        </h2>
        
        <div className="space-y-4">
          {featuredResources.map((resource, index) => (
            <motion.div 
              key={resource.id}
              whileHover={{ x: 5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex items-center justify-between relative overflow-hidden"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-2 ${resource.color}`}></div>
              <Link href={resource.path} className="flex items-center flex-1">
                <div className={`p-3 rounded-full bg-purple-100 dark:bg-purple-800 mr-4 text-xl`}>
                  {resource.emoji}
                </div>
                <div>
                  <div className="text-xs font-medium uppercase text-purple-600 dark:text-purple-400 mb-1">
                    {language === "bn" ? resource.typeBn : resource.typeEn}
                  </div>
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {language === "bn" ? resource.titleBn : resource.titleEn}
                  </h3>
                </div>
              </Link>
              <div className="text-sm bg-purple-100 dark:bg-purple-900/40 px-3 py-1 rounded-full text-purple-600 dark:text-purple-300 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{resource.durationMinutes} {language === "bn" ? "মিনিট" : "min"}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/school/primary/class-1/resources" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transform transition-all hover:scale-105"
          >
            {language === "bn" ? "সব শিক্ষামূলক সামগ্রী দেখুন" : "View All Learning Resources"}
          </Link>
        </div>
      </section>

      {/* Learning Progress */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-8 shadow-md relative z-10">
        <div className="absolute left-10 top-0 text-4xl">🏆</div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <span className="text-2xl">📈</span>
            {language === "bn" ? "শিক্ষার অগ্রগতি" : "Learning Progress"}
          </h2>
          <motion.div 
            className="flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/40 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-yellow-700 dark:text-yellow-300 font-medium">
              {language === "bn" ? "৩৫ পয়েন্ট" : "35 Points"}
            </span>
          </motion.div>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {language === "bn" ? "সর্বমোট অগ্রগতি" : "Overall Progress"}
              </span>
              <span className="text-gray-800 dark:text-gray-200 font-bold">25%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 p-1">
              <motion.div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "25%" }}
                transition={{ duration: 1, delay: 0.2 }}
              ></motion.div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 flex items-center shadow-sm"
              whileHover={{ y: -3 }}
            >
              <div className="p-3 bg-white dark:bg-gray-800 rounded-full mr-4 shadow-md">
                <Award className="w-6 h-6 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                  {language === "bn" ? "সম্পন্ন পাঠ" : "Completed Lessons"}
                </p>
                <p className="text-2xl text-gray-900 dark:text-white font-bold">12</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 flex items-center shadow-sm"
              whileHover={{ y: -3 }}
            >
              <div className="p-3 bg-white dark:bg-gray-800 rounded-full mr-4 shadow-md">
                <Clock className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                  {language === "bn" ? "অধ্যয়নের সময়" : "Study Time"}
                </p>
                <p className="text-2xl text-gray-900 dark:text-white font-bold">
                  {language === "bn" ? "৩ ঘন্টা" : "3 hours"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/school/primary/class-1/progress" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md font-medium hover:from-blue-600 hover:to-cyan-600 transform transition-all hover:scale-105"
          >
            {language === "bn" ? "বিস্তারিত অগ্রগতি দেখুন" : "View Detailed Progress"}
          </Link>
        </div>
      </section>
    </div>
  );
} 