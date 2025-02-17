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
  GraduationCap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Pencil,
    title: "Design Your Own Courses",
    description: "Create your courses and build up your skills on your own",
  },
  {
    icon: Share2,
    title: "Share Your Resources",
    description: "Share your courses with others to help them grow and save their time",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Monitor your learning journey and celebrate achievements",
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

export default function HomeHeroSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div 
      ref={sectionRef} 
      className="relative overflow-hidden bg-white dark:bg-gray-900 min-h-[calc(100vh-80px)] flex items-center justify-center pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-0">
        <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white text-center px-4 mt-4 md:mt-0"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <span className="text-purple-600 dark:text-purple-400">Learn</span> Together,{" "}
            <span className="text-purple-600 dark:text-purple-400">Grow</span> Together
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto text-center px-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={subtitleVariants}
          >
            Join our collaborative learning platform and connect with students worldwide.
            Share knowledge, exchange ideas, and achieve your academic goals together.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={buttonVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 mb-12 md:mb-16 lg:mb-20"
          >
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/groups" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20"
              >
                Find Study Groups
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 w-full px-4 lg:mt-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                custom={index}
                variants={featureVariants}
                className="relative rounded-2xl bg-white dark:bg-gray-800 p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="absolute -top-4 left-4 inline-block rounded-lg bg-purple-600 p-3">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
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
    </div>
  );
}
