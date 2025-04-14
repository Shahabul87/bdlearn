"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Book, 
  BookOpen, 
  Clock, 
  FileText, 
  Video, 
  Award, 
  Star, 
  Sparkles, 
  GraduationCap, 
  Landmark,
  Moon,
  Scroll,
  BookText,
  BookMarked,
  Library,
  Heart
} from "lucide-react";
import { useLanguage, LanguageText } from "../components/language-provider";

export default function MadrasaEducationPage() {
  const { language } = useLanguage();
  
  // Define madrasa education levels
  const educationLevels = [
    {
      id: "ebtedayee",
      nameBn: "ইবতেদায়ী",
      nameEn: "Ebtedayee",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      icon: BookOpen,
      descriptionBn: "প্রাথমিক মাদ্রাসা শিক্ষা (১ম-৫ম শ্রেণি)",
      descriptionEn: "Primary Madrasa Education (Class 1-5)",
      path: "/school/madrasa/ebtedayee",
      emoji: "📚",
      bgGradient: "from-emerald-400 to-green-500",
    },
    {
      id: "dakhil",
      nameBn: "দাখিল",
      nameEn: "Dakhil",
      iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      icon: Scroll,
      descriptionBn: "মাধ্যমিক মাদ্রাসা শিক্ষা (৬ষ্ঠ-১০ম শ্রেণি)",
      descriptionEn: "Secondary Madrasa Education (Class 6-10)",
      path: "/school/madrasa/dakhil",
      emoji: "🕌",
      bgGradient: "from-cyan-400 to-blue-500",
    },
    {
      id: "alim",
      nameBn: "আলিম",
      nameEn: "Alim",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      icon: BookText,
      descriptionBn: "উচ্চ মাধ্যমিক মাদ্রাসা শিক্ষা (১১শ-১২শ শ্রেণি)",
      descriptionEn: "Higher Secondary Madrasa Education (Class 11-12)",
      path: "/school/madrasa/alim",
      emoji: "📖",
      bgGradient: "from-purple-400 to-indigo-500",
    },
    {
      id: "fazil",
      nameBn: "ফাজিল",
      nameEn: "Fazil",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      icon: BookMarked,
      descriptionBn: "স্নাতক পর্যায়ের মাদ্রাসা শিক্ষা",
      descriptionEn: "Bachelor's level Madrasa Education",
      path: "/school/madrasa/fazil",
      emoji: "🧑‍🎓",
      bgGradient: "from-amber-400 to-yellow-500",
    },
    {
      id: "kamil",
      nameBn: "কামিল",
      nameEn: "Kamil",
      iconBg: "bg-rose-100 dark:bg-rose-900/30",
      iconColor: "text-rose-600 dark:text-rose-400",
      icon: Library,
      descriptionBn: "স্নাতকোত্তর পর্যায়ের মাদ্রাসা শিক্ষা",
      descriptionEn: "Master's level Madrasa Education",
      path: "/school/madrasa/kamil",
      emoji: "👨‍🎓",
      bgGradient: "from-rose-400 to-pink-500",
    },
  ];

  // Define featured subjects
  const featuredSubjects = [
    {
      id: "quran",
      titleBn: "কুরআন মাজীদ",
      titleEn: "Quran Majeed",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      icon: BookOpen,
      descriptionBn: "কুরআন তিলাওয়াত, হিফজ এবং তাফসীর",
      descriptionEn: "Quran recitation, memorization and interpretation",
      path: "/school/madrasa/subjects/quran",
    },
    {
      id: "hadith",
      titleBn: "হাদীস শরীফ",
      titleEn: "Hadith Sharif",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      icon: Scroll,
      descriptionBn: "হাদীস অধ্যয়ন এবং বিশ্লেষণ",
      descriptionEn: "Study and analysis of Hadith",
      path: "/school/madrasa/subjects/hadith",
    },
    {
      id: "fiqh",
      titleBn: "ফিকহ",
      titleEn: "Fiqh",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      icon: BookText,
      descriptionBn: "ইসলামী আইন ও জীবন বিধান",
      descriptionEn: "Islamic law and jurisprudence",
      path: "/school/madrasa/subjects/fiqh",
    },
    {
      id: "arabic",
      titleBn: "আরবি ভাষা",
      titleEn: "Arabic Language",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      icon: Heart,
      descriptionBn: "আরবি ভাষা, ব্যাকরণ ও সাহিত্য",
      descriptionEn: "Arabic language, grammar and literature",
      path: "/school/madrasa/subjects/arabic",
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
      transition: { duration: 0.5 }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as "reverse",
      }
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 right-10 text-4xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
      >
        🕌
      </motion.div>
      <motion.div 
        className="absolute top-80 left-5 text-3xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      >
        📚
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-20 text-4xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
        style={{ animationDelay: "0.8s" }}
      >
        ☪️
      </motion.div>

      {/* Page Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 dark:from-emerald-700 dark:via-teal-700 dark:to-green-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-700/50 via-transparent"></div>
        </div>
        
        <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 md:max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                <LanguageText bn="মাদ্রাসা শিক্ষা" en="Madrasa Education" />
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <LanguageText 
                  bn="ইসলামিক শিক্ষার সম্পূর্ণ কারিকুলাম" 
                  en="Complete Islamic Education Curriculum" 
                />
              </h1>
              <p className="text-emerald-100 text-lg mb-6">
                <LanguageText 
                  bn="ঐতিহ্যবাহী মাদ্রাসা শিক্ষার সকল স্তরের পাঠ্যসূচি এখানে অন্তর্ভুক্ত করা হয়েছে। ইবতেদায়ী থেকে কামিল পর্যন্ত সম্পূর্ণ শিক্ষার সুযোগ রয়েছে।" 
                  en="The curriculum of all levels of traditional madrasa education is included here. There is an opportunity for complete education from Ebtedayee to Kamil."
                />
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/school/madrasa/ebtedayee" 
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <LanguageText bn="ইবতেদায়ী" en="Ebtedayee" />
                </Link>
                <Link 
                  href="/school/madrasa/subjects" 
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition flex items-center gap-2"
                >
                  <GraduationCap className="h-4 w-4" />
                  <LanguageText bn="সকল বিষয়" en="All Subjects" />
                </Link>
              </div>
            </div>
            <div className="max-w-sm w-full">
              <Image 
                src="/images/madrasa-education.png"
                alt="Madrasa Education"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Education Levels */}
      <section className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Landmark className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            <LanguageText bn="শিক্ষা স্তর" en="Education Levels" />
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {educationLevels.map((level) => (
            <motion.div 
              key={level.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl shadow-md transition-all hover:shadow-lg border border-gray-200 dark:border-gray-800"
            >
              <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${level.bgGradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              
              <Link href={level.path} className="block p-6">
                <div className="flex items-start">
                  <div className={`${level.iconBg} ${level.iconColor} p-3 rounded-lg`}>
                    <level.icon className="h-6 w-6" />
                  </div>
                  <span className="absolute top-6 right-6 text-3xl">{level.emoji}</span>
                </div>
                
                <h3 className="mt-5 text-xl font-medium text-gray-900 dark:text-gray-100">
                  {language === "bn" ? level.nameBn : level.nameEn}
                </h3>
                
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                  {language === "bn" ? level.descriptionBn : level.descriptionEn}
                </p>
                
                <div className="mt-4 flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="text-sm">
                    <LanguageText bn="বিস্তারিত দেখুন" en="View details" />
                  </span>
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Subjects */}
      <section className="relative z-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900/60 rounded-2xl p-8 mt-12 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <BookText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            <LanguageText bn="প্রধান বিষয়সমূহ" en="Featured Subjects" />
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSubjects.map((subject) => (
            <Link 
              key={subject.id}
              href={subject.path}
              className="block p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className={`${subject.iconBg} ${subject.iconColor} p-3 inline-flex rounded-lg mb-4`}>
                <subject.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {language === "bn" ? subject.titleBn : subject.titleEn}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {language === "bn" ? subject.descriptionBn : subject.descriptionEn}
              </p>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/school/madrasa/subjects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-100 dark:bg-emerald-900/40 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded-full transition-colors"
          >
            <LanguageText bn="সকল বিষয় দেখুন" en="View all subjects" />
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Important Information */}
      <section className="relative z-10 mt-12">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            <LanguageText bn="গুরুত্বপূর্ণ তথ্য" en="Important Information" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
              <LanguageText bn="পরীক্ষা সূচি" en="Exam Schedule" />
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              <LanguageText bn="আগামী ইবতেদায়ী, দাখিল, আলিম, ফাজিল এবং কামিল পরীক্ষার সময়সূচি দেখুন" en="Check upcoming Ebtedayee, Dakhil, Alim, Fazil and Kamil exam schedules" />
            </p>
            <Link 
              href="/school/madrasa/exam-schedule"
              className="text-emerald-600 dark:text-emerald-400 text-sm font-medium inline-flex items-center gap-1"
            >
              <LanguageText bn="বিস্তারিত" en="View details" />
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
              <LanguageText bn="ইসলামিক ক্যালেন্ডার" en="Islamic Calendar" />
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              <LanguageText bn="ইসলামিক মাস এবং গুরুত্বপূর্ণ তারিখসমূহ দেখুন" en="View Islamic months and important dates" />
            </p>
            <Link 
              href="/school/madrasa/islamic-calendar"
              className="text-emerald-600 dark:text-emerald-400 text-sm font-medium inline-flex items-center gap-1"
            >
              <LanguageText bn="ক্যালেন্ডার দেখুন" en="View calendar" />
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
              <LanguageText bn="শিক্ষক নির্দেশিকা" en="Teacher Guidelines" />
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              <LanguageText bn="মাদ্রাসা শিক্ষকদের জন্য সহায়ক নির্দেশনা" en="Helpful guidelines for madrasa teachers" />
            </p>
            <Link 
              href="/school/madrasa/teacher-guidelines"
              className="text-emerald-600 dark:text-emerald-400 text-sm font-medium inline-flex items-center gap-1"
            >
              <LanguageText bn="নির্দেশনা দেখুন" en="View guidelines" />
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 