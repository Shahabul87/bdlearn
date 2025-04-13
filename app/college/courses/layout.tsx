import { Metadata } from "next";
import { Suspense } from "react";
import { Book } from "lucide-react";
import { currentUser } from '@/lib/auth';
import ConditionalHeader from "../../(homepage)/user-header";
import Footer from "../../(homepage)/_components/footer";

export const metadata: Metadata = {
  title: "কলেজ কোর্সসমূহ | বাণী - বাংলাদেশী শিক্ষার্থীদের জন্য",
  description: "বাংলাদেশের কলেজ শিক্ষার্থীদের জন্য বিভিন্ন বিষয়ের উন্নত মানের কোর্স এবং শিক্ষা সামগ্রী",
};

export default async function CollegeCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Decorative gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-cyan-50/20 to-white dark:from-gray-950 dark:via-cyan-950/10 dark:to-gray-950 -z-10 pointer-events-none"></div>
      
      {/* Decorative patterns */}
      <div 
        className="fixed inset-0 opacity-30 dark:opacity-15 -z-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(20, 184, 166, 0.15) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
      
      {/* Decorative blobs */}
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-gradient-to-tl from-teal-500/15 to-sky-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-cyan-500/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
      <ConditionalHeader user={user} />
      
      <main className="relative z-0 mt-20">
        <Suspense fallback={
          <div className="w-full h-screen flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-500/20 dark:bg-teal-500/30 rounded-full blur-xl"></div>
              <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-xl border border-teal-100 dark:border-teal-900/50 relative">
                <Book className="w-10 h-10 text-teal-500 dark:text-teal-400 animate-pulse" />
              </div>
            </div>
            <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium text-lg">লোড হচ্ছে...</p>
            <div className="mt-4 w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 w-1/2 rounded-full animate-pulse"></div>
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