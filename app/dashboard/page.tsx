import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import ClientDashboardWrapper from "./client-wrapper";
import ConditionalHeader from "../(homepage)/user-header";
import { currentUser } from "@/lib/auth";
import { BookOpen, Award, BarChart, School, Calendar, Clock, FileText } from "lucide-react";
import { UserRole } from "@prisma/client";

// Enhanced colorful card component for the server component
interface DashboardCardProps {
  title: string;
  titleEn: string;
  description: string;
  value: string;
  linkText: string;
  linkTextEn: string;
  linkHref: string;
  icon: React.ReactNode;
  bgGradient: string;
  textColor: string;
}

function DashboardCard({ 
  title, 
  titleEn, 
  description, 
  value, 
  linkText, 
  linkTextEn, 
  linkHref, 
  icon, 
  bgGradient,
  textColor
}: DashboardCardProps) {
  return (
    <div className={`rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${bgGradient}`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`text-xl font-bold ${textColor} mb-1`}>{title}</h3>
            <p className={`text-xs ${textColor} opacity-75`}>{titleEn}</p>
          </div>
          <div className={`p-3 rounded-full bg-white/20 ${textColor}`}>
            {icon}
          </div>
        </div>
        <div className={`mt-4 text-3xl font-bold ${textColor}`}>{value}</div>
        <p className={`text-sm ${textColor} opacity-80 mt-1`}>{description}</p>
        <div className="mt-5">
          <Link 
            href={linkHref} 
            className={`inline-flex items-center text-sm font-medium ${textColor} hover:underline`}
          >
            <span className="mr-1">{linkText}</span>
            <span className="text-xs opacity-75">({linkTextEn})</span>
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Server component implementation
export default async function Dashboard() {
 
  const user = await currentUser()
  
  // If no user, redirect to login
  if (!user) {
    redirect("/auth/login");
  }
  
  // Redirect to student dashboard if user is a student
  if (user.role === UserRole.STUDENT) {
    redirect("/dashboard/student");
  }
  
  return (
    <>
    <ConditionalHeader user={user} />
    <ClientDashboardWrapper userRole={user.role}>
      <div className="flex flex-col gap-6">
        {/* Header Section with gradient background */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1.5">
            {user.role === "TEACHER" && "শিক্ষক ড্যাশবোর্ড"}
            {user.role === "PARENT" && "অভিভাবক ড্যাশবোর্ড"}
          </h1>
          <p className="text-lg text-white/90">
            {user.role === "TEACHER" && "আপনার শিক্ষাদান কার্যক্রমের সকল তথ্য।"}
            {user.role === "PARENT" && "আপনার সন্তানের শিক্ষা অগ্রগতি সম্পর্কে সকল তথ্য।"}
          </p>
          <p className="text-sm text-white/70 mt-1">
            {user.role === "TEACHER" && "Access all information about your teaching activities."}
            {user.role === "PARENT" && "See all information about your child's educational progress."}
          </p>
        </div>
        
        {/* Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Teacher Dashboard */}
          {user.role === "TEACHER" && (
            <>
              <DashboardCard 
                title="আমার কোর্স" 
                titleEn="My Courses"
                description="আপনার তৈরি করা কোর্সসমূহ"
                value="৮"
                linkText="সকল কোর্স দেখুন"
                linkTextEn="See all courses"
                linkHref="/dashboard/teacher"
                icon={<BookOpen className="w-5 h-5" />}
                bgGradient="bg-gradient-to-br from-blue-500 to-indigo-600"
                textColor="text-white"
              />
              <DashboardCard 
                title="মোট শিক্ষার্থী" 
                titleEn="Total Students"
                description="আপনার কোর্সে ভর্তি হয়েছে"
                value="১৫০+"
                linkText="শিক্ষার্থী দেখুন"
                linkTextEn="View students"
                linkHref="/dashboard/teacher/students"
                icon={<School className="w-5 h-5" />}
                bgGradient="bg-gradient-to-br from-emerald-500 to-green-600"
                textColor="text-white"
              />
              <DashboardCard 
                title="অনিষ্পন্ন মূল্যায়ন" 
                titleEn="Pending Evaluations"
                description="মূল্যায়ন করা বাকি আছে"
                value="১২"
                linkText="মূল্যায়ন করুন"
                linkTextEn="Evaluate"
                linkHref="/dashboard/teacher/assessments"
                icon={<FileText className="w-5 h-5" />}
                bgGradient="bg-gradient-to-br from-amber-400 to-orange-500"
                textColor="text-white"
              />
              <DashboardCard 
                title="আয়" 
                titleEn="Earnings"
                description="এই মাসের মোট আয়"
                value="৳১৫,০০০"
                linkText="আর্থিক বিবরণ"
                linkTextEn="Financial details"
                linkHref="/dashboard/teacher/earnings"
                icon={<BarChart className="w-5 h-5" />}
                bgGradient="bg-gradient-to-br from-cyan-500 to-blue-600"
                textColor="text-white"
              />
            </>
          )}
          
          {/* Parent Dashboard */}
          {user.role === "PARENT" && (
            <>
              <DashboardCard 
                title="সন্তানের সংখ্যা" 
                titleEn="Number of Children"
                description="নিবন্ধিত সন্তানের সংখ্যা"
                value="২"
                linkText="সকল সন্তান"
                linkTextEn="All children"
                linkHref="/dashboard/parent/children"
                icon={<School className="w-5 h-5" />}
                bgGradient="bg-gradient-to-br from-pink-400 to-rose-600"
                textColor="text-white"
              />
              <DashboardCard 
                title="মোট কোর্স" 
                titleEn="Total Courses"
                description="আপনার সন্তানদের কোর্স"
                value="৯"
                linkText="সকল কোর্স"
                linkTextEn="All courses"
                linkHref="/dashboard/parent/courses"
                icon={<BookOpen className="w-5 h-5" />}
                bgGradient="bg-gradient-to-br from-violet-500 to-purple-600"
                textColor="text-white"
              />
              <DashboardCard 
                title="আসন্ন পরীক্ষা" 
                titleEn="Upcoming Exams"
                description="আগামী সপ্তাহের পরীক্ষা"
                value="৪"
                linkText="পরীক্ষার সময়সূচী"
                linkTextEn="Exam schedule"
                linkHref="/dashboard/parent/exams"
                icon={<Calendar className="w-5 h-5" />}
                bgGradient="bg-gradient-to-br from-amber-400 to-orange-500"
                textColor="text-white"
              />
              <DashboardCard 
                title="গড় উপস্থিতি" 
                titleEn="Average Attendance"
                description="গত মাসের উপস্থিতি"
                value="৮৭%"
                linkText="উপস্থিতি রিপোর্ট"
                linkTextEn="Attendance report"
                linkHref="/dashboard/parent/attendance"
                icon={<Clock className="w-5 h-5" />}
                bgGradient="bg-gradient-to-br from-teal-400 to-cyan-600"
                textColor="text-white"
              />
            </>
          )}
        </div>
        
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800/50 shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col space-y-1.5 mb-4">
              <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-1">
                {user.role === "TEACHER" && "আপনার সময়সূচী"}
                {user.role === "PARENT" && "সন্তানের শিক্ষা অগ্রগতি"}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {user.role === "TEACHER" && "Your Schedule"}
                {user.role === "PARENT" && "Child's Education Progress"}
              </p>
              <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-1">
                {user.role === "TEACHER" && "আগামী ৭ দিনের লাইভ ক্লাস ও ইভেন্ট"}
                {user.role === "PARENT" && "আপনার সন্তানদের সর্বশেষ কার্যকলাপ এবং ফলাফল"}
              </p>
            </div>
            <div className="flex items-center justify-center h-40 bg-white/80 dark:bg-gray-800/30 rounded-lg text-indigo-500 dark:text-indigo-400 font-medium">
              <p className="text-center">
                <span className="block text-lg">এখানে বিস্তারিত তথ্য দেখানো হবে।</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Detailed information will be shown here.</span>
              </p>
            </div>
          </div>
          
          <div className="rounded-xl border border-purple-100 dark:border-purple-900/30 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800/50 shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col space-y-1.5 mb-4">
              <h3 className="text-xl font-bold text-purple-900 dark:text-purple-300 mb-1">
                {user.role === "TEACHER" && "অনিষ্পন্ন মূল্যায়ন"}
                {user.role === "PARENT" && "সন্তানদের পরীক্ষার ফলাফল"}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {user.role === "TEACHER" && "Pending Evaluations"}
                {user.role === "PARENT" && "Children's Exam Results"}
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                {user.role === "TEACHER" && "শিক্ষার্থীদের জমা দেওয়া অ্যাসাইনমেন্ট মূল্যায়ন করুন"}
                {user.role === "PARENT" && "সর্বশেষ পরীক্ষার ফলাফল দেখুন"}
              </p>
            </div>
            <div className="flex items-center justify-center h-40 bg-white/80 dark:bg-gray-800/30 rounded-lg text-purple-500 dark:text-purple-400 font-medium">
              <p className="text-center">
                <span className="block text-lg">এখানে বিস্তারিত তথ্য দেখানো হবে।</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Detailed information will be shown here.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClientDashboardWrapper>
    </>
  );
} 