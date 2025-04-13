import { Suspense } from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { CoursesList } from "./_components/courses-list";
import { LoadingSpinner } from "@/components/loading-spinner";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { BookOpen, TrendingUp, Calendar, Award, Clock, GraduationCap, LucideIcon, Target, PieChart } from "lucide-react";
import Link from "next/link";
import { UpcomingClasses } from "./_components/upcoming-classes";
import { RecentProgress } from "./_components/recent-progress";
import { SearchIcon, BookmarkIcon, CalendarIcon, HelpCircleIcon } from "lucide-react";
import { FiSearch, FiBookmark, FiCalendar, FiHelpCircle, FiBook, FiBarChart2, FiClock, FiAward, FiChevronRight, FiBookOpen, FiPieChart, FiPlayCircle, FiZap, FiClipboard, FiFileText } from "react-icons/fi";
import Image from "next/image";
import { IconType } from "react-icons";
import { CheckCircle, ChevronRight } from "lucide-react";

interface PageProps {
  searchParams: {
    success?: string;
    courseId?: string;
  };
}

interface StatCardProps {
  title: string;
  titleBn: string;
  value: string | number;
  icon: IconType;
  color: string;
}

// Add proper interfaces for the course data structure
interface Course {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category?: {
    name: string;
  };
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  userProgress?: UserProgress[];
}

interface UserProgress {
  id: string;
  userId: string;
  chapterId: string;
  isCompleted: boolean;
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  course: Course;
}

interface ActionCardProps {
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  icon: IconType;
  href: string;
  color: string;
}

function StatCard({ title, value, titleBn, icon: Icon, color, bgColor }: {
  title: string;
  value: string | number;
  titleBn: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
      <div className={`p-5`} style={{ background: `linear-gradient(135deg, ${color} 0%, ${bgColor} 100%)` }}>
        <div className="flex justify-between">
          <div>
            <h4 className="text-2xl font-bold text-white mb-1">{titleBn}</h4>
            <p className="text-xs text-white opacity-75">{title}</p>
          </div>
          <div className="p-3 rounded-full bg-white/20 text-white">
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xl md:text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

const ActionCard = ({ title, titleBn, description, descriptionBn, icon: Icon, href, color }: ActionCardProps) => {
  return (
    <Link href={href}>
      <div className="p-6 rounded-xl shadow-md overflow-hidden relative transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
        style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}DD 100%)` }}>
        <div className="absolute top-0 right-0 mt-3 mr-3 p-2 rounded-full bg-white/20">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="text-white mt-2">
          <h3 className="text-xl font-bold mb-1">{titleBn}</h3>
          <p className="text-xs opacity-80">{title}</p>
          <div className="mt-4">
            <p className="text-sm font-medium">{descriptionBn}</p>
            <p className="text-xs opacity-75 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Utility function to format date
function formatDate(date: Date): string {
  return date.toLocaleDateString('bn-BD', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Utility function to calculate progress for a specific course
function calculateProgress(courseId: string, completedChaptersCount: number): number {
  // This function should be implemented inside the component where enrolledCourses is available
  // For now, returning a placeholder value between 0-100
  return Math.floor(Math.random() * 100);
}

// Simple translation utility for server component
const t = (key: string): string => {
  const translations: Record<string, string> = {
    'welcome': 'স্বাগতম',
    'enrollment.successMessage': 'আপনি সফলভাবে কোর্সে নথিভুক্ত হয়েছেন!',
    'dashboard.welcomeMessage': 'আপনার শিক্ষা যাত্রা অব্যাহত রাখুন',
    'exploreCourses': 'কোর্স অন্বেষণ করুন',
    'yourCourses': 'আপনার কোর্সসমূহ',
    'continueProgress': 'আপনার অগ্রগতি চালিয়ে যান',
    'viewAll': 'সব দেখুন',
    'chapters': 'অধ্যায়',
    'continue': 'চালিয়ে যান',
    'noCourses.title': 'এখনো কোন কোর্সে ভর্তি হননি',
    'noCourses.message': 'আপনি এখনো কোন কোর্সে ভর্তি হননি। আজই আপনার শিক্ষা যাত্রা শুরু করুন!',
    'enrolled_courses': 'ভর্তি হওয়া কোর্স',
    'overall_progress': 'সামগ্রিক অগ্রগতি',
    'study_hours': 'অধ্যয়নের ঘন্টা',
    'achievements': 'অর্জন',
    'your_courses': 'আপনার কোর্সসমূহ',
    'quick_actions': 'দ্রুত অ্যাকশন',
    'upcoming_events': 'পরীক্ষার সময়সূচী',
    'find_new_courses': 'নতুন কোর্স খুঁজুন',
    'explore_catalog': 'ক্যাটালগুলো অন্বেষণ করুন',
    'continue_learning': 'অগ্রগতি চালিয়ে যান',
    'resume_course': 'শেষ কোর্স পুনরায় শুরু করুন',
    'find_courses': 'নতুন কোর্স খুঁজুন',
    'find_courses_desc': 'নতুন শিক্ষার সুযোগ খুঁজুন',
    'view_assignments': 'টাস্ক দেখুন',
    'view_assignments_desc': 'আপনার অপেক্ষাযোগ্য টাস্ক দেখুন',
    'my_notes': 'নোট দেখুন',
    'my_notes_desc': 'আপনার অধ্যয়নের নোট দেখুন',
    'contact_support': 'সহায়তা প্রাপ্তি',
    'contact_support_desc': 'আপনার অধ্যয়নের সহায়তা প্রাপ্তি',
    'complete': 'সম্পন্ন'
  };
  
  return translations[key] || key;
};

export default async function StudentDashboard({ searchParams }: PageProps) {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/auth/login");
  }

  // Check success parameter from searchParams prop
  if (searchParams.success === '1') {
    // Wait a bit longer for webhook processing
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Verify enrollment after waiting
    const verifyEnrollment = await db.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: searchParams.courseId as string
      }
    });
    
    if (!verifyEnrollment) {
      console.log("Enrollment verification failed");
    }
  }

  // Fetch enrolled courses with progress
  const enrolledCourses = await db.enrollment.findMany({
    where: {
      userId: user.id
    },
    include: {
      course: {
        include: {
          category: true,
          chapters: {
            include: {
              userProgress: {
                where: {
                  userId: user.id
                }
              }
            }
          }
        }
      }
    }
  });

  // Calculate overall progress
  const totalChapters = enrolledCourses.reduce((acc, enrollment) => 
    acc + enrollment.course.chapters.length, 0);
  
  const completedChapters = enrolledCourses.reduce((acc, enrollment) => {
    return acc + enrollment.course.chapters.reduce((chapterAcc: number, chapter: any) => {
      return chapter.userProgress?.[0]?.isCompleted ? chapterAcc + 1 : chapterAcc;
    }, 0);
  }, 0);

  const overallProgress = totalChapters > 0 
    ? Math.round((completedChapters / totalChapters) * 100) 
    : 0;

  // Calculate total study hours (placeholder for now)
  const totalHours = 12; // This would typically be calculated from actual study data
  
  const isEnrollmentSuccess = searchParams.success === '1';

  const mostRecentCourse = enrolledCourses.length > 0 ? enrolledCourses[0].course : null;

  // Override the calculateProgress function implementation here
  const calculateCourseProgress = (courseId: string, chapters: any[]): number => {
    if (!chapters || chapters.length === 0) return 0;
    
    const completedChapters = chapters.filter(chapter => 
      chapter.userProgress?.[0]?.isCompleted
    ).length;
    
    return Math.round((completedChapters / chapters.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="px-8 py-10 sm:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {t('welcome')} {user.name || 'Student'}!
                </h1>
                <p className="text-lg text-white/80 max-w-2xl">
                  {t('dashboard.welcomeMessage')}
                </p>
                
                {/* Success Message */}
                {isEnrollmentSuccess && (
                  <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/30">
                    <p className="text-white font-medium flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                      {t('enrollment.successMessage')}
                    </p>
                  </div>
                )}
              </div>
              
              <Link 
                href="/courses" 
                className="hidden md:flex mt-6 md:mt-0 px-6 py-3 bg-white/20 hover:bg-white/30 
                  text-white rounded-full transition-all duration-300 items-center font-medium"
              >
                {t('exploreCourses')}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Enrolled Courses" 
            titleBn={t('enrolled_courses')}
            value={enrolledCourses.length} 
            icon={FiBook}
            color="#4361EE" 
            bgColor="#3A86FF"
          />
          <StatCard 
            title="Overall Progress" 
            titleBn={t('overall_progress')}
            value={`${overallProgress}%`} 
            icon={FiBarChart2}
            color="#F72585" 
            bgColor="#7209B7"
          />
          <StatCard 
            title="Study Hours" 
            titleBn={t('study_hours')}
            value={totalHours} 
            icon={FiClock}
            color="#4CC9F0" 
            bgColor="#4895EF"
          />
          <StatCard 
            title="Achievements" 
            titleBn={t('achievements')}
            value="3" 
            icon={FiAward}
            color="#F77F00" 
            bgColor="#FCBF49"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
              
              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="flex items-center gap-2 text-xl font-bold mb-5">
                  <FiZap className="text-yellow-500" />
                  <span className="text-xl font-semibold">{t('quick_actions')}</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Quick Actions</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <ActionCard
                    title="Find New Courses"
                    titleBn={t('find_courses')}
                    description="Discover new learning opportunities"
                    descriptionBn={t('find_courses_desc')}
                    icon={FiSearch}
                    href="/courses"
                    color="#4C6FFF"
                  />
                  <ActionCard
                    title="View Assignments"
                    titleBn={t('view_assignments')}
                    description="Check your pending tasks"
                    descriptionBn={t('view_assignments_desc')}
                    icon={FiClipboard}
                    href="/assignments"
                    color="#FF6B6B"
                  />
                  <ActionCard
                    title="My Notes"
                    titleBn={t('my_notes')}
                    description="Access your study notes"
                    descriptionBn={t('my_notes_desc')}
                    icon={FiFileText}
                    href="/notes"
                    color="#00CFDD"
                  />
                  <ActionCard
                    title="Contact Support"
                    titleBn={t('contact_support')}
                    description="Get help with your studies"
                    descriptionBn={t('contact_support_desc')}
                    icon={FiHelpCircle}
                    href="/support"
                    color="#FFB545"
                  />
                </div>
              </div>
              
              {/* Your Courses */}
              <div>
                <h3 className="flex items-center gap-2 text-xl font-bold mb-5">
                  <FiBookOpen className="text-blue-500" />
                  <span className="text-xl font-semibold">{t('your_courses')}</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Your Courses</span>
                </h3>
                
                {enrolledCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrolledCourses.map((enrollment) => {
                      const progress = calculateCourseProgress(
                        enrollment.courseId,
                        enrollment.course.chapters
                      );
                      
                      return (
                        <div key={enrollment.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                          <div className="flex h-36 overflow-hidden relative">
                            <Image
                              src={enrollment.course.imageUrl || "/placeholder-course.jpg"}
                              alt={enrollment.course.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-3 left-4 right-4">
                              <div className="flex justify-between items-center">
                                <h4 className="text-white font-bold line-clamp-1 text-lg">{enrollment.course.title}</h4>
                                <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded">
                                  {progress}% {t('complete')}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                {enrollment.course.chapters.length} {t('chapters')}
                              </span>
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                {enrollment.course.category?.name}
                              </span>
                            </div>
                            
                            <div className="mb-4">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                              </div>
                            </div>
                            
                            <Link
                              href={`/courses/${enrollment.courseId}`}
                              className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                            >
                              {t('continue')}
                              <ChevronRight className="ml-1 w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col items-center justify-center">
                      <FiBookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t('noCourses.title')}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{t('noCourses.message')}</p>
                      <Link 
                        href="/courses" 
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 inline-flex items-center"
                      >
                        {t('exploreCourses')}
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
          </div>

          {/* Progress and Upcoming Classes Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <UpcomingClasses />
            <RecentProgress />
          </div>
        </div>
      </div>
    </div>
  );
} 