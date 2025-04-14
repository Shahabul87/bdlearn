"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "./language-provider";

export function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === "bn" 
                ? "© ২০২৪ শিক্ষাঙ্গন। সর্বস্বত্ব সংরক্ষিত।" 
                : "© 2024 Shikkhanggon. All rights reserved."}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {language === "bn" 
                ? "শিক্ষা মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার" 
                : "Ministry of Education, Government of the People's Republic of Bangladesh"}
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              {language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              {language === "bn" ? "ব্যবহারের শর্তাবলী" : "Terms of Service"}
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              {language === "bn" ? "যোগাযোগ" : "Contact"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 