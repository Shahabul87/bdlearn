"use client";

import { useState, useEffect } from "react";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { ChevronDown, Users, BookOpen, BarChart2, Eye, ChevronRight, PieChart, Award, Info, PlusCircle, FileBarChart, Zap, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { StudentTable } from "./student-table";
// Import using dynamic import to avoid module resolution issues
import dynamic from "next/dynamic";
const ProgressStats = dynamic(() => import("./progress-stats").then(mod => mod.ProgressStats));
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { QuizResults } from "./quiz-results";
import BloomsTaxonomyAnalysis from "./blooms-taxonomy-analysis";

interface TeacherAnalyticsContentProps {
  courses: any[];
  teacherId: string;
}

export const TeacherAnalyticsContent = ({ 
  courses,
  teacherId 
}: TeacherAnalyticsContentProps) => {
  const [selectedCourse, setSelectedCourse] = useState<any>(courses[0] || null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showStudentStats, setShowStudentStats] = useState(false);
  const [directQuizView, setDirectQuizView] = useState(false);
  const [bloomsView, setBloomsView] = useState(false);
  const searchParams = useSearchParams();

  // Check for tab parameter in URL
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const courseIdParam = searchParams.get("courseId");
    const studentIdParam = searchParams.get("studentId");
    
    if (tabParam === "quiz") {
      setDirectQuizView(true);
      setBloomsView(false);
    } else if (tabParam === "blooms") {
      setBloomsView(true);
      setDirectQuizView(false);
      
      // If courseId and studentId are specified, select that course and student
      if (courseIdParam) {
        const course = courses.find(c => c.id === courseIdParam);
        if (course) {
          setSelectedCourse(course);
          
          if (studentIdParam) {
            const student = course.enrollments.find(
              (enrollment: any) => enrollment.user.id === studentIdParam
            )?.user;
            
            if (student) {
              setSelectedStudent(student);
            }
          }
        }
      }
    } else if (tabParam === "progress" || !tabParam) {
      // Reset both view states for progress tab
      setDirectQuizView(false);
      setBloomsView(false);
    }
  }, [searchParams, courses]);

  const totalStudents = courses.reduce((acc, course) => 
    acc + course.enrollments.length, 0
  );

  // Calculate overall course progress statistics
  const avgProgressByStudents = courses.map(course => {
    const enrollments = course.enrollments || [];
    const chapters = course.chapters || [];
    
    if (enrollments.length === 0 || chapters.length === 0) return 0;
    
    let totalCompletionPercentage = 0;
    
    enrollments.forEach((enrollment: any) => {
      const student = enrollment.user;
      let completedChapters = 0;
      
      chapters.forEach((chapter: any) => {
        const userProgress = chapter.userProgress.find(
          (progress: any) => progress.userId === student.id
        );
        
        if (userProgress?.isCompleted) {
          completedChapters++;
        }
      });
      
      const completionPercentage = chapters.length > 0 
        ? (completedChapters / chapters.length) * 100 
        : 0;
      
      totalCompletionPercentage += completionPercentage;
    });
    
    return enrollments.length > 0 
      ? Math.round(totalCompletionPercentage / enrollments.length) 
      : 0;
  });

  // Calculate overall average progress
  const overallAvgProgress = Math.round(
    avgProgressByStudents.reduce((sum, progress, index) => {
      return sum + progress * (courses[index].enrollments.length || 0);
    }, 0) / totalStudents
  ) || 0;

  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course);
    setSelectedStudent(null);
    setShowStudentStats(false);
  };

  const handleViewStudentStats = (student: any) => {
    setSelectedStudent(student);
    setShowStudentStats(true);
  };

  const handleBackToStudents = () => {
    setShowStudentStats(false);
  };

  // Check if data is likely dummy data
  const isDummyData = courses.some(course => course.id.startsWith('course-'));

  return (
    <SidebarDemo>
      <div className="pt-8 mt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-3xl font-bold text-white mb-1.5">
              {bloomsView ? "ব্লুমস ট্যাক্সোনমি বিশ্লেষণ" : 
               directQuizView ? "কুইজ ফলাফল" : 
               "শিক্ষার্থী বিশ্লেষণ"}
            </h1>
            <p className="text-lg text-white/90 mb-1">
              {bloomsView ? "ব্লুমস ট্যাক্সোনমি অনুযায়ী শিক্ষার্থীদের জ্ঞানীয় দক্ষতার বিশ্লেষণ" :
               directQuizView ? "আপনার সকল কোর্সের কুইজ এবং শিক্ষার্থীদের ফলাফল দেখুন" :
               "আপনার সকল কোর্সের অগ্রগতি এবং শিক্ষার্থীদের ফলাফল দেখুন"}
            </p>
            <p className="text-sm text-white/70">
              {bloomsView ? "Bloom's Taxonomy Analysis - Evaluate students' cognitive skills" :
               directQuizView ? "Quiz Results - View quiz results of all your courses and students" :
               "Student Analytics - View progress and results of all your students"}
            </p>
          </div>

          {/* Dummy data notification if applicable */}
          {isDummyData && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-lg dark:bg-amber-900/20 dark:text-amber-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <span className="font-medium">ডেমো ডাটা প্রদর্শিত হচ্ছে!</span> এই বিশ্লেষণগুলি শিক্ষার্থীদের উদাহরণ ডাটা দিয়ে তৈরি করা হয়েছে। আপনার একাউন্টে কোন প্রকৃত কোর্স না থাকায় ডেমো ডাটা দেখানো হচ্ছে।
                  </p>
                  <p className="text-xs mt-1 text-amber-700 dark:text-amber-300">
                    Demo data is being displayed! These analytics are created with sample student data. You&apos;re seeing demo data because your account doesn&apos;t have any actual courses yet.
                  </p>
                  <div className="mt-2">
                    <Link 
                      href="/dashboard/teacher/create" 
                      className="inline-flex items-center text-sm font-medium text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-100 underline"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      কোর্স তৈরি করুন (Create a course)
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <Link
                href="/dashboard/teacher/analytics?tab=progress"
                className={cn(
                  "px-6 py-2.5 text-sm font-medium focus:outline-none",
                  !directQuizView && !bloomsView 
                    ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-300 dark:border-indigo-300" 
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
              >
                <div className="flex items-center">
                  <PieChart className="w-4 h-4 mr-2" />
                  <span>অগ্রগতি বিশ্লেষণ</span>
                </div>
                <span className="block text-xs mt-0.5 text-gray-500 dark:text-gray-400">
                  Progress Analysis
                </span>
              </Link>
              
              <Link 
                href="/dashboard/teacher/analytics?tab=quiz"
                className={cn(
                  "px-6 py-2.5 text-sm font-medium focus:outline-none",
                  directQuizView 
                    ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-300 dark:border-indigo-300" 
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
              >
                <div className="flex items-center">
                  <FileBarChart className="w-4 h-4 mr-2" />
                  <span>কুইজ ফলাফল</span>
                </div>
                <span className="block text-xs mt-0.5 text-gray-500 dark:text-gray-400">
                  Quiz Results
                </span>
              </Link>
              
              <Link 
                href="/dashboard/teacher/analytics?tab=blooms"
                className={cn(
                  "px-6 py-2.5 text-sm font-medium focus:outline-none",
                  bloomsView 
                    ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-300 dark:border-indigo-300" 
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
              >
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>ব্লুমস ট্যাক্সোনমি</span>
                </div>
                <span className="block text-xs mt-0.5 text-gray-500 dark:text-gray-400">
                  Bloom&apos;s Taxonomy
                </span>
              </Link>
            </div>
          </div>

          {bloomsView ? (
            <>
              {/* Course Selection for Bloom's View */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    ব্লুমস ট্যাক্সোনমি ভিত্তিক বিশ্লেষণ
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {selectedStudent ? 
                      `${selectedStudent.name} - Bloom's Taxonomy-based Analysis` : 
                      "Bloom's Taxonomy-based Analysis by Course"}
                  </p>
                  
                  {!selectedStudent && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {courses.map((course) => (
                        <div 
                          key={course.id}
                          onClick={() => handleCourseSelect(course)}
                          className={cn(
                            "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                            selectedCourse?.id === course.id 
                              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                              : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 mr-3">
                                <BookOpen size={20} />
                              </div>
                              <div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                  {course.title}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {course.enrollments.length} শিক্ষার্থী
                                </p>
                              </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Bloom's Taxonomy Analysis */}
              {selectedCourse && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="p-6">
                    {selectedStudent ? (
                      <>
                        <div className="flex items-center mb-6">
                          <button 
                            onClick={() => setSelectedStudent(null)}
                            className="p-2 mr-4 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                          >
                            <ArrowLeft size={20} />
                          </button>
                          
                          <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              {selectedStudent.name} - ব্লুমস ট্যাক্সোনমি বিশ্লেষণ
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Cognitive Skills Evaluation - {selectedCourse.title}
                            </p>
                          </div>
                        </div>
                        
                        <BloomsTaxonomyAnalysis 
                          courseId={selectedCourse.id} 
                          studentId={selectedStudent.id}
                        />
                      </>
                    ) : (
                      <BloomsTaxonomyAnalysis courseId={selectedCourse.id} />
                    )}
                  </div>
                </div>
              )}
            </>
          ) : directQuizView ? (
            <>
              {/* Course Selection for Quiz View */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    কোর্স অনুযায়ী কুইজ ফলাফল
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    View quiz results by course
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                      <div 
                        key={course.id}
                        onClick={() => handleCourseSelect(course)}
                        className={cn(
                          "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                          selectedCourse?.id === course.id 
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                            : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-2 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 mr-3">
                              <BookOpen size={20} />
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                {course.title}
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {course.enrollments.length} শিক্ষার্থী
                              </p>
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Quiz Results */}
              {selectedCourse && (
                <QuizResults course={selectedCourse} />
              )}
            </>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mr-4">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">কোর্স সংখ্যা</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Courses</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">{courses.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 mr-4">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">শিক্ষার্থী সংখ্যা</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Students</p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">{totalStudents}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 mr-4">
                      <BarChart2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">গড় অগ্রগতি</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Average Progress</p>
                      <p className="text-2xl font-bold text-emerald-600 mt-1">{overallAvgProgress}%</p>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div 
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: `${overallAvgProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                {!showStudentStats ? (
                  <>
                    {/* Course Selection */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        কোর্স অনুযায়ী শিক্ষার্থী দেখুন
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        View students by course
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courses.map((course) => (
                          <div 
                            key={course.id}
                            onClick={() => handleCourseSelect(course)}
                            className={cn(
                              "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                              selectedCourse?.id === course.id 
                                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                                : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="p-2 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 mr-3">
                                  <BookOpen size={20} />
                                </div>
                                <div>
                                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                                    {course.title}
                                  </h3>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {course.enrollments.length} শিক্ষার্থী
                                  </p>
                                </div>
                              </div>
                              <ChevronRight size={18} className="text-gray-400" />
                            </div>
                            
                            {/* Add a progress bar for each course */}
                            <div className="mt-3">
                              <div className="flex justify-between items-center text-xs mb-1">
                                <span className="text-gray-500 dark:text-gray-400">শিক্ষার্থী অগ্রগতি:</span>
                                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                  {avgProgressByStudents[courses.indexOf(course)]}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                <div 
                                  className="h-1.5 rounded-full bg-indigo-500"
                                  style={{ width: `${avgProgressByStudents[courses.indexOf(course)]}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Student List */}
                    {selectedCourse && (
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              শিক্ষার্থীদের তালিকা
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Student List - {selectedCourse.title}
                            </p>
                          </div>
                        </div>
                        
                        <StudentTable 
                          course={selectedCourse} 
                          onViewStats={handleViewStudentStats}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <ProgressStats 
                    student={selectedStudent} 
                    course={selectedCourse} 
                    onBack={handleBackToStudents}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </SidebarDemo>
  );
}; 