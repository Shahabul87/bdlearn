import { Metadata } from "next";
import Link from "next/link";
import { currentUser } from '@/lib/auth';
import ConditionalHeader from "../(homepage)/user-header";
import { BookOpen, GraduationCap, Laptop, Video, MessageCircle, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "অনলাইন উচ্চশিক্ষা প্ল্যাটফর্ম | Bani",
  description: "Bani - বাংলাদেশের প্রথম সম্পূর্ণ অনলাইন উচ্চশিক্ষা প্ল্যাটফর্ম। লাইভ ক্লাস, ইন্টারেক্টিভ কোর্স, এবং এক্সপার্ট মেন্টর থেকে শিখুন।",
};

export default async function UniversityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <ConditionalHeader user={user} />
      
      {/* Main content */}
      <main className="flex-grow mt-20">
        {children}
      </main>
      
      {/* Quick Links Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Online Courses */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                অনলাইন কোর্স
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/university/courses/programming" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    প্রোগ্রামিং কোর্স
                  </Link>
                </li>
                <li>
                  <Link href="/university/courses/academic" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    একাডেমিক কোর্স
                  </Link>
                </li>
                <li>
                  <Link href="/university/courses/competitive" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    প্রতিযোগিতামূলক পরীক্ষা
                  </Link>
                </li>
                <li>
                  <Link href="/university/courses/skill" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    স্কিল ডেভেলপমেন্ট
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Live Classes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                লাইভ ক্লাস
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/university/live-classes/schedule" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    ক্লাস শিডিউল
                  </Link>
                </li>
                <li>
                  <Link href="/university/live-classes/recordings" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    রেকর্ডিং দেখুন
                  </Link>
                </li>
                <li>
                  <Link href="/university/live-classes/join" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    লাইভ ক্লাসে যোগ দিন
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Laptop className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                লার্নিং রিসোর্স
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/resources/study-materials" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    স্টাডি ম্যাটেরিয়াল
                  </Link>
                </li>
                <li>
                  <Link href="/practice-tests" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    প্র্যাকটিস টেস্ট
                  </Link>
                </li>
                <li>
                  <Link href="/resources/ebooks" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    ই-বুক লাইব্রেরি
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                সাপোর্ট
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    সাধারণ প্রশ্নোত্তর
                  </Link>
                </li>
                <li>
                  <Link href="/support/chat" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    চ্যাট সাপোর্ট
                  </Link>
                </li>
                <li>
                  <Link href="/support/forum" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center">
                    <ChevronRight className="w-3 h-3 mr-1" />
                    লার্নারস ফোরাম
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Bani
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                © {new Date().getFullYear()} Bani Education. সর্বস্বত্ব সংরক্ষিত।
              </p>
            </div>
            
            <div className="flex space-x-6">
              <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                শর্তাবলী
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                প্রাইভেসি পলিসি
              </Link>
              <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                আমাদের সম্পর্কে
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                যোগাযোগ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 