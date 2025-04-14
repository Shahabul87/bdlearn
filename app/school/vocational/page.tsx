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
  Briefcase, 
  Wrench,
  Hammer,
  Code,
  Activity,
  Calendar,
  Medal,
  Leaf,
  Globe
} from "lucide-react";
import { useLanguage, LanguageText } from "../components/language-provider";

export default function VocationalSchoolPage() {
  const { language } = useLanguage();
  
  // Define vocational courses
  const courses = [
    {
      id: "web-development",
      nameBn: "ওয়েব ডেভেলপমেন্ট",
      nameEn: "Web Development",
      iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      icon: Code,
      descriptionBn: "HTML, CSS, JavaScript এবং আধুনিক ফ্রেমওয়ার্ক শিখুন",
      descriptionEn: "Learn HTML, CSS, JavaScript and modern frameworks",
      durationMonths: 6,
      path: "/school/vocational/web-development",
      emoji: "💻",
      bgGradient: "from-cyan-400 to-blue-500",
    },
    {
      id: "electrical",
      nameBn: "ইলেকট্রিক্যাল",
      nameEn: "Electrical",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      icon: Wrench,
      descriptionBn: "ইলেকট্রিক্যাল ইনস্টলেশন এবং মেইনটেনেন্স",
      descriptionEn: "Electrical installation and maintenance",
      durationMonths: 8,
      path: "/school/vocational/electrical",
      emoji: "⚡",
      bgGradient: "from-amber-400 to-yellow-500",
    },
    {
      id: "graphic-design",
      nameBn: "গ্রাফিক ডিজাইন",
      nameEn: "Graphic Design",
      iconBg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
      iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
      icon: Leaf,
      descriptionBn: "ডিজিটাল আর্ট এবং ব্র্যান্ডিং সৃষ্টি",
      descriptionEn: "Digital art and branding creation",
      durationMonths: 5,
      path: "/school/vocational/graphic-design",
      emoji: "🎨",
      bgGradient: "from-fuchsia-400 to-purple-500",
    },
    {
      id: "hospitality",
      nameBn: "হসপিটালিটি",
      nameEn: "Hospitality",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      icon: Globe,
      descriptionBn: "হোটেল ম্যানেজমেন্ট এবং টুরিজম প্রশিক্ষণ",
      descriptionEn: "Hotel management and tourism training",
      durationMonths: 9,
      path: "/school/vocational/hospitality",
      emoji: "🏨",
      bgGradient: "from-emerald-400 to-teal-500",
    },
  ];

  // Define featured resources
  const featuredResources = [
    {
      id: "resource1",
      typeBn: "প্রোজেক্ট",
      typeEn: "Project",
      titleBn: "হাতে-কলমে ইলেকট্রনিক্স",
      titleEn: "Hands-on Electronics",
      durationMinutes: 45,
      path: "/resources/electronics-project",
      emoji: "🔌",
      color: "bg-orange-400",
    },
    {
      id: "resource2",
      typeBn: "টিউটোরিয়াল",
      typeEn: "Tutorial",
      titleBn: "মোবাইল অ্যাপ নির্মাণ",
      titleEn: "Mobile App Development",
      durationMinutes: 60,
      path: "/resources/mobile-app-tutorial",
      emoji: "📱",
      color: "bg-blue-400",
    },
    {
      id: "resource3",
      typeBn: "ওয়ার্কশপ",
      typeEn: "Workshop",
      titleBn: "বিজনেস স্কিলস",
      titleEn: "Business Skills",
      durationMinutes: 90,
      path: "/resources/business-workshop",
      emoji: "💼",
      color: "bg-green-400",
    },
  ];

  // Define industry partners
  const industryPartners = [
    {
      id: "partner1",
      nameBn: "টেক সলিউশনস বাংলাদেশ",
      nameEn: "Tech Solutions Bangladesh",
      fieldBn: "আইটি",
      fieldEn: "IT",
      logo: "🏢",
      jobOpenings: 12,
    },
    {
      id: "partner2",
      nameBn: "গ্রীন এনার্জি",
      nameEn: "Green Energy Co.",
      fieldBn: "ইলেকট্রিক্যাল",
      fieldEn: "Electrical",
      logo: "🏭",
      jobOpenings: 8,
    },
    {
      id: "partner3",
      nameBn: "ক্রিয়েটিভ মিডিয়া",
      nameEn: "Creative Media Ltd.",
      fieldBn: "ডিজাইন",
      fieldEn: "Design",
      logo: "🎭",
      jobOpenings: 6,
    },
  ];

  // Define success stories
  const successStories = [
    {
      id: "story1",
      nameBn: "আরিফ রহমান",
      nameEn: "Arif Rahman",
      roleBn: "সিনিয়র ওয়েব ডেভেলপার",
      roleEn: "Senior Web Developer",
      companyBn: "টেকনো বিডি",
      companyEn: "TechnoBD",
      courseBn: "ওয়েব ডেভেলপমেন্ট",
      courseEn: "Web Development",
      avatar: "👨‍💻",
    },
    {
      id: "story2",
      nameBn: "সাবরিনা আক্তার",
      nameEn: "Sabrina Akter",
      roleBn: "ইলেকট্রিক্যাল ইঞ্জিনিয়ার",
      roleEn: "Electrical Engineer",
      companyBn: "পাওয়ার গ্রিড",
      companyEn: "Power Grid",
      courseBn: "ইলেকট্রিক্যাল",
      courseEn: "Electrical",
      avatar: "👩‍🔧",
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
        🔧
      </motion.div>
      <motion.div 
        className="absolute top-80 left-5 text-3xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      >
        📱
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-20 text-4xl hidden md:block z-0" 
        variants={floatVariants} 
        animate="animate"
        style={{ animationDelay: "0.8s" }}
      >
        🛠️
      </motion.div>

      {/* Page Header */}
      <motion.div 
        className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-8 rounded-2xl shadow-lg relative overflow-hidden z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -right-20 -top-20 text-9xl opacity-20">👨‍🔧</div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-orange-500/0 via-white/5 to-orange-500/0"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md flex items-center gap-3">
          <Briefcase className="h-9 w-9 text-blue-300" />
          {language === "bn" ? "ভোকেশনাল স্কুল" : "Vocational School"}
        </h1>
        <p className="text-white/90 max-w-3xl mt-3 text-lg">
          {language === "bn" 
            ? "দক্ষতা-ভিত্তিক এবং কর্ম-কেন্দ্রিক শিক্ষা প্রোগ্রাম। আমাদের ভোকেশনাল কোর্সগুলি আপনাকে বাস্তব জীবনের চাহিদা মেটাতে এবং কর্মক্ষেত্রে প্রবেশের জন্য প্রস্তুত করবে।" 
            : "Skill-based and job-oriented education programs. Our vocational courses will prepare you to meet real-world demands and enter the workforce."
          }
        </p>
      </motion.div>

      {/* Courses Grid */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2">
            <span className="text-2xl">🧰</span>
            {language === "bn" ? "ভোকেশনাল কোর্সসমূহ" : "Vocational Courses"}
          </h2>
          <Link href="/school/vocational/courses" 
            className="text-sm bg-orange-100 dark:bg-orange-900/40 px-4 py-2 rounded-full text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800/40 transition-colors flex items-center gap-1 font-medium"
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
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform"
            >
              <Link href={course.path}>
                <div className={`bg-gradient-to-br ${course.bgGradient} h-40 relative flex items-center justify-center`}>
                  <motion.div 
                    className="text-6xl" 
                    variants={bubbleVariants}
                    animate="animate"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    {course.emoji}
                  </motion.div>
                </div>
                <div className="p-5 bg-white dark:bg-gray-800">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                      {language === "bn" ? course.nameBn : course.nameEn}
                    </h3>
                    <div className={`p-2 rounded-full ${course.iconBg}`}>
                      <course.icon className={`w-5 h-5 ${course.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {language === "bn" ? course.descriptionBn : course.descriptionEn}
                  </p>
                  <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-700/50 py-2 px-3 rounded-full w-fit">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {course.durationMonths} {language === "bn" ? "মাস" : "months"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Industry Partners */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-8 shadow-md relative z-10">
        <div className="absolute right-10 -top-4 text-4xl">🏭</div>
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
          <span className="text-2xl">🤝</span>
          {language === "bn" ? "ইন্ডাস্ট্রি পার্টনারস" : "Industry Partners"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industryPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{partner.logo}</span>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white">
                      {language === "bn" ? partner.nameBn : partner.nameEn}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {language === "bn" ? partner.fieldBn : partner.fieldEn}
                    </span>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                    {language === "bn" ? "কাজের সুযোগ" : "Job Openings"}
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded font-bold">
                    {partner.jobOpenings}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 px-6 py-3">
                <Link href={`/school/vocational/partners/${partner.id}`} className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center">
                  {language === "bn" ? "বিস্তারিত দেখুন" : "View details"} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/school/vocational/partners" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-md text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform transition-all hover:scale-105"
          >
            {language === "bn" ? "সব পার্টনার দেখুন" : "View All Partners"}
          </Link>
        </div>
      </section>

      {/* Resources and Success Stories Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Featured Resources */}
        <section className="lg:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-8 shadow-md relative">
          <div className="absolute right-8 -top-4 text-4xl">📚</div>
          <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-6 flex items-center gap-2">
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
                  <div className={`p-3 rounded-full bg-amber-100 dark:bg-amber-800 mr-4 text-xl`}>
                    {resource.emoji}
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase text-amber-600 dark:text-amber-400 mb-1">
                      {language === "bn" ? resource.typeBn : resource.typeEn}
                    </div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {language === "bn" ? resource.titleBn : resource.titleEn}
                    </h3>
                  </div>
                </Link>
                <div className="text-sm bg-amber-100 dark:bg-amber-900/40 px-3 py-1 rounded-full text-amber-600 dark:text-amber-300 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{resource.durationMinutes} {language === "bn" ? "মিনিট" : "min"}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/school/vocational/resources" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-md text-base font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transform transition-all hover:scale-105"
            >
              {language === "bn" ? "সব শিক্ষামূলক সামগ্রী দেখুন" : "View All Learning Resources"}
            </Link>
          </div>
        </section>

        {/* Success Stories */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl p-8 shadow-md relative">
          <div className="absolute right-6 -top-4 text-4xl">🏆</div>
          <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-2">
            <span className="text-2xl">✨</span>
            {language === "bn" ? "সাফল্যের গল্প" : "Success Stories"}
          </h2>
          
          <div className="space-y-4">
            {successStories.map((story, index) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all relative overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl bg-emerald-100 dark:bg-emerald-900/50 rounded-full h-16 w-16 flex items-center justify-center">
                    {story.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                      {language === "bn" ? story.nameBn : story.nameEn}
                    </h3>
                    <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {language === "bn" ? story.roleBn : story.roleEn}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {language === "bn" ? story.companyBn : story.companyEn}
                    </div>
                    <div className="mt-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full text-xs inline-block">
                      {language === "bn" ? story.courseBn : story.courseEn}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/school/vocational/success-stories" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-md text-base font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transform transition-all hover:scale-105"
            >
              {language === "bn" ? "সব গল্প দেখুন" : "View All Stories"}
            </Link>
          </div>
        </section>
      </div>

      {/* Job Placement Feature */}
      <section className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-8 shadow-md relative z-10 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="absolute top-10 right-10 text-6xl opacity-20">👩‍🏭</div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === "bn" ? "জব প্লেসমেন্ট সাপোর্ট" : "Job Placement Support"}
            </h2>
            <p className="text-white/80 text-lg mb-6">
              {language === "bn" 
                ? "আমাদের ইন্ডাস্ট্রি পার্টনারদের মাধ্যমে জব প্লেসমেন্টের সুযোগ পান। রেজুমে তৈরি, ইন্টারভিউ প্রস্তুতি এবং স্কিল ডেভেলপমেন্টে আমরা আপনাকে সহায়তা করি।"
                : "Get job placement opportunities through our industry partners. We provide support with resume building, interview preparation, and skill development."
              }
            </p>
            <Link href="/school/vocational/job-placement"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full shadow-md text-base font-medium text-orange-700 bg-white hover:bg-gray-100 transform transition-all hover:scale-105"
            >
              {language === "bn" ? "আরও জানুন" : "Learn More"}
            </Link>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-5 rounded-xl">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-4xl font-bold mb-1">85%</div>
            <div className="text-center text-white/90 text-sm">
              {language === "bn" ? "প্লেসমেন্ট রেট" : "Placement Rate"}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 