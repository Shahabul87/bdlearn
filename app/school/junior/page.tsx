"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, BookOpen, Clock, FileText, Video, Award, Star, Sparkles, Rocket, Lightbulb, Puzzle, Calendar } from "lucide-react";
import { useLanguage, LanguageText } from "../components/language-provider";

export default function JuniorSchoolPage() {
  const { language } = useLanguage();
  
  // Define junior school classes
  const classes = [
    {
      id: "class-6",
      nameBn: "ষষ্ঠ শ্রেণী",
      nameEn: "Class Six",
      iconBg: "bg-violet-100 dark:bg-violet-900/30",
      iconColor: "text-violet-600 dark:text-violet-400",
      icon: BookOpen,
      descriptionBn: "ষষ্ঠ শ্রেণীর সকল বিষয় ও সিলেবাস",
      descriptionEn: "All subjects and syllabus for Class Six",
      subjectsCount: 8,
      path: "/school/junior/class-6",
      emoji: "🧮",
      bgGradient: "from-violet-400 to-indigo-500",
    },
    {
      id: "class-7",
      nameBn: "সপ্তম শ্রেণী",
      nameEn: "Class Seven",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      icon: Lightbulb,
      descriptionBn: "সপ্তম শ্রেণীর সকল বিষয় ও সিলেবাস",
      descriptionEn: "All subjects and syllabus for Class Seven",
      subjectsCount: 9,
      path: "/school/junior/class-7",
      emoji: "🔬",
      bgGradient: "from-blue-400 to-sky-500",
    },
    {
      id: "class-8",
      nameBn: "অষ্টম শ্রেণী",
      nameEn: "Class Eight",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      icon: Puzzle,
      descriptionBn: "অষ্টম শ্রেণীর সকল বিষয় ও সিলেবাস",
      descriptionEn: "All subjects and syllabus for Class Eight",
      subjectsCount: 9,
      path: "/school/junior/class-8",
      emoji: "🧪",
      bgGradient: "from-emerald-400 to-teal-500",
    },
    {
      id: "jsc",
      nameBn: "জে.এস.সি",
      nameEn: "JSC Exam",
      iconBg: "bg-rose-100 dark:bg-rose-900/30",
      iconColor: "text-rose-600 dark:text-rose-400",
      icon: FileText,
      descriptionBn: "জুনিয়র স্কুল সার্টিফিকেট পরীক্ষার প্রস্তুতি",
      descriptionEn: "Junior School Certificate Exam Preparation",
      subjectsCount: 10,
      path: "/school/junior/jsc",
      emoji: "📝",
      bgGradient: "from-rose-400 to-pink-500",
    },
  ];

  // Define featured resources
  const featuredResources = [
    {
      id: "resource1",
      typeBn: "ইন্টারেক্টিভ",
      typeEn: "Interactive",
      titleBn: "সাইন্স ল্যাব সিমুলেশন",
      titleEn: "Science Lab Simulation",
      durationMinutes: 25,
      path: "/resources/science-lab",
      emoji: "🔭",
      color: "bg-indigo-400",
    },
    {
      id: "resource2",
      typeBn: "কুইজ",
      typeEn: "Quiz",
      titleBn: "গণিত ও বিজ্ঞান চ্যালেঞ্জ",
      titleEn: "Math & Science Challenge",
      durationMinutes: 15,
      path: "/resources/math-science-quiz",
      emoji: "🧩",
      color: "bg-emerald-400",
    },
    {
      id: "resource3",
      typeBn: "ভিডিও",
      typeEn: "Video",
      titleBn: "ইতিহাসের গল্প",
      titleEn: "Stories from History",
      durationMinutes: 18,
      path: "/resources/history-stories",
      emoji: "🏛️",
      color: "bg-amber-400",
    },
  ];

  // Define upcoming events
  const upcomingEvents = [
    {
      id: "event1",
      titleBn: "বিজ্ঞান প্রতিযোগিতা",
      titleEn: "Science Competition",
      dateBn: "১৫ নভেম্বর",
      dateEn: "November 15",
      typeBn: "প্রতিযোগিতা",
      typeEn: "Competition",
      emoji: "🏆",
    },
    {
      id: "event2",
      titleBn: "কুইজ প্রতিযোগিতা",
      titleEn: "Quiz Competition",
      dateBn: "২২ নভেম্বর",
      dateEn: "November 22",
      typeBn: "প্রতিযোগিতা",
      typeEn: "Competition",
      emoji: "🎯",
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
        className="absolute top-5 right-20 text-4xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
      >
        🔬
      </motion.div>
      <motion.div 
        className="absolute top-60 left-10 text-3xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
        style={{ animationDelay: "1.2s" }}
      >
        📚
      </motion.div>
      <motion.div 
        className="absolute bottom-40 right-10 text-4xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
        style={{ animationDelay: "0.7s" }}
      >
        🧪
      </motion.div>

      {/* Page Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 p-8 rounded-2xl shadow-lg relative overflow-hidden z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -right-20 -top-20 text-9xl opacity-20">👨‍🏫</div>
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md flex items-center gap-3">
          <Rocket className="h-8 w-8 text-yellow-300" />
          {language === "bn" ? "জুনিয়র স্কুল" : "Junior School"}
        </h1>
        <p className="text-white/90 max-w-3xl mt-3 text-lg">
          {language === "bn" 
            ? "জুনিয়র স্কুলের সমস্ত বিষয় এবং শিক্ষামূলক সামগ্রী এখানে পাবেন। ষষ্ঠ থেকে অষ্টম শ্রেণী পর্যন্ত সমস্ত পাঠ্যক্রম ও শিখন সহায়তা প্রদান করা হয়েছে।" 
            : "Find all subjects and educational materials for Junior School here. Curriculum and learning support for classes Six to Eight are provided."
          }
        </p>
      </motion.div>

      {/* Classes Grid */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <span className="text-2xl">🏫</span>
            {language === "bn" ? "ক্লাসগুলি" : "Classes"}
          </h2>
          <Link href="/school/junior/classes" 
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
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform"
            >
              <Link href={classItem.path}>
                <div className={`bg-gradient-to-br ${classItem.bgGradient} h-36 relative flex items-center justify-center`}>
                  <motion.div 
                    className="text-6xl" 
                    variants={bubbleVariants}
                    animate="animate"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    {classItem.emoji}
                  </motion.div>
                </div>
                <div className="p-5 bg-white dark:bg-gray-800">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                      {language === "bn" ? classItem.nameBn : classItem.nameEn}
                    </h3>
                    <div className={`p-2 rounded-full ${classItem.iconBg}`}>
                      <classItem.icon className={`w-5 h-5 ${classItem.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {language === "bn" ? classItem.descriptionBn : classItem.descriptionEn}
                  </p>
                  <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-700/50 py-2 px-3 rounded-full w-fit">
                    <Book className="w-4 h-4 mr-2" />
                    <span>
                      {classItem.subjectsCount} {language === "bn" ? "বিষয়" : "subjects"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Resources and Events Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Featured Resources */}
        <section className="lg:col-span-2 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-8 shadow-md relative">
          <div className="absolute right-8 -top-4 text-4xl">🎮</div>
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 flex items-center gap-2">
            <span className="text-2xl">🧩</span>
            {language === "bn" ? "শিক্ষামূলক সামগ্রী" : "Learning Resources"}
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
                  <div className={`p-3 rounded-full bg-indigo-100 dark:bg-indigo-800 mr-4 text-xl`}>
                    {resource.emoji}
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase text-indigo-600 dark:text-indigo-400 mb-1">
                      {language === "bn" ? resource.typeBn : resource.typeEn}
                    </div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {language === "bn" ? resource.titleBn : resource.titleEn}
                    </h3>
                  </div>
                </Link>
                <div className="text-sm bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 rounded-full text-indigo-600 dark:text-indigo-300 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{resource.durationMinutes} {language === "bn" ? "মিনিট" : "min"}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/school/junior/resources" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-md text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transform transition-all hover:scale-105"
            >
              {language === "bn" ? "সব শিক্ষামূলক সামগ্রী দেখুন" : "View All Learning Resources"}
            </Link>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-2xl p-8 shadow-md relative">
          <div className="absolute right-6 -top-4 text-4xl">🗓️</div>
          <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-6 flex items-center gap-2">
            <span className="text-2xl">📅</span>
            {language === "bn" ? "আসন্ন ইভেন্ট" : "Upcoming Events"}
          </h2>
          
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all relative overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">
                    {event.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                      {language === "bn" ? event.titleBn : event.titleEn}
                    </h3>
                    <div className="flex items-center mt-2 text-sm text-amber-600 dark:text-amber-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {language === "bn" ? event.dateBn : event.dateEn}
                    </div>
                    <div className="mt-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full text-xs inline-block">
                      {language === "bn" ? event.typeBn : event.typeEn}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/school/junior/events" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-md text-base font-medium text-white bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 transform transition-all hover:scale-105"
            >
              {language === "bn" ? "সব ইভেন্ট দেখুন" : "View All Events"}
            </Link>
          </div>
        </section>
      </div>

      {/* Academic Guide */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl p-8 shadow-md relative z-10">
        <div className="absolute left-10 top-0 text-4xl">📘</div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            {language === "bn" ? "একাডেমিক গাইড" : "Academic Guide"}
          </h2>
          <motion.div 
            className="flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="w-5 h-5 text-emerald-500 mr-2" />
            <span className="text-emerald-700 dark:text-emerald-300 font-medium">
              {language === "bn" ? "জুনিয়র স্কুল" : "Junior School"}
            </span>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Book className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {language === "bn" ? "পাঠ্যক্রম" : "Curriculum"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === "bn" 
                ? "জুনিয়র স্কুলের সমস্ত বিষয়ের বিস্তারিত পাঠ্যক্রম দেখুন"
                : "Check the detailed curriculum for all Junior School subjects"
              }
            </p>
            <Link href="/school/junior/curriculum" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline inline-flex items-center">
              {language === "bn" ? "আরও দেখুন" : "Learn more"} →
            </Link>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {language === "bn" ? "পরীক্ষা গাইড" : "Exam Guide"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === "bn" 
                ? "টার্ম পরীক্ষা এবং জে.এস.সি পরীক্ষার প্রস্তুতির জন্য গাইড"
                : "Guide for term exams and JSC exam preparation"
              }
            </p>
            <Link href="/school/junior/exam-guide" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline inline-flex items-center">
              {language === "bn" ? "আরও দেখুন" : "Learn more"} →
            </Link>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="bg-emerald-100 dark:bg-emerald-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Video className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {language === "bn" ? "টিউটোরিয়াল" : "Tutorials"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {language === "bn" 
                ? "বিষয়ভিত্তিক ভিডিও টিউটোরিয়াল এবং অনলাইন ক্লাস"
                : "Subject-wise video tutorials and online classes"
              }
            </p>
            <Link href="/school/junior/tutorials" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline inline-flex items-center">
              {language === "bn" ? "আরও দেখুন" : "Learn more"} →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 