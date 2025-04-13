"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, MinusCircle, Star, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

interface Child {
  id: string;
  name: string;
  imageUrl: string;
  grade: string;
  attendance: {
    percentage: number;
    trend: "up" | "down" | "stable";
  };
  subjects: {
    name: string;
    lastScore: number;
    previousScore: number;
    nextExam: string;
  }[];
}

const childrenData: Child[] = [
  {
    id: "1",
    name: "তানিয়া আহমেদ",
    imageUrl: "",
    grade: "দশম শ্রেণী",
    attendance: {
      percentage: 95,
      trend: "up",
    },
    subjects: [
      {
        name: "বাংলা",
        lastScore: 85,
        previousScore: 80,
        nextExam: "২৫ জুলাই",
      },
      {
        name: "ইংরেজি",
        lastScore: 78,
        previousScore: 82,
        nextExam: "২৭ জুলাই",
      },
      {
        name: "গণিত",
        lastScore: 92,
        previousScore: 88,
        nextExam: "৩০ জুলাই",
      },
    ],
  },
  {
    id: "2",
    name: "তানভীর আহমেদ",
    imageUrl: "",
    grade: "অষ্টম শ্রেণী",
    attendance: {
      percentage: 88,
      trend: "down",
    },
    subjects: [
      {
        name: "বাংলা",
        lastScore: 75,
        previousScore: 80,
        nextExam: "২৬ জুলাই",
      },
      {
        name: "ইংরেজি",
        lastScore: 82,
        previousScore: 78,
        nextExam: "২৮ জুলাই",
      },
      {
        name: "বিজ্ঞান",
        lastScore: 88,
        previousScore: 85,
        nextExam: "৩১ জুলাই",
      },
    ],
  },
];

export function ChildPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>সন্তানের শিক্ষা অগ্রগতি</CardTitle>
        <CardDescription>আপনার সন্তানদের সর্বশেষ কার্যকলাপ এবং ফলাফল</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={childrenData[0].id}>
          <TabsList className="w-full justify-start mb-4 overflow-x-auto">
            {childrenData.map((child) => (
              <TabsTrigger key={child.id} value={child.id}>
                {child.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {childrenData.map((child) => (
            <TabsContent key={child.id} value={child.id} className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={child.imageUrl} alt={child.name} />
                  <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{child.name}</h3>
                  <p className="text-sm text-muted-foreground">{child.grade}</p>
                </div>
              </div>
              
              {/* Attendance Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-card rounded-lg border p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">উপস্থিতি</p>
                    <p className="text-lg font-medium">{child.attendance.percentage}%</p>
                  </div>
                  <div className={`rounded-full p-2 ${
                    child.attendance.trend === "up" 
                      ? "bg-green-100 dark:bg-green-900/20" 
                      : child.attendance.trend === "down"
                        ? "bg-red-100 dark:bg-red-900/20" 
                        : "bg-yellow-100 dark:bg-yellow-900/20"
                  }`}>
                    {child.attendance.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400" />
                    ) : child.attendance.trend === "down" ? (
                      <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />
                    ) : (
                      <MinusCircle className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                    )}
                  </div>
                </div>
                
                <div className="bg-card rounded-lg border p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">কোর্স সংখ্যা</p>
                    <p className="text-lg font-medium">{child.subjects.length}</p>
                  </div>
                  <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/20">
                    <BookOpen className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  </div>
                </div>
                
                <div className="bg-card rounded-lg border p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">গড় স্কোর</p>
                    <p className="text-lg font-medium">
                      {Math.round(
                        child.subjects.reduce((acc, subject) => acc + subject.lastScore, 0) / 
                        child.subjects.length
                      )}%
                    </p>
                  </div>
                  <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/20">
                    <Star className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                  </div>
                </div>
              </div>
              
              {/* Subject Performance */}
              <div className="space-y-3 mt-2">
                <h4 className="text-sm font-medium">বিষয়ভিত্তিক ফলাফল</h4>
                {child.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="rounded-full bg-primary/10 p-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{subject.name}</p>
                        <Badge subject={subject} />
                      </div>
                      <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                        <p>সর্বশেষ স্কোর: {subject.lastScore}%</p>
                        <p>পরবর্তী পরীক্ষা: {subject.nextExam}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter>
        <Link 
          href="/dashboard/parent/performance" 
          className="text-sm text-primary hover:underline"
        >
          বিস্তারিত রিপোর্ট দেখুন →
        </Link>
      </CardFooter>
    </Card>
  );
}

function Badge({ subject }: { subject: Child["subjects"][0] }) {
  const diff = subject.lastScore - subject.previousScore;
  
  if (diff > 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
        <TrendingUp className="h-3 w-3 mr-1" />
        +{diff}%
      </span>
    );
  } else if (diff < 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-400">
        <TrendingDown className="h-3 w-3 mr-1" />
        {diff}%
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-400">
        <MinusCircle className="h-3 w-3 mr-1" />
        ±0%
      </span>
    );
  }
} 