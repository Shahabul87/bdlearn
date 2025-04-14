"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, BookOpen, Clock, FileText, Video, Award, Star, BarChart, Activity, Globe, Layers, Users } from "lucide-react";
import { useLanguage } from "../../components/language-provider";

export default function ClassFourPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'subjects' | 'resources'>('subjects');
  
  // Define the subjects for class 4
  const subjects = [
    {
      id: "bangla",
      nameBn: "বাংলা",
      nameEn: "Bengali",
      color: "bg-rose-500 dark:bg-rose-600",
      icon: BookOpen,
      descriptionBn: "উচ্চতর বাংলা ভাষা ও সাহিত্য",
      descriptionEn: "Advanced Bengali language and literature",
      progress: 78,
      path: "/school/primary/class-4/bangla",
    },
    {
      id: "english",
      nameBn: "ইংরেজি",
      nameEn: "English",
      color: "bg-cyan-500 dark:bg-cyan-600",
      icon: Book,
      descriptionBn: "ইংরেজি ভাষা ও ব্যাকরণ",
      descriptionEn: "English language and grammar",
      progress: 62,
      path: "/school/primary/class-4/english",
    },
    {
      id: "math",
      nameBn: "গণিত",
      nameEn: "Mathematics",
      color: "bg-amber-500 dark:bg-amber-600",
      icon: Layers,
      descriptionBn: "জটিল সংখ্যা এবং জ্যামিতি",
      descriptionEn: "Complex numbers and geometry",
      progress: 55,
      path: "/school/primary/class-4/math",
    },
    {
      id: "science",
      nameBn: "বিজ্ঞান",
      nameEn: "Science",
      color: "bg-emerald-500 dark:bg-emerald-600",
      icon: Activity,
      descriptionBn: "প্রাকৃতিক বিজ্ঞান ও পরিবেশ",
      descriptionEn: "Natural science and environment",
      progress: 70,
      path: "/school/primary/class-4/science",
    },
    {
      id: "social",
      nameBn: "সমাজ বিজ্ঞান",
      nameEn: "Social Studies",
      color: "bg-purple-500 dark:bg-purple-600",
      icon: Globe,
      descriptionBn: "সমাজ, ইতিহাস ও ভূগোল",
      descriptionEn: "Society, history and geography",
      progress: 65,
      path: "/school/primary/class-4/social",
    },
    {
      id: "religion",
      nameBn: "ধর্ম শিক্ষা",
      nameEn: "Religious Studies",
      color: "bg-blue-500 dark:bg-blue-600",
      icon: Users,
      descriptionBn: "নৈতিক শিক্ষা ও মূল্যবোধ",
      descriptionEn: "Moral education and values",
      progress: 85,
      path: "/school/primary/class-4/religion",
    },
  ];

  // Featured resources
  const resources = [
    {
      id: "resource1",
      typeBn: "ভিডিও",
      typeEn: "Video",
      titleBn: "সৌরজগত পরিচিতি",
      titleEn: "Introduction to Solar System",
      durationMinutes: 18,
      color: "bg-blue-500",
      path: "/resources/solar-system",
    },
    {
      id: "resource2",
      typeBn: "ইন্টারেক্টিভ",
      typeEn: "Interactive",
      titleBn: "বাংলাদেশের মানচিত্র",
      titleEn: "Map of Bangladesh",
      durationMinutes: 15,
      color: "bg-green-500",
      path: "/resources/bangladesh-map",
    },
    {
      id: "resource3",
      typeBn: "কুইজ",
      typeEn: "Quiz",
      titleBn: "গণিত প্রশ্নোত্তর",
      titleEn: "Math Quiz",
      durationMinutes: 10,
      color: "bg-amber-500",
      path: "/resources/math-quiz",
    },
    {
      id: "resource4",
      typeBn: "টিউটোরিয়াল",
      typeEn: "Tutorial",
      titleBn: "বাংলা ব্যাকরণ",
      titleEn: "Bengali Grammar",
      durationMinutes: 22,
      color: "bg-red-500",
      path: "/resources/bengali-grammar",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="absolute inset-0 flex items-center justify-end px-8">
          <div className="hidden md:block">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${Math.random() * 200 + 50}px`,
                  height: `${Math.random() * 200 + 50}px`,
                  top: `${Math.random() * 60}%`,
                  right: `${i * 15 + Math.random() * 10}%`,
                  opacity: 0.1 + Math.random() * 0.15
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="relative p-8 md:p-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "bn" ? "চতুর্থ শ্রেণী" : "Class Four"}
          </h1>
          <p className="max-w-2xl text-indigo-100 mb-6">
            {language === "bn" 
              ? "চতুর্থ শ্রেণীর শিক্ষার্থীদের জন্য বিশেষভাবে সাজানো পাঠ সামগ্রী। এই বছর আপনারা আরও জটিল বিষয়বস্তু এবং বহুমুখী শিক্ষা কার্যক্রমে অংশগ্রহণ করবেন।" 
              : "Learning materials specially arranged for Class Four students. This year you will participate in more complex subject matter and diverse educational activities."}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/school/primary/class-4/syllabus" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full text-base font-medium text-indigo-700 bg-white hover:bg-indigo-50 transition-colors">
              {language === "bn" ? "পাঠ্যসূচি দেখুন" : "View Syllabus"}
            </Link>
            <Link href="/school/primary/class-4/achievements" className="inline-flex items-center justify-center px-6 py-3 border border-white/30 rounded-full text-base font-medium text-white hover:bg-white/10 transition-colors">
              {language === "bn" ? "সাফল্য দেখুন" : "View Achievements"}
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {language === "bn" ? "সামগ্রিক অগ্রগতি" : "Overall Progress"}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">68%</h3>
            </div>
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <BarChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-2 bg-purple-500 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {language === "bn" ? "সম্পন্ন পাঠ" : "Completed Lessons"}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">72/120</h3>
            </div>
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
              <Book className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-2 bg-indigo-500 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {language === "bn" ? "অর্জন পুরস্কার" : "Earned Rewards"}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">14</h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="flex mt-4 space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i < 4 ? 'bg-amber-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => setActiveTab('subjects')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'subjects' 
                ? 'text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {language === "bn" ? "বিষয়সমূহ" : "Subjects"}
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'resources' 
                ? 'text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {language === "bn" ? "শিক্ষা সম্পদ" : "Learning Resources"}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'subjects' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {subjects.map((subject) => (
                <motion.div
                  key={subject.id}
                  variants={itemVariants}
                  className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <Link href={subject.path}>
                    <div className={`${subject.color} h-3`}></div>
                    <div className="p-5">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-lg ${subject.color} bg-opacity-20 dark:bg-opacity-20 flex items-center justify-center`}>
                          <subject.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-medium text-lg text-gray-800 dark:text-white">
                          {language === "bn" ? subject.nameBn : subject.nameEn}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {language === "bn" ? subject.descriptionBn : subject.descriptionEn}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            {language === "bn" ? "অগ্রগতি" : "Progress"}
                          </span>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {subject.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-2 ${subject.color}`} 
                            style={{ width: `${subject.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {resources.map((resource) => (
                <motion.div
                  key={resource.id}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <Link href={resource.path}>
                    <div className="flex items-center p-5">
                      <div className={`w-12 h-12 rounded-xl ${resource.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-grow">
                        <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 inline-block mb-1">
                          {language === "bn" ? resource.typeBn : resource.typeEn}
                        </div>
                        <h3 className="font-medium text-gray-800 dark:text-white line-clamp-1">
                          {language === "bn" ? resource.titleBn : resource.titleEn}
                        </h3>
                      </div>
                      <div className="ml-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{resource.durationMinutes} {language === "bn" ? "মিনিট" : "min"}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              
              <div className="md:col-span-2 mt-4 text-center">
                <Link href="/school/primary/class-4/resources" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {language === "bn" ? "আরও শিক্ষামূলক সামগ্রী দেখুন" : "View More Learning Resources"}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">
          {language === "bn" ? "আজকের পরীক্ষার জন্য প্রস্তুত?" : "Ready for Today's Quiz?"}
        </h2>
        <p className="mb-6 max-w-2xl mx-auto">
          {language === "bn" 
            ? "আজকের দৈনিক পরীক্ষায় অংশগ্রহণ করে আপনার জ্ঞান যাচাই করুন এবং বোনাস পয়েন্ট অর্জন করুন।" 
            : "Participate in today's daily quiz to test your knowledge and earn bonus points."}
        </p>
        <Link href="/school/primary/class-4/quiz" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-indigo-700 bg-white hover:bg-indigo-50 transition-colors">
          {language === "bn" ? "কুইজ শুরু করুন" : "Start Quiz"}
        </Link>
      </div>
    </div>
  );
} 