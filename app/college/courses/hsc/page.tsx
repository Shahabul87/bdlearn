"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Video,
  Users,
  Star,
  Clock,
  CheckCircle,
  Filter,
  Search
} from "lucide-react";

export default function HSCCoursePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState("all");
  
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/20"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-300/20 to-sky-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-cyan-300/20 to-blue-300/10 rounded-full blur-3xl"></div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  এইচএসসি <span className="text-teal-600 dark:text-teal-400">অনলাইন কোর্সসমূহ</span>
                </h1>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
                  ২০২৪ সালের এইচএসসি পরীক্ষার জন্য সম্পূর্ণ অনলাইন প্রস্তুতি নিন আমাদের অভিজ্ঞ শিক্ষকদের সাথে। সকল বিষয়ের মডেল টেস্ট এবং গাইডলাইন সহ।
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="#courses">
                      <div className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-lg shadow-teal-200 dark:shadow-teal-900/20 font-medium">
                        কোর্স দেখুন
                      </div>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="#features">
                      <div className="px-6 py-3 bg-white dark:bg-gray-800 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-gray-750 rounded-lg shadow-md font-medium">
                        বৈশিষ্ট্য দেখুন
                      </div>
                    </Link>
                  </motion.div>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-8 justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    <span className="text-gray-700 dark:text-gray-300">১৫,০০০+ শিক্ষার্থী</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    <span className="text-gray-700 dark:text-gray-300">৪.৮/৫ রেটিং</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    <span className="text-gray-700 dark:text-gray-300">৫০+ কোর্স</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full md:w-1/2"
            >
              <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hsc-students.jpg"
                  alt="HSC Students"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Floating elements */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-3 max-w-[160px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-teal-100 dark:bg-teal-900/30 rounded-md">
                      <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      শুরু করুন আজই
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    HSC পরীক্ষা আর মাত্র কয়েক মাস বাকি
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              কেন আমাদের <span className="text-teal-600 dark:text-teal-400">কোর্স</span> বেছে নিবেন?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              আমাদের HSC কোর্সগুলো আপনাকে সাহায্য করবে পরীক্ষায় সেরা ফলাফল করতে এবং আপনার ক্যারিয়ার পথে এগিয়ে যেতে
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Course Search & Filter Section */}
      <section id="courses" className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              এইচএসসি <span className="text-teal-600 dark:text-teal-400">কোর্সসমূহ</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              আপনার পছন্দের বিষয় অনুযায়ী কোর্স বেছে নিন এবং আপনার পড়াশোনা শুরু করুন
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="কোর্স খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  <span className="text-gray-700 dark:text-gray-300 hidden sm:inline">ফিল্টার করুন:</span>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeSubject === subject.id
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveSubject(subject.id)}
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Course List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter(course => activeSubject === 'all' || course.subject === activeSubject)
              .filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-teal-600 text-white text-xs font-medium rounded">
                      {subjects.find(s => s.id === course.subject)?.name}
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 dark:bg-gray-800/90 rounded text-amber-500 text-xs font-medium">
                      <Star className="w-3 h-3 fill-current" />
                      {course.rating}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                        <span className="text-gray-700 dark:text-gray-300">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                        <Users className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                        <span className="text-gray-700 dark:text-gray-300">{course.students}+ শিক্ষার্থী</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="font-bold text-teal-600 dark:text-teal-400">
                        {course.price === 0 ? 'ফ্রি' : `৳${course.price}`}
                      </div>
                      <Link href={`/college/courses/hsc/${course.id}`}>
                        <div className="px-3 py-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-lg text-sm font-medium hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors">
                          বিস্তারিত দেখুন
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">আজই শুরু করুন আপনার HSC প্রস্তুতি</h2>
          <p className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
            আমাদের বিশেষজ্ঞ শিক্ষকদের সাথে আপনার পড়াশোনা আরও উন্নত করুন এবং HSC পরীক্ষায় সেরা ফলাফল অর্জন করুন।
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link href="/signup">
              <div className="px-6 py-3 bg-white text-teal-700 rounded-lg shadow-lg font-medium">
                এখনই রেজিস্ট্রেশন করুন
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Sample data
const features = [
  {
    icon: BookOpen,
    title: "বিশেষজ্ঞ শিক্ষকদের পাঠদান",
    description: "দেশের সেরা এবং অভিজ্ঞ শিক্ষকদের দ্বারা প্রস্তুতকৃত পাঠ্যক্রম ও ভিডিও লেকচার।"
  },
  {
    icon: FileText,
    title: "সম্পূর্ণ নোট ও সাজেশন",
    description: "HSC পরীক্ষার জন্য প্রয়োজনীয় সকল নোট, সাজেশন এবং গাইডলাইন।"
  },
  {
    icon: Video,
    title: "ইন্টারেক্টিভ ভিডিও ক্লাস",
    description: "প্রতিটি বিষয়ের জন্য ইন্টারেক্টিভ ভিডিও ক্লাস, যা আপনি যেকোনো সময় দেখতে পারবেন।"
  },
  {
    icon: CheckCircle,
    title: "মডেল টেস্ট",
    description: "নিয়মিত মডেল টেস্ট এবং পরীক্ষার মাধ্যমে আপনার প্রস্তুতি যাচাই করুন।"
  },
  {
    icon: Clock,
    title: "আজীবন অ্যাকসেস",
    description: "একবার কোর্সে এনরোল করলে, আপনি আজীবন এই কোর্সের কন্টেন্ট অ্যাকসেস করতে পারবেন।"
  },
  {
    icon: Users,
    title: "কমিউনিটি সাপোর্ট",
    description: "আমাদের বিশেষজ্ঞ টিম প্রতিদিন আপনার প্রশ্নের উত্তর দিতে প্রস্তুত।"
  },
];

const subjects = [
  { id: "all", name: "সকল বিষয়" },
  { id: "physics", name: "পদার্থবিজ্ঞান" },
  { id: "chemistry", name: "রসায়ন" },
  { id: "biology", name: "জীববিজ্ঞান" },
  { id: "mathematics", name: "গণিত" },
  { id: "bengali", name: "বাংলা" },
  { id: "english", name: "ইংরেজি" },
  { id: "ict", name: "আইসিটি" },
];

const courses = [
  {
    id: 1,
    title: "পদার্থবিজ্ঞান: সম্পূর্ণ HSC সিলেবাস কভারেজ",
    description: "HSC পদার্থবিজ্ঞান ১ম ও ২য় পত্রের সম্পূর্ণ সিলেবাস, সাথে মডেল টেস্ট ও সমাধান।",
    image: "/images/physics-course.jpg",
    subject: "physics",
    duration: "১৬ সপ্তাহ",
    students: 2500,
    price: 2500,
    rating: 4.8,
  },
  {
    id: 2,
    title: "রসায়ন মাস্টার কোর্স: HSC 2024",
    description: "HSC 2024 পরীক্ষার জন্য রসায়ন বিষয়ের নোট, সাজেশন, মডেল টেস্ট এবং গাইডলাইন।",
    image: "/images/chemistry-course.jpg",
    subject: "chemistry",
    duration: "১৪ সপ্তাহ",
    students: 1800,
    price: 2200,
    rating: 4.7,
  },
  {
    id: 3,
    title: "জীববিজ্ঞান - HSC Special",
    description: "HSC জীববিজ্ঞান ১ম ও ২য় পত্রের সম্পূর্ণ কোর্স, MCQ এবং লিখিত প্রস্তুতি।",
    image: "/images/biology-course.jpg",
    subject: "biology",
    duration: "১৫ সপ্তাহ",
    students: 2200,
    price: 2300,
    rating: 4.9,
  },
  {
    id: 4,
    title: "HSC গণিত সমাধান - উচ্চতর গণিত",
    description: "HSC উচ্চতর গণিত ১ম ও ২য় পত্রের সম্পূর্ণ সমাধান, ফর্মুলা এবং শর্টকাট টেকনিক।",
    image: "/images/math-course.jpg",
    subject: "mathematics",
    duration: "১৮ সপ্তাহ",
    students: 3000,
    price: 2800,
    rating: 4.6,
  },
  {
    id: 5,
    title: "বাংলা - HSC সাহিত্য ও ভাষা কোর্স",
    description: "বাংলা ১ম পত্র (সাহিত্য) এবং ২য় পত্র (ভাষা) এর সম্পূর্ণ প্রস্তুতি কোর্স।",
    image: "/images/bangla-course.jpg",
    subject: "bengali",
    duration: "১২ সপ্তাহ",
    students: 1500,
    price: 1800,
    rating: 4.5,
  },
  {
    id: 6,
    title: "ইংরেজি - HSC English Preparation",
    description: "HSC English 1st & 2nd Paper Complete Course with Grammar and Writing Skills.",
    image: "/images/english-course.jpg",
    subject: "english",
    duration: "১০ সপ্তাহ",
    students: 2800,
    price: 2000,
    rating: 4.7,
  },
  {
    id: 7,
    title: "আইসিটি - HSC ICT Complete Course",
    description: "HSC ICT বিষয়ের সম্পূর্ণ কোর্স, প্র্যাকটিক্যাল এবং থিওরি পার্ট সহ।",
    image: "/images/ict-course.jpg",
    subject: "ict",
    duration: "৮ সপ্তাহ",
    students: 2100,
    price: 1500,
    rating: 4.8,
  },
  {
    id: 8,
    title: "HSC পদার্থবিজ্ঞান - বেসিক থেকে এডভান্সড",
    description: "HSC পদার্থবিজ্ঞানের মৌলিক ধারণা থেকে উন্নত পর্যায় পর্যন্ত সম্পূর্ণ কোর্স।",
    image: "/images/advanced-physics.jpg",
    subject: "physics",
    duration: "২০ সপ্তাহ",
    students: 1800,
    price: 3000,
    rating: 4.9,
  },
  {
    id: 9,
    title: "রসায়ন - অরগানিক রসায়ন মাস্টারিং",
    description: "HSC রসায়নের অরগানিক অংশের বিশেষ কোর্স, জটিল রিয়াকশন মেকানিজম সহ।",
    image: "/images/organic-chemistry.jpg",
    subject: "chemistry",
    duration: "১০ সপ্তাহ",
    students: 1200,
    price: 1800,
    rating: 4.6,
  },
]; 