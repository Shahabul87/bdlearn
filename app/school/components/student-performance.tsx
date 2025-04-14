"use client";

import { useState } from "react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText,
  BarChart3,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Types
interface Assignment {
  id: string;
  title: string;
  titleBn: string;
  subject: string;
  subjectBn: string;
  dueDate: string;
  status: "completed" | "pending" | "overdue";
}

interface SubjectPerformance {
  id: string;
  subject: string;
  subjectBn: string;
  grade: string;
  percentage: number;
  trend: "up" | "down" | "stable";
  lastGrade: string;
}

interface StudentPerformanceProps {
  studentId: string;
}

export default function StudentPerformance({ studentId }: StudentPerformanceProps) {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "bn">("bn");
  
  // Sample data - In a real app, this would be fetched based on studentId
  const assignments: Assignment[] = [
    {
      id: "assign1",
      title: "Math Homework",
      titleBn: "গণিত হোমওয়ার্ক",
      subject: "Mathematics",
      subjectBn: "গণিত",
      dueDate: "2023-11-15",
      status: "completed"
    },
    {
      id: "assign2",
      title: "Science Project",
      titleBn: "বিজ্ঞান প্রকল্প",
      subject: "Science",
      subjectBn: "বিজ্ঞান",
      dueDate: "2023-11-20",
      status: "pending"
    },
    {
      id: "assign3",
      title: "History Essay",
      titleBn: "ইতিহাস প্রবন্ধ",
      subject: "History",
      subjectBn: "ইতিহাস",
      dueDate: "2023-11-10",
      status: "overdue"
    }
  ];

  const subjectPerformance: SubjectPerformance[] = [
    {
      id: "subj1",
      subject: "Mathematics",
      subjectBn: "গণিত",
      grade: "A",
      percentage: 92,
      trend: "up",
      lastGrade: "B+"
    },
    {
      id: "subj2",
      subject: "Science",
      subjectBn: "বিজ্ঞান",
      grade: "A-",
      percentage: 88,
      trend: "stable",
      lastGrade: "A-"
    },
    {
      id: "subj3",
      subject: "History",
      subjectBn: "ইতিহাস",
      grade: "B+",
      percentage: 85,
      trend: "down",
      lastGrade: "A"
    },
    {
      id: "subj4",
      subject: "Language Arts",
      subjectBn: "ভাষা শিল্প",
      grade: "A",
      percentage: 94,
      trend: "up",
      lastGrade: "A-"
    }
  ];

  // Helper functions
  const getStatusInfo = (status: Assignment["status"]) => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          text: currentLanguage === "bn" ? "সম্পন্ন" : "Completed",
          color: "text-green-500"
        };
      case "pending":
        return {
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          text: currentLanguage === "bn" ? "বাকি আছে" : "Pending",
          color: "text-amber-500"
        };
      case "overdue":
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          text: currentLanguage === "bn" ? "বাকি" : "Overdue",
          color: "text-red-500"
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (currentLanguage === "bn") {
      // Convert to Bengali format
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('bn-BD', options);
    } else {
      // English format
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const getTrendIcon = (trend: SubjectPerformance["trend"]) => {
    switch (trend) {
      case "up":
        return <motion.div initial={{ y: 2 }} animate={{ y: -2 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}>
          <div className="text-green-500">↑</div>
        </motion.div>;
      case "down":
        return <motion.div initial={{ y: -2 }} animate={{ y: 2 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}>
          <div className="text-red-500">↓</div>
        </motion.div>;
      case "stable":
        return <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="text-blue-500">→</div>
        </motion.div>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          {currentLanguage === "bn" ? "শিক্ষার্থীর অগ্রগতি" : "Student Performance"}
        </h3>
      </div>
      
      <Tabs defaultValue="assignments" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="assignments" className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {currentLanguage === "bn" ? "অ্যাসাইনমেন্ট" : "Assignments"}
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-base flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {currentLanguage === "bn" ? "কর্মক্ষমতা" : "Performance"}
          </TabsTrigger>
        </TabsList>
        
        {/* Assignments Tab */}
        <TabsContent value="assignments" className="mt-4">
          <div className="space-y-4">
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <div 
                  key={assignment.id}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all flex justify-between items-center"
                >
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">
                      {currentLanguage === "bn" ? assignment.titleBn : assignment.title}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {currentLanguage === "bn" ? assignment.subjectBn : assignment.subject}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(assignment.dueDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusInfo(assignment.status).icon}
                    <span className={cn("text-sm font-medium", getStatusInfo(assignment.status).color)}>
                      {getStatusInfo(assignment.status).text}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                {currentLanguage === "bn" ? "কোন অ্যাসাইনমেন্ট নেই" : "No assignments found"}
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {subjectPerformance.map((subject) => (
              <div 
                key={subject.id}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">
                    {currentLanguage === "bn" ? subject.subjectBn : subject.subject}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">{subject.grade}</span>
                    {getTrendIcon(subject.trend)}
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${subject.percentage}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>{subject.percentage}%</span>
                  <span className="flex items-center gap-1">
                    {currentLanguage === "bn" ? "পূর্ববর্তী গ্রেড:" : "Previous: "}
                    <span className="font-medium">{subject.lastGrade}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 