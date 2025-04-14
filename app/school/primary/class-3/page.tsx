"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, BookOpen, Clock, FileText, Video, Award, Star, BarChart, Activity, Calculator } from "lucide-react";
import { useLanguage } from "../../components/language-provider";

export default function ClassThreePage() {
  const { language } = useLanguage();

  // Define the subjects for class 3
  const subjects = [
    {
      id: "bangla",
      nameBn: "বাংলা",
      nameEn: "Bengali",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      icon: BookOpen,
      descriptionBn: "বাংলা ভাষা, সাহিত্য ও রচনা",
      descriptionEn: "Bengali language, literature and composition",
      lessonsCount: 32,
      path: "/school/primary/class-3/bangla",
      imagePath: "/images/subjects/bangla-3.jpg",
    },
    {
      id: "english",
      nameBn: "ইংরেজি",
      nameEn: "English",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      icon: Book,
      descriptionBn: "ইংরেজি ভাষা পাঠ ও আলোচনা",
      descriptionEn: "English language reading and discussion",
      lessonsCount: 28,
      path: "/school/primary/class-3/english",
      imagePath: "/images/subjects/english-3.jpg",
    },
    {
      id: "math",
      nameBn: "গণিত",
      nameEn: "Mathematics",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      icon: Calculator,
      descriptionBn: "ভাগ, গুণ ও প্রাথমিক জ্যামিতি",
      descriptionEn: "Division, multiplication and basic geometry",
      lessonsCount: 26,
      path: "/school/primary/class-3/math",
      imagePath: "/images/subjects/math-3.jpg",
    },
    {
      id: "science",
      nameBn: "প্রাথমিক বিজ্ঞান",
      nameEn: "Elementary Science",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      icon: Activity,
      descriptionBn: "বিজ্ঞান বিষয়ক মৌলিক ধারণাসমূহ",
      descriptionEn: "Fundamental concepts in science",
      lessonsCount: 24,
      path: "/school/primary/class-3/science",
      imagePath: "/images/subjects/science-3.jpg",
    },
  ];

  // Featured resources
  const featuredResources = [
    {
      id: "resource1",
      typeBn: "ভিডিও",
      typeEn: "Video",
      titleBn: "আমাদের পরিবেশ",
      titleEn: "Our Environment",
      durationMinutes: 15,
      path: "/resources/environment",
    },
    {
      id: "resource2",
      typeBn: "অভ্যাস",
      typeEn: "Practice",
      titleBn: "জোড় বিজোড় সংখ্যা",
      titleEn: "Even and Odd Numbers",
      durationMinutes: 12,
      path: "/resources/even-odd-numbers",
    },
    {
      id: "resource3",
      typeBn: "প্রোজেক্ট",
      typeEn: "Project",
      titleBn: "আমাদের দেশের ঋতু",
      titleEn: "Seasons of Our Country",
      durationMinutes: 20,
      path: "/resources/seasons-project",
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
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-600 dark:to-blue-800 text-white">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.5),rgba(255,255,255,0.1))]"></div>
        <div className="relative p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {language === "bn" ? "তৃতীয় শ্রেণী" : "Class Three"}
              </h1>
              <p className="max-w-lg text-blue-50">
                {language === "bn" 
                  ? "তৃতীয় শ্রেণীর সকল বিষয় এবং শিক্ষামূলক সামগ্রী এখানে পাবেন। এই শ্রেণিতে আরও গভীর এবং বিস্তৃত শিক্ষার মাধ্যমে শিশুর জ্ঞানের পরিধি বাড়বে।" 
                  : "Find all subjects and learning materials for Class Three here. In this class, children's knowledge will expand through deeper and more extensive learning."}
              </p>
              <Link href="/school/primary/class-3/subjects" className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                {language === "bn" ? "সকল বিষয় দেখুন" : "View All Subjects"}
              </Link>
            </div>
            <div className="relative h-48 w-48 md:h-64 md:w-64 md:mr-6">
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
              <div className="absolute inset-3 rounded-full bg-white/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-start">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 mr-4">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                {language === "bn" ? "সম্পন্ন পাঠ" : "Completed Lessons"}
              </p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">62/110</h3>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  56%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-start">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30 mr-4">
              <BarChart className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                {language === "bn" ? "গড় স্কোর" : "Average Score"}
              </p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">84%</h3>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                  +2%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-start">
            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 mr-4">
              <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                {language === "bn" ? "অর্জন ব্যাজ" : "Achievement Badges"}
              </p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">12</h3>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                  +3
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Subjects Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
            <Book className="w-5 h-5 mr-2 text-teal-600 dark:text-teal-400" />
            {language === "bn" ? "বিষয়সমূহ" : "Subjects"}
          </h2>
          <Link href="/school/primary/class-3/subjects" className="text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1">
            {language === "bn" ? "সব দেখুন" : "View all"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {subjects.map((subject) => (
            <motion.div
              key={subject.id}
              variants={itemVariants}
              className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={subject.path}>
                <div className="relative">
                  {/* Subject card background with gradient overlay */}
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-pattern-dots"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <subject.icon className={`w-16 h-16 ${subject.iconColor} transition-transform group-hover:scale-110 duration-300`} />
                    </div>
                  </div>
                  
                  {/* Content area */}
                  <div className="bg-white dark:bg-gray-800 p-5">
                    <h3 className={`font-medium text-lg mb-2 group-hover:${subject.iconColor.replace('text-', '')} transition-colors`}>
                      {language === "bn" ? subject.nameBn : subject.nameEn}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {language === "bn" ? subject.descriptionBn : subject.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Book className="w-4 h-4 mr-1" />
                        <span>
                          {subject.lessonsCount} {language === "bn" ? "পাঠ" : "lessons"}
                        </span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                        {language === "bn" ? "তৃতীয় শ্রেণী" : "Class 3"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Resources */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
          <Video className="w-5 h-5 mr-2 text-teal-600 dark:text-teal-400" />
          {language === "bn" ? "বিশেষ শিক্ষামূলক সামগ্রী" : "Featured Learning Resources"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredResources.map((resource) => (
            <motion.div 
              key={resource.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow transition-shadow"
            >
              <Link href={resource.path} className="block h-full">
                <div className="mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300">
                    {language === "bn" ? resource.typeBn : resource.typeEn}
                  </span>
                </div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">
                  {language === "bn" ? resource.titleBn : resource.titleEn}
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{resource.durationMinutes} {language === "bn" ? "মিনিট" : "min"}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/school/primary/class-3/resources" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors">
            {language === "bn" ? "সব শিক্ষামূলক সামগ্রী দেখুন" : "View All Learning Resources"}
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-teal-600 to-blue-700 dark:from-teal-700 dark:to-blue-800 rounded-xl overflow-hidden shadow-lg"
      >
        <div className="p-8 md:p-10 relative">
          <div className="absolute top-0 right-0 -mt-8 -mr-8">
            <div className="text-white/10">
              <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>
          </div>
          
          <div className="relative z-10 text-white max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">
              {language === "bn" ? "আজকের চ্যালেঞ্জে অংশ নিন!" : "Join Today's Challenge!"}
            </h2>
            <p className="mb-6 text-blue-100">
              {language === "bn" 
                ? "তৃতীয় শ্রেণীর জন্য আজকের বিশেষ চ্যালেঞ্জে অংশগ্রহণ করুন এবং আকর্ষণীয় পুরস্কার জিতুন।" 
                : "Participate in today's special challenge for Class Three and win exciting rewards."}
            </p>
            <Link href="/school/primary/class-3/challenge" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-blue-800 bg-white hover:bg-blue-50 transition-colors">
              {language === "bn" ? "চ্যালেঞ্জ শুরু করুন" : "Start Challenge"}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 