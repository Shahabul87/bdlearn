"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, BookOpen, Clock, FileText, Video, Award, Star, BarChart, ArrowRight, CheckCircle, Calendar, Medal } from "lucide-react";
import { useLanguage } from "../../components/language-provider";

export default function ClassFivePage() {
  const { language } = useLanguage();

  // Subjects data
  const subjects = [
    {
      id: "bangla",
      nameBn: "বাংলা",
      nameEn: "Bengali",
      color: "from-orange-500 to-red-500",
      icon: "/icons/bangla.svg",
      descriptionBn: "উচ্চ মাত্রার বাংলা ভাষা ও সাহিত্য",
      descriptionEn: "Advanced Bengali language and literature",
      completedLessons: 28,
      totalLessons: 32,
      path: "/school/primary/class-5/bangla",
    },
    {
      id: "english",
      nameBn: "ইংরেজি",
      nameEn: "English",
      color: "from-blue-500 to-indigo-500",
      icon: "/icons/english.svg",
      descriptionBn: "পূর্ণাঙ্গ ইংরেজি ভাষা ও ব্যাকরণ",
      descriptionEn: "Comprehensive English language and grammar",
      completedLessons: 24,
      totalLessons: 30,
      path: "/school/primary/class-5/english",
    },
    {
      id: "math",
      nameBn: "গণিত",
      nameEn: "Mathematics",
      color: "from-emerald-500 to-teal-500",
      icon: "/icons/math.svg",
      descriptionBn: "জটিল সমীকরণ, জ্যামিতি এবং সংখ্যাতত্ত্ব",
      descriptionEn: "Complex equations, geometry, and number theory",
      completedLessons: 26,
      totalLessons: 35,
      path: "/school/primary/class-5/math",
    },
    {
      id: "science",
      nameBn: "বিজ্ঞান",
      nameEn: "Science",
      color: "from-violet-500 to-purple-500",
      icon: "/icons/science.svg",
      descriptionBn: "প্রাকৃতিক বিজ্ঞান, পরিবেশ ও প্রযুক্তি",
      descriptionEn: "Natural science, environment, and technology",
      completedLessons: 20,
      totalLessons: 28,
      path: "/school/primary/class-5/science",
    }
  ];

  // Achievements
  const achievements = [
    {
      id: "ach1",
      titleBn: "শতভাগ উপস্থিতি",
      titleEn: "100% Attendance",
      iconColor: "text-blue-500",
      progress: 100,
    },
    {
      id: "ach2",
      titleBn: "মাস্টার রিডার",
      titleEn: "Master Reader",
      iconColor: "text-amber-500",
      progress: 85,
    },
    {
      id: "ach3",
      titleBn: "গণিত চ্যাম্পিয়ন",
      titleEn: "Math Champion",
      iconColor: "text-emerald-500",
      progress: 92,
    }
  ];

  // Upcoming exams
  const exams = [
    {
      id: "exam1",
      titleBn: "বাংলা সাপ্তাহিক পরীক্ষা",
      titleEn: "Bengali Weekly Test",
      date: "2023-12-15",
      time: "10:00 AM",
      subjectBn: "বাংলা",
      subjectEn: "Bengali",
    },
    {
      id: "exam2",
      titleBn: "অর্ধ-বার্ষিক পরীক্ষা",
      titleEn: "Mid-Term Examination",
      date: "2023-12-20",
      time: "09:30 AM",
      subjectBn: "সকল বিষয়",
      subjectEn: "All Subjects",
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

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 dark:from-purple-700 dark:via-violet-700 dark:to-indigo-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-700/50 via-transparent"></div>
        </div>
        
        <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 md:max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                {language === "bn" ? "সমাপনী শ্রেণী" : "Final Year"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {language === "bn" ? "পঞ্চম শ্রেণী" : "Class Five"}
              </h1>
              <p className="text-indigo-100 text-lg mb-6">
                {language === "bn" 
                  ? "প্রাথমিক শিক্ষার সমাপনী বছরে আপনাকে স্বাগতম! এখানে আপনি সমাপনী পরীক্ষার প্রস্তুতির সকল সামগ্রী পাবেন।" 
                  : "Welcome to the final year of primary education! Here you will find all materials for preparation of the final exam."}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/school/primary/class-5/psc-preparation" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-indigo-700 font-medium hover:bg-indigo-50 transition-colors">
                  {language === "bn" ? "সমাপনী প্রস্তুতি" : "PSC Preparation"}
                </Link>
                <Link href="/school/primary/class-5/study-plan" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-500/30 text-white border border-indigo-300/30 hover:bg-indigo-500/40 transition-colors">
                  {language === "bn" ? "অধ্যয়ন পরিকল্পনা" : "Study Plan"}
                </Link>
              </div>
            </div>
            
            <div className="relative w-full max-w-[300px] md:max-w-xs">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-indigo-500/30 to-indigo-500/10 backdrop-blur-lg"></div>
              <div className="relative p-6 text-center">
                <div className="mb-4">
                  <div className="radial-progress mx-auto" style={{"--value": 75, "--size": "8rem", "--thickness": "8px"} as React.CSSProperties}>
                    <span className="text-3xl font-bold">75%</span>
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-2">
                  {language === "bn" ? "সামগ্রিক অগ্রগতি" : "Overall Progress"}
                </h3>
                <p className="text-indigo-200 text-sm mb-4">
                  {language === "bn" ? "সফলভাবে সম্পন্ন করেছেন" : "Successfully completed"}
                </p>
                <Link href="/school/primary/class-5/progress" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-colors">
                  {language === "bn" ? "বিস্তারিত দেখুন" : "View Details"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              {language === "bn" ? "বিষয়সমূহ" : "Subjects"}
            </h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {subjects.map((subject) => (
                <motion.div
                  key={subject.id}
                  variants={itemVariants}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={subject.path}>
                    <div className="flex items-start p-4">
                      <div className={`rounded-lg bg-gradient-to-br ${subject.color} p-3 mr-4`}>
                        <Image src={subject.icon} alt={language === "bn" ? subject.nameBn : subject.nameEn} width={24} height={24} className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                          {language === "bn" ? subject.nameBn : subject.nameEn}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {language === "bn" ? subject.descriptionBn : subject.descriptionEn}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {subject.completedLessons}/{subject.totalLessons} {language === "bn" ? "পাঠ" : "lessons"}
                          </div>
                          <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${subject.color}`}
                              style={{ width: `${(subject.completedLessons / subject.totalLessons) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-4 text-center">
              <Link href="/school/primary/class-5/subjects" className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                {language === "bn" ? "সব বিষয় দেখুন" : "View all subjects"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <Medal className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
              {language === "bn" ? "আপনার অর্জন" : "Your Achievements"}
            </h2>
            
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 ${achievement.iconColor} mr-4`}>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {language === "bn" ? achievement.titleBn : achievement.titleEn}
                    </h3>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-medium text-amber-600 dark:text-amber-400">
                    {achievement.progress}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
              {language === "bn" ? "আসন্ন পরীক্ষা" : "Upcoming Exams"}
            </h2>
            
            <div className="space-y-4">
              {exams.map((exam) => (
                <div key={exam.id} className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {language === "bn" ? exam.titleBn : exam.titleEn}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(exam.date)}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{exam.time}</span>
                    </div>
                    <div className="mt-2 px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded text-xs inline-block">
                      {language === "bn" ? exam.subjectBn : exam.subjectEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Link href="/school/primary/class-5/exam-schedule" className="inline-flex items-center text-sm text-red-600 dark:text-red-400 hover:underline font-medium">
                {language === "bn" ? "সম্পূর্ণ সূচি দেখুন" : "View full schedule"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">
              {language === "bn" ? "সমাপনী পরীক্ষার প্রস্তুতি" : "PSC Exam Preparation"}
            </h2>
            <p className="mb-4 text-indigo-100">
              {language === "bn" 
                ? "সফলভাবে প্রাথমিক শিক্ষা সমাপনী পরীক্ষার জন্য প্রস্তুত হোন আমাদের বিশেষ প্রস্তুতি প্রোগ্রামের মাধ্যমে।" 
                : "Get ready for your Primary School Certificate Examination with our special preparation program."}
            </p>
            <Link href="/school/primary/class-5/psc-preparation" className="inline-flex items-center justify-center w-full px-4 py-2 bg-white text-indigo-700 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
              {language === "bn" ? "প্রস্তুতি শুরু করুন" : "Start Preparation"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 