"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, GraduationCap } from "lucide-react";
import { useLanguage, LanguageText } from "../components/language-provider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PrimarySchoolLayoutProps {
  children: React.ReactNode;
}

export default function PrimarySchoolLayout({ children }: PrimarySchoolLayoutProps) {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Wait until component is mounted to avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const classes = [
    {
      number: 1,
      nameBn: "প্রথম শ্রেণী",
      nameEn: "Class One",
      path: "/school/primary/class-1",
      value: "class-1"
    },
    {
      number: 2,
      nameBn: "দ্বিতীয় শ্রেণী",
      nameEn: "Class Two",
      path: "/school/primary/class-2",
      value: "class-2"
    },
    {
      number: 3,
      nameBn: "তৃতীয় শ্রেণী",
      nameEn: "Class Three",
      path: "/school/primary/class-3",
      value: "class-3"
    },
    {
      number: 4,
      nameBn: "চতুর্থ শ্রেণী",
      nameEn: "Class Four",
      path: "/school/primary/class-4",
      value: "class-4"
    },
    {
      number: 5,
      nameBn: "পঞ্চম শ্রেণী",
      nameEn: "Class Five",
      path: "/school/primary/class-5",
      value: "class-5"
    },
  ];

  // Get the current active tab value based on pathname
  const getCurrentTabValue = () => {
    const currentClass = classes.find(cls => pathname === cls.path);
    return currentClass?.value || "class-1"; // Default to class-1 if no match
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    const selectedClass = classes.find(cls => cls.value === value);
    if (selectedClass) {
      router.push(selectedClass.path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb and language switcher header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400">
                <LanguageText bn="হোম" en="Home" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/school" className="hover:text-purple-600 dark:hover:text-purple-400">
                <LanguageText bn="স্কুল" en="School" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/school/primary" className="hover:text-purple-600 dark:hover:text-purple-400">
                <LanguageText bn="প্রাথমিক" en="Primary" />
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setLanguage("bn")}
                className={`px-3 py-1 text-sm rounded-md ${
                  language === "bn"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
                    : "bg-transparent text-gray-600 dark:text-gray-300"
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-sm rounded-md ${
                  language === "en"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
                    : "bg-transparent text-gray-600 dark:text-gray-300"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area with tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {/* Class tabs */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                <LanguageText bn="প্রাথমিক শ্রেণিসমূহ" en="Primary Classes" />
              </h2>
            </div>
            
            {mounted && (
              <Tabs 
                value={getCurrentTabValue()} 
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="grid grid-cols-5 w-full">
                  {classes.map((cls) => (
                    <TabsTrigger 
                      key={cls.number} 
                      value={cls.value}
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>{language === "bn" ? cls.nameBn : cls.nameEn}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>

          {/* Main content */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 