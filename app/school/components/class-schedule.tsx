"use client";

import React, { useState } from "react";
import { useLanguage, LanguageText } from "./language-provider";
import { Calendar, Clock, BookOpen, Trophy, GraduationCap } from "lucide-react";

// Subject type definition
interface Subject {
  id: string;
  nameBn: string;
  nameEn: string;
  time: string;
  teacher: {
    nameBn: string;
    nameEn: string;
  };
  room: string;
  color: string;
}

// Day type definition
interface Day {
  id: string;
  nameBn: string;
  nameEn: string;
  subjects: Subject[];
}

export function ClassSchedule({ classLevel, section }: { classLevel: string; section: string }) {
  const { language } = useLanguage();
  const [activeDay, setActiveDay] = useState("sunday");

  // Sample schedule data - in a real app, this would come from an API
  const days: Day[] = [
    {
      id: "sunday",
      nameEn: "Sunday",
      nameBn: "রবিবার",
      subjects: [
        {
          id: "sub1",
          nameEn: "Bengali",
          nameBn: "বাংলা",
          time: "9:00 - 9:45",
          teacher: {
            nameEn: "Rahima Begum",
            nameBn: "রাহিমা বেগম"
          },
          room: "101",
          color: "bg-blue-100 border-blue-300"
        },
        {
          id: "sub2",
          nameEn: "Mathematics",
          nameBn: "গণিত",
          time: "10:00 - 10:45",
          teacher: {
            nameEn: "Kamal Hossain",
            nameBn: "কামাল হোসেন"
          },
          room: "102",
          color: "bg-purple-100 border-purple-300"
        },
        {
          id: "sub3",
          nameEn: "Science",
          nameBn: "বিজ্ঞান",
          time: "11:00 - 11:45",
          teacher: {
            nameEn: "Nasreen Ahmed",
            nameBn: "নাসরিন আহমেদ"
          },
          room: "Lab 2",
          color: "bg-green-100 border-green-300"
        },
        {
          id: "sub4",
          nameEn: "English",
          nameBn: "ইংরেজি",
          time: "12:00 - 12:45",
          teacher: {
            nameEn: "Mohammad Ali",
            nameBn: "মোহাম্মদ আলী"
          },
          room: "103",
          color: "bg-amber-100 border-amber-300"
        }
      ]
    },
    {
      id: "monday",
      nameEn: "Monday",
      nameBn: "সোমবার",
      subjects: [
        {
          id: "sub5",
          nameEn: "Social Studies",
          nameBn: "সমাজ বিজ্ঞান",
          time: "9:00 - 9:45",
          teacher: {
            nameEn: "Fatima Khatun",
            nameBn: "ফাতিমা খাতুন"
          },
          room: "104",
          color: "bg-pink-100 border-pink-300"
        },
        {
          id: "sub6",
          nameEn: "Physical Education",
          nameBn: "শারীরিক শিক্ষা",
          time: "10:00 - 10:45",
          teacher: {
            nameEn: "Rahim Khan",
            nameBn: "রহিম খান"
          },
          room: "Field",
          color: "bg-red-100 border-red-300"
        },
        {
          id: "sub7",
          nameEn: "Religion",
          nameBn: "ধর্ম",
          time: "11:00 - 11:45",
          teacher: {
            nameEn: "Abdul Karim",
            nameBn: "আব্দুল করিম"
          },
          room: "105",
          color: "bg-indigo-100 border-indigo-300"
        },
        {
          id: "sub8",
          nameEn: "Art & Craft",
          nameBn: "শিল্পকলা",
          time: "12:00 - 12:45",
          teacher: {
            nameEn: "Shilpi Rahman",
            nameBn: "শিল্পী রহমান"
          },
          room: "Art Room",
          color: "bg-cyan-100 border-cyan-300"
        }
      ]
    },
    {
      id: "tuesday",
      nameEn: "Tuesday",
      nameBn: "মঙ্গলবার",
      subjects: [
        {
          id: "sub9",
          nameEn: "Bengali",
          nameBn: "বাংলা",
          time: "9:00 - 9:45",
          teacher: {
            nameEn: "Rahima Begum",
            nameBn: "রাহিমা বেগম"
          },
          room: "101",
          color: "bg-blue-100 border-blue-300"
        },
        {
          id: "sub10",
          nameEn: "Mathematics",
          nameBn: "গণিত",
          time: "10:00 - 10:45",
          teacher: {
            nameEn: "Kamal Hossain",
            nameBn: "কামাল হোসেন"
          },
          room: "102",
          color: "bg-purple-100 border-purple-300"
        },
        {
          id: "sub11",
          nameEn: "Computer",
          nameBn: "কম্পিউটার",
          time: "11:00 - 11:45",
          teacher: {
            nameEn: "Tahmid Islam",
            nameBn: "তাহমিদ ইসলাম"
          },
          room: "Computer Lab",
          color: "bg-emerald-100 border-emerald-300"
        }
      ]
    },
    {
      id: "wednesday",
      nameEn: "Wednesday",
      nameBn: "বুধবার",
      subjects: [
        {
          id: "sub12",
          nameEn: "Science",
          nameBn: "বিজ্ঞান",
          time: "9:00 - 9:45",
          teacher: {
            nameEn: "Nasreen Ahmed",
            nameBn: "নাসরিন আহমেদ"
          },
          room: "Lab 2",
          color: "bg-green-100 border-green-300"
        },
        {
          id: "sub13",
          nameEn: "English",
          nameBn: "ইংরেজি",
          time: "10:00 - 10:45",
          teacher: {
            nameEn: "Mohammad Ali",
            nameBn: "মোহাম্মদ আলী"
          },
          room: "103",
          color: "bg-amber-100 border-amber-300"
        },
        {
          id: "sub14",
          nameEn: "Social Studies",
          nameBn: "সমাজ বিজ্ঞান",
          time: "11:00 - 11:45",
          teacher: {
            nameEn: "Fatima Khatun",
            nameBn: "ফাতিমা খাতুন"
          },
          room: "104",
          color: "bg-pink-100 border-pink-300"
        }
      ]
    },
    {
      id: "thursday",
      nameEn: "Thursday",
      nameBn: "বৃহস্পতিবার",
      subjects: [
        {
          id: "sub15",
          nameEn: "Religion",
          nameBn: "ধর্ম",
          time: "9:00 - 9:45",
          teacher: {
            nameEn: "Abdul Karim",
            nameBn: "আব্দুল করিম"
          },
          room: "105",
          color: "bg-indigo-100 border-indigo-300"
        },
        {
          id: "sub16",
          nameEn: "Bengali",
          nameBn: "বাংলা",
          time: "10:00 - 10:45",
          teacher: {
            nameEn: "Rahima Begum",
            nameBn: "রাহিমা বেগম"
          },
          room: "101",
          color: "bg-blue-100 border-blue-300"
        },
        {
          id: "sub17",
          nameEn: "Mathematics",
          nameBn: "গণিত",
          time: "11:00 - 11:45",
          teacher: {
            nameEn: "Kamal Hossain",
            nameBn: "কামাল হোসেন"
          },
          room: "102",
          color: "bg-purple-100 border-purple-300"
        }
      ]
    }
  ];

  return (
    <section className="mb-10 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          <LanguageText 
            bn={`শ্রেণি ${classLevel} (${section}) - দৈনিক রুটিন`}
            en={`Class ${classLevel} (${section}) - Daily Schedule`} 
          />
        </h2>
      </div>

      <div className="flex flex-nowrap overflow-x-auto gap-2 mb-6 pb-2">
        {days.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap 
              ${activeDay === day.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            {language === "bn" ? day.nameBn : day.nameEn}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {days.find(day => day.id === activeDay)?.subjects.map((subject) => (
          <div 
            key={subject.id} 
            className={`border-l-4 rounded-lg p-4 ${subject.color}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <h3 className="font-medium text-lg">
                  {language === "bn" ? subject.nameBn : subject.nameEn}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{subject.time}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                <span>
                  <LanguageText bn="শিক্ষক:" en="Teacher:" />
                  {' '}
                  {language === "bn" 
                    ? subject.teacher.nameBn 
                    : subject.teacher.nameEn
                  }
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <span>
                  <LanguageText bn="কক্ষ:" en="Room:" />
                  {' '}
                  {subject.room}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 