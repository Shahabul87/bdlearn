"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Clock, GraduationCap, Users, Star, Calendar, Globe, MessageSquare, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock course data - in a real app, this would be fetched based on the id
const courseData = {
  id: "cse101",
  title: "কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং",
  university: "বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয়",
  faculty: "ইঞ্জিনিয়ারিং",
  duration: "৪ বছর",
  totalSeats: 120,
  rating: 4.8,
  reviews: 356,
  description: "বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয়ের কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগ দেশের শীর্ষস্থানীয় CSE প্রোগ্রাম প্রদান করে। এই প্রোগ্রামে আধুনিক কম্পিউটার সায়েন্স, সফটওয়্যার ডেভেলপমেন্ট, আর্টিফিশিয়াল ইন্টেলিজেন্স, ডাটা সায়েন্স, এবং কম্পিউটার নেটওয়ার্কিং শেখানো হয়।",
  longDescription: "কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগে শিক্ষার্থীরা থিওরেটিক্যাল এবং প্র্যাকটিক্যাল উভয় দিক থেকে কম্পিউটার সায়েন্স এর বিভিন্ন বিষয় শিখবে। প্রোগ্রামিং ল্যাঙ্গুয়েজ, ডাটা স্ট্রাকচার, অ্যালগরিদম, ডাটাবেস ম্যানেজমেন্ট, আর্টিফিশিয়াল ইন্টেলিজেন্স, মেশিন লার্নিং, কম্পিউটার নেটওয়ার্কিং, সফটওয়্যার ইঞ্জিনিয়ারিং, ওয়েব ডেভেলপমেন্ট, মোবাইল অ্যাপ্লিকেশন ডেভেলপমেন্ট ইত্যাদি বিষয়ে বিস্তারিত শিক্ষা প্রদান করা হয়।\n\nএই বিভাগের শিক্ষার্থীরা বিভিন্ন প্রজেক্ট, ল্যাব ওয়ার্ক, এবং ইন্টার্নশিপের মাধ্যমে বাস্তব অভিজ্ঞতা অর্জন করে। প্রতি সেমিস্টারে বিভিন্ন বিষয়ে কোর্স ওয়ার্ক, অ্যাসাইনমেন্ট, এবং এক্সাম থাকে। শিক্ষার্থীদের জন্য বিভিন্ন রিসার্চ সুযোগও রয়েছে।",
  eligibility: "এইচএসসি/সমমান পরীক্ষায় বিজ্ঞান বিভাগ থেকে ন্যূনতম GPA 5.00 (পঞ্চম বিষয় ব্যতীত) এবং ফিজিক্স, কেমিস্ট্রি ও ম্যাথ বিষয়ে অবশ্যই 'A' গ্রেড থাকতে হবে। বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষায় উত্তীর্ণ হতে হবে।",
  curriculum: [
    { 
      semester: "সেমিস্টার ১", 
      courses: [
        "CSE 101 - Introduction to Computer Science",
        "CSE 102 - Structured Programming",
        "MATH 101 - Differential and Integral Calculus",
        "PHY 101 - Physics for Engineers",
        "ENG 101 - Technical English"
      ]
    },
    { 
      semester: "সেমিস্টার ২", 
      courses: [
        "CSE 111 - Object Oriented Programming",
        "CSE 112 - Discrete Mathematics",
        "MATH 111 - Linear Algebra",
        "EEE 101 - Basic Electrical Engineering",
        "HUM 101 - Economics and Sociology"
      ]
    },
    { 
      semester: "সেমিস্টার ৩", 
      courses: [
        "CSE 201 - Data Structures",
        "CSE 202 - Digital Logic Design",
        "CSE 203 - Computer Architecture",
        "MATH 201 - Probability and Statistics",
        "EEE 201 - Electronic Devices and Circuits"
      ]
    }
  ],
  careerOptions: [
    "সফটওয়্যার ইঞ্জিনিয়ার",
    "ওয়েব ডেভেলপার",
    "মোবাইল অ্যাপ ডেভেলপার",
    "সিস্টেম অ্যানালিস্ট",
    "ডাটাবেস অ্যাডমিনিস্ট্রেটর",
    "নেটওয়ার্ক ইঞ্জিনিয়ার",
    "আইটি কনসালট্যান্ট",
    "ডাটা সায়েন্টিস্ট",
    "আর্টিফিশিয়াল ইন্টেলিজেন্স স্পেশালিস্ট",
    "সাইবার সিকিউরিটি এক্সপার্ট"
  ],
  faqs: [
    {
      question: "এই কোর্সে ভর্তি হওয়ার জন্য কী কী যোগ্যতা প্রয়োজন?",
      answer: "এইচএসসি/সমমান পরীক্ষায় বিজ্ঞান বিভাগ থেকে ন্যূনতম GPA 5.00 (পঞ্চম বিষয় ব্যতীত) এবং ফিজিক্স, কেমিস্ট্রি ও ম্যাথ বিষয়ে অবশ্যই 'A' গ্রেড থাকতে হবে। বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষায় উত্তীর্ণ হতে হবে।"
    },
    {
      question: "টিউশন ফি কত?",
      answer: "বর্তমানে সরকারি বিশ্ববিদ্যালয়ে প্রতি সেমিস্টারে টিউশন ফি প্রায় ১০,০০০-১৫,০০০ টাকা। তবে এই তথ্য পরিবর্তন হতে পারে, সঠিক তথ্যের জন্য বিশ্ববিদ্যালয়ের ওয়েবসাইট দেখুন।"
    },
    {
      question: "কোর্স শেষে কী কী ক্যারিয়ার অপশন আছে?",
      answer: "কোর্স শেষে সফটওয়্যার ইঞ্জিনিয়ার, ওয়েব ডেভেলপার, মোবাইল অ্যাপ ডেভেলপার, সিস্টেম অ্যানালিস্ট, ডাটাবেস অ্যাডমিনিস্ট্রেটর, নেটওয়ার্ক ইঞ্জিনিয়ার, আইটি কনসালট্যান্ট, ডাটা সায়েন্টিস্ট, আর্টিফিশিয়াল ইন্টেলিজেন্স স্পেশালিস্ট, সাইবার সিকিউরিটি এক্সপার্ট হিসেবে ক্যারিয়ার শুরু করা যাবে।"
    },
    {
      question: "কোর্সের জন্য কি কোনো প্রাথমিক প্রোগ্রামিং জ্ঞান প্রয়োজন?",
      answer: "না, কোনো প্রাথমিক প্রোগ্রামিং জ্ঞান প্রয়োজন নেই। কোর্সের শুরুতেই বেসিক প্রোগ্রামিং শেখানো হয়। তবে, আগে থেকে প্রোগ্রামিং জানা থাকলে তা সুবিধা হতে পারে।"
    }
  ]
};

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = params;
  
  // In a real app, you would fetch the course data based on the id
  // const { data: course, isLoading, error } = useCourse(id);
  const course = courseData; // Using mock data for now

  if (!course) {
    return <div className="p-8 text-center">কোর্স খুঁজে পাওয়া যায়নি</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/university/courses/explore" className="inline-flex items-center text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        কোর্স তালিকায় ফিরে যান
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-xl shadow-md overflow-hidden"
          >
            {/* Course Header */}
            <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-700">
              <div className="absolute inset-0 bg-black/20 flex items-end">
                <div className="p-6 text-white">
                  <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
                  <p className="text-white/90 mt-2">{course.university}</p>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-primary mr-2" />
                  <span>{course.faculty}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <span>{course.totalSeats} সিট</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>{course.rating} ({course.reviews} রিভিউ)</span>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start mb-6 overflow-x-auto">
                  <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
                  <TabsTrigger value="curriculum">কারিকুলাম</TabsTrigger>
                  <TabsTrigger value="eligibility">যোগ্যতা</TabsTrigger>
                  <TabsTrigger value="career">ক্যারিয়ার</TabsTrigger>
                  <TabsTrigger value="faq">প্রশ্নোত্তর</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <p className="text-muted-foreground">{course.description}</p>
                  <div className="mt-4 space-y-4">
                    <h3 className="text-xl font-semibold">বিস্তারিত</h3>
                    <p className="whitespace-pre-line">{course.longDescription}</p>
                  </div>
                </TabsContent>

                <TabsContent value="curriculum">
                  <div className="space-y-6">
                    {course.curriculum.map((semester, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-3">{semester.semester}</h3>
                        <ul className="space-y-2">
                          {semester.courses.map((course, idx) => (
                            <li key={idx} className="flex items-start">
                              <BookOpen className="h-5 w-5 text-primary mr-2 mt-0.5" />
                              <span>{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <p className="text-sm text-muted-foreground italic">* এটি শুধুমাত্র সংক্ষিপ্ত কারিকুলাম। পূর্ণ কারিকুলাম জানতে বিশ্ববিদ্যালয়ের ওয়েবসাইট দেখুন।</p>
                  </div>
                </TabsContent>

                <TabsContent value="eligibility">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">ভর্তির যোগ্যতা</h3>
                    <p className="whitespace-pre-line">{course.eligibility}</p>
                  </div>
                </TabsContent>

                <TabsContent value="career">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">ক্যারিয়ার সম্ভাবনা</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.careerOptions.map((career, index) => (
                        <div key={index} className="flex items-center bg-card shadow rounded-lg p-3">
                          <div className="bg-primary/10 text-primary p-2 rounded-full mr-3">
                            <GraduationCap className="h-5 w-5" />
                          </div>
                          <span>{career}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="faq">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">প্রায়শই জিজ্ঞাসিত প্রশ্ন</h3>
                    <div className="space-y-4">
                      {course.faqs.map((faq, index) => (
                        <div key={index} className="border border-border rounded-lg p-4">
                          <h4 className="text-lg font-medium mb-2">{faq.question}</h4>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-card rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">আবেদন করুন</h3>
              <p className="text-muted-foreground mb-6">আগামী ভর্তি পরীক্ষার জন্য প্রস্তুতি নিন এবং আপডেট পেতে রেজিস্ট্রেশন করুন।</p>
              
              <Button className="w-full mb-3">
                <Calendar className="mr-2 h-4 w-4" />
                ভর্তি তথ্য দেখুন
              </Button>
              
              <Button variant="outline" className="w-full">
                <Globe className="mr-2 h-4 w-4" />
                বিশ্ববিদ্যালয় ওয়েবসাইট
              </Button>
            </div>
            
            <div className="bg-card rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">শেয়ার করুন</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  প্রশ্ন করুন
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">সম্পর্কিত কোর্স</h3>
              <div className="space-y-3">
                <Link href="#" className="block p-3 border border-border rounded-lg hover:bg-accent transition-colors">
                  <h4 className="font-medium">ইলেকট্রিক্যাল এন্ড ইলেকট্রনিক্স ইঞ্জিনিয়ারিং</h4>
                  <p className="text-sm text-muted-foreground">বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয়</p>
                </Link>
                <Link href="#" className="block p-3 border border-border rounded-lg hover:bg-accent transition-colors">
                  <h4 className="font-medium">সফটওয়্যার ইঞ্জিনিয়ারিং</h4>
                  <p className="text-sm text-muted-foreground">ঢাকা বিশ্ববিদ্যালয়</p>
                </Link>
                <Link href="#" className="block p-3 border border-border rounded-lg hover:bg-accent transition-colors">
                  <h4 className="font-medium">কম্পিউটার সায়েন্স</h4>
                  <p className="text-sm text-muted-foreground">জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 