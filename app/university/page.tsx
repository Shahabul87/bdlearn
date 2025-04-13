import { Metadata } from "next";
import { Video, ChevronRight, GraduationCap, Laptop, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import UniversityTypes from "./_components/university-types";
import AdmissionSection from "./_components/admission-section";
import HeroSection from "./_components/hero-section";


export const metadata: Metadata = {
  title: "বিশ্ববিদ্যালয় প্ল্যাটফর্ম | Bani",
  description: "Bani - বাংলাদেশের সকল বিশ্ববিদ্যালয় সম্পর্কিত তথ্য, ভর্তি প্রক্রিয়া এবং অন্যান্য সেবার জন্য সম্পূর্ণ প্ল্যাটফর্ম।",
};

export default function UniversityPage() {

  return (
    <>
   
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Statistics Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">১৫৩+</div>
              <div className="text-sm md:text-base text-gray-500 dark:text-gray-400">বিশ্ববিদ্যালয়</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">১০০০+</div>
              <div className="text-sm md:text-base text-gray-500 dark:text-gray-400">ডিপার্টমেন্ট</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">১০,০০০+</div>
              <div className="text-sm md:text-base text-gray-500 dark:text-gray-400">ভর্তিচ্ছু শিক্ষার্থী</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">৫০+</div>
              <div className="text-sm md:text-base text-gray-500 dark:text-gray-400">ভর্তি গাইড</div>
            </div>
          </div>
        </div>
      </section>

      {/* University Types Section */}
      <UniversityTypes />

      {/* Admission Section */}
      <AdmissionSection />

      {/* FAQs and Further Resources Teaser */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">সাধারণ প্রশ্ন ও রিসোর্স</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              বিশ্ববিদ্যালয় ভর্তি সম্পর্কিত আরও তথ্য ও সাধারণ প্রশ্নের উত্তর জানুন
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link 
              href="/university/faq"
              className="group p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                সাধারণ প্রশ্নোত্তর
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                বিশ্ববিদ্যালয় ভর্তি, যোগ্যতা, আবেদন প্রক্রিয়া, এবং অন্যান্য বিষয় সম্পর্কিত সাধারণ প্রশ্নের উত্তর জানুন।
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                <span>সকল প্রশ্নোত্তর দেখুন</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            <Link 
              href="/university/guides/admission-preparation"
              className="group p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                ভর্তি প্রস্তুতি গাইড
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                বিশ্ববিদ্যালয় ভর্তি পরীক্ষার জন্য সর্বোত্তম প্রস্তুতি, টিপস, ট্রিকস এবং বেস্ট প্র্যাকটিস সম্পর্কে জানুন।
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                <span>সম্পূর্ণ গাইড দেখুন</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
    </>
  );
} 