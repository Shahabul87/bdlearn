"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Book, FileText, Video, Globe } from "lucide-react";
import { useLanguage, LanguageText } from "./language-provider";

export function EducationalResources() {
  const { language } = useLanguage();

  const resources = [
    {
      id: "textbooks",
      titleBn: "ডিজিটাল পাঠ্যবই",
      titleEn: "Digital Textbooks",
      descriptionBn: "সকল শ্রেণির জন্য NCTB অনুমোদিত ডিজিটাল পাঠ্যবই",
      descriptionEn: "NCTB approved digital textbooks for all classes",
      icon: Book,
      image: "/images/resource-textbooks.jpg",
      fallbackBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
      path: "/school/resources/textbooks"
    },
    {
      id: "worksheets",
      titleBn: "ওয়ার্কশিট ও অভ্যাস",
      titleEn: "Worksheets & Practice",
      descriptionBn: "বিষয়ভিত্তিক অনুশীলনী ও মূল্যায়ন সামগ্রী",
      descriptionEn: "Subject-wise practice and assessment materials",
      icon: FileText,
      image: "/images/resource-worksheets.jpg",
      fallbackBg: "bg-gradient-to-br from-green-500 to-teal-600",
      path: "/school/resources/worksheets"
    },
    {
      id: "videos",
      titleBn: "শিক্ষামূলক ভিডিও",
      titleEn: "Educational Videos",
      descriptionBn: "বিষয় ভিত্তিক অডিও-ভিজ্যুয়াল শিক্ষামূলক সামগ্রী",
      descriptionEn: "Subject-wise audio-visual learning materials",
      icon: Video,
      image: "/images/resource-videos.jpg",
      fallbackBg: "bg-gradient-to-br from-purple-500 to-pink-600",
      path: "/school/resources/videos"
    },
    {
      id: "interactive",
      titleBn: "ইন্টারেক্টিভ লার্নিং",
      titleEn: "Interactive Learning",
      descriptionBn: "সক্রিয় অংশগ্রহণমূলক শিক্ষা উপকরণ",
      descriptionEn: "Participatory learning tools and resources",
      icon: Globe,
      image: "/images/resource-interactive.jpg",
      fallbackBg: "bg-gradient-to-br from-amber-500 to-red-600",
      path: "/school/resources/interactive"
    }
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            <LanguageText bn="শিক্ষা সম্পদ" en="Educational Resources" />
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            <LanguageText 
              bn="সকল স্তরের শিক্ষার্থীদের জন্য নির্বাচিত শিক্ষা উপকরণ"
              en="Curated learning materials for students of all levels"
            />
          </p>
        </div>
        <Link 
          href="/school/resources" 
          className="flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
        >
          <LanguageText bn="সব দেখুন" en="View all" />
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {resources.map((resource) => (
          <motion.div 
            key={resource.id} 
            variants={itemVariants}
            className="group" 
          >
            <Link href={resource.path}>
              <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                <div className="relative h-36">
                  <Image
                    src={resource.image}
                    alt={language === "bn" ? resource.titleBn : resource.titleEn}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                    onError={(e) => {
                      // If image fails to load, show gradient background
                      const target = e.currentTarget.parentElement;
                      if (target) {
                        const classes = resource.fallbackBg.split(' ');
                        classes.forEach(cls => target.classList.add(cls));
                      }
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2 left-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80">
                    <resource.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {language === "bn" ? resource.titleBn : resource.titleEn}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {language === "bn" ? resource.descriptionBn : resource.descriptionEn}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 