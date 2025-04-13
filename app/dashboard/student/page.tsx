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
import { FiSearch, FiBookmark, FiCalendar, FiHelpCircle, FiBook, FiBarChart2, FiClock, FiAward, FiChevronRight, FiBookOpen, FiPieChart, FiPlayCircle, FiZap, FiClipboard, FiFileText, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { IconType } from "react-icons";
import { CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarClock, MapPin, Book } from "lucide-react";

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

const StatCard = ({ title, titleBn, value, icon: Icon, color }: {
  title: string;
  titleBn: string;
  value: string | number;
  icon: IconType;
  color: string;
}) => {
  const colorClass = color.startsWith('#') ? '' : color;
  const colorStyle = color.startsWith('#') ? { color } : {};
  
  return (
    <div className="relative overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-200">
              {titleBn}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
            <div className="mt-4">
              <span className="text-3xl font-bold" style={colorStyle}>
                {value}
              </span>
            </div>
          </div>
          <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
            <Icon className="h-7 w-7" style={{ color }}/>
          </div>
        </div>
      </div>
      <div 
        className="absolute bottom-0 right-0 w-32 h-32 -m-6 rounded-full opacity-10" 
        style={{ background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)` }}
      ></div>
    </div>
  );
};

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

// Utility functions
const formatDate = (date: Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const time = `${hours}:${formattedMinutes}`;
  
  return {
    day,
    month,
    time,
    formattedDate: `${day} ${month}`
  };
};

// Utility function to calculate progress for a specific course
function calculateProgress(courseId: string, completedChaptersCount: number): number {
  // This function should be implemented inside the component where enrolledCourses is available
  // For now, returning a placeholder value between 0-100
  return Math.floor(Math.random() * 100);
}

// Simple translation utility for server component
const t = (key: string): string => {
  const translations: Record<string, string> = {
    'enrolled_courses': 'নথিভুক্ত কোর্স',
    'overall_progress': 'সামগ্রিক অগ্রগতি',
    'study_hours': 'অধ্যয়ন সময়',
    'achievements': 'অর্জন',
    'welcome_back': 'পুনরায় স্বাগতম',
    'your_progress': 'আপনার অগ্রগতি',
    'find_new_courses': 'নতুন কোর্স খুঁজুন',
    'find_new_courses_desc': 'আপনার জন্য উপযুক্ত কোর্স অন্বেষণ করুন',
    'view_assignments': 'অ্যাসাইনমেন্ট দেখুন',
    'view_assignments_desc': 'আপনার অ্যাসাইনমেন্ট এবং প্রোজেক্ট দেখুন',
    'my_notes': 'আমার নোট',
    'my_notes_desc': 'আপনার অধ্যয়ন নোট অ্যাক্সেস করুন',
    'contact_support': 'সহায়তা প্রাপ্তি',
    'contact_support_desc': 'আপনার অধ্যয়নের সহায়তা প্রাপ্তি',
    'complete': 'সম্পন্ন',
    'upcomingClasses': 'পরীক্ষার সময়সূচী',
    'recentProgress': 'সম্পন্ন অগ্রগতি',
    'viewAll': 'সব দেখুন',
    'class_1_title': 'গণিত ক্লাস',
    'class_2_title': 'পদার্থবিজ্ঞান ক্লাস',
    'class_3_title': 'রসায়ন ক্লাস',
    'progress_1_title': 'অধ্যায় ১ সম্পন্ন হয়েছে',
    'progress_2_title': 'অধ্যায় ২ সম্পন্ন হয়েছে',
    'progress_3_title': 'অধ্যায় ৩ সম্পন্ন হয়েছে',
    'continue_learning': 'শিক্ষা চালিয়ে যান',
    'my_courses': 'আমার কোর্স',
    'explore_courses': 'কোর্স অন্বেষণ করুন',
    'upcoming_events': 'Upcoming Events',
    'upcomingEventsBn': 'আসন্ন ইভেন্টসমূহ',
    'exam': 'Exam',
    'examBn': 'পরীক্ষা',
    'assignment': 'Assignment',
    'assignmentBn': 'অ্যাসাইনমেন্ট',
    'class': 'Class',
    'classBn': 'ক্লাস',
    'other': 'Other',
    'otherBn': 'অন্যান্য',
    'course': 'Course',
    'courseBn': 'কোর্স',
    'viewDetails': 'View Details',
    'viewDetailsBn': 'বিস্তারিত দেখুন',
    'noEvents': 'No Upcoming Events',
    'noEventsBn': 'কোন আসন্ন ইভেন্ট নেই',
    'noEventsDesc': 'You have no scheduled events in the near future',
    'noEventsDescBn': 'আপনার নিকট ভবিষ্যতে কোন সময়সূচি নির্ধারিত ইভেন্ট নেই',
    'event_type_exam': 'পরীক্ষা',
    'event_type_assignment': 'অ্যাসাইনমেন্ট',
    'event_type_class': 'ক্লাস',
    'event_type_other': 'অন্যান্য'
  };
  return translations[key] || key;
};

// Define event type
interface Event {
  id: string;
  type: 'exam' | 'assignment' | 'class';
  title: string;
  titleBn: string;
  description?: string;
  descriptionBn?: string;
  date: Date;
  location?: string;
  locationBn?: string;
  course?: string;
  link?: string;
}

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

  // Fetch upcoming events
  const upcomingEvents: Event[] = [
    {
      id: "1",
      title: "Final Exam",
      titleBn: "পরীক্ষা",
      date: new Date(),
      location: "University",
      locationBn: "বিশ্ববিদ্যালয়",
      type: "exam",
      course: "গণিত",
      link: "/exams/1"
    },
    {
      id: "2",
      title: "Assignment",
      titleBn: "অ্যাসাইনমেন্ট",
      date: new Date(),
      location: "University",
      locationBn: "বিশ্ববিদ্যালয়",
      type: "assignment",
      course: "পদার্থবিজ্ঞান",
      link: "/assignments/1"
    },
    {
      id: "3",
      title: "Class",
      titleBn: "ক্লাস",
      date: new Date(),
      location: "University",
      locationBn: "বিশ্ববিদ্যালয়",
      type: "class",
      course: "রসায়ন"
    }
  ];

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
          />
          <StatCard 
            title="Overall Progress" 
            titleBn={t('overall_progress')}
            value={`${overallProgress}%`} 
            icon={FiBarChart2}
            color="#F72585"
          />
          <StatCard 
            title="Study Hours" 
            titleBn={t('study_hours')}
            value={totalHours} 
            icon={FiClock}
            color="#4CC9F0"
          />
          <StatCard 
            title="Achievements" 
            titleBn={t('achievements')}
            value="3" 
            icon={FiAward}
            color="#F77F00"
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
              
              {/* My Courses */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('my_courses')}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your Courses</p>
                  </div>
                  <Link 
                    href="/courses" 
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                  >
                    {t('viewAll')} <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {enrolledCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((course, index) => {
                      const progress = calculateCourseProgress(course.courseId, course.course.chapters);
                      const progressColor = progress < 30 ? "bg-red-500" : progress < 70 ? "bg-yellow-500" : "bg-green-500";
                      
                      return (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
                          <div className="relative h-40 w-full">
                            {course.course.imageUrl ? (
                              <Image
                                src={course.course.imageUrl}
                                alt={course.course.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center">
                                <FiBook className="h-16 w-16 text-white" />
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                              <h3 className="text-lg font-semibold text-white truncate">{course.course.title}</h3>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 h-10 mb-2">
                              {course.course.description}
                            </p>
                            <div className="mt-3">
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                                <span>{t('complete')}: {progress}%</span>
                                <span>{course.course.chapters.length} {t('chapters')}</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className={`${progressColor} h-2 rounded-full`}
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <Link
                                href={`/courses/${course.courseId}`}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
                              >
                                {t('continue_learning')} <FiArrowRight />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">
                        <FiBookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('noCourses.title')}</h3>
                      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">{t('noCourses.message')}</p>
                      <Link
                        href="/courses"
                        className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-full flex items-center gap-2 transition-colors"
                      >
                        {t('explore_courses')} <FiArrowRight />
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

        {/* Upcoming Events Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('upcoming_events')}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Calendar</p>
            </div>
            <Link 
              href="/calendar" 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
            >
              {t('viewAll')} <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 gap-4 mt-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => {
                  const formattedDate = formatDate(event.date);
                  const eventColors = {
                    exam: "from-red-500 to-orange-500",
                    assignment: "from-blue-500 to-teal-500",
                    class: "from-purple-500 to-pink-500",
                    other: "from-gray-500 to-gray-700"
                  };
                  
                  return (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-r ${eventColors[event.type]} rounded-lg flex flex-col items-center justify-center text-white`}>
                          <span className="text-xs font-medium">{formattedDate.month}</span>
                          <span className="text-lg font-bold">{formattedDate.day}</span>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">{event.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full capitalize 
                              ${event.type === 'exam' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                                event.type === 'assignment' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                                'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}`}>
                              {t(event.type)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{event.location}</p>
                          {event.course && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {t('course')}: {event.course}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              <FiClock className="inline mr-1" /> {formattedDate.time}
                            </p>
                            {event.link && (
                              <Link href={event.link} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                                {t('viewDetails')} &rarr;
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                  <FiCalendar className="w-12 h-12 mx-auto text-gray-400" />
                  <h4 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">{t('noEvents')}</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('noEventsDesc')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CalendarClock className="w-5 h-5 mr-2 text-primary" />
            <span className="text-xl font-bold">{t('upcomingEventsBn')}</span>
            <span className="text-sm ml-2 text-gray-500">{t('upcomingEvents')}</span>
          </h3>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingEvents.map((event, index) => {
                // Determine color based on event type
                let bgColor = "bg-blue-100";
                let textColor = "text-blue-700";
                let eventType = t('otherBn');
                let eventTypeEn = t('other');
                
                if (event.type?.toLowerCase() === 'exam') {
                  bgColor = "bg-red-100";
                  textColor = "text-red-700";
                  eventType = t('examBn');
                  eventTypeEn = t('exam');
                } else if (event.type?.toLowerCase() === 'assignment') {
                  bgColor = "bg-amber-100";
                  textColor = "text-amber-700";
                  eventType = t('assignmentBn');
                  eventTypeEn = t('assignment');
                } else if (event.type?.toLowerCase() === 'class') {
                  bgColor = "bg-green-100";
                  textColor = "text-green-700";
                  eventType = t('classBn');
                  eventTypeEn = t('class');
                }
                
                return (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`${bgColor} ${textColor} text-xs px-2.5 py-1 rounded font-medium`}>
                          <span className="font-medium">{eventType}</span>
                          <span className="text-xs ml-1 opacity-75">({eventTypeEn})</span>
                        </span>
                        <h4 className="font-semibold mt-2">{event.title}</h4>
                        {event.location && (
                          <p className="text-gray-600 text-sm mt-1 flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-1" />
                            {event.location}
                          </p>
                        )}
                        {event.course && (
                          <p className="text-gray-600 text-sm mt-1 flex items-center">
                            <Book className="w-3.5 h-3.5 mr-1" />
                            <span className="font-medium">{t('courseBn')}</span>: {event.course}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {formatDate(event.date).formattedDate}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(event.date).time}
                        </div>
                      </div>
                    </div>
                    {event.link && (
                      <div className="mt-3 text-right">
                        <Link href={event.link} className="text-primary text-sm hover:underline flex items-center justify-end">
                          <span className="font-medium">{t('viewDetailsBn')}</span>
                          <span className="text-xs ml-1">({t('viewDetails')})</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6">
              <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <h4 className="text-lg font-semibold text-gray-500">{t('noEventsBn')}</h4>
              <p className="text-sm text-gray-400">{t('noEventsDescBn')}</p>
              <p className="text-xs text-gray-400 mt-1">{t('noEventsDesc')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 