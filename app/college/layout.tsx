import { Metadata } from "next";
import { Suspense } from "react";
import { BookOpen } from "lucide-react";
import { currentUser } from '@/lib/auth';
import ConditionalHeader from "../(homepage)/user-header";
import Footer from "../(homepage)/_components/footer";

export const metadata: Metadata = {
  title: "কলেজ শিক্ষা | বাণী - বাংলাদেশী শিক্ষার্থীদের জন্য",
  description: "বাংলাদেশের কলেজ শিক্ষার্থীদের জন্য আধুনিক ও সমৃদ্ধ অনলাইন শিক্ষা প্লাটফর্ম",
};

export default async function CollegeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Decorative gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950 -z-10 pointer-events-none"></div>
      
      {/* Decorative patterns */}
      <div 
        className="fixed inset-0 opacity-30 dark:opacity-15 -z-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(56, 189, 248, 0.15) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
      
      {/* Decorative blobs */}
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-500/15 to-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/4 w-80 h-80 bg-gradient-to-tr from-teal-500/10 to-sky-500/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
      <ConditionalHeader user={user} />
      
      <main className="relative z-0 mt-20">
        <Suspense fallback={
          <div className="w-full h-screen flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-500/20 dark:bg-sky-500/30 rounded-full blur-xl"></div>
              <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-xl border border-sky-100 dark:border-sky-900/50 relative">
                <BookOpen className="w-10 h-10 text-sky-500 dark:text-sky-400 animate-pulse" />
              </div>
            </div>
            <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium text-lg">লোড হচ্ছে...</p>
            <div className="mt-4 w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 w-1/2 rounded-full animate-pulse"></div>
            </div>
          </div>
        }>
          {children}
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
} 