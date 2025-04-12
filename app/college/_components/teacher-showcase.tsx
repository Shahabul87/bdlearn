"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Award, Users, Clock } from "lucide-react";
import Link from "next/link";

// Define Teacher interface
interface Teacher {
  id: number;
  name: string;
  subject: string;
  image: string;
  education: string;
  rating: number;
  reviews: number;
  students: number;
  experience: string;
  badges: string[];
  href: string;
}

// Sample teacher data
const teachers = [
  {
    id: 1,
    name: "ড. মীর মোহাম্মদ আলী",
    subject: "পদার্থবিজ্ঞান",
    image: "/images/teacher-1.jpg",
    education: "পিএইচডি ইন ফিজিক্স, ঢাকা বিশ্ববিদ্যালয়",
    rating: 4.9,
    reviews: 487,
    students: 12500,
    experience: "১০+ বছর",
    badges: ["সেরা শিক্ষক", "টপ কনট্রিবিউটর"],
    href: "/teachers/1"
  },
  {
    id: 2,
    name: "সাবরিনা আকতার",
    subject: "রসায়ন",
    image: "/images/teacher-2.jpg",
    education: "এমএস ইন কেমিস্ট্রি, জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
    rating: 4.8,
    reviews: 356,
    students: 9800,
    experience: "৮+ বছর",
    badges: ["বিশেষজ্ঞ শিক্ষক"],
    href: "/teachers/2"
  },
  {
    id: 3,
    name: "তানজিল হোসেন",
    subject: "গণিত",
    image: "/images/teacher-3.jpg",
    education: "এমএস ইন ম্যাথেমেটিক্স, বুয়েট",
    rating: 4.7,
    reviews: 412,
    students: 11200,
    experience: "৭+ বছর",
    badges: ["প্রিমিয়াম কন্টেন্ট ক্রিয়েটর"],
    href: "/teachers/3"
  },
  {
    id: 4,
    name: "প্রফেসর নুরুল ইসলাম",
    subject: "ব্যবসায় শিক্ষা",
    image: "/images/teacher-4.jpg",
    education: "এমবিএ, ঢাকা বিশ্ববিদ্যালয়",
    rating: 4.9,
    reviews: 298,
    students: 8700,
    experience: "১২+ বছর",
    badges: ["বিশেষজ্ঞ শিক্ষক"],
    href: "/teachers/4"
  },
  {
    id: 5,
    name: "শামীমা আকতার",
    subject: "জীববিজ্ঞান",
    image: "/images/teacher-5.jpg",
    education: "এমফিল ইন বায়োলজি, ঢাকা বিশ্ববিদ্যালয়",
    rating: 4.8,
    reviews: 321,
    students: 9500,
    experience: "৯+ বছর",
    badges: ["সেরা শিক্ষক"],
    href: "/teachers/5"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function TeacherShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const visibleTeachers = [];
  for (let i = 0; i < 3; i++) {
    visibleTeachers.push(teachers[(activeIndex + i) % teachers.length]);
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % teachers.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + teachers.length) % teachers.length);
  };

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            আমাদের শিক্ষকমণ্ডলী
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            <span className="text-purple-600 dark:text-purple-400">বিশেষজ্ঞ শিক্ষকদের</span> সাথে শিখুন
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            আমাদের অভিজ্ঞ ও যোগ্যতাসম্পন্ন শিক্ষকদের সাথে নিজের শিক্ষা যাত্রাকে করুন আরও ফলপ্রসূ
          </p>
        </div>

        {/* Desktop View - Multi-card display */}
        <div className="hidden md:block relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 relative"
          >
            {visibleTeachers.map((teacher, index) => (
              <TeacherCard key={`desktop-${teacher.id}-${index}`} teacher={teacher} />
            ))}
          </motion.div>

          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous teachers"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next teachers"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile View - Single card display */}
        <div className="md:hidden relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <TeacherCard key={`mobile-${visibleTeachers[0].id}`} teacher={visibleTeachers[0]} />
          </motion.div>

          {/* Mobile navigation buttons */}
          <div className="flex justify-center gap-2 mt-6">
            <button 
              onClick={prevSlide}
              className="w-9 h-9 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous teacher"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {teachers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full ${idx === activeIndex ? 'bg-purple-600 dark:bg-purple-400' : 'bg-gray-300 dark:bg-gray-600'}`}
                aria-label={`Go to teacher ${idx + 1}`}
              />
            ))}
            <button 
              onClick={nextSlide}
              className="w-9 h-9 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next teacher"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View all teachers button */}
        <div className="text-center mt-10 md:mt-14">
          <Link href="/teachers">
            <button className="px-5 sm:px-7 py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg shadow-sm text-sm sm:text-base font-medium transition-colors">
              সকল শিক্ষকদের দেখুন
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TeacherCard({ teacher }: { teacher: { 
  id: number;
  name: string;
  subject: string;
  image: string;
  education: string;
  rating: number;
  reviews: number;
  students: number;
  experience: string;
  badges: string[];
  href: string; 
} }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        {/* Teacher image */}
        <div className="relative h-64 bg-gradient-to-b from-purple-100 to-white dark:from-purple-900/30 dark:to-gray-800">
          <Image
            src={teacher.image}
            alt={teacher.name}
            fill
            className="object-cover object-center"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {teacher.badges.map((badge, idx) => (
            <div 
              key={idx}
              className="px-2.5 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-xs font-medium text-purple-700 dark:text-purple-300 rounded-md shadow-sm border border-purple-100 dark:border-purple-800/50 flex items-center gap-1"
            >
              <Award className="w-3 h-3" />
              {badge}
            </div>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
          {teacher.name}
        </h3>
        
        <div className="text-purple-600 dark:text-purple-400 font-medium text-sm mb-2">
          {teacher.subject}
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          {teacher.education}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(teacher.rating) ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
                fill={i < Math.floor(teacher.rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {teacher.rating}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({teacher.reviews} রিভিউ)
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <Users className="w-3.5 h-3.5 text-gray-500 dark:text-gray-500" />
            <span>{teacher.students.toLocaleString()} শিক্ষার্থী</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <Clock className="w-3.5 h-3.5 text-gray-500 dark:text-gray-500" />
            <span>{teacher.experience} অভিজ্ঞতা</span>
          </div>
        </div>

        <Link href={teacher.href}>
          <button className="w-full py-2.5 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            প্রোফাইল দেখুন
          </button>
        </Link>
      </div>
    </motion.div>
  );
} 