"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useLanguage, LanguageText } from "./language-provider";

// Event interface
interface Event {
  id: string;
  titleEn: string;
  titleBn: string;
  dateEn: string;
  dateBn: string;
  timeEn: string;
  timeBn: string;
  locationEn: string;
  locationBn: string;
  type: "academic" | "cultural" | "sports" | "workshop";
  path: string;
}

export function UpcomingEvents() {
  const { language } = useLanguage();
  
  // Sample events data
  const events: Event[] = [
    {
      id: "evt1",
      titleEn: "Annual Science Fair",
      titleBn: "বার্ষিক বিজ্ঞান মেলা",
      dateEn: "November 15, 2023",
      dateBn: "১৫ নভেম্বর, ২০২৩",
      timeEn: "10:00 AM - 4:00 PM",
      timeBn: "সকাল ১০:০০ - বিকাল ৪:০০",
      locationEn: "School Main Hall",
      locationBn: "স্কুল প্রধান হল",
      type: "academic",
      path: "/school/events/science-fair"
    },
    {
      id: "evt2",
      titleEn: "Annual Sports Day",
      titleBn: "বার্ষিক খেলাধুলা দিবস",
      dateEn: "December 5, 2023",
      dateBn: "৫ ডিসেম্বর, ২০২৩",
      timeEn: "9:00 AM - 5:00 PM",
      timeBn: "সকাল ৯:০০ - বিকাল ৫:০০",
      locationEn: "School Playground",
      locationBn: "স্কুল খেলার মাঠ",
      type: "sports",
      path: "/school/events/sports-day"
    },
    {
      id: "evt3",
      titleEn: "Cultural Program",
      titleBn: "সাংস্কৃতিক অনুষ্ঠান",
      dateEn: "November 25, 2023",
      dateBn: "২৫ নভেম্বর, ২০২৩",
      timeEn: "3:00 PM - 7:00 PM",
      timeBn: "বিকাল ৩:০০ - সন্ধ্যা ৭:০০",
      locationEn: "School Auditorium",
      locationBn: "স্কুল অডিটোরিয়াম",
      type: "cultural",
      path: "/school/events/cultural-program"
    },
    {
      id: "evt4",
      titleEn: "Career Guidance Workshop",
      titleBn: "ক্যারিয়ার গাইডেন্স ওয়ার্কশপ",
      dateEn: "December 10, 2023",
      dateBn: "১০ ডিসেম্বর, ২০২৩",
      timeEn: "11:00 AM - 1:00 PM",
      timeBn: "সকাল ১১:০০ - দুপুর ১:০০",
      locationEn: "Conference Room",
      locationBn: "কনফারেন্স রুম",
      type: "workshop",
      path: "/school/events/career-workshop"
    }
  ];

  // Get event type color
  const getEventTypeColor = (type: Event["type"]) => {
    switch(type) {
      case "academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "cultural":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "sports":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800";
      case "workshop":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    }
  };

  // Get event type label
  const getEventTypeLabel = (type: Event["type"]) => {
    switch(type) {
      case "academic":
        return language === "bn" ? "একাডেমিক" : "Academic";
      case "cultural":
        return language === "bn" ? "সাংস্কৃতিক" : "Cultural";
      case "sports":
        return language === "bn" ? "খেলাধুলা" : "Sports";
      case "workshop":
        return language === "bn" ? "ওয়ার্কশপ" : "Workshop";
    }
  };

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
    <section className="h-full">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            <LanguageText bn="আসন্ন অনুষ্ঠান" en="Upcoming Events" />
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            <LanguageText 
              bn="আগামী অনুষ্ঠান ও কার্যক্রমে যোগ দিন"
              en="Join upcoming events and activities"
            />
          </p>
        </div>
        <Link 
          href="/school/events" 
          className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <LanguageText bn="সব অনুষ্ঠান দেখুন" en="View all events" />
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {events.slice(0, 2).map((event) => (
          <motion.div 
            key={event.id} 
            variants={itemVariants}
            className="h-full"
          >
            <Link href={event.path} className="h-full">
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="mb-3">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded border ${getEventTypeColor(event.type)}`}>
                    {getEventTypeLabel(event.type)}
                  </span>
                </div>
                
                <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-3">
                  {language === "bn" ? event.titleBn : event.titleEn}
                </h3>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 flex-grow">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{language === "bn" ? event.dateBn : event.dateEn}</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{language === "bn" ? event.timeBn : event.timeEn}</span>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{language === "bn" ? event.locationBn : event.locationEn}</span>
                  </div>
                </div>
                
                <div className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                  <LanguageText bn="বিস্তারিত দেখুন" en="View details" />
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 