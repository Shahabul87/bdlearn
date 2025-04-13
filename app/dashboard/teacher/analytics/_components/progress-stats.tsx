"use client";

import { ArrowLeft, Award, BookOpen, Calendar, Clock, FileCheck, Layout, PieChart, Target, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { QuizResults } from "./quiz-results";
import { useSearchParams } from "next/navigation";
import BloomsTaxonomyDisplay from "./blooms-taxonomy-display";

interface ProgressStatsProps {
  student: any;
  course: any;
  onBack: () => void;
}

export const ProgressStats = ({ student, course, onBack }: ProgressStatsProps) => {
  const [activeTab, setActiveTab] = useState<"progress" | "quiz">("progress");
  const searchParams = useSearchParams();
  
  // Check for tab parameter in URL
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "quiz") {
      setActiveTab("quiz");
    }
  }, [searchParams]);
  
  // In a real application, this data would come from the database
  // For this demo, we'll generate some sample data
  
  // Find all chapters with progress for this student
  const chaptersWithProgress = course.chapters.map((chapter: any) => {
    // Since userProgress doesn't include user directly, we need to check by userId
    const progress = chapter.userProgress.find(
      (p: any) => p.userId === student.id
    );
    
    return {
      ...chapter,
      isCompleted: progress?.isCompleted || false,
      lastAccessed: progress?.updatedAt || null,
      // Generate random time spent (5-60 minutes) for demo
      timeSpent: Math.floor(Math.random() * 56) + 5
    };
  });
  
  // Calculate statistics
  const completedChapters = chaptersWithProgress.filter((c: any) => c.isCompleted).length;
  const totalChapters = chaptersWithProgress.length;
  const completionPercentage = totalChapters > 0 
    ? Math.round((completedChapters / totalChapters) * 100)
    : 0;
  
  const totalTimeSpent = chaptersWithProgress.reduce(
    (total: number, chapter: any) => total + chapter.timeSpent, 0
  );
  
  // Calculate performance metrics (demo data)
  const quizScores = [
    { quiz: "Quiz 1: Introduction", score: 85, maxScore: 100 },
    { quiz: "Quiz 2: Fundamentals", score: 92, maxScore: 100 },
    { quiz: "Midterm Assessment", score: 78, maxScore: 100 },
    { quiz: "Quiz 3: Advanced Concepts", score: 88, maxScore: 100 },
  ];
  
  const averageQuizScore = quizScores.reduce(
    (total, quiz) => total + (quiz.score / quiz.maxScore) * 100, 0
  ) / quizScores.length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="p-2 mr-4 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            শিক্ষার্থী বিশ্লেষণ
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Student Analytics - {course.title}
          </p>
        </div>
      </div>
      
      {/* Student Overview */}
      <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl mb-8 flex items-center">
        <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
          {student.image ? (
            <Image 
              src={student.image} 
              alt={student.name || "Student"} 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-indigo-100 text-indigo-600 text-2xl font-bold">
              {student.name?.charAt(0) || "S"}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {student.name}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <User className="w-4 h-4 mr-1" />
            <span className="text-sm">{student.email}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">
              ভর্তির তারিখ: {new Date(student.enrollmentDate).toLocaleDateString('bn-BD', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
        
        <div className="ml-4 text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <span className="text-4xl font-bold text-indigo-600">{student.grade}</span>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">বর্তমান গ্রেড</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">Current Grade</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          <button
            className={cn(
              "px-6 py-2.5 text-sm font-medium",
              "focus:outline-none",
              activeTab === "progress"
                ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-300 dark:border-indigo-300"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
            onClick={() => setActiveTab("progress")}
          >
            <div className="flex items-center">
              <PieChart className="w-4 h-4 mr-2" />
              <span>অগ্রগতি বিশ্লেষণ</span>
            </div>
            <span className="block text-xs mt-0.5 text-gray-500 dark:text-gray-400">
              Progress Analysis
            </span>
          </button>
          
          <button
            className={cn(
              "px-6 py-2.5 text-sm font-medium",
              "focus:outline-none",
              activeTab === "quiz"
                ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-300 dark:border-indigo-300"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
            onClick={() => setActiveTab("quiz")}
          >
            <div className="flex items-center">
              <Layout className="w-4 h-4 mr-2" />
              <span>কুইজ ফলাফল</span>
            </div>
            <span className="block text-xs mt-0.5 text-gray-500 dark:text-gray-400">
              Quiz Results
            </span>
          </button>
        </div>
      </div>
      
      {activeTab === "progress" ? (
        <>
          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mr-4">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">সম্পূর্ণতা</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Completion Rate</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{completionPercentage}%</p>
                </div>
              </div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="h-2.5 rounded-full bg-blue-600"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mr-4">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">গড় স্কোর</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Average Score</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{Math.round(averageQuizScore)}%</p>
                </div>
              </div>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="h-2.5 rounded-full bg-green-600"
                  style={{ width: `${averageQuizScore}%` }}
                />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 mr-4">
                  <FileCheck size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">সম্পন্ন অধ্যায়</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Completed Chapters</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{completedChapters}/{totalChapters}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <BookOpen className="w-4 h-4 mr-1 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  {student.completionPercentage < 100 ? 
                    `${totalChapters - completedChapters} টি অধ্যায় বাকি আছে` : 
                    "সমস্ত অধ্যায় সম্পন্ন হয়েছে"
                  }
                </span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 mr-4">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">ব্যয় করা সময়</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Time Spent</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">{totalTimeSpent} মিনিট</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <PieChart className="w-4 h-4 mr-1 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  গড় {Math.round(totalTimeSpent / totalChapters)} মিনিট/অধ্যায়
                </span>
              </div>
            </div>
          </div>
          
          {/* Chapter Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
              অধ্যায় অনুযায়ী অগ্রগতি
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Chapter-wise Progress
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">অধ্যায়</th>
                    <th scope="col" className="px-6 py-3">অবস্থা</th>
                    <th scope="col" className="px-6 py-3">সময় ব্যয়</th>
                    <th scope="col" className="px-6 py-3">সর্বশেষ অ্যাকসেস</th>
                  </tr>
                </thead>
                <tbody>
                  {chaptersWithProgress.map((chapter: any) => (
                    <tr key={chapter.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {chapter.title}
                      </td>
                      <td className="px-6 py-4">
                        {chapter.isCompleted ? (
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            সম্পন্ন
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                            চলমান
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {chapter.timeSpent} মিনিট
                      </td>
                      <td className="px-6 py-4">
                        {chapter.lastAccessed ? (
                          new Date(chapter.lastAccessed).toLocaleDateString('bn-BD', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        ) : (
                          <span className="text-gray-400">--</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Bloom's Taxonomy Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
              ব্লুমস ট্যাক্সোনমি বিশ্লেষণ
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Bloom&apos;s Taxonomy Analysis - Student&apos;s Cognitive Skills Evaluation
            </p>
            
            <BloomsTaxonomyDisplay 
              courseId={course.id} 
              studentId={student.id} 
            />
          </div>
        </>
      ) : (
        <QuizResults student={student} course={course} />
      )}
    </div>
  );
}; 