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
import { FiSearch, FiBookmark, FiCalendar, FiHelpCircle, FiBook, FiBarChart2, FiClock, FiAward, FiChevronRight, FiBookOpen, FiPieChart, FiPlayCircle } from "react-icons/fi";
import Image from "next/image";
import { IconType } from "react-icons";

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
  thumbnailUrl?: string;
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

const StatCard = ({ title, titleBn, value, icon: Icon, color }: StatCardProps) => {
  return (
    <div className={`p-6 rounded-xl shadow-sm relative overflow-hidden`} 
         style={{ 
           background: `linear-gradient(145deg, ${color}22 0%, ${color}11 100%)`,
           borderLeft: `4px solid ${color}`
         }}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-2xl font-bold">{titleBn}</p>
          <p className="text-xs text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}22` }}>
          <Icon className="h-6 w-6" style={{ color: color }} />
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({ title, titleBn, description, descriptionBn, icon: Icon, href, color }: ActionCardProps) => {
  return (
    <Link href={href}>
      <div className="relative p-6 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
           style={{ 
             background: `linear-gradient(145deg, ${color}18 0%, ${color}08 100%)`,
             borderLeft: `4px solid ${color}`
           }}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xl font-bold">{titleBn}</p>
            <p className="text-xs text-gray-500">{title}</p>
            <p className="text-sm mt-2 text-gray-600">{descriptionBn}</p>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}22` }}>
            <Icon className="h-5 w-5" style={{ color: color }} />
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
    'resume_course': 'শেষ কোর্স পুনরায় শুরু করুন'
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
  const calculateCourseProgress = (courseId: string, completedChapterCount: number): number => {
    // Find the enrollment with matching courseId
    const enrollment = enrolledCourses.find(e => e.courseId === courseId);
    
    if (!enrollment || !enrollment.course.chapters || enrollment.course.chapters.length === 0) {
      return 0;
    }
    
    // Count completed chapters for this specific course
    const courseCompletedChapters = enrollment.course.chapters.reduce((acc: number, chapter: Chapter) => {
      return chapter.userProgress?.[0]?.isCompleted ? acc + 1 : acc;
    }, 0);
    
    return Math.round((courseCompletedChapters / enrollment.course.chapters.length) * 100);
  };

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <Suspense fallback={<LoadingSpinner />}>
          <main className="container mx-auto px-4 py-8">
            {/* Welcome Banner */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    <span className="text-3xl md:text-4xl block mb-1">{t('welcome')}, {user?.name || 'Student'}!</span>
                    <span className="text-lg md:text-xl font-medium opacity-90">{formatDate(new Date())}</span>
                  </h1>
                  <p className="mt-2 text-blue-100">
                    {isEnrollmentSuccess ? 
                      t('enrollment.successMessage') : 
                      t('dashboard.welcomeMessage')}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link href="/courses" passHref>
                    <button className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition duration-200 shadow-lg">
                      {t('exploreCourses')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Statistics Grid */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                <span className="mr-2">আপনার পরিসংখ্যান</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Your Statistics</span>
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <StatCard
                  title="Enrolled Courses"
                  titleBn={t('enrolled_courses')}
                  value={enrolledCourses.length}
                  icon={FiBook}
                  color="#4C6FFF"
                />
                <StatCard
                  title="Overall Progress"
                  titleBn={t('overall_progress')}
                  value={`${overallProgress}%`}
                  icon={FiPieChart}
                  color="#FF6B6B"
                />
                <StatCard
                  title="Study Hours"
                  titleBn={t('study_hours')}
                  value={`${totalHours}h`}
                  icon={FiClock}
                  color="#36B37E"
                />
                <StatCard
                  title="Achievements"
                  titleBn={t('achievements')}
                  value="3"
                  icon={FiAward}
                  color="#FFAB00"
                />
              </div>
            </div>
            
            {/* Course Section */}
            <div className="mt-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    <span className="text-3xl block">{t('your_courses')}</span>
                    <span className="text-sm block font-medium text-gray-500 dark:text-gray-300">{t('continueProgress')}</span>
                  </h2>
                </div>
                <Link href="/courses" passHref className="mt-2 md:mt-0">
                  <span className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center">
                    {t('viewAll')} <FiChevronRight className="ml-1" />
                  </span>
                </Link>
              </div>
              
              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.slice(0, 3).map((enrollment) => (
                    <div 
                      key={enrollment.courseId} 
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                      <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600">
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                          {calculateCourseProgress(enrollment.courseId, completedChapters)}%
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1 line-clamp-1">
                          {enrollment.course.title || "Course Title"}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                          {enrollment.course.category?.name || "General"}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                              <FiBook className="text-indigo-500 dark:text-indigo-400 w-4 h-4" />
                            </div>
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                              {enrollment.course.chapters ? enrollment.course.chapters.length : 0} {t('chapters')}
                            </span>
                          </div>
                          <Link href={`/courses/${enrollment.courseId}`} passHref>
                            <button className="text-sm bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900 dark:hover:bg-indigo-800 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-lg font-medium transition-colors">
                              {t('continue')}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full inline-block mb-4">
                    <FiBookOpen className="text-indigo-500 dark:text-indigo-400 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{t('noCourses.title')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">{t('noCourses.message')}</p>
                  
                  <Link href="/courses" passHref>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                      {t('exploreCourses')}
                    </button>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Quick Actions */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {t('quick_actions')}
                  <span className="block text-sm font-medium text-gray-600">Quick Actions</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ActionCard
                  title="Find New Courses"
                  titleBn={t('find_new_courses')}
                  description={t('explore_catalog')}
                  descriptionBn={t('explore_catalog')}
                  icon={FiSearch}
                  href="/courses"
                  color="#4C6FFF"
                />
                <ActionCard
                  title="Continue Learning"
                  titleBn={t('continue_learning')}
                  description={t('resume_course')}
                  descriptionBn={t('resume_course')}
                  icon={FiPlayCircle}
                  href={mostRecentCourse ? `/courses/${mostRecentCourse.id}` : '/courses'}
                  color="#FF6B6B"
                />
              </div>
            </div>

            {/* Progress and Upcoming Classes Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <UpcomingClasses />
              <RecentProgress />
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {t('upcoming_events')}
                  <span className="block text-sm font-medium text-gray-600">Exam Schedule</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ActionCard
                  title="Midterm Exams"
                  titleBn="মধ্যবর্তী পরীক্ষা"
                  description="Next week"
                  descriptionBn="আগামী সপ্তাহে"
                  icon={FiCalendar}
                  href="/exams"
                  color="#00CFDD"
                />
                <ActionCard
                  title="Study Resources"
                  titleBn="পড়াশোনার উপকরণ"
                  description="Access learning materials"
                  descriptionBn="শিক্ষা উপকরণ দেখুন"
                  icon={FiBookOpen}
                  href="/resources"
                  color="#FFB545"
                />
              </div>
            </div>
          </main>
        </Suspense>
      </SidebarDemo>
    </div>
  );
} 