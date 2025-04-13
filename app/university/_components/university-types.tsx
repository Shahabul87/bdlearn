"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Building, GraduationCap, Award, Globe } from "lucide-react";

// University types data
const universityTypes = [
  {
    id: "public",
    name: "পাবলিক বিশ্ববিদ্যালয়",
    description: "বাংলাদেশের সরকারি বিশ্ববিদ্যালয়গুলি সম্পর্কে বিস্তারিত তথ্য, ভর্তি প্রক্রিয়া, বিভাগ, এবং ক্যারিয়ার সম্ভাবনা। এই বিশ্ববিদ্যালয়গুলিতে ভর্তি পরীক্ষার প্রস্তুতি, আবেদন প্রক্রিয়া এবং ক্যাম্পাস লাইফ সম্পর্কে জানুন।",
    icon: <Building className="w-5 h-5 sm:w-6 sm:h-6" />,
    imageSrc: "/images/public-university.webp",
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-50 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    count: 49,
  },
  {
    id: "private",
    name: "প্রাইভেট বিশ্ববিদ্যালয়",
    description: "বাংলাদেশের বেসরকারি বিশ্ববিদ্যালয়গুলি সম্পর্কে সম্পূর্ণ গাইড, টিউশন ফি, স্কলারশিপ, ক্রেডিট সিস্টেম, এবং এডমিশন প্রসেস। আন্তর্জাতিক স্বীকৃতি এবং যোগ্যতা অনুযায়ী বিশ্ববিদ্যালয় বেছে নেওয়ার টিপস।",
    icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
    imageSrc: "/images/private-university.webp",
    color: "from-purple-600 to-purple-700",
    bgColor: "bg-purple-50 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    count: 107,
  },
  {
    id: "medical",
    name: "মেডিকেল কলেজ",
    description: "বাংলাদেশের সরকারি ও বেসরকারি মেডিকেল কলেজগুলির তথ্য, MBBS ভর্তি পদ্ধতি, সিলেবাস, পরীক্ষা ব্যবস্থা, ইন্টার্নশিপ এবং পোস্ট-গ্র্যাজুয়েশন সম্ভাবনা সম্পর্কে সম্পূর্ণ গাইড।",
    icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />,
    imageSrc: "/images/medical-college.webp", 
    color: "from-red-600 to-rose-700",
    bgColor: "bg-red-50 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
    count: 36,
  },
  {
    id: "international",
    name: "আন্তর্জাতিক বিশ্ববিদ্যালয়",
    description: "বিদেশে পড়াশোনার জন্য স্কলারশিপ, আবেদন প্রক্রিয়া, ভিসা, IELTS/TOEFL প্রস্তুতি, এবং বিভিন্ন দেশের শিক্ষাব্যবস্থা সম্পর্কে তথ্য। দক্ষিণ এশিয়া, ইউরোপ, এবং আমেরিকার টপ বিশ্ববিদ্যালয়গুলি সম্পর্কে গাইড।",
    icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
    imageSrc: "/images/international-university.webp",
    color: "from-emerald-600 to-teal-700",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    count: 50,
  },
];

export default function UniversityTypes() {
  const [activeTab, setActiveTab] = useState("public");
  
  const activeUniversity = universityTypes.find(university => university.id === activeTab);
  
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 bg-clip-text text-transparent"
          >
            বিশ্ববিদ্যালয়ের প্রকারভেদ
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto"
          >
            আপনার লক্ষ্য অনুযায়ী বিভিন্ন ধরনের বিশ্ববিদ্যালয় সম্পর্কে জানুন এবং আপনার ক্যারিয়ার পথ বেছে নিন
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-start">
          {/* Tabs */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800/90 rounded-xl p-2 mb-4 md:mb-6 shadow-sm border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
              {universityTypes.map(university => (
                <button 
                  key={university.id}
                  onClick={() => setActiveTab(university.id)}
                  className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 flex items-center gap-2 sm:gap-3 mb-1 last:mb-0 
                    ${activeTab === university.id ? 
                      `bg-gray-50 dark:bg-gray-700/80 shadow-sm` : 
                      `hover:bg-gray-50 dark:hover:bg-gray-700/40`
                    }`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${university.bgColor} flex items-center justify-center ${university.iconColor} shadow-sm`}>
                    {university.icon}
                  </div>
                  <div>
                    <h3 className={`font-medium text-sm sm:text-base ${activeTab === university.id ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {university.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {university.count} টি প্রতিষ্ঠান
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
              className="bg-white dark:bg-gray-800/90 rounded-xl p-4 sm:p-5 border border-gray-100 dark:border-gray-700 shadow-sm backdrop-blur-sm"
            >
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                ভর্তি গাইড ডাউনলোড করুন
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                বিশ্ববিদ্যালয় ভর্তি পরীক্ষার সম্পূর্ণ গাইড এবং টিপস ফ্রি ডাউনলোড করুন
              </p>
              <Link href="/resources/admission-guide">
                <button className="w-full py-2 px-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
                  গাইড ডাউনলোড করুন <ChevronRight className="w-4 h-4" />
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
            className="md:col-span-2 bg-white dark:bg-gray-800/90 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
          >
            {activeUniversity && (
              <div>
                <div className="relative h-40 sm:h-52 md:h-64 lg:h-72">
                  <Image 
                    src={activeUniversity.imageSrc}
                    alt={activeUniversity.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs text-white bg-gradient-to-r ${activeUniversity.color} inline-block mb-1.5 shadow-sm`}>
                      {activeUniversity.count} টি প্রতিষ্ঠান
                    </span>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2 text-shadow">
                      {activeUniversity.name}
                    </h2>
                  </div>
                </div>
                
                <div className="p-4 sm:p-5 md:p-6">
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-5 md:mb-6">
                    {activeUniversity.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 md:mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-2.5 sm:p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600/30">
                      <h4 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm mb-1">ভর্তি প্রক্রিয়া</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">কেন্দ্রীয় / সরাসরি আবেদন</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-2.5 sm:p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600/30">
                      <h4 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm mb-1">ভর্তি সময়কাল</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">অক্টোবর - ডিসেম্বর</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-2.5 sm:p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600/30">
                      <h4 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm mb-1">যোগ্যতা</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">HSC/সমমান পাস</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-2.5 sm:p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600/30">
                      <h4 className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm mb-1">গড় খরচ</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">বিভাগ অনুযায়ী ভিন্ন</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3">
                    <Link href={`/university/${activeUniversity.id}`} className="inline-flex">
                      <button className={`w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r ${activeUniversity.color} text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow transition-shadow`}>
                        সকল {activeUniversity.name} দেখুন <ChevronRight className="w-4 h-4" />
                      </button>
                    </Link>
                    <Link href={`/resources/admission/${activeUniversity.id}`} className="inline-flex">
                      <button className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium flex items-center justify-center shadow-sm">
                        ভর্তি গাইড দেখুন
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