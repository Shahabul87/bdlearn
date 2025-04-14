"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  GraduationCap, 
  School,
  School2,
  Landmark,
  BookText,
  BrainCircuit,
  ClipboardList,
  History,
  Bookmark,
} from "lucide-react";
import { useLanguage, LanguageText } from "./language-provider";

interface NavigationLevel {
  id: string;
  nameBn: string;
  nameEn: string;
  icon: string;
  path: string;
  description: {
    bn: string;
    en: string;
  };
  color: string;
  bgColor: string;
}

interface QuickLink {
  nameBn: string;
  nameEn: string;
  icon: string;
  path: string;
}

interface NavigationSidebarProps {
  educationLevels: NavigationLevel[];
  quickLinks: QuickLink[];
}

export function NavigationSidebar({ 
  educationLevels,
  quickLinks 
}: NavigationSidebarProps) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "School2": return School2;
      case "School": return School;
      case "BookText": return BookText;
      case "GraduationCap": return GraduationCap;
      case "BrainCircuit": return BrainCircuit;
      case "Landmark": return Landmark;
      case "ClipboardList": return ClipboardList;
      case "History": return History;
      case "Bookmark": return Bookmark;
      case "BookOpen": return BookOpen;
      default: return BookOpen;
    }
  };

  return (
    <div className="w-full lg:w-72 shrink-0">
      {/* Education Levels */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <LanguageText bn="শিক্ষার স্তরসমূহ" en="Education Levels" />
          </h2>
        </div>
        
        <nav className="p-2">
          <ul className="space-y-1">
            {educationLevels.map((level) => {
              const IconComponent = getIconComponent(level.icon);
              return (
                <li key={level.id}>
                  <Link href={level.path} className="block">
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors
                        ${mounted && pathname.startsWith(level.path)
                          ? `${level.bgColor} ${level.color}`
                          : "hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      <IconComponent className={`h-5 w-5 ${
                        mounted && pathname.startsWith(level.path)
                          ? level.color
                          : "text-gray-500 dark:text-gray-400"
                      }`} />
                      <div>
                        <div className="font-medium">
                          {language === "bn" ? level.nameBn : level.nameEn}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {language === "bn" ? level.description.bn : level.description.en}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      {/* Quick Links */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <LanguageText bn="দ্রুত লিংকসমূহ" en="Quick Links" />
          </h2>
        </div>
        
        <nav className="p-2">
          <ul className="space-y-1">
            {quickLinks.map((link, index) => {
              const IconComponent = getIconComponent(link.icon);
              return (
                <li key={index}>
                  <Link href={link.path} className="block">
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                    >
                      <IconComponent className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span>{language === "bn" ? link.nameBn : link.nameEn}</span>
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
} 