"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Clock, ChevronsRight, Tag } from "lucide-react";

// Sample news data
const newsItems = [
  {
    id: 1,
    title: "HSC পরীক্ষা ২০২৪: প্রশ্নপত্র ফরম্যাট ও প্রস্তুতি নির্দেশিকা",
    excerpt: "HSC পরীক্ষার্থীদের জন্য প্রশ্নপত্রের নতুন ফরম্যাট এবং সঠিক প্রস্তুতি নেওয়ার জন্য বিস্তারিত নির্দেশিকা",
    date: "১৫ জুন, ২০২৪",
    readTime: "৫ মিনিট",
    category: "পরীক্ষা",
    image: "/images/news-exam.jpg",
    href: "/news/hsc-exam-2024"
  },
  {
    id: 2,
    title: "অনলাইন শিক্ষা সম্মেলন ২০২৪: ডিজিটাল শিক্ষার নতুন দিগন্ত",
    excerpt: "আসন্ন অনলাইন শিক্ষা সম্মেলনে কীভাবে অংশগ্রহণ করবেন এবং এই সম্মেলন থেকে কী কী জ্ঞান অর্জন করতে পারবেন",
    date: "১০ জুন, ২০২৪",
    readTime: "৪ মিনিট",
    category: "সম্মেলন",
    image: "/images/news-conference.jpg",
    href: "/news/education-conference-2024"
  },
  {
    id: 3,
    title: "বিশ্ববিদ্যালয় ভর্তি পরীক্ষার নতুন নিয়ম: যা জানা জরুরি",
    excerpt: "২০২৪ সালের বিশ্ববিদ্যালয় ভর্তি পরীক্ষার নতুন নিয়ম এবং প্রক্রিয়া সম্পর্কে বিস্তারিত জানুন",
    date: "৫ জুন, ২০২৪",
    readTime: "৬ মিনিট",
    category: "ভর্তি",
    image: "/images/news-admission.jpg",
    href: "/news/university-admission-rules"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function NewsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 md:mb-12 gap-4 sm:gap-0">
          <div>
            <div className="inline-block px-3 sm:px-4 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              নিউজ ও আপডেট
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              সর্বশেষ <span className="text-teal-600 dark:text-teal-400">শিক্ষা সংক্রান্ত খবর</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              পরীক্ষা, ভর্তি এবং কলেজ শিক্ষা সম্পর্কিত সর্বশেষ তথ্য ও আপডেট পেতে সাথে থাকুন
            </p>
          </div>
          <Link href="/news">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 border-2 border-teal-600 dark:border-teal-500 text-teal-600 dark:text-teal-400 rounded-lg font-medium hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors text-sm sm:text-base self-start sm:self-auto"
            >
              সব খবর দেখুন
              <ChevronsRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {newsItems.map((news) => (
            <motion.div
              key={news.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(news.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <Link href={news.href} className="block">
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className={`object-cover transition-transform duration-500 ${
                      hoveredId === news.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-md flex items-center gap-1.5">
                    <Tag className="w-3 h-3" />
                    {news.category}
                  </div>
                </div>
              </Link>

              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{news.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{news.readTime}</span>
                  </div>
                </div>

                <Link href={news.href}>
                  <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    {news.title}
                  </h3>
                </Link>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {news.excerpt}
                </p>

                <Link href={news.href}>
                  <motion.span 
                    className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    বিস্তারিত পড়ুন
                    <ChevronsRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter signup */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 p-6 sm:p-8 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-2xl border border-teal-100 dark:border-teal-800/50 shadow-md"
        >
          <div className="grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-3">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                আমাদের নিউজলেটার সাবস্ক্রাইব করুন
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                শিক্ষা সম্পর্কিত সর্বশেষ আপডেট, টিপস এবং বিশেষ অফার সরাসরি আপনার ইনবক্সে পেতে রেজিস্ট্রেশন করুন
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="আপনার ইমেইল দিন"
                  className="px-4 py-2 sm:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                />
                <motion.button 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.98 }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white rounded-lg font-medium"
                >
                  সাবস্ক্রাইব
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                সাইন আপ করার মাধ্যমে আপনি আমাদের প্রাইভেসি পলিসি মেনে নিচ্ছেন
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 