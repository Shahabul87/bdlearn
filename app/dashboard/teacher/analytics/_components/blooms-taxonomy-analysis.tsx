"use client";

import React, { useState } from 'react';
import { 
  BloomsTaxonomyLevel, 
  bloomsLevelInfo, 
  colorSchemes
} from './blooms-taxonomy-model';
import { 
  BloomsTaxonomyQuizData, 
  generateBloomsTaxonomyQuizData 
} from './blooms-quiz-generator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface BloomsTaxonomyAnalysisProps {
  courseId: string;
  studentId?: string;
  className?: string;
}

export default function BloomsTaxonomyAnalysis({ 
  courseId, 
  studentId,
  className = ""
}: BloomsTaxonomyAnalysisProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizData] = useState<BloomsTaxonomyQuizData>(() => 
    generateBloomsTaxonomyQuizData(courseId, studentId)
  );

  // Calculate percentages for each level
  const levelPercentages = Object.entries(quizData.levelScores).map(([level, scores]) => {
    const percentage = scores.total > 0 
      ? Math.round((scores.correct / scores.total) * 100) 
      : 0;
    return {
      level: level as BloomsTaxonomyLevel,
      percentage,
      total: scores.total,
      correct: scores.correct
    };
  });

  // Sort by taxonomy level weight
  levelPercentages.sort((a, b) => 
    bloomsLevelInfo[a.level].weight - bloomsLevelInfo[b.level].weight
  );

  // Prepare data for radar chart
  const radarData = {
    labels: levelPercentages.map(item => bloomsLevelInfo[item.level].title),
    datasets: [
      {
        label: 'Achievement (%)',
        data: levelPercentages.map(item => item.percentage),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: levelPercentages.map(
          item => colorSchemes[item.level].border
        ),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  // Prepare data for bar chart
  const barData = {
    labels: levelPercentages.map(item => bloomsLevelInfo[item.level].title),
    datasets: [
      {
        label: 'Correct',
        data: levelPercentages.map(item => item.correct),
        backgroundColor: levelPercentages.map(
          item => colorSchemes[item.level].border
        ),
      },
      {
        label: 'Total',
        data: levelPercentages.map(item => item.total),
        backgroundColor: levelPercentages.map(
          item => `${colorSchemes[item.level].border}40`
        ),
      },
    ],
  };

  // Chart options
  const radarOptions: ChartOptions<'radar'> = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Bloom\'s Taxonomy Performance',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    }
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Questions by Bloom\'s Level',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">সামগ্রিক অবস্থা</TabsTrigger>
          <TabsTrigger value="scores">বিস্তারিত স্কোর</TabsTrigger>
          <TabsTrigger value="questions">প্রশ্ন বিশ্লেষণ</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>ব্লুমস টেক্সোনমি এনালাইসিস</CardTitle>
              <CardDescription>
                শিক্ষার্থীর বিভিন্ন জ্ঞানীয় স্তরে দক্ষতা মূল্যায়ন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <Radar data={radarData} options={radarOptions} />
                </div>
                <div className="w-full md:w-1/2">
                  <div className="grid grid-cols-1 gap-4">
                    {levelPercentages.map((item) => (
                      <div 
                        key={item.level}
                        className="p-4 rounded-lg shadow-sm"
                        style={{ 
                          backgroundColor: colorSchemes[item.level].background,
                          borderLeft: `4px solid ${colorSchemes[item.level].border}`
                        }}
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium" style={{ color: colorSchemes[item.level].text }}>
                              {bloomsLevelInfo[item.level].title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {bloomsLevelInfo[item.level].titleBn}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold" style={{ color: colorSchemes[item.level].text }}>
                              {item.percentage}%
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.correct}/{item.total} প্রশ্ন
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Scores Tab */}
        <TabsContent value="scores">
          <Card>
            <CardHeader>
              <CardTitle>বিস্তারিত পারফরম্যান্স</CardTitle>
              <CardDescription>
                ব্লুমস টেক্সোনমি অনুযায়ী বিভিন্ন স্তরে প্রশ্নের বিস্তারিত ফলাফল
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80">
                <Bar data={barData} options={barOptions} />
              </div>
              
              <div className="mt-8 overflow-x-auto">
                <table className="min-w-full bg-white border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left border">স্তর</th>
                      <th className="px-4 py-2 text-left border">বর্ণনা</th>
                      <th className="px-4 py-2 text-center border">মোট প্রশ্ন</th>
                      <th className="px-4 py-2 text-center border">সঠিক উত্তর</th>
                      <th className="px-4 py-2 text-center border">শতাংশ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {levelPercentages.map((item) => (
                      <tr key={item.level} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: colorSchemes[item.level].border }}
                            ></div>
                            <div>
                              <p className="font-medium">{bloomsLevelInfo[item.level].titleBn}</p>
                              <p className="text-xs text-gray-500">{bloomsLevelInfo[item.level].title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 border text-sm">
                          {bloomsLevelInfo[item.level].descriptionBn}
                        </td>
                        <td className="px-4 py-2 border text-center">{item.total}</td>
                        <td className="px-4 py-2 border text-center">{item.correct}</td>
                        <td 
                          className="px-4 py-2 border text-center font-bold"
                          style={{ color: colorSchemes[item.level].text }}
                        >
                          {item.percentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Questions Tab */}
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>প্রশ্ন বিশ্লেষণ</CardTitle>
              <CardDescription>
                প্রতিটি ব্লুমস স্তরের সাথে সম্পর্কিত প্রশ্নসমূহ ও ফলাফল
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.values(BloomsTaxonomyLevel).map((level) => {
                  const questions = quizData.questions[level];
                  const totalQuestions = questions.length;
                  const correctQuestions = questions.filter(q => q.isCorrect).length;
                  const percentage = totalQuestions > 0 
                    ? Math.round((correctQuestions / totalQuestions) * 100) 
                    : 0;
                  
                  return (
                    <div 
                      key={level}
                      className="border rounded-lg overflow-hidden"
                      style={{ borderColor: colorSchemes[level].border }}
                    >
                      <div 
                        className="p-4 flex justify-between items-center"
                        style={{ backgroundColor: colorSchemes[level].background }}
                      >
                        <div>
                          <h3 className="font-bold" style={{ color: colorSchemes[level].text }}>
                            {bloomsLevelInfo[level].titleBn}
                            <span className="text-sm font-normal ml-2 text-gray-600">
                              ({bloomsLevelInfo[level].title})
                            </span>
                          </h3>
                          <p className="text-sm text-gray-600">
                            {bloomsLevelInfo[level].descriptionBn}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold" style={{ color: colorSchemes[level].text }}>
                            {percentage}%
                          </p>
                          <p className="text-sm text-gray-600">
                            {correctQuestions}/{totalQuestions}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <p className="mb-2 font-medium">সম্পর্কিত ক্রিয়া:</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {bloomsLevelInfo[level].verbs.slice(0, 6).map((verb, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 rounded-full text-xs"
                              style={{ 
                                backgroundColor: `${colorSchemes[level].border}20`,
                                color: colorSchemes[level].text
                              }}
                            >
                              {verb}
                            </span>
                          ))}
                        </div>
                        
                        <p className="mb-2 font-medium">প্রশ্ন উদাহরণ:</p>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {questions.slice(0, 5).map((question, idx) => (
                            <div 
                              key={idx}
                              className="p-3 rounded-md flex justify-between items-center"
                              style={{ 
                                backgroundColor: question.isCorrect 
                                  ? 'rgba(74, 222, 128, 0.1)' 
                                  : 'rgba(252, 165, 165, 0.1)',
                                borderLeft: `3px solid ${question.isCorrect ? '#4ade80' : '#f87171'}`
                              }}
                            >
                              <div>
                                <p className="text-sm">{question.question}</p>
                                <p className="text-xs text-gray-500">
                                  ক্রিয়া: <span className="italic">{question.bloomVerb}</span>
                                </p>
                              </div>
                              <div className="shrink-0 ml-4">
                                {question.isCorrect ? (
                                  <span className="text-green-500 text-xs font-medium">সঠিক</span>
                                ) : (
                                  <span className="text-red-500 text-xs font-medium">ভুল</span>
                                )}
                              </div>
                            </div>
                          ))}
                          {questions.length > 5 && (
                            <p className="text-sm text-gray-500 text-center">
                              আরও {questions.length - 5} প্রশ্ন...
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 