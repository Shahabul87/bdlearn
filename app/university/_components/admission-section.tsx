"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, Clock, Users, GraduationCap, FileText, PenTool, Building, Award, BookOpen, BarChart } from "lucide-react";

// Admission process data
const admissionTypes = [
  {
    id: "public",
    name: "পাবলিক বিশ্ববিদ্যালয়",
    icon: <Building className="w-5 h-5" />,
    description: "বাংলাদেশের পাবলিক বিশ্ববিদ্যালয়গুলোতে কেন্দ্রীয় ভর্তি পরীক্ষার মাধ্যমে ভর্তি হওয়ার সম্পূর্ণ প্রক্রিয়া, প্রস্তুতি, আবেদন ফরম পূরণ, ভর্তি পরীক্ষার বিষয়, নম্বর বিভাজন এবং কাট-অফ মার্কস সম্পর্কে বিস্তারিত তথ্য।",
    steps: [
      {
        title: "অনলাইন আবেদন",
        description: "বিশ্ববিদ্যালয়ের ওয়েবসাইটে অনলাইন ফরম পূরণ করে আবেদন ফি জমা দিন",
        icon: <FileText className="w-4 h-4" />,
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
      },
      {
        title: "ভর্তি পরীক্ষা",
        description: "নির্ধারিত তারিখে লিখিত পরীক্ষায় অংশগ্রহণ করুন",
        icon: <PenTool className="w-4 h-4" />,
        color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
      },
      {
        title: "ফলাফল প্রকাশ",
        description: "মেধাক্রম অনুযায়ী ফলাফল প্রকাশ করা হয়",
        icon: <BarChart className="w-4 h-4" />,
        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
      },
      {
        title: "বিভাগ বরাদ্দ",
        description: "মেধা, পছন্দক্রম এবং আসন সংখ্যা অনুযায়ী বিভাগ বরাদ্দ করা হয়",
        icon: <Building className="w-4 h-4" />,
        color: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
      },
      {
        title: "ভর্তি নিশ্চিতকরণ",
        description: "নির্ধারিত সময়ের মধ্যে ভর্তি ফি জমা দিয়ে ভর্তি নিশ্চিত করুন",
        icon: <GraduationCap className="w-4 h-4" />,
        color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
      }
    ],
    examInfo: {
      date: "নভেম্বর - ডিসেম্বর",
      duration: "১ ঘণ্টা",
      subjects: "বিজ্ঞান, কলা, বাণিজ্য বিভাগ অনুযায়ী ভিন্ন",
      totalMarks: "১০০ - ২০০",
      questionType: "MCQ ও লিখিত"
    }
  },
  {
    id: "private",
    name: "প্রাইভেট বিশ্ববিদ্যালয়",
    icon: <Award className="w-5 h-5" />,
    description: "বাংলাদেশের বেসরকারি বিশ্ববিদ্যালয়গুলোতে ভর্তি প্রক্রিয়া, স্কলারশিপ সুযোগ, সেমিস্টার সিস্টেম, ক্রেডিট আওয়ার্স, টিউশন ফি এবং ওয়েভার সিস্টেম সম্পর্কে বিস্তারিত আলোচনা।",
    steps: [
      {
        title: "সরাসরি আবেদন",
        description: "অনলাইন বা ক্যাম্পাসে সরাসরি আবেদন করুন",
        icon: <FileText className="w-4 h-4" />,
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
      },
      {
        title: "প্রবেশ পরীক্ষা",
        description: "বিশ্ববিদ্যালয় অনুযায়ী সংক্ষিপ্ত প্রবেশ পরীক্ষা",
        icon: <PenTool className="w-4 h-4" />,
        color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
      },
      {
        title: "সাক্ষাৎকার",
        description: "কিছু বিশ্ববিদ্যালয় সাক্ষাৎকার নিয়ে থাকে",
        icon: <Users className="w-4 h-4" />,
        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
      },
      {
        title: "ভর্তি ও রেজিস্ট্রেশন",
        description: "ভর্তি ফি জমা দিয়ে কোর্স রেজিস্ট্রেশন করুন",
        icon: <BookOpen className="w-4 h-4" />,
        color: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
      }
    ],
    examInfo: {
      date: "সারা বছর (সেমিস্টার ভিত্তিক)",
      duration: "৩০-৬০ মিনিট",
      subjects: "ইংরেজি, বিষয়ভিত্তিক পরীক্ষা",
      totalMarks: "৫০-১০০",
      questionType: "MCQ, লিখিত, সাক্ষাৎকার"
    }
  },
  {
    id: "medical",
    name: "মেডিকেল কলেজ",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "সরকারি ও বেসরকারি মেডিকেল কলেজগুলোতে MBBS, BDS এবং অন্যান্য মেডিকেল কোর্সে ভর্তি প্রক্রিয়া, ভর্তি পরীক্ষার বিষয়, প্রস্তুতি, এবং ভর্তির জন্য প্রয়োজনীয় অন্যান্য গুরুত্বপূর্ণ তথ্য।",
    steps: [
      {
        title: "অনলাইন আবেদন",
        description: "কেন্দ্রীয় ওয়েবসাইটে অনলাইন আবেদন করুন",
        icon: <FileText className="w-4 h-4" />,
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
      },
      {
        title: "কেন্দ্রীয় ভর্তি পরীক্ষা",
        description: "MCQ পদ্ধতিতে সারা দেশে একই দিনে পরীক্ষা",
        icon: <PenTool className="w-4 h-4" />,
        color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
      },
      {
        title: "ফলাফল ও ক্যাটাগরি",
        description: "মেধাক্রম ও কোটা অনুযায়ী ফলাফল প্রকাশ",
        icon: <BarChart className="w-4 h-4" />,
        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
      },
      {
        title: "কলেজ নির্বাচন",
        description: "মেধাক্রম ও পছন্দ অনুযায়ী কলেজ বরাদ্দ",
        icon: <Building className="w-4 h-4" />,
        color: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
      },
      {
        title: "ভর্তি নিশ্চিতকরণ",
        description: "বরাদ্দকৃত কলেজে ভর্তি ফি জমা দিয়ে ভর্তি নিশ্চিত করুন",
        icon: <GraduationCap className="w-4 h-4" />,
        color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
      }
    ],
    examInfo: {
      date: "সেপ্টেম্বর - অক্টোবর",
      duration: "১ ঘণ্টা",
      subjects: "বিজ্ঞান (ফিজিক্স, কেমিস্ট্রি, বায়োলজি)",
      totalMarks: "১০০ (MCQ)",
      questionType: "বহুনির্বাচনি প্রশ্ন"
    }
  }
];

export default function AdmissionSection() {
  const [activeTab, setActiveTab] = useState("public");
  
  const activeAdmission = admissionTypes.find(type => type.id === activeTab);
  
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent"
          >
            বিশ্ববিদ্যালয় ভর্তি প্রক্রিয়া
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            বিভিন্ন ধরনের বিশ্ববিদ্যালয়ে ভর্তি প্রক্রিয়া, যোগ্যতা ও প্রস্তুতি সম্পর্কে বিস্তারিত জানুন
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-8 relative">
          {/* Tab navigation */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-24 space-y-2">
              {admissionTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition duration-200 text-left
                    ${activeTab === type.id
                      ? "bg-white dark:bg-gray-800 shadow-lg border-l-4 border-primary"
                      : "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${activeTab === type.id
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {type.icon}
                  </div>
                  <div>
                    <h3 className={`font-medium ${activeTab === type.id ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                      {type.name}
                    </h3>
                  </div>
                </button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                  ভর্তি প্রস্তুতির বই
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি নিতে আমাদের বিশেষ বই সমূহ
                </p>
                <Link href="/resources/admission-books">
                  <button className="w-full py-2 px-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition flex items-center justify-center gap-2 text-sm">
                    বইসমূহ দেখুন <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-8 lg:col-span-9"
          >
            {activeAdmission && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <Image
                    src={`/images/admission-${activeAdmission.id}.webp`}
                    alt={activeAdmission.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                  <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {activeAdmission.name} ভর্তি প্রক্রিয়া
                    </h2>
                    <p className="text-white/80 text-sm sm:text-base max-w-3xl">
                      {activeAdmission.description}
                    </p>
                  </div>
                </div>
                
                <div className="p-5 sm:p-6">
                  <div className="mb-8">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary-500" /> ভর্তি প্রক্রিয়ার ধাপসমূহ
                    </h3>
                    
                    <div className="relative pl-8 border-l-2 border-dashed border-gray-200 dark:border-gray-700 space-y-8 py-2">
                      {activeAdmission.steps.map((step, index) => (
                        <div key={index} className="relative">
                          <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center absolute -left-[1.55rem] top-0`}>
                            {step.icon}
                          </div>
                          <div className="pl-4">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                              {index + 1}. {step.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <PenTool className="w-5 h-5 text-primary-500" /> ভর্তি পরীক্ষার তথ্য
                    </h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" /> পরীক্ষার সময়কাল
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {activeAdmission.examInfo.date}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" /> পরীক্ষার সময়
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {activeAdmission.examInfo.duration}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" /> পরীক্ষার বিষয়
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {activeAdmission.examInfo.subjects}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                          <BarChart className="w-4 h-4 text-gray-500 dark:text-gray-400" /> মোট নম্বর
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {activeAdmission.examInfo.totalMarks}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg sm:col-span-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" /> প্রশ্নের ধরণ
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {activeAdmission.examInfo.questionType}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
                    <Link href={`/university/${activeAdmission.id}`}>
                      <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm sm:text-base font-medium flex items-center gap-2">
                        সকল {activeAdmission.name} দেখুন <ChevronRight className="w-5 h-5" />
                      </button>
                    </Link>
                    <Link href={`/resources/admission/${activeAdmission.id}`}>
                      <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-sm sm:text-base font-medium">
                        সম্পূর্ণ ভর্তি গাইড
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 