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
  BarChart, 
  Newspaper,
  Calendar,
  Target,
  Bookmark
} from "lucide-react";
import { useLanguage, LanguageText } from "../components/language-provider";

export default function SecondarySchoolPage() {
  const { language } = useLanguage();
  
  // Define secondary school classes
  const classes = [
    {
      id: "class-9",
      nameBn: "নবম শ্রেণী",
      nameEn: "Class Nine",
      iconBg: "bg-sky-100 dark:bg-sky-900/30",
      iconColor: "text-sky-600 dark:text-sky-400",
      icon: BookOpen,
      descriptionBn: "নবম শ্রেণীর সকল বিষয় ও সিলেবাস",
      descriptionEn: "All subjects and syllabus for Class Nine",
      subjectsCount: 10,
      path: "/school/secondary/class-9",
      emoji: "📊",
      bgGradient: "from-sky-400 to-blue-500",
    },
    {
      id: "class-10",
      nameBn: "দশম শ্রেণী",
      nameEn: "Class Ten",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      icon: BookOpen,
      descriptionBn: "দশম শ্রেণীর সকল বিষয় ও সিলেবাস",
      descriptionEn: "All subjects and syllabus for Class Ten",
      subjectsCount: 10,
      path: "/school/secondary/class-10",
      emoji: "📚",
      bgGradient: "from-purple-400 to-indigo-500",
    },
    {
      id: "ssc",
      nameBn: "এস.এস.সি",
      nameEn: "SSC Exam",
      iconBg: "bg-rose-100 dark:bg-rose-900/30",
      iconColor: "text-rose-600 dark:text-rose-400",
      icon: FileText,
      descriptionBn: "মাধ্যমিক স্কুল সার্টিফিকেট পরীক্ষার প্রস্তুতি",
      descriptionEn: "Secondary School Certificate Exam Preparation",
      subjectsCount: 11,
      path: "/school/secondary/ssc",
      emoji: "📝",
      bgGradient: "from-rose-400 to-pink-500",
    },
    {
      id: "science",
      nameBn: "বিজ্ঞান শাখা",
      nameEn: "Science Group",
      iconBg: "bg-teal-100 dark:bg-teal-900/30",
      iconColor: "text-teal-600 dark:text-teal-400",
      icon: Bookmark,
      descriptionBn: "বিজ্ঞান শাখার বিশেষ পাঠ্যক্রম",
      descriptionEn: "Science Group Special Curriculum",
      subjectsCount: 6,
      path: "/school/secondary/science",
      emoji: "🔬",
      bgGradient: "from-teal-400 to-emerald-500",
    },
  ];

  // Define featured resources
  const featuredResources = [
    {
      id: "resource1",
      typeBn: "ভার্চুয়াল ল্যাব",
      typeEn: "Virtual Lab",
      titleBn: "জটিল রসায়ন পরীক্ষা",
      titleEn: "Advanced Chemistry Experiments",
      durationMinutes: 30,
      path: "/resources/advanced-chemistry",
      emoji: "⚗️",
      color: "bg-purple-400",
    },
    {
      id: "resource2",
      typeBn: "মক টেস্ট",
      typeEn: "Mock Test",
      titleBn: "এস.এস.সি প্রস্তুতি টেস্ট",
      titleEn: "SSC Preparation Test",
      durationMinutes: 45,
      path: "/resources/ssc-mock-test",
      emoji: "📋",
      color: "bg-blue-400",
    },
    {
      id: "resource3",
      typeBn: "ভিডিও লেকচার",
      typeEn: "Video Lecture",
      titleBn: "উচ্চতর গণিত সমাধান",
      titleEn: "Advanced Mathematics Solutions",
      durationMinutes: 25,
      path: "/resources/advanced-math",
      emoji: "🧮",
      color: "bg-amber-400",
    },
  ];

  // Define academic insights
  const academicInsights = [
    {
      id: "insight1",
      titleBn: "বিশ্লেষণাত্মক দক্ষতা বাড়ানোর উপায়",
      titleEn: "Ways to Improve Analytical Skills",
      descriptionBn: "বিভিন্ন বিষয়ে বিশ্লেষণাত্মক চিন্তাভাবনা শক্তিশালী করার কৌশল",
      descriptionEn: "Strategies to strengthen analytical thinking across subjects",
      icon: BarChart,
      color: "text-indigo-500 dark:text-indigo-400",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      id: "insight2",
      titleBn: "পরীক্ষার আগের সময় ব্যবস্থাপনা",
      titleEn: "Exam Preparation Time Management",
      descriptionBn: "পরীক্ষার আগে সময় কীভাবে কার্যকরভাবে ব্যবহার করবেন",
      descriptionEn: "How to effectively use your time before exams",
      icon: Clock,
      color: "text-rose-500 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-900/30",
    },
    {
      id: "insight3",
      titleBn: "শিক্ষাগত লক্ষ্য নির্ধারণ",
      titleEn: "Setting Educational Goals",
      descriptionBn: "আপনার শিক্ষাগত ভবিষ্যত পরিকল্পনার গুরুত্ব",
      descriptionEn: "The importance of planning your educational future",
      icon: Target,
      color: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    }
  ];

  // Define upcoming events
  const upcomingEvents = [
    {
      id: "event1",
      titleBn: "ক্যারিয়ার কাউন্সেলিং সেশন",
      titleEn: "Career Counseling Session",
      dateBn: "১০ ডিসেম্বর",
      dateEn: "December 10",
      typeBn: "কর্মশালা",
      typeEn: "Workshop",
      emoji: "👨‍💼",
    },
    {
      id: "event2",
      titleBn: "বিজ্ঞান প্রদর্শনী",
      titleEn: "Science Exhibition",
      dateBn: "১৮ ডিসেম্বর",
      dateEn: "December 18",
      typeBn: "প্রদর্শনী",
      typeEn: "Exhibition",
      emoji: "🔭",
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
        className="absolute top-20 right-10 text-4xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
      >
        🎓
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
        🔍
      </motion.div>

      {/* Page Header */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-8 rounded-2xl shadow-lg relative overflow-hidden z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -right-20 -top-20 text-9xl opacity-20">👩‍🎓</div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-indigo-600/0 via-white/5 to-indigo-600/0"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md flex items-center gap-3">
          <GraduationCap className="h-9 w-9 text-amber-300" />
          {language === "bn" ? "মাধ্যমিক বিদ্যালয়" : "Secondary School"}
        </h1>
        <p className="text-white/90 max-w-3xl mt-3 text-lg">
          {language === "bn" 
            ? "মাধ্যমিক বিদ্যালয়ের সমস্ত বিষয় এবং শিক্ষামূলক সামগ্রী এখানে পাওয়া যাবে। নবম থেকে দশম শ্রেণী পর্যন্ত সকল পাঠ্যক্রম এবং এস.এস.সি পরীক্ষার প্রস্তুতির জন্য নির্দেশনা প্রদান করা হয়েছে।" 
            : "Find all subjects and educational materials for Secondary School here. Curriculum for classes Nine to Ten and guidance for SSC exam preparation are provided."
          }
        </p>
      </motion.div>

      {/* Classes Grid */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            {language === "bn" ? "শ্রেণি ও বিভাগসমূহ" : "Classes & Sections"}
          </h2>
          <Link href="/school/secondary/classes" 
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
                <div className={`bg-gradient-to-br ${classItem.bgGradient} h-40 relative flex items-center justify-center`}>
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

      {/* Academic Insights */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/80 dark:to-blue-900/30 rounded-2xl p-8 shadow-md relative z-10">
        <div className="absolute right-10 -top-4 text-4xl">💡</div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
          <span className="text-2xl">📰</span>
          {language === "bn" ? "একাডেমিক ইনসাইটস" : "Academic Insights"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {academicInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div className="p-6">
                <div className={`${insight.bg} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                  <insight.icon className={`h-7 w-7 ${insight.color}`} />
                </div>
                <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-3">
                  {language === "bn" ? insight.titleBn : insight.titleEn}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {language === "bn" ? insight.descriptionBn : insight.descriptionEn}
                </p>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 px-6 py-3">
                <Link href={`/school/secondary/insights/${insight.id}`} className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline flex items-center">
                  {language === "bn" ? "বিস্তারিত পড়ুন" : "Read more"} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/school/secondary/insights" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-md text-base font-medium text-white bg-gradient-to-r from-slate-500 to-blue-600 hover:from-slate-600 hover:to-blue-700 transform transition-all hover:scale-105"
          >
            {language === "bn" ? "সকল ইনসাইটস দেখুন" : "View All Insights"}
          </Link>
        </div>
      </section>

      {/* Resources and Events Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Featured Resources */}
        <section className="lg:col-span-2 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-8 shadow-md relative">
          <div className="absolute right-8 -top-4 text-4xl">📊</div>
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 flex items-center gap-2">
            <span className="text-2xl">🔖</span>
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
            <Link href="/school/secondary/resources" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-md text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform transition-all hover:scale-105"
            >
              {language === "bn" ? "সব শিক্ষামূলক সামগ্রী দেখুন" : "View All Learning Resources"}
            </Link>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-8 shadow-md relative">
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
            <Link href="/school/secondary/events" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-md text-base font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transform transition-all hover:scale-105"
            >
              {language === "bn" ? "সব ইভেন্ট দেখুন" : "View All Events"}
            </Link>
          </div>
        </section>
      </div>

      {/* Career Guidance */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 shadow-md relative z-10 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="absolute top-10 right-10 text-6xl opacity-20">🔭</div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === "bn" ? "ক্যারিয়ার গাইডেন্স" : "Career Guidance"}
            </h2>
            <p className="text-white/80 text-lg mb-6">
              {language === "bn" 
                ? "ভবিষ্যত ক্যারিয়ার পরিকল্পনা, বিষয় নির্বাচন এবং উচ্চশিক্ষার বিকল্প সম্পর্কে জানুন। আমাদের বিশেষজ্ঞদের পরামর্শ নিয়ে আপনার ক্যারিয়ার পাথ নির্ধারণে সহায়তা নিন।"
                : "Learn about future career planning, subject selection, and higher education options. Get help determining your career path with advice from our experts."
              }
            </p>
            <Link href="/school/secondary/career-guidance"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-md text-base font-medium text-indigo-700 bg-white hover:bg-gray-100 transform transition-all hover:scale-105"
            >
              {language === "bn" ? "আরও জানুন" : "Learn More"}
            </Link>
          </div>
          
          <motion.div 
            className="relative w-40 h-40 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-4 border-dashed border-white/30 rounded-full"></div>
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-2xl"
              animate={{ 
                y: [0, 5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              🎯
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 