"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, FileText, Video, HelpCircle, PenLine, Clock, ArrowRight, Laptop, TestTube, Download } from "lucide-react";

// Study materials data
const studyMaterials = [
  {
    id: 1,
    title: "লেকচার নোটস",
    date: "সর্বশেষ আপডেট: জুন ২০২৪",
    description: "সকল বিষয়ের সাম্প্রতিক সিলেবাস অনুযায়ী লেকচার নোটস ডাউনলোড করুন।",
    icon: <Download className="w-5 h-5" />
  },
  {
    id: 2,
    title: "ই-বুক লাইব্রেরি",
    date: "৫০০+ বই",
    description: "বিষয়ভিত্তিক ডিজিটাল বইয়ের সংগ্রহ যা যেকোনো সময় অনলাইনে পড়তে পারবেন।",
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    id: 3,
    title: "সাবজেক্ট আলোচনা",
    date: "সাপ্তাহিক আপডেট",
    description: "প্রতিটি বিষয়ের গুরুত্বপূর্ণ টপিক নিয়ে বিশেষজ্ঞদের আলোচনা ও টিপস।",
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 4,
    title: "সলভড এক্সারসাইজ",
    date: "১০,০০০+ প্রশ্ন",
    description: "সকল অধ্যায়ের সমাধানসহ নমুনা প্রশ্ন ও উত্তর।",
    icon: <CheckCircle2 className="w-5 h-5" />
  },
  {
    id: 5,
    title: "ইন্টারেক্টিভ মাল্টিমিডিয়া",
    date: "৮০০+ ভিডিও",
    description: "জটিল বিষয়গুলি সহজে বোঝার জন্য অ্যানিমেশন ও ভিজ্যুয়াল এইডস।",
    icon: <Laptop className="w-5 h-5" />
  }
];

// Live classes schedule
const liveClasses = [
  {
    id: 1,
    title: "প্রোগ্রামিং ফান্ডামেন্টালস",
    instructor: "সজল আহমেদ",
    date: "প্রতি সোমবার, বুধবার, ৭:০০ PM",
    description: "জাভাস্ক্রিপ্ট ও পাইথনের মূল ধারণাগুলি শিখুন।",
  },
  {
    id: 2,
    title: "অ্যাডভান্সড ক্যালকুলাস",
    instructor: "ড. তাসনিম জাহান",
    date: "প্রতি মঙ্গলবার, বৃহস্পতিবার, ৮:০০ PM",
    description: "বিশ্ববিদ্যালয় পর্যায়ের ক্যালকুলাস সম্পূর্ণভাবে শিখুন।",
  },
  {
    id: 3,
    title: "ওয়েব ডিজাইন মাস্টারক্লাস",
    instructor: "ফারহান খান",
    date: "প্রতি শুক্রবার, ৬:০০ PM",
    description: "HTML, CSS, এবং UI/UX ফান্ডামেন্টালস থেকে অ্যাডভান্সড টেকনিক পর্যন্ত।",
  },
  {
    id: 4,
    title: "বিজ্ঞান প্রযুক্তি আপডেট",
    instructor: "সাদিয়া সুলতানা",
    date: "প্রতি শনিবার, ৮:৩০ PM",
    description: "বিজ্ঞান ও প্রযুক্তির নতুন আবিষ্কার ও গবেষণা নিয়ে আলোচনা।",
  },
  {
    id: 5,
    title: "ক্যারিয়ার কোচিং",
    instructor: "রিয়াজ উদ্দিন",
    date: "প্রতি শনিবার, ১০:০০ AM",
    description: "রেজুমে তৈরি, ইন্টারভিউ প্রস্তুতি, ও ক্যারিয়ার প্ল্যানিং টিপস।",
  }
];

// Practice test formats
const practiceTests = [
  {
    id: 1,
    title: "MCQ প্র্যাকটিস টেস্ট",
    description: "বিভিন্ন বিষয়ে এমসিকিউ প্র্যাকটিস টেস্ট দিন এবং সাথে সাথে রেজাল্ট দেখুন। প্রতিটি ভুল উত্তরের ব্যাখ্যা দেওয়া আছে।",
    features: [
      "ইনস্ট্যান্ট ফিডব্যাক",
      "অসীম রিটেক অপশন",
      "লার্নিং অ্যানালিটিক্স",
      "সাবজেক্ট-ওয়াইজ পারফরম্যান্স ট্র্যাকিং"
    ]
  },
  {
    id: 2,
    title: "সাবজেক্টিভ প্র্যাকটিস",
    description: "সাবজেক্টিভ এবং রাইটিং স্কিল টেস্ট করার জন্য বিশেষ এক্সারসাইজ। আপনার লেখা অভিজ্ঞ শিক্ষকরা রিভিউ করবেন।",
    features: [
      "এক্সপার্ট ফিডব্যাক",
      "রিভিশন ফর ইমপ্রুভমেন্ট",
      "রাইটিং স্কিল ডেভেলপমেন্ট",
      "মডেল উত্তর দেখার সুযোগ"
    ]
  }
];

export default function LearningResourcesSection() {
  const [activeTab, setActiveTab] = useState<"materials" | "live-classes" | "practice-tests">("materials");
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 bg-clip-text text-transparent"
          >
            অনলাইন লার্নিং রিসোর্স
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            আপনার শিক্ষাকে সমৃদ্ধ করার জন্য আমাদের বিভিন্ন ধরনের অনলাইন রিসোর্স এবং ইন্টারেক্টিভ কন্টেন্ট
          </motion.p>
        </div>
        
        {/* Tab navigation */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center sm:justify-between flex-wrap sm:flex-nowrap gap-3 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-md">
            <button 
              onClick={() => setActiveTab("materials")}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                activeTab === "materials" 
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              স্টাডি ম্যাটেরিয়াল
            </button>
            <button 
              onClick={() => setActiveTab("live-classes")}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                activeTab === "live-classes" 
                  ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Video className="w-4 h-4" />
              লাইভ ক্লাস
            </button>
            <button 
              onClick={() => setActiveTab("practice-tests")}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                activeTab === "practice-tests" 
                  ? "bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <TestTube className="w-4 h-4" />
              প্র্যাকটিস টেস্ট
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          {/* Study Materials Tab */}
          {activeTab === "materials" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  অনলাইন স্টাডি ম্যাটেরিয়াল
                </h3>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" /> আপডেটেড: জুন ২০২৪
                </span>
              </div>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900/50"></div>
                <div className="space-y-6">
                  {studyMaterials.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative pl-10"
                    >
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 z-10">
                        {item.icon}
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Link href="/resources/study-materials">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                    সকল স্টাডি ম্যাটেরিয়াল দেখুন
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          )}
          
          {/* Live Classes Tab */}
          {activeTab === "live-classes" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-indigo-500" />
                  লাইভ ক্লাস শিডিউল
                </h3>
              </div>
              
              <div className="grid md:grid-cols-1 gap-4 sm:gap-6 mb-8">
                {liveClasses.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 relative border-l-4 border-indigo-500"
                  >
                    <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center text-indigo-500 dark:text-indigo-400 text-sm">
                          <span className="mr-2">শিক্ষক:</span>
                          <span className="font-medium">{item.instructor}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center">
                        <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs px-3 py-1.5 rounded-full mb-2">
                          {item.date}
                        </span>
                        <Link href="/live-classes/join">
                          <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs flex items-center gap-1.5">
                            রেমাইন্ডার সেট করুন
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border-l-4 border-indigo-500">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">লাইভ ক্লাস মিস করেছেন?</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      কোনো লাইভ ক্লাস মিস করলে চিন্তা করবেন না। সকল লাইভ ক্লাসের রেকর্ডিং আমাদের লাইব্রেরিতে সংরক্ষিত থাকে।
                    </p>
                    <Link href="/live-classes/recordings">
                      <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm flex items-center gap-2 transition-colors">
                        রেকর্ডিং দেখুন <ArrowRight className="w-3 h-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Practice Tests Tab */}
          {activeTab === "practice-tests" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-teal-500" />
                  অনলাইন প্র্যাকটিস টেস্ট
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {practiceTests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden"
                  >
                    <div className="p-6 pb-5">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-lg">{test.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{test.description}</p>
                      
                      <div className="space-y-2">
                        {test.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-teal-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-teal-50 dark:bg-teal-900/20 p-4 border-t border-teal-100 dark:border-teal-900/50">
                      <Link href={`/practice-tests/${test.id}`}>
                        <button className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                          {test.id === 1 ? "প্র্যাকটিস টেস্ট শুরু করুন" : "এসাইনমেন্ট দেখুন"}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Link href="/practice-tests">
                  <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                    সকল টেস্ট দেখুন
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Additional Help Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-xl overflow-hidden shadow-xl"
        >
          <div className="relative p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                ২৪/৭ লার্নিং সাপোর্ট
              </h3>
              <p className="text-white/90 mb-6">
                শিক্ষার যেকোনো পর্যায়ে সমস্যা হলে আমাদের বিশেষজ্ঞ শিক্ষকদের সাথে যোগাযোগ করুন। আমরা সার্বক্ষণিক সাপোর্ট প্রদান করি।
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/support/chat">
                  <button className="px-5 py-2.5 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors">
                    চ্যাট সাপোর্ট
                  </button>
                </Link>
                <Link href="/support/forum">
                  <button className="px-5 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-medium transition-colors">
                    লার্নারস ফোরাম
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 