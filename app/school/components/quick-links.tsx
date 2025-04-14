"use client";

import React from "react";
import Link from "next/link";
import { 
  CalendarDays, 
  Award, 
  BookOpen, 
  SquareUser, 
  FileBarChart, 
  Bell, 
  Users, 
  GraduationCap,
  ExternalLink
} from "lucide-react";
import { useLanguage, LanguageText } from "./language-provider";

export function QuickLinks() {
  const { language } = useLanguage();
  
  const links = [
    {
      id: "calendar",
      titleBn: "শিক্ষা কর্মসূচি",
      titleEn: "Academic Calendar",
      icon: CalendarDays,
      href: "/school/calendar",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverColor: "hover:bg-blue-200",
    },
    {
      id: "curriculum",
      titleBn: "পাঠ্যক্রম",
      titleEn: "Curriculum",
      icon: BookOpen,
      href: "/school/curriculum",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      hoverColor: "hover:bg-emerald-200",
    },
    {
      id: "teachers",
      titleBn: "শিক্ষকগণ",
      titleEn: "Teachers",
      icon: SquareUser,
      href: "/school/teachers",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      hoverColor: "hover:bg-amber-200",
    },
    {
      id: "exams",
      titleBn: "পরীক্ষা সূচি",
      titleEn: "Examinations",
      icon: FileBarChart,
      href: "/school/exams",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      hoverColor: "hover:bg-purple-200",
    },
    {
      id: "results",
      titleBn: "ফলাফল",
      titleEn: "Results",
      icon: Award,
      href: "/school/results",
      color: "text-red-600",
      bgColor: "bg-red-100",
      hoverColor: "hover:bg-red-200",
    },
    {
      id: "notices",
      titleBn: "নোটিশ বোর্ড",
      titleEn: "Notices",
      icon: Bell,
      href: "/school/notices",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      hoverColor: "hover:bg-indigo-200",
    },
    {
      id: "events",
      titleBn: "অনুষ্ঠান",
      titleEn: "Events",
      icon: Users,
      href: "/school/events",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      hoverColor: "hover:bg-pink-200",
    },
    {
      id: "admission",
      titleBn: "ভর্তি তথ্য",
      titleEn: "Admission",
      icon: GraduationCap,
      href: "/school/admission",
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
      hoverColor: "hover:bg-cyan-200",
    },
  ];

  return (
    <section className="mb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            <LanguageText bn="দ্রুত লিঙ্ক" en="Quick Links" />
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            <LanguageText 
              bn="প্রয়োজনীয় সেবাসমূহে সহজ অ্যাক্সেস পান"
              en="Access essential services easily"
            />
          </p>
        </div>
        <Link 
          href="/school/directory" 
          className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <LanguageText bn="পুরো নির্দেশিকা" en="Full directory" />
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
        {links.map((link) => (
          <Link key={link.id} href={link.href}>
            <div className={`flex flex-col items-center justify-center p-4 rounded-xl ${link.bgColor} ${link.hoverColor} transition-all h-full text-center`}>
              <link.icon className={`w-6 h-6 ${link.color}`} />
              <div className="mt-2 text-sm font-medium">
                {language === "bn" ? link.titleBn : link.titleEn}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 