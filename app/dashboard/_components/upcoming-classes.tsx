"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Video } from "lucide-react";
import Link from "next/link";

interface UpcomingClass {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  teacher: string;
  isLive: boolean;
}

const upcomingClassesData: UpcomingClass[] = [
  {
    id: "1",
    title: "গণিত: বীজগণিতীয় সূত্রাবলি",
    subject: "গণিত",
    date: "২০ জুলাই, ২০২৩",
    time: "সকাল ১০:৩০",
    teacher: "তানভীর আহমেদ",
    isLive: false,
  },
  {
    id: "2",
    title: "পদার্থবিজ্ঞান: তাপগতিবিদ্যা",
    subject: "পদার্থবিজ্ঞান",
    date: "২১ জুলাই, ২০২৩",
    time: "দুপুর ১২:০০",
    teacher: "ফারহানা হক",
    isLive: true,
  },
  {
    id: "3",
    title: "ইংরেজি: গ্রামার এবং কম্পোজিশন",
    subject: "ইংরেজি",
    date: "২২ জুলাই, ২০২৩",
    time: "বিকাল ৩:০০",
    teacher: "মাহমুদুল হাসান",
    isLive: false,
  },
];

export function UpcomingClasses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>আসন্ন ক্লাসসমূহ</CardTitle>
        <CardDescription>আপনার আগামী ক্লাসগুলো দেখুন</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingClassesData.map((classItem) => (
          <UpcomingClassItem key={classItem.id} classItem={classItem} />
        ))}
      </CardContent>
      <CardFooter>
        <Link 
          href="/dashboard/student/classes" 
          className="text-sm text-primary hover:underline"
        >
          সকল ক্লাস দেখুন →
        </Link>
      </CardFooter>
    </Card>
  );
}

function UpcomingClassItem({ classItem }: { classItem: UpcomingClass }) {
  return (
    <div className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
      <div className={cn(
        "rounded-md p-2 flex-shrink-0",
        classItem.isLive 
          ? "bg-red-100 dark:bg-red-900/20" 
          : "bg-blue-100 dark:bg-blue-900/20"
      )}>
        <Video className={cn(
          "h-5 w-5",
          classItem.isLive 
            ? "text-red-500 dark:text-red-400" 
            : "text-blue-500 dark:text-blue-400"
        )} />
      </div>
      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">{classItem.title}</p>
          {classItem.isLive && (
            <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-xs font-medium text-red-700 dark:text-red-400">
              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
              লাইভ
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">শিক্ষক: {classItem.teacher}</p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{classItem.date}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{classItem.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 