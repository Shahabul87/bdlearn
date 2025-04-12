"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, Users, ChevronsRight, Globe } from "lucide-react";

// Sample events data
const events = [
  {
    id: 1,
    title: "বিশ্ববিদ্যালয় ভর্তি সেমিনার ২০২৪",
    image: "/images/event-university.jpg",
    date: "২৫ জুন, ২০২৪",
    time: "সকাল ১০:০০ - দুপুর ১:০০",
    location: "ধানমন্ডি, ঢাকা",
    category: "সেমিনার",
    attendees: 350,
    isOnline: false,
    description: "বিশ্ববিদ্যালয় ভর্তি পরীক্ষার প্রস্তুতি, বিষয় নির্বাচন এবং ক্যারিয়ার পরিকল্পনা সম্পর্কে বিশেষজ্ঞদের পরামর্শ",
    href: "/events/university-admission-seminar"
  },
  {
    id: 2,
    title: "HSC পরীক্ষার্থীদের জন্য মডেল টেস্ট প্রোগ্রাম",
    image: "/images/event-model-test.jpg",
    date: "১০-১৫ জুলাই, ২০২৪",
    time: "সকাল ৯:০০ - দুপুর ১২:০০",
    location: "অনলাইন",
    category: "পরীক্ষা",
    attendees: 1200,
    isOnline: true,
    description: "HSC পরীক্ষার আগে সকল বিষয়ের সাধারণ জ্ঞান যাচাই এবং মডেল টেস্ট অনুষ্ঠিত হবে",
    href: "/events/hsc-model-test"
  },
  {
    id: 3,
    title: "বৃত্তি পরীক্ষা প্রস্তুতি ওয়ার্কশপ",
    image: "/images/event-scholarship.jpg",
    date: "৫ জুলাই, ২০২৪",
    time: "বিকাল ৩:০০ - সন্ধ্যা ৬:০০",
    location: "মিরপুর, ঢাকা",
    category: "ওয়ার্কশপ",
    attendees: 200,
    isOnline: false,
    description: "বিভিন্ন প্রকার বৃত্তি পরীক্ষার জন্য প্রস্তুতি, আবেদন প্রক্রিয়া এবং কৌশল সম্পর্কে বিস্তারিত আলোচনা",
    href: "/events/scholarship-workshop"
  },
  {
    id: 4,
    title: "ডিজিটাল মার্কেটিং ক্যারিয়ার সেমিনার",
    image: "/images/event-digital-marketing.jpg",
    date: "১২ জুলাই, ২০২৪",
    time: "সন্ধ্যা ৭:০০ - রাত ৯:০০",
    location: "অনলাইন",
    category: "ক্যারিয়ার",
    attendees: 500,
    isOnline: true,
    description: "ডিজিটাল মার্কেটিং ক্যারিয়ার সম্পর্কে জানুন, এই সেক্টরে কীভাবে কাজ শুরু করবেন এবং স্কিল ডেভেলপমেন্ট প্রসেস",
    href: "/events/digital-marketing-career"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

export default function UpcomingEvents() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => activeFilter === 'online' ? event.isOnline : !event.isOnline);

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 md:mb-12 gap-4 sm:gap-0">
          <div>
            <div className="inline-block px-3 sm:px-4 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              ইভেন্ট ক্যালেন্ডার
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              আসন্ন <span className="text-orange-600 dark:text-orange-400">শিক্ষামূলক ইভেন্টসমূহ</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              আপনার জ্ঞান বাড়ানোর জন্য এবং নেটওয়ার্কিং করার জন্য এই ইভেন্টগুলোতে অংশগ্রহণ করুন
            </p>
          </div>
          
          <div className="flex space-x-2 self-start sm:self-auto">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              সকল
            </button>
            <button 
              onClick={() => setActiveFilter('physical')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'physical' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              অফলাইন
            </button>
            <button 
              onClick={() => setActiveFilter('online')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'online' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              অনলাইন
            </button>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <Link href={event.href} className="block">
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-md">
                    {event.category}
                  </div>
                  {event.isOnline && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium bg-blue-100/90 dark:bg-blue-900/90 backdrop-blur-sm text-blue-800 dark:text-blue-200 rounded-md flex items-center gap-1.5">
                      <Globe className="w-3 h-3" />
                      অনলাইন
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4 sm:p-5">
                <Link href={event.href}>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-3 hover:text-orange-600 dark:hover:text-orange-400 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                </Link>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <CalendarDays className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>{event.attendees} জন</span>
                  </div>
                  
                  <Link href={event.href}>
                    <motion.span 
                      className="flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      বিস্তারিত
                      <ChevronsRight className="w-3.5 h-3.5" />
                    </motion.span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10 md:mt-14">
          <Link href="/events">
            <motion.button 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-lg shadow-sm text-base font-medium transition-colors"
            >
              সকল ইভেন্ট দেখুন
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
} 