"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

const footerLinks = [
  {
    title: "অ্যাকাডেমিক",
    links: [
      { name: "কলেজ কোর্স", href: "/courses/college" },
      { name: "ভর্তি প্রস্তুতি", href: "/courses/admission" },
      { name: "সাবজেক্ট গাইড", href: "/resources/subject-guide" },
      { name: "স্কিল ডেভেলপমেন্ট", href: "/courses/skill" },
      { name: "লাইভ ক্লাস", href: "/live-classes" },
    ],
  },
  {
    title: "রিসোর্স",
    links: [
      { name: "স্টাডি ম্যাটেরিয়াল", href: "/resources/study-materials" },
      { name: "নোট ও সাজেশন", href: "/resources/notes" },
      { name: "মডেল টেস্ট", href: "/resources/model-test" },
      { name: "ভিডিও লেকচার", href: "/resources/video-lectures" },
      { name: "ব্লগ", href: "/blog" },
    ],
  },
  {
    title: "সাপোর্ট",
    links: [
      { name: "সাধারণ প্রশ্নোত্তর", href: "/faq" },
      { name: "সাপোর্ট সেন্টার", href: "/support" },
      { name: "যোগাযোগ করুন", href: "/contact" },
      { name: "অভিযোগ", href: "/complaints" },
      { name: "হেল্পলাইন", href: "/helpline" },
    ],
  },
  {
    title: "কোম্পানি",
    links: [
      { name: "আমাদের সম্পর্কে", href: "/about" },
      { name: "শিক্ষকমণ্ডলী", href: "/teachers" },
      { name: "কর্মসংস্থান", href: "/careers" },
      { name: "প্রাইভেসি পলিসি", href: "/privacy-policy" },
      { name: "ব্যবহারের শর্তাবলী", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-12 md:pt-16 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8">
          {/* Logo and contact info */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-12 w-36">
                <Image
                  src="/images/logo.svg"
                  alt="বাণী লোগো"
                  fill
                  className="dark:hidden"
                />
                <Image
                  src="/images/logo-dark.svg"
                  alt="বাণী লোগো"
                  fill
                  className="hidden dark:block"
                />
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              বাংলাদেশের অনলাইন শিক্ষা প্লাটফর্ম, যেখানে আপনি যেকোনো সময় যেকোনো স্থান থেকে শিখতে পারেন।
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 dark:text-white font-medium text-sm">ফোন</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">+৮৮০ ১৭১২-৩৪৫৬৭৮</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 dark:text-white font-medium text-sm">ইমেইল</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">info@bani.edu.bd</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900 dark:text-white font-medium text-sm">ঠিকানা</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    হাউস #৫৬, রোড #১০, ব্লক-এফ, বনানী, ঢাকা-১২১৩
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="col-span-1 md:col-span-1 lg:col-span-2">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              নিউজলেটার সাবস্ক্রাইব করুন
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              সর্বশেষ আপডেট, নতুন কোর্স এবং বিশেষ অফার পেতে আমাদের নিউজলেটার সাবস্ক্রাইব করুন।
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium whitespace-nowrap"
              >
                সাবস্ক্রাইব
              </motion.button>
            </div>
            
            {/* Social media */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                সোশ্যাল মিডিয়া
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-800 mt-12 py-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} বাণী শিক্ষা প্লাটফর্ম। সর্বস্বত্ব সংরক্ষিত।
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              প্রাইভেসি পলিসি
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              ব্যবহারের শর্তাবলী
            </Link>
            <Link href="/sitemap" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              সাইটম্যাপ
            </Link>
          </div>
          
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
} 