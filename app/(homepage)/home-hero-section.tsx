"use client"

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Users, 
  BookOpen, 
  Calendar, 
  Pencil, 
  Share2, 
  BarChart3, 
  GraduationCap,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const features = [
  {
    icon: BookOpen,
    title: "স্ট্রাকচার্ড লার্নিং",
    description: "বাংলা ভাষা শেখার জন্য পেশাদার পাঠ্যক্রম এবং সাজানো শিক্ষা পদ্ধতি",
  },
  {
    icon: GraduationCap,
    title: "অভিজ্ঞ শিক্ষক",
    description: "মাতৃভাষী শিক্ষকদের সাথে ইন্টারেক্টিভ ক্লাস এবং উচ্চমানের শিক্ষাদান",
  },
  {
    icon: BarChart3,
    title: "অগ্রগতি পর্যবেক্ষণ",
    description: "আপনার শিক্ষা যাত্রা ট্র্যাক করুন এবং নিয়মিত মূল্যায়ন পান",
  },
];

// Animation variants
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: 0.4,
      ease: "easeOut"
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.6 + index * 0.1,
      ease: "easeOut"
    }
  })
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.3,
      ease: "easeOut"
    }
  }
};

export default function HomeHeroSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div 
      ref={sectionRef} 
      className="relative overflow-hidden bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-[calc(100vh-80px)] flex items-center justify-center pt-16"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-purple-300 dark:bg-purple-600 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-indigo-300 dark:bg-indigo-600 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex flex-col items-start justify-center space-y-6 md:space-y-8 md:w-1/2">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white text-left"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={titleVariants}
            >
              <span className="text-purple-600 dark:text-purple-400">বাংলা</span> শিখুন,{" "}
              <span className="text-purple-600 dark:text-purple-400">বাংলাদেশ</span> জানুন
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-xl text-left"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={subtitleVariants}
            >
              বিডিলার্ন-এ আপনাকে স্বাগতম - বাংলা ভাষা ও সংস্কৃতি শেখার সেরা অনলাইন প্লাটফর্ম। 
              আমাদের অভিজ্ঞ শিক্ষকদের সাথে বাংলা ভাষার দক্ষতা অর্জন করুন।
            </motion.p>

            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={buttonVariants}
              className="flex flex-col sm:flex-row items-center justify-start gap-4 w-full mb-8"
            >
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto font-semibold">
                  শুরু করুন
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20 font-semibold"
                >
                  কোর্স দেখুন
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={subtitleVariants}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <Globe className="h-4 w-4 text-purple-500 dark:text-purple-400" />
              <span>১০,০০০+ শিক্ষার্থী বিশ্বব্যাপী</span>
            </motion.div>
          </div>
          
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageVariants}
          >
            <div className="relative w-full max-w-lg h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Replace with your actual image */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 z-10 rounded-2xl"></div>
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {/* Placeholder - replace with your actual Image component */}
                <BookOpen className="h-16 w-16 text-purple-600/50 dark:text-purple-400/50" />
                <span className="sr-only">বাংলা শিক্ষার ছবি</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full px-0 mt-16 md:mt-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              variants={featureVariants}
              className="relative rounded-2xl bg-white dark:bg-gray-800 p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="inline-block rounded-lg bg-purple-100 dark:bg-purple-900/30 p-3 mb-4">
                <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
