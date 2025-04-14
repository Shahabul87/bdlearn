"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "./language-provider";
import Image from "next/image";
import Link from "next/link";

export function WelcomeBanner() {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.5),rgba(255,255,255,0.0))]" />
      <div className="relative px-6 py-8 md:px-8 md:py-12 flex flex-col md:flex-row items-center">
        <div className="flex-1 mb-6 md:mb-0 md:mr-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-white mb-3"
          >
            {language === "bn" 
              ? "বাংলাদেশ শিক্ষা পোর্টালে স্বাগতম" 
              : "Welcome to Bangladesh Education Portal"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-blue-100 text-base md:text-lg mb-6"
          >
            {language === "bn" 
              ? "সকল শিক্ষা সংক্রান্ত তথ্য, সম্পদ এবং সেবা এক জায়গায়। শিক্ষার সকল স্তরে সহজ অ্যাক্সেস এবং সুবিধার জন্য আমাদের পোর্টাল ব্যবহার করুন।" 
              : "All educational information, resources, and services in one place. Use our portal for easy access and convenience across all levels of education."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              href="/school/explore" 
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {language === "bn" ? "অন্বেষণ করুন" : "Explore Now"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
        <motion.div 
          className="flex-shrink-0 w-full md:w-1/3 max-w-[280px]"
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/images/education-illustration.svg" 
            alt={language === "bn" ? "শিক্ষা চিত্রণ" : "Education Illustration"} 
            width={300} 
            height={250}
            className="w-full h-auto"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>
      </div>
    </section>
  );
} 