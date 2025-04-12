"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Calculator, FileText, Lightbulb, BookOpen, 
  User, Layers, ChevronsRight, Download
} from "lucide-react";

const resources = [
  {
    id: 1,
    title: "HSC পরীক্ষা প্রস্তুতি প্যাকেজ",
    description: "সকল বিষয়ের চূড়ান্ত প্রস্তুতি, সাজেশন এবং মডেল টেস্ট",
    category: "নোট",
    icon: FileText,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    downloads: 2580,
    image: "/images/exam-prep.jpg",
    href: "/resources/hsc-preparation"
  },
  {
    id: 2,
    title: "ভিশন কলেজ ক্যালকুলাস - গণিত ১ম পত্র",
    description: "ক্যালকুলাস অধ্যায়ের সম্পূর্ণ ধারণা ও সমাধান",
    category: "ম্যাথ",
    icon: Calculator,
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    downloads: 1854,
    image: "/images/math-calculus.jpg",
    href: "/resources/math-calculus"
  },
  {
    id: 3,
    title: "বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি গাইড",
    description: "বিশ্ববিদ্যালয়ে ভর্তির জন্য চূড়ান্ত প্রস্তুতি",
    category: "গাইড",
    icon: Lightbulb,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    downloads: 3241,
    image: "/images/university-guide.jpg",
    href: "/resources/university-admission"
  },
  {
    id: 4,
    title: "HSC ইংরেজি সাজেশন ২০২৪",
    description: "ইংরেজি ১ম ও ২য় পত্রের গুরুত্বপূর্ণ সাজেশন",
    category: "সাজেশন",
    icon: BookOpen,
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
    downloads: 4122,
    image: "/images/english-suggestion.jpg",
    href: "/resources/english-suggestion"
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function FeaturedResources() {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block px-3 sm:px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            জনপ্রিয় রিসোর্স
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            সর্বাধিক ডাউনলোড করা <span className="text-blue-600 dark:text-blue-400">শিক্ষা রিসোর্স</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            আমাদের শিক্ষার্থীদের মধ্যে সর্বাধিক জনপ্রিয় শিক্ষা উপকরণ - যা আপনার শিক্ষাকে আরও সহজ করবে
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
            >
              <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-md">
                  {resource.category}
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 sm:p-2 rounded-md ${resource.iconBg}`}>
                    <resource.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${resource.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg truncate">
                    {resource.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Download className="w-3.5 h-3.5" />
                    <span>{resource.downloads.toLocaleString()}</span>
                  </div>
                  <Link href={resource.href}>
                    <button className="flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                      ডাউনলোড করুন
                      <ChevronsRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8 md:mt-12">
          <Link href="/resources">
            <button className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 border-2 border-blue-600 dark:border-blue-500 rounded-lg text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors text-sm sm:text-base">
              সকল রিসোর্স দেখুন
              <ChevronsRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
} 