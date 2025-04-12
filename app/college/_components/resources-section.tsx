"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, FileText, Video, Download, CheckCircle } from "lucide-react";

export default function ResourcesSection() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="inline-block px-3 sm:px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium mb-4">
              আপনার পরীক্ষার প্রস্তুতি
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              হারিয়ে যান <span className="text-blue-600 dark:text-blue-400">শিক্ষার বিশ্বে</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
              আমাদের প্লাটফর্মে HSC পরীক্ষার জন্য যে সকল রিসোর্স পাবেনঃ
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-base sm:text-lg">বিষয়ভিত্তিক নোট</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">সকল বিষয়ের গুরুত্বপূর্ণ অধ্যায় ভিত্তিক নোট</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-base sm:text-lg">মডেল টেস্ট</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">HSC পরীক্ষার পূর্ণাঙ্গ মডেল টেস্ট ও উত্তরমালা</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-base sm:text-lg">ভিডিও লেকচার</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">দেশের সেরা শিক্ষকদের ভিডিও ক্লাস</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-base sm:text-lg">ক্যারিয়ার গাইডেন্স</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">বিশ্ববিদ্যালয় ভর্তি ও ক্যারিয়ার পরামর্শ</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link href="/resources/notes">
                <button className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  নোট ডাউনলোড করুন
                </button>
              </Link>
              <Link href="/resources/video-lectures">
                <button className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors text-sm sm:text-base">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                  ভিডিও লেকচার দেখুন
                </button>
              </Link>
            </div>

            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-lg">
              <div className="flex items-start gap-2 sm:gap-3">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 text-sm sm:text-base">ফ্রি ডাউনলোড করুন</h3>
                  <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400">HSC'২৪ পরীক্ষার সাজেশন ও মডেল টেস্ট প্যাকেজ</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl">
              <Image 
                src="/images/students-studying.jpg" 
                alt="কলেজ শিক্ষার্থীরা অধ্যয়নরত" 
                fill
                className="object-cover"
              />
              
              {/* Floating elements */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 p-3 sm:p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg max-w-[150px] sm:max-w-[200px]">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">নোট</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">সকল বিষয়ের</p>
                  </div>
                </div>
                <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-3/4 bg-blue-600"></div>
                </div>
                <p className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">৩০০+ নোট</p>
              </div>
              
              <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 p-3 sm:p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg max-w-[150px] sm:max-w-[200px]">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md">
                    <Video className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">ভিডিও</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">আকর্ষণীয় ক্লাস</p>
                  </div>
                </div>
                <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-2/3 bg-purple-600"></div>
                </div>
                <p className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">৫০০+ ভিডিও</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-20 h-20 sm:w-32 sm:h-32 bg-blue-500 rounded-full opacity-20 blur-2xl sm:blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 sm:w-32 sm:h-32 bg-purple-500 rounded-full opacity-20 blur-2xl sm:blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 