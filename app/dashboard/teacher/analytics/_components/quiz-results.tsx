"use client";

import { 
  BarChart2, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  FileBarChart, 
  HelpCircle, 
  X 
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import BloomsTaxonomyAnalysis from "./blooms-taxonomy-analysis";

interface QuizResultsProps {
  student?: any;
  course: any;
}

// Generate dummy quiz data for testing
const generateQuizData = (courseId: string, studentId?: string) => {
  // Quiz templates by course
  const quizTemplates = {
    "course-1": [
      {
        id: "quiz-1-1",
        title: "HTML এবং CSS কুইজ",
        englishTitle: "HTML and CSS Quiz",
        totalQuestions: 5,
        totalMarks: 10,
        durationMinutes: 20,
        chapter: "অধ্যায় 1: পরিচিতি"
      },
      {
        id: "quiz-1-2",
        title: "জাভাস্ক্রিপ্ট মৌলিক",
        englishTitle: "JavaScript Fundamentals",
        totalQuestions: 8,
        totalMarks: 16,
        durationMinutes: 30,
        chapter: "অধ্যায় 2: মৌলিক ধারণা"
      }
    ],
    "course-2": [
      {
        id: "quiz-2-1",
        title: "পাইথন পরিচিতি",
        englishTitle: "Introduction to Python",
        totalQuestions: 6,
        totalMarks: 12,
        durationMinutes: 25,
        chapter: "অধ্যায় 1: পরিচিতি"
      },
      {
        id: "quiz-2-2",
        title: "ডাটা এনালিসিস",
        englishTitle: "Data Analysis",
        totalQuestions: 10,
        totalMarks: 20,
        durationMinutes: 35,
        chapter: "অধ্যায় 3: উন্নত প্রযুক্তি"
      }
    ],
    "course-3": [
      {
        id: "quiz-3-1",
        title: "মোবাইল অ্যাপ ডেজাইন",
        englishTitle: "Mobile App Design",
        totalQuestions: 7,
        totalMarks: 14,
        durationMinutes: 30,
        chapter: "অধ্যায় 2: মৌলিক ধারণা"
      }
    ]
  } as any;

  // Generate question templates for each quiz
  const questionTemplates = {
    "quiz-1-1": [
      {
        question: "HTML এর পূর্ণরূপ কি?",
        options: [
          "Hyper Text Markup Language",
          "Hyperlinks and Text Markup Language",
          "Home Tool Markup Language",
          "Hyper Tool Multi Language"
        ],
        correctAnswer: 0
      },
      {
        question: "CSS এর পূর্ণরূপ কি?",
        options: [
          "Colorful Style Sheets",
          "Computer Style Sheets",
          "Cascading Style Sheets",
          "Creative Style Sheets"
        ],
        correctAnswer: 2
      },
      {
        question: "HTML এলিমেন্ট ট্যাগ কোন চিহ্ন দিয়ে শুরু ও শেষ হয়?",
        options: [
          "/ /",
          "< >",
          "{ }",
          "[ ]"
        ],
        correctAnswer: 1
      },
      {
        question: "অ্যাট্রিবিউট এবং এলিমেন্টের মধ্যে পার্থক্য কি?",
        options: [
          "কোন পার্থক্য নেই",
          "অ্যাট্রিবিউট এলিমেন্টের অতিরিক্ত বৈশিষ্ট্য",
          "এলিমেন্ট অ্যাট্রিবিউটের অতিরিক্ত বৈশিষ্ট্য",
          "এরা সম্পূর্ণ ভিন্ন জিনিস"
        ],
        correctAnswer: 1
      },
      {
        question: "CSS সিলেক্টর হিসেবে # চিহ্ন কি নির্দেশ করে?",
        options: [
          "ক্লাস",
          "ট্যাগ",
          "আইডি",
          "এট্রিবিউট"
        ],
        correctAnswer: 2
      }
    ],
    "quiz-1-2": [
      {
        question: "জাভাস্ক্রিপ্টে ভেরিয়েবল ডিক্লেয়ার করতে কোন কীওয়ার্ড ব্যবহার করা হয়?",
        options: [
          "var, let, const",
          "string, int, bool",
          "define, variable, v",
          "declare, def, dim"
        ],
        correctAnswer: 0
      },
      {
        question: "জাভাস্ক্রিপ্টে অবজেক্ট তৈরি করতে কোন ব্র্যাকেট ব্যবহার করা হয়?",
        options: [
          "[]",
          "{}",
          "()",
          "<>"
        ],
        correctAnswer: 1
      },
      {
        question: "জাভাস্ক্রিপ্টে কনসোলে আউটপুট দেখতে কোন মেথড ব্যবহার করা হয়?",
        options: [
          "console.print()",
          "console.write()",
          "console.log()",
          "console.output()"
        ],
        correctAnswer: 2
      }
    ]
  } as any;

  // Generate all quizzes for the course
  const courseQuizzes = (quizTemplates[courseId] || []).map((quizTemplate: any) => {
    const questions = (questionTemplates[quizTemplate.id] || []).map((q: any, qIndex: number) => {
      let studentAnswer = -1;
      
      // For specific student, generate answers with 70% chance of correctness
      if (studentId) {
        if (Math.random() < 0.7) {
          studentAnswer = q.correctAnswer;
        } else {
          // Generate a wrong answer
          const wrongOptions = [0, 1, 2, 3].filter(opt => opt !== q.correctAnswer);
          studentAnswer = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        }
      }
      
      return {
        ...q,
        id: `${quizTemplate.id}-q${qIndex + 1}`,
        studentAnswer: studentAnswer,
        isCorrect: studentAnswer === q.correctAnswer,
        timeTaken: Math.floor(Math.random() * 60) + 20 // 20-80 seconds per question
      };
    });
    
    const totalCorrect = questions.filter((q: any) => q.isCorrect).length;
    const totalScore = totalCorrect * 2; // 2 points per correct answer
    
    return {
      ...quizTemplate,
      questions,
      totalCorrect,
      totalScore,
      percentage: Math.round((totalScore / quizTemplate.totalMarks) * 100),
      // Random date in the last 30 days
      date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))
    };
  });
  
  return {
    quizzes: courseQuizzes,
    classAverages: courseQuizzes.map((quiz: any) => ({
      id: quiz.id,
      avgScore: Math.round(quiz.percentage * 0.9) // Slightly lower than this student
    }))
  };
};

export const QuizResults = ({ student, course }: QuizResultsProps) => {
  const [expandedQuizzes, setExpandedQuizzes] = useState<string[]>([]);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [showBloomsAnalysis, setShowBloomsAnalysis] = useState<boolean>(true);

  // Get quiz data based on whether we're displaying for a specific student or all students
  const quizData = generateQuizData(course.id, student?.id);
  const { quizzes, classAverages } = quizData;

  const toggleQuiz = (quizId: string) => {
    if (expandedQuizzes.includes(quizId)) {
      setExpandedQuizzes(expandedQuizzes.filter((id) => id !== quizId));
    } else {
      setExpandedQuizzes([...expandedQuizzes, quizId]);
      setExpandedQuestions([]);
    }
  };

  const toggleQuestion = (questionId: string) => {
    if (expandedQuestions.includes(questionId)) {
      setExpandedQuestions(expandedQuestions.filter((id) => id !== questionId));
    } else {
      setExpandedQuestions([...expandedQuestions, questionId]);
    }
  };

  // Overall class statistics
  const calculateOverallStats = () => {
    if (quizzes.length === 0) return { avgScore: 0, highestScore: 0, lowestScore: 0 };
    
    const scores = quizzes.map((quiz: any) => quiz.percentage);
    const avgScore = scores.reduce((a: number, b: number) => a + b, 0) / scores.length;
    
    return {
      avgScore: Math.round(avgScore),
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores)
    };
  };
  
  const stats = calculateOverallStats();

  return (
    <div className="space-y-8">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mr-4">
              <FileBarChart size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">মোট কুইজ</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Quizzes</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{quizzes.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mr-4">
              <Check size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">গড় স্কোর</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Average Score</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.avgScore}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 mr-4">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">গড় সময়</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Average Time</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{Math.round(quizzes.reduce((total: number, quiz: any) => total + quiz.durationMinutes, 0) / quizzes.length)} মিনিট</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bloom's Taxonomy Analysis */}
      {showBloomsAnalysis && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                ব্লুমস ট্যাক্সোনমি ভিত্তিক বিশ্লেষণ
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bloom&apos;s Taxonomy-based Analysis of Cognitive Skills
              </p>
            </div>
            <button
              onClick={() => setShowBloomsAnalysis(!showBloomsAnalysis)}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {showBloomsAnalysis ? 'সংকুচিত করুন' : 'বিস্তৃত করুন'}
            </button>
          </div>
          
          <BloomsTaxonomyAnalysis 
            courseId={course.id} 
            studentId={student?.id} 
          />
        </div>
      )}

      {/* Quiz List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
            কুইজের তালিকা
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Quiz List and Detailed Results
          </p>
        </div>
        
        <div className="p-4 space-y-4">
          {quizzes.length === 0 ? (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                কোন কুইজ পাওয়া যায়নি
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No quizzes found for this course
              </p>
            </div>
          ) : (
            quizzes.map((quiz: any) => (
              <div key={quiz.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div 
                  className={cn(
                    "flex items-center justify-between cursor-pointer p-4",
                    expandedQuizzes.includes(quiz.id) 
                      ? "bg-indigo-50 dark:bg-indigo-900/20 border-b border-gray-200 dark:border-gray-700"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  )}
                  onClick={() => toggleQuiz(quiz.id)}
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {quiz.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-600 dark:text-gray-400">
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                        {quiz.chapter}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {quiz.durationMinutes} মিনিট
                      </span>
                      <span>
                        {quiz.totalQuestions} প্রশ্ন
                      </span>
                      <span>
                        {quiz.totalMarks} নম্বর
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right mr-2">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {quiz.totalScore}/{quiz.totalMarks}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {quiz.percentage}%
                      </div>
                    </div>
                    
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                      {expandedQuizzes.includes(quiz.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                
                {expandedQuizzes.includes(quiz.id) && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                    {/* Quiz overview */}
                    <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            মোট সঠিক উত্তর
                          </div>
                          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
                            {quiz.totalCorrect}/{quiz.totalQuestions}
                          </div>
                        </div>
                        
                        <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            ক্লাসের গড় স্কোর
                          </div>
                          <div className="text-xl font-bold text-amber-600 dark:text-amber-300">
                            {classAverages.find((ca: any) => ca.id === quiz.id)?.avgScore}%
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="text-gray-500 dark:text-gray-400">প্রাপ্ত নম্বর</span>
                          <span className="font-medium text-indigo-600 dark:text-indigo-400">
                            {quiz.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div 
                            className={cn(
                              "h-2.5 rounded-full",
                              quiz.percentage >= 80 ? "bg-green-500" :
                              quiz.percentage >= 60 ? "bg-blue-500" :
                              quiz.percentage >= 40 ? "bg-amber-500" :
                              "bg-red-500"
                            )}
                            style={{ width: `${quiz.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Questions */}
                    <h5 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2">
                      প্রশ্ন এবং উত্তর
                    </h5>
                    
                    <div className="space-y-3">
                      {quiz.questions.map((question: any, qIndex: number) => (
                        <div 
                          key={question.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                        >
                          <div 
                            className={cn(
                              "flex items-center cursor-pointer p-3",
                              question.isCorrect 
                                ? "bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500"
                                : "bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500"
                            )}
                            onClick={() => toggleQuestion(question.id)}
                          >
                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full mr-3 bg-white dark:bg-gray-700 shadow-sm">
                              <span className="text-sm font-bold">{qIndex + 1}</span>
                            </div>
                            
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {question.question}
                              </p>
                            </div>
                            
                            <div className="flex items-center ml-2">
                              {question.isCorrect ? (
                                <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                                  <Check className="w-4 h-4" />
                                </div>
                              ) : (
                                <div className="p-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600">
                                  <X className="w-4 h-4" />
                                </div>
                              )}
                              <div className="w-5 h-5 flex items-center justify-center ml-3">
                                {expandedQuestions.includes(question.id) ? (
                                  <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {expandedQuestions.includes(question.id) && (
                            <div className="p-4 bg-white dark:bg-gray-800">
                              <div className="space-y-2">
                                {question.options.map((option: string, oIndex: number) => (
                                  <div 
                                    key={oIndex}
                                    className={cn(
                                      "p-2 text-sm rounded-md flex items-center",
                                      question.correctAnswer === oIndex
                                        ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                                        : question.studentAnswer === oIndex && !question.isCorrect
                                          ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                                          : "bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                                    )}
                                  >
                                    <div className="w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center mr-2 bg-white dark:bg-gray-700 shadow-sm">
                                      <span className="text-xs">{String.fromCharCode(65 + oIndex)}</span>
                                    </div>
                                    
                                    <span>{option}</span>
                                    
                                    {question.correctAnswer === oIndex && (
                                      <div className="ml-auto p-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                                        <Check className="w-3 h-3" />
                                      </div>
                                    )}
                                    
                                    {question.studentAnswer === oIndex && !question.isCorrect && (
                                      <div className="ml-auto p-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600">
                                        <X className="w-3 h-3" />
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              
                              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                সময় নেয়া হয়েছে: {question.timeTaken} সেকেন্ড
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}; 