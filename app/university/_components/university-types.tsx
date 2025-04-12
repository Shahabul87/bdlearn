"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, BookOpen, Code, Calculator, Globe, Monitor } from "lucide-react";

// Course categories data
const courseCategories = [
  {
    id: "programming",
    name: "প্রোগ্রামিং কোর্স",
    description: "ওয়েব ডেভেলপমেন্ট, মোবাইল অ্যাপ ডেভেলপমেন্ট, জাভাস্ক্রিপ্ট, পাইথন, রিয়েক্ট, এবং আরও অনেক প্রোগ্রামিং কোর্স। শুরু থেকে এডভান্সড লেভেল পর্যন্ত শিখুন এবং আইটি সেক্টরে ক্যারিয়ার গড়ুন।",
    icon: <Code className="w-6 h-6" />,
    imageSrc: "/images/programming-course.webp",
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-100 dark:bg-blue-950/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    count: 28,
  },
  {
    id: "academic",
    name: "একাডেমিক কোর্স",
    description: "বিশ্ববিদ্যালয় ও কলেজ পাঠ্যক্রম অনুসারে গণিত, পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, এবং আরও বিষয়ের কোর্স। পরীক্ষার প্রস্তুতি এবং সেমিস্টার পরীক্ষার জন্য উপযুক্ত।",
    icon: <BookOpen className="w-6 h-6" />,
    imageSrc: "/images/academic-course.webp",
    color: "from-purple-600 to-purple-700",
    bgColor: "bg-purple-100 dark:bg-purple-950/40",
    iconColor: "text-purple-600 dark:text-purple-400",
    count: 42,
  },
  {
    id: "competitive",
    name: "প্রতিযোগিতামূলক পরীক্ষা",
    description: "বিসিএস, ব্যাংক জব, প্রাইমারি টিচার্স, এবং অন্যান্য চাকরির পরীক্ষার প্রস্তুতিমূলক কোর্স। বিগত বছরের প্রশ্ন ও সমাধান, মডেল টেস্ট, এবং সাক্ষাৎকার প্রস্তুতি।",
    icon: <Calculator className="w-6 h-6" />,
    imageSrc: "/images/competitive-exam.webp", 
    color: "from-red-600 to-rose-700",
    bgColor: "bg-red-100 dark:bg-red-950/40",
    iconColor: "text-red-600 dark:text-red-400",
    count: 15,
  },
  {
    id: "skill",
    name: "স্কিল ডেভেলপমেন্ট",
    description: "ডিজিটাল মার্কেটিং, গ্রাফিক ডিজাইন, কন্টেন্ট রাইটিং, ভিডিও এডিটিং, এবং আরও অনেক স্কিল শিখুন। ফ্রিল্যান্সিং বা চাকরির জন্য নিজেকে প্রস্তুত করুন এবং আর্জন শুরু করুন।",
    icon: <Globe className="w-6 h-6" />,
    imageSrc: "/images/skill-development.webp",
    color: "from-emerald-600 to-teal-700",
    bgColor: "bg-emerald-100 dark:bg-emerald-950/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    count: 35,
  },
];

export default function CourseCategories() {
  const [activeTab, setActiveTab] = useState("programming");
  
  const activeCourse = courseCategories.find(course => course.id === activeTab);
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent"
          >
            অনলাইন কোর্সের ক্যাটাগরি
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            আপনার প্রয়োজন অনুযায়ী বিভিন্ন ধরনের অনলাইন কোর্স থেকে বেছে নিন এবং ঘরে বসেই শিখুন
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 items-start">
          {/* Tabs */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-1 mb-6">
              {courseCategories.map(course => (
                <button 
                  key={course.id}
                  onClick={() => setActiveTab(course.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 mb-1 last:mb-0 
                    ${activeTab === course.id ? 
                      `bg-white dark:bg-gray-700 shadow-md` : 
                      `hover:bg-gray-100 dark:hover:bg-gray-750`
                    }`}
                >
                  <div className={`w-10 h-10 rounded-full ${course.bgColor} flex items-center justify-center ${course.iconColor}`}>
                    {course.icon}
                  </div>
                  <div>
                    <h3 className={`font-medium ${activeTab === course.id ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {course.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {course.count} টি কোর্স
                    </p>
                  </div>
                </button>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                ফ্রি কোর্স সাবস্ক্রাইব করুন
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                নতুন কোর্স এবং প্রমোশন সম্পর্কে আপডেট পেতে আমাদের নিউজলেটার সাবস্ক্রাইব করুন
              </p>
              <Link href="/courses/free-trial">
                <button className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                  ফ্রি ট্রায়াল নিন <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          </div>
          
          {/* Content */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            {activeCourse && (
              <div>
                <div className="relative h-48 sm:h-60 md:h-72">
                  <Image 
                    src={activeCourse.imageSrc}
                    alt={activeCourse.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                    <span className={`px-3 py-1 rounded-full text-xs text-white bg-gradient-to-r ${activeCourse.color} inline-block mb-2`}>
                      {activeCourse.count} টি কোর্স
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                      {activeCourse.name}
                    </h2>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {activeCourse.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">কোর্স ফরম্যাট</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">রেকর্ডেড + লাইভ সেশন</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">গড় কোর্স দৈর্ঘ্য</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">৮-১২ সপ্তাহ</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">সার্টিফিকেশন</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">কোর্স শেষে সার্টিফিকেট</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">ডিভাইস সাপোর্ট</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">মোবাইল, টেবলেট, ডেস্কটপ</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between gap-3">
                    <Link href={`/courses/category/${activeCourse.id}`} className="inline-flex">
                      <button className={`px-4 py-2 bg-gradient-to-r ${activeCourse.color} text-white rounded-lg text-sm flex items-center gap-2`}>
                        সকল {activeCourse.name} দেখুন <ChevronRight className="w-4 h-4" />
                      </button>
                    </Link>
                    <Link href={`/courses/demo/${activeCourse.id}`} className="inline-flex">
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
                        ফ্রি ডেমো দেখুন
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 