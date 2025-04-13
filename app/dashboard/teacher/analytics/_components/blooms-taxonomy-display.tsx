"use client";

import React, { useState } from "react";
import {
  BloomsTaxonomyLevel,
  bloomsLevelInfo,
  colorSchemes,
} from "./blooms-taxonomy-model";
import { generateBloomsTaxonomyQuizData } from "./blooms-quiz-generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import { LucideIcon, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BloomsTaxonomyDisplayProps {
  courseId: string;
  studentId?: string;
}

const BloomsTaxonomyDisplay: React.FC<BloomsTaxonomyDisplayProps> = ({
  courseId,
  studentId,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<BloomsTaxonomyLevel | null>(
    null
  );

  // Get quiz data
  const quizData = generateBloomsTaxonomyQuizData(courseId, studentId);
  const { levelScores } = quizData;

  // Format data for charts
  const bloomsData = Object.entries(levelScores).map(([level, scores]) => {
    const levelInfo = bloomsLevelInfo[level as BloomsTaxonomyLevel];
    const percentage = scores.total 
      ? Math.round((scores.correct / scores.total) * 100) 
      : 0;
    
    return {
      level,
      levelName: levelInfo.title,
      levelNameBn: levelInfo.titleBn,
      color: levelInfo.color,
      score: percentage,
      correct: scores.correct,
      total: scores.total,
      weight: levelInfo.weight,
      description: levelInfo.description,
    };
  });

  // Calculate overall bloom's score
  const totalWeightedScore = bloomsData.reduce((total, item) => {
    return total + (item.score * item.weight);
  }, 0);
  
  const totalWeight = bloomsData.reduce((total, item) => {
    return total + (item.total > 0 ? item.weight : 0);
  }, 0);
  
  const overallScore = totalWeight > 0 
    ? Math.round(totalWeightedScore / totalWeight) 
    : 0;

  // Find student strengths and areas for improvement
  const sortedByScore = [...bloomsData].sort((a, b) => b.score - a.score);
  const strengths = sortedByScore.slice(0, 2);
  const weaknesses = [...bloomsData].sort((a, b) => a.score - b.score).slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Student Analysis Summary - Show only when a specific student is selected */}
      {studentId && (
        <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>শিক্ষার্থী জ্ঞানীয় বিশ্লেষণ সারাংশ</span>
              <span>Student Cognitive Analysis Summary</span>
            </CardTitle>
            <CardDescription className="flex justify-between items-center">
              <span>শিক্ষার্থীর শক্তি ও উন্নয়নের ক্ষেত্র সম্পর্কে দ্রুত ধারণা</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-auto flex items-center gap-1"
                onClick={() => {
                  // Mock function to demonstrate downloadability
                  alert("Generating PDF report for this student. This would download in a real implementation.");
                }}
              >
                <Download className="h-3 w-3 mr-1" />
                <span className="text-xs">রিপোর্ট ডাউনলোড</span>
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2 text-indigo-700 dark:text-indigo-300">
                  শক্তির ক্ষেত্র (Strengths)
                </h4>
                <div className="space-y-2">
                  {strengths.map((item) => (
                    <div key={`strength-${item.level}`} className="p-3 rounded-md bg-white dark:bg-gray-800 shadow-sm border border-indigo-100 dark:border-indigo-900/50">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium">{item.levelNameBn}</span>
                        <span className="text-xs text-gray-500">({item.levelName})</span>
                      </div>
                      <div className="mt-1 flex justify-between items-center text-sm">
                        <div>
                          <span className="text-green-600 dark:text-green-400 font-medium">{item.score}%</span>
                          <span className="text-xs text-gray-500 ml-1">({item.correct}/{item.total})</span>
                        </div>
                        <span className="text-xs text-gray-500">{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2 text-indigo-700 dark:text-indigo-300">
                  উন্নয়নের ক্ষেত্র (Areas for Improvement)
                </h4>
                <div className="space-y-2">
                  {weaknesses.map((item) => (
                    <div key={`weakness-${item.level}`} className="p-3 rounded-md bg-white dark:bg-gray-800 shadow-sm border border-indigo-100 dark:border-indigo-900/50">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium">{item.levelNameBn}</span>
                        <span className="text-xs text-gray-500">({item.levelName})</span>
                      </div>
                      <div className="mt-1 flex justify-between items-center text-sm">
                        <div>
                          <span className="text-amber-600 dark:text-amber-400 font-medium">{item.score}%</span>
                          <span className="text-xs text-gray-500 ml-1">({item.correct}/{item.total})</span>
                        </div>
                        <span className="text-xs text-gray-500">{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-indigo-100 dark:border-indigo-900/50">
              <h4 className="text-sm font-medium mb-2 text-indigo-700 dark:text-indigo-300">
                শিখন কৌশল সুপারিশ (Learning Strategy Recommendations)
              </h4>
              <ul className="text-sm space-y-1">
                {weaknesses.slice(0, 1).map((item) => (
                  <li key={`rec-${item.level}`}>
                    <p>
                      <span className="font-medium">{item.levelNameBn}</span> (
                      <span className="text-gray-500">{item.levelName}</span>) এর জন্য:
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 ml-4 mt-1">
                      {item.level === BloomsTaxonomyLevel.REMEMBER && "মৌলিক ধারণা মনে রাখার জন্য ফ্ল্যাশকার্ড, নোট-টেকিং এবং মাইন্ড ম্যাপিং ব্যবহার করুন।"}
                      {item.level === BloomsTaxonomyLevel.UNDERSTAND && "ধারণাগুলি নিজের ভাষায় ব্যাখ্যা করার অনুশীলন করুন এবং সাধারণ উদাহরণ ব্যবহার করে বুঝতে চেষ্টা করুন।"}
                      {item.level === BloomsTaxonomyLevel.APPLY && "বাস্তব সমস্যা সমাধানের মাধ্যমে শেখা ধারণাগুলি প্রয়োগ করুন এবং হাতে-কলমে প্রকল্পে অংশগ্রহণ করুন।"}
                      {item.level === BloomsTaxonomyLevel.ANALYZE && "জটিল সিস্টেমগুলি ভেঙে ফেলুন এবং বিভিন্ন উপাদানের মধ্যে সম্পর্ক বিশ্লেষণ করুন।"}
                      {item.level === BloomsTaxonomyLevel.EVALUATE && "নিজের কাজ এবং অন্যদের কাজ পর্যালোচনা করুন, সমালোচনামূলক চিন্তাভাবনার দক্ষতা বিকাশ করুন।"}
                      {item.level === BloomsTaxonomyLevel.CREATE && "মৌলিক প্রকল্প তৈরি করুন, নতুন সমাধান উন্নয়ন করুন এবং সৃজনশীল অনুশীলনে যোগ দিন।"}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>ব্লুমস ট্যাক্সোনমি স্কোর</span>
              <span>Bloom&apos;s Taxonomy Score</span>
            </CardTitle>
            <CardDescription>
              শিক্ষার্থীর জ্ঞানীয় দক্ষতার মূল্যায়ন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-indigo-600"
                    strokeWidth="10"
                    strokeDasharray={`${overallScore * 2.51} 251`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{overallScore}%</span>
                  <span className="text-sm text-gray-500">Overall Score</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart outerRadius={90} data={bloomsData}>
                  <PolarGrid />
                  <PolarAngleAxis 
                    dataKey="levelName"
                    tick={{ fontSize: 12 }} 
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip formatter={(value) => `${value}%`} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>জ্ঞানীয় দক্ষতার বিশ্লেষণ</span>
              <span>Cognitive Skills Analysis</span>
            </CardTitle>
            <CardDescription>
              প্রতিটি দক্ষতার বিস্তারিত ফলাফল
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bloomsData.map((item) => (
                <div key={item.level} className="space-y-1">
                  <div className="flex justify-between text-sm font-medium">
                    <div className="flex items-center gap-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.levelNameBn}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <span>{item.levelName}</span>
                      <span>
                        {item.correct}/{item.total} ({item.score}%)
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={item.score} 
                    className="h-2" 
                    style={{ 
                      backgroundColor: `${item.color}20`,
                      "--theme-primary": item.color 
                    } as any}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-medium mb-2">
                ওয়েইটেড ফলাফল (Weighted Results)
              </h4>
              <div className="text-xs text-gray-500 mb-4">
                উচ্চতর স্তরের দক্ষতাগুলির জন্য ভারযুক্ত স্কোর ব্যবহার করা হয়েছে
              </div>
              
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={bloomsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="levelName" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    formatter={(value, name, props) => {
                      return [`${value}% (Weight: ${props.payload.weight})`];
                    }}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={true}
                  >
                    {bloomsData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>প্রশ্নের ধরন অনুযায়ী বিশ্লেষণ</span>
            <span>Question Type Analysis</span>
          </CardTitle>
          <CardDescription>
            ব্লুমস ট্যাক্সোনমি অনুসারে প্রশ্ন বিশ্লেষণ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={Object.values(BloomsTaxonomyLevel)[0]}>
            <TabsList className="w-full mb-4 flex flex-wrap h-auto">
              {Object.values(BloomsTaxonomyLevel).map((level) => {
                const info = bloomsLevelInfo[level];
                const colorScheme = colorSchemes[level];
                return (
                  <TabsTrigger 
                    key={level} 
                    value={level}
                    className={cn(
                      "flex-1 py-2 px-3",
                      "data-[state=active]:bg-opacity-10",
                      "border-b-2 border-transparent",
                      "data-[state=active]:border-current"
                    )}
                    style={{
                      '--theme-primary': info.color,
                      color: colorScheme.text,
                      borderColor: "currentColor",
                    } as any}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs md:text-sm font-medium">
                        {info.titleBn}
                      </span>
                      <span className="text-xs opacity-70">{info.title}</span>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.values(BloomsTaxonomyLevel).map((level) => {
              const questions = quizData.questions[level] || [];
              const info = bloomsLevelInfo[level];
              const colorScheme = colorSchemes[level];
              
              return (
                <TabsContent key={level} value={level}>
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div 
                        className="flex-1 p-4 rounded-lg" 
                        style={{ 
                          backgroundColor: `${colorScheme.background}`,
                          border: `1px solid ${colorScheme.border}`,
                        }}
                      >
                        <h3 className="text-lg font-semibold mb-2" style={{ color: colorScheme.text }}>
                          {info.titleBn} ({info.title})
                        </h3>
                        <p className="text-sm mb-4" style={{ color: colorScheme.text }}>
                          {info.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-white bg-opacity-90 p-3 rounded shadow-sm">
                            <h4 className="text-sm font-medium mb-1">সাধারণ ক্রিয়া (Common Verbs)</h4>
                            <div className="flex flex-wrap gap-1">
                              {info.keywords.slice(0, 5).map((keyword, i) => (
                                <span 
                                  key={i}
                                  className="text-xs px-2 py-1 rounded-full"
                                  style={{
                                    backgroundColor: `${colorScheme.background}80`,
                                    color: colorScheme.text
                                  }}
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-white bg-opacity-90 p-3 rounded shadow-sm">
                            <h4 className="text-sm font-medium mb-1">প্রশ্নের ধরন (Question Types)</h4>
                            <div className="flex flex-wrap gap-1">
                              {info.questionTypes.slice(0, 2).map((type, i) => (
                                <span 
                                  key={i}
                                  className="text-xs px-2 py-1 rounded-full"
                                  style={{
                                    backgroundColor: `${colorScheme.background}80`,
                                    color: colorScheme.text
                                  }}
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border flex-1">
                        <h3 className="text-lg font-semibold mb-3">Performance</h3>
                        {studentId ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-2xl font-bold" style={{ color: info.color }}>
                                  {levelScores[level].correct}/{levelScores[level].total}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Correct Answers
                                </div>
                              </div>
                              
                              <div>
                                <div className="text-2xl font-bold" style={{ color: info.color }}>
                                  {levelScores[level].total > 0 
                                    ? Math.round((levelScores[level].correct / levelScores[level].total) * 100) 
                                    : 0}%
                                </div>
                                <div className="text-sm text-gray-500">
                                  Success Rate
                                </div>
                              </div>
                              
                              <div>
                                <div className="text-2xl font-bold" style={{ color: info.color }}>
                                  {info.weight}x
                                </div>
                                <div className="text-sm text-gray-500">
                                  Weight Factor
                                </div>
                              </div>
                            </div>
                            
                            <Progress 
                              value={levelScores[level].total > 0 
                                ? (levelScores[level].correct / levelScores[level].total) * 100 
                                : 0
                              } 
                              className="h-2" 
                              style={{ 
                                backgroundColor: `${info.color}20`,
                                "--theme-primary": info.color 
                              } as any}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-32 text-gray-500">
                            <p>Select a student to see performance</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        {questions.length > 0 
                          ? `প্রশ্নসমূহ (${questions.length} questions)` 
                          : "কোন প্রশ্ন নেই এই স্তরে"
                        }
                      </h3>
                      
                      {questions.length > 0 ? (
                        <div className="space-y-4">
                          {questions.map((question: any, index: number) => (
                            <Card key={question.id} className="overflow-hidden">
                              <div
                                className="h-2"
                                style={{ backgroundColor: info.color }}
                              ></div>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-base">
                                    {index + 1}. {question.question}
                                  </CardTitle>
                                  {studentId && (
                                    <div 
                                      className={cn(
                                        "px-2 py-1 text-xs rounded-full",
                                        question.isCorrect 
                                          ? "bg-green-100 text-green-800" 
                                          : "bg-red-100 text-red-800"
                                      )}
                                    >
                                      {question.isCorrect ? "সঠিক" : "ভুল"}
                                    </div>
                                  )}
                                </div>
                                <CardDescription className="flex items-center gap-2">
                                  <span 
                                    className="px-2 py-0.5 rounded-full text-xs"
                                    style={{
                                      backgroundColor: `${info.color}20`,
                                      color: info.color
                                    }}
                                  >
                                    {question.bloomVerb}
                                  </span>
                                  {studentId && (
                                    <span className="text-xs text-gray-500">
                                      Time: {question.timeTaken}s
                                    </span>
                                  )}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {question.options.map((option: string, i: number) => (
                                    <div 
                                      key={i}
                                      className={cn(
                                        "p-2 border rounded-md",
                                        i === question.correctAnswer && "border-green-500",
                                        studentId && i === question.studentAnswer && i !== question.correctAnswer && "border-red-500"
                                      )}
                                    >
                                      <div className="flex items-start gap-2">
                                        <div 
                                          className={cn(
                                            "w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium",
                                            i === question.correctAnswer 
                                              ? "bg-green-100 text-green-800" 
                                              : studentId && i === question.studentAnswer 
                                                ? "bg-red-100 text-red-800"
                                                : "bg-gray-100 text-gray-800"
                                          )}
                                        >
                                          {String.fromCharCode(65 + i)}
                                        </div>
                                        <div className="text-sm">{option}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-32 border rounded-md bg-gray-50">
                          <p className="text-gray-500">No questions available for this level</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloomsTaxonomyDisplay; 