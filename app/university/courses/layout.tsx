import { Metadata } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "বিশ্ববিদ্যালয় কোর্স | বাণী - অনলাইন লার্নিং প্ল্যাটফর্ম",
  description: "বাংলাদেশের বিভিন্ন বিশ্ববিদ্যালয়ের অনলাইন কোর্সসমূহ, প্রোগ্রাম এবং সাবজেক্ট সম্পর্কে জানুন।",
};

export default function UniversityCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      {/* Decorative gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-gray-950 dark:via-indigo-950/10 dark:to-gray-950 -z-10 pointer-events-none"></div>
      
      {/* Decorative patterns */}
      <div 
        className="fixed inset-0 opacity-30 dark:opacity-20 -z-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(79, 70, 229, 0.15) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
      
      {/* Decorative blobs */}
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-gradient-to-tl from-primary/15 to-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/4 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-primary/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
      <Suspense fallback={
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-full blur-xl"></div>
            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-xl border border-indigo-100 dark:border-indigo-900/50 relative">
              <Loader2 className="w-10 h-10 text-primary dark:text-primary-light animate-spin" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium text-lg">লোড হচ্ছে...</p>
          <div className="mt-4 w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary via-indigo-500 to-primary w-1/2 rounded-full animate-pulse"></div>
          </div>
        </div>
      }>
        <div className="relative z-0">
          {children}
        </div>
      </Suspense>
    </div>
  );
} 