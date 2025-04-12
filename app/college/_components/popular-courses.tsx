"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, Star, ArrowRight } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "HSC পদার্থবিজ্ঞান",
    instructor: "ড. আনিসুর রহমান",
    students: "৩,২৫০",
    rating: "৪.৯",
    hours: "৩৬",
    image: "/images/physics-course.jpg",
    category: "বিজ্ঞান",
    href: "/courses/college/physics",
  },
  {
    id: 2,
    title: "HSC উচ্চতর গণিত",
    instructor: "মোঃ কামরুজ্জামান",
    students: "২,৮০০",
    rating: "৪.৮",
    hours: "৪২",
    image: "/images/math-course.jpg",
    category: "বিজ্ঞান",
    href: "/courses/college/mathematics",
  },
  {
    id: 3,
    title: "HSC ইংরেজি দ্বিতীয় পত্র",
    instructor: "জাহিদ হাসান",
    students: "৩,৭৫০",
    rating: "৪.৭",
    hours: "৩০",
    image: "/images/english-course.jpg",
    category: "ইংরেজি",
    href: "/courses/college/english",
  },
  {
    id: 4,
    title: "HSC বাংলা প্রথম পত্র",
    instructor: "শামীমা নাসরিন",
    students: "২,৫০০",
    rating: "৪.৮",
    hours: "২৮",
    image: "/images/bangla-course.jpg",
    category: "বাংলা",
    href: "/courses/college/bangla",
  },
];

export default function PopularCourses() {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 md:mb-12 gap-4 sm:gap-0">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
              জনপ্রিয় কোর্স সমূহ
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              HSC পরীক্ষার প্রস্তুতির জন্য সেরা কোর্স সমূহ এখানে আছে
            </p>
          </div>
          <Link 
            href="/courses/college"
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:underline self-start sm:self-auto"
          >
            সব কোর্স দেখুন <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-40 sm:h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {course.category}
                </div>
              </div>
              
              <div className="p-4 sm:p-5">
                <Link href={course.href}>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {course.instructor}
                </p>
                
                <div className="flex items-center justify-between mb-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{course.hours} ঘন্টা</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                    <span className="text-gray-600 dark:text-gray-400">{course.rating}</span>
                  </div>
                </div>
                
                <Link href={course.href}>
                  <button className="w-full py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm sm:text-base">
                    বিস্তারিত দেখুন
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 