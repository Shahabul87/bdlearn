"use client"

import { motion } from "framer-motion";
import { ArrowRight, Users, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Users,
    title: "Join Study Groups",
    description: "Connect with peers who share your academic interests",
  },
  {
    icon: BookOpen,
    title: "Share Resources",
    description: "Exchange study materials and learning resources",
  },
  {
    icon: Calendar,
    title: "Schedule Sessions",
    description: "Organize and participate in group study sessions",
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
      className="relative overflow-hidden bg-white dark:bg-gray-900 min-h-[calc(100vh-80px)] flex items-center justify-center sm:py-24 pt-24 sm:pt-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <span className="text-purple-600 dark:text-purple-400">Learn</span> Together,{" "}
            <span className="text-purple-600 dark:text-purple-400">Grow</span> Together
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
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
            className="flex items-center justify-center gap-4"
          >
            <Link href="/auth/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/groups">
              <Button 
                size="lg" 
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20"
              >
                Find Study Groups
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                custom={index}
                variants={featureVariants}
                className="relative rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg hover:shadow-xl transition-shadow"
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
