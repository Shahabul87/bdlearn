"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, BookOpen, Clock, FileText, Video, Award, Star, BarChart } from "lucide-react";
import { useLanguage } from "../../components/language-provider";

export default function ClassTwoPage() {
  const { language } = useLanguage();
  
  // Define the subjects for class 2
  const subjects = [
    {
      id: "bangla",
      nameBn: "বাংলা",
      nameEn: "Bengali",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      icon: BookOpen,
      descriptionBn: "অক্ষর, শব্দ এবং বাক্য গঠন",
      descriptionEn: "Letters, words and sentence formation",
      lessonsCount: 28,
      path: "/school/primary/class-2/bangla",
      imagePath: "/images/subjects/bangla-2.jpg",
    },
    {
      id: "english",
      nameBn: "ইংরেজি",
      nameEn: "English",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      icon: Book,
      descriptionBn: "বেসিক ইংরেজি বাক্য ও কথোপকথন",
      descriptionEn: "Basic English sentences and conversations",
      lessonsCount: 24,
      path: "/school/primary/class-2/english",
      imagePath: "/images/subjects/english-2.jpg",
    },
    {
      id: "math",
      nameBn: "গণিত",
      nameEn: "Mathematics",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      icon: FileText,
      descriptionBn: "যোগ, বিয়োগ এবং গুণের ধারণা",
      descriptionEn: "Addition, subtraction and multiplication concepts",
      lessonsCount: 22,
      path: "/school/primary/class-2/math",
      imagePath: "/images/subjects/math-2.jpg",
    },
    {
      id: "science",
      nameBn: "প্রাথমিক বিজ্ঞান",
      nameEn: "Elementary Science",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      icon: Video,
      descriptionBn: "প্রকৃতি, উদ্ভিদ ও প্রাণী সম্পর্কে প্রাথমিক ধারণা",
      descriptionEn: "Basic concepts about nature, plants and animals",
      lessonsCount: 18,
      path: "/school/primary/class-2/science",
      imagePath: "/images/subjects/science-2.jpg",
    },
  ];

  // Define featured resources
  const featuredResources = [
    {
      id: "resource1",
      typeBn: "ভিডিও",
      typeEn: "Video",
      titleBn: "ছন্দ ও কবিতা",
      titleEn: "Rhythm and Poetry",
      durationMinutes: 14,
      path: "/resources/bengali-poetry",
    },
    {
      id: "resource2",
      typeBn: "অভ্যাস",
      typeEn: "Practice",
      titleBn: "নামতা শিখন",
      titleEn: "Multiplication Tables",
      durationMinutes: 10,
      path: "/resources/multiplication-tables",
    },
    {
      id: "resource3",
      typeBn: "উপাখ্যান",
      typeEn: "Story",
      titleBn: "পঞ্চতন্ত্রের গল্প",
      titleEn: "Panchatantra Stories",
      durationMinutes: 18,
      path: "/resources/panchatantra-stories",
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

  // Recent activities
  const recentActivities = [
    {
      id: "activity1",
      typeBn: "পাঠ সমাপ্ত",
      typeEn: "Completed Lesson",
      titleBn: "বাংলা বর্ণমালা - যুক্তাক্ষর",
      titleEn: "Bengali Alphabet - Compound Letters",
      date: "2023-12-10",
      score: 85,
    },
    {
      id: "activity2",
      typeBn: "টেস্ট",
      typeEn: "Test",
      titleBn: "ইংরেজি ভোকাবুলারি টেস্ট",
      titleEn: "English Vocabulary Test",
      date: "2023-12-08",
      score: 92,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {language === "bn" ? "দ্বিতীয় শ্রেণী" : "Class Two"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          {language === "bn" 
            ? "দ্বিতীয় শ্রেণীর সকল বিষয় এবং শিক্ষামূলক সামগ্রী এখানে পাবেন। ভাষার দক্ষতা ও সাধারণ জ্ঞান বিকাশের জন্য বিভিন্ন শিক্ষামূলক কার্যক্রম অন্তর্ভুক্ত করা হয়েছে।" 
            : "Find all subjects and educational materials for Class Two here. Various educational activities have been included to develop language skills and general knowledge."
          }
        </p>
      </div>

      {/* Quick Stats */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-800 rounded-lg p-4 shadow-md text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">
                {language === "bn" ? "সম্পন্ন পাঠ" : "Completed Lessons"}
              </p>
              <h3 className="text-2xl font-bold">42/92</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full w-[45%]"></div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-800 rounded-lg p-4 shadow-md text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">
                {language === "bn" ? "গড় স্কোর" : "Average Score"}
              </p>
              <h3 className="text-2xl font-bold">87%</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <BarChart className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full w-[87%]"></div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-800 rounded-lg p-4 shadow-md text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">
                {language === "bn" ? "অর্জিত পয়েন্ট" : "Earned Points"}
              </p>
              <h3 className="text-2xl font-bold">128</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <Award className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-white/30" />
            <span className="text-xs text-white/80 ml-1">4.2/5</span>
          </div>
        </motion.div>
      </motion.section>

      {/* Subjects Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {language === "bn" ? "বিষয়সমূহ" : "Subjects"}
          </h2>
          <Link href="/school/primary/class-2/subjects" className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
            {language === "bn" ? "সব দেখুন" : "View all"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {subjects.map((subject) => (
            <motion.div
              key={subject.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800/50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={subject.path}>
                <div className="h-36 relative bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <subject.icon className={`w-12 h-12 ${subject.iconColor}`} />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-lg text-gray-800 dark:text-white">
                      {language === "bn" ? subject.nameBn : subject.nameEn}
                    </h3>
                    <div className={`p-2 rounded-md ${subject.iconBg}`}>
                      <subject.icon className={`w-4 h-4 ${subject.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {language === "bn" ? subject.descriptionBn : subject.descriptionEn}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Book className="w-4 h-4 mr-1" />
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

      {/* Recent Activities and Featured Resources (2-column layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <section className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
            {language === "bn" ? "সাম্প্রতিক কার্যক্রম" : "Recent Activities"}
          </h2>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id}
                className="border-l-4 border-purple-500 pl-4 py-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">
                      {language === "bn" ? activity.typeBn : activity.typeEn}
                    </div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      {language === "bn" ? activity.titleBn : activity.titleEn}
                    </h4>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-1 rounded-full">
                    {activity.score}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/school/primary/class-2/activities" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 dark:text-purple-200 dark:bg-purple-900/40 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800/60 transition-colors">
              {language === "bn" ? "সব কার্যক্রম দেখুন" : "View All Activities"}
            </Link>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <Video className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            {language === "bn" ? "বিশেষ শিক্ষামূলক সামগ্রী" : "Featured Learning Resources"}
          </h2>
          
          <div className="space-y-3">
            {featuredResources.map((resource) => (
              <motion.div 
                key={resource.id}
                whileHover={{ x: 5 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow transition-shadow flex items-center justify-between"
              >
                <Link href={resource.path} className="flex items-center flex-1">
                  <div className={`p-2 rounded-full bg-indigo-100 dark:bg-indigo-800 mr-4`}>
                    <Video className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">
                      {language === "bn" ? resource.typeBn : resource.typeEn}
                    </div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {language === "bn" ? resource.titleBn : resource.titleEn}
                    </h3>
                  </div>
                </Link>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{resource.durationMinutes} {language === "bn" ? "মিনিট" : "min"}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Link href="/school/primary/class-2/resources" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
              {language === "bn" ? "সব শিক্ষামূলক সামগ্রী দেখুন" : "View All Learning Resources"}
            </Link>
          </div>
        </section>
      </div>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-700 dark:to-indigo-800 rounded-xl p-6 text-white text-center shadow-md"
      >
        <h2 className="text-xl font-bold mb-2">
          {language === "bn" ? "আজকের পাঠে যোগ দিন!" : "Join Today's Lesson!"}
        </h2>
        <p className="mb-4 max-w-2xl mx-auto">
          {language === "bn" 
            ? "দ্বিতীয় শ্রেণীর জন্য সাজানো নতুন পাঠগুলি এখনই শুরু করুন এবং আপনার শিক্ষা যাত্রায় এগিয়ে যান।" 
            : "Begin our newly designed lessons for Class Two and progress in your learning journey."}
        </p>
        <Link href="/school/primary/class-2/today" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-indigo-800 bg-white hover:bg-indigo-50 transition-colors">
          {language === "bn" ? "পাঠ শুরু করুন" : "Start Learning"}
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M5 7l5 5-5 5" />
          </svg>
        </Link>
      </motion.section>
    </div>
  );
} 