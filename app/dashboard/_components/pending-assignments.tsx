"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, FileClock, FileText } from "lucide-react";
import Link from "next/link";

interface Assignment {
  id: string;
  title: string;
  course: string;
  submittedCount: number;
  totalStudents: number;
  dueDate: string;
  isPriority: boolean;
}

const pendingAssignmentsData: Assignment[] = [
  {
    id: "1",
    title: "জলবায়ু পরিবর্তন নিবন্ধ",
    course: "পরিবেশ বিজ্ঞান",
    submittedCount: 25,
    totalStudents: 35,
    dueDate: "২ দিন বাকি",
    isPriority: true,
  },
  {
    id: "2",
    title: "অঙ্কন প্রকল্প - মডেল নির্মাণ",
    course: "শিল্পকলা",
    submittedCount: 18,
    totalStudents: 30,
    dueDate: "৫ দিন বাকি",
    isPriority: false,
  },
  {
    id: "3",
    title: "স্বাধীনতা যুদ্ধের ওপর প্রবন্ধ",
    course: "বাংলাদেশের ইতিহাস",
    submittedCount: 40,
    totalStudents: 45,
    dueDate: "৭ দিন বাকি",
    isPriority: false,
  },
];

export function PendingAssignments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>অনিষ্পন্ন মূল্যায়ন</CardTitle>
        <CardDescription>শিক্ষার্থীদের জমা দেওয়া অ্যাসাইনমেন্ট মূল্যায়ন করুন</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {pendingAssignmentsData.map((assignment) => (
          <AssignmentItem key={assignment.id} assignment={assignment} />
        ))}
      </CardContent>
      <CardFooter>
        <Link 
          href="/dashboard/teacher/assignments" 
          className="text-sm text-primary hover:underline"
        >
          সকল অ্যাসাইনমেন্ট দেখুন →
        </Link>
      </CardFooter>
    </Card>
  );
}

function AssignmentItem({ assignment }: { assignment: Assignment }) {
  const completionPercentage = Math.round((assignment.submittedCount / assignment.totalStudents) * 100);
  
  return (
    <div className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
      <div className="rounded-md bg-amber-100 dark:bg-amber-900/20 p-2 flex-shrink-0">
        <FileClock className="h-5 w-5 text-amber-500 dark:text-amber-400" />
      </div>
      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm">{assignment.title}</p>
            {assignment.isPriority && (
              <Badge variant="destructive" className="text-[10px] px-1 py-0">জরুরি</Badge>
            )}
          </div>
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
            {assignment.dueDate}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">কোর্স: {assignment.course}</p>
        
        <div className="mt-2 space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">অগ্রগতি: {completionPercentage}%</span>
            <span className="text-muted-foreground">{assignment.submittedCount}/{assignment.totalStudents}</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-3">
          <Button variant="outline" size="sm" className="w-full text-xs">
            <FileCheck className="h-3.5 w-3.5 mr-1" />
            মূল্যায়ন করুন
          </Button>
        </div>
      </div>
    </div>
  );
} 