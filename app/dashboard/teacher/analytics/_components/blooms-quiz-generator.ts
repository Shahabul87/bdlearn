"use client";

import { BloomsTaxonomyLevel, bloomsLevelInfo } from './blooms-taxonomy-model';

// Define interfaces for the quiz data structure
export interface BloomsTaxonomyQuizScores {
  total: number;
  correct: number;
}

export interface BloomsTaxonomyQuestion {
  id: string;
  question: string;
  bloomVerb: string;
  level: BloomsTaxonomyLevel;
  isCorrect?: boolean;
  timeTaken?: number;
}

export interface BloomsTaxonomyQuizData {
  levelScores: Record<BloomsTaxonomyLevel, BloomsTaxonomyQuizScores>;
  questions: Record<BloomsTaxonomyLevel, BloomsTaxonomyQuestion[]>;
}

// Function to generate bloom's taxonomy quiz data
export function generateBloomsTaxonomyQuizData(courseId: string, studentId?: string): BloomsTaxonomyQuizData {
  // Initialize the data structure
  const levelScores: Record<BloomsTaxonomyLevel, BloomsTaxonomyQuizScores> = {
    [BloomsTaxonomyLevel.REMEMBER]: { total: 0, correct: 0 },
    [BloomsTaxonomyLevel.UNDERSTAND]: { total: 0, correct: 0 },
    [BloomsTaxonomyLevel.APPLY]: { total: 0, correct: 0 },
    [BloomsTaxonomyLevel.ANALYZE]: { total: 0, correct: 0 },
    [BloomsTaxonomyLevel.EVALUATE]: { total: 0, correct: 0 },
    [BloomsTaxonomyLevel.CREATE]: { total: 0, correct: 0 }
  };

  const questions: Record<BloomsTaxonomyLevel, BloomsTaxonomyQuestion[]> = {
    [BloomsTaxonomyLevel.REMEMBER]: [],
    [BloomsTaxonomyLevel.UNDERSTAND]: [],
    [BloomsTaxonomyLevel.APPLY]: [],
    [BloomsTaxonomyLevel.ANALYZE]: [],
    [BloomsTaxonomyLevel.EVALUATE]: [],
    [BloomsTaxonomyLevel.CREATE]: []
  };

  // Generate mock data based on course and student IDs
  // In a real application, this would fetch data from an API
  const seed = courseId + (studentId || '');
  
  // The number of questions varies by level (more lower level questions, fewer higher level)
  const questionCounts = {
    [BloomsTaxonomyLevel.REMEMBER]: 15 + (seed.length % 5),
    [BloomsTaxonomyLevel.UNDERSTAND]: 12 + (seed.length % 4),
    [BloomsTaxonomyLevel.APPLY]: 10 + (seed.length % 3),
    [BloomsTaxonomyLevel.ANALYZE]: 8 + (seed.length % 3),
    [BloomsTaxonomyLevel.EVALUATE]: 6 + (seed.length % 2),
    [BloomsTaxonomyLevel.CREATE]: 4 + (seed.length % 2)
  };

  // Success rates generally decrease as levels increase
  const successRates = {
    [BloomsTaxonomyLevel.REMEMBER]: 0.85 - (seed.charCodeAt(0) % 15) / 100,
    [BloomsTaxonomyLevel.UNDERSTAND]: 0.75 - (seed.charCodeAt(1) % 15) / 100,
    [BloomsTaxonomyLevel.APPLY]: 0.65 - (seed.charCodeAt(2) % 15) / 100,
    [BloomsTaxonomyLevel.ANALYZE]: 0.55 - (seed.charCodeAt(3) % 15) / 100,
    [BloomsTaxonomyLevel.EVALUATE]: 0.45 - (seed.charCodeAt(0) % 15) / 100,
    [BloomsTaxonomyLevel.CREATE]: 0.35 - (seed.charCodeAt(1) % 15) / 100
  };

  // Sample questions for each level
  const sampleQuestions = {
    [BloomsTaxonomyLevel.REMEMBER]: [
      { question: "HTML এর পূর্ণরূপ কি?", verb: "name" },
      { question: "একটি ওয়েবসাইটে জাভাস্ক্রিপ্ট লিঙ্ক করার সঠিক ট্যাগ কোনটি?", verb: "identify" },
      { question: "CSS এর fullform কি?", verb: "define" },
      { question: "React কোন ধরণের লাইব্রেরি?", verb: "recognize" },
      { question: "JavaScript এ ডাটা টাইপ গুলো লিস্ট করুন", verb: "list" },
      { question: "নোড জেএস কি?", verb: "define" }
    ],
    [BloomsTaxonomyLevel.UNDERSTAND]: [
      { question: "CSS বক্স মডেল ব্যাখ্যা করুন", verb: "explain" },
      { question: "রিয়েক্ট হুকস কীভাবে কাজ করে?", verb: "describe" },
      { question: "var, let, এবং const এর মধ্যে পার্থক্য কি?", verb: "compare" },
      { question: "Async/Await এর কার্যপ্রণালী ব্যাখ্যা করুন", verb: "explain" },
      { question: "Virtual DOM এর ধারণা সংক্ষেপে ব্যাখ্যা করুন", verb: "summarize" }
    ],
    [BloomsTaxonomyLevel.APPLY]: [
      { question: "একটি লগইন ফর্ম তৈরি করুন যা ইমেইল ও পাসওয়ার্ড ভ্যালিডেট করবে", verb: "use" },
      { question: "রেসপনসিভ নেভিগেশন মেনু তৈরি করুন", verb: "implement" },
      { question: "একটি টু-ডু অ্যাপ্লিকেশনে আইটেম যোগ ও সম্পাদনার কোড লিখুন", verb: "apply" },
      { question: "API থেকে ডাটা ফেচ করে টেবিলে দেখানোর কোড লিখুন", verb: "implement" },
      { question: "একটি সাধারণ ক্যালকুলেটর অ্যাপ তৈরি করুন", verb: "use" }
    ],
    [BloomsTaxonomyLevel.ANALYZE]: [
      { question: "এই কোডের পারফরম্যান্স সমস্যা চিহ্নিত করুন", verb: "analyze" },
      { question: "এই অ্যাপ্লিকেশনের স্টেট ম্যানেজমেন্ট সিস্টেম বিশ্লেষণ করুন", verb: "examine" },
      { question: "API রিস্পন্স স্ট্রাকচার অ্যানালাইজ করুন", verb: "investigate" },
      { question: "এই কোডের ত্রুটি খুঁজে বের করুন", verb: "debug" },
      { question: "রেন্ডারিং পারফরম্যান্স অপ্টিমাইজেশন সমস্যা চিহ্নিত করুন", verb: "differentiate" }
    ],
    [BloomsTaxonomyLevel.EVALUATE]: [
      { question: "এই প্রজেক্টের জন্য উপযুক্ত ডাটাবেস নির্বাচন করুন এবং আপনার সিদ্ধান্ত যুক্তিসহ উল্লেখ করুন", verb: "justify" },
      { question: "এই UI ডিজাইনের সবলতা ও দুর্বলতা মূল্যায়ন করুন", verb: "evaluate" },
      { question: "দুটি ভিন্ন ফ্রন্টএন্ড ফ্রেমওয়ার্ক এর তুলনা করে কোনটি এই প্রজেক্টের জন্য যুক্তিযুক্ত তা নির্ধারণ করুন", verb: "assess" },
      { question: "এই ক্লায়েন্ট-সাইড রেন্ডারিং সিস্টেম মূল্যায়ন করুন", verb: "critique" }
    ],
    [BloomsTaxonomyLevel.CREATE]: [
      { question: "একটি ই-কমার্স প্রডাক্ট ফিল্টারিং ও সার্চ সিস্টেম ডিজাইন করুন", verb: "design" },
      { question: "একটি সম্পূর্ণ বাংলা ভাষার ব্লগিং প্ল্যাটফর্ম আর্কিটেকচার ডিজাইন করুন", verb: "create" },
      { question: "মোবাইল ফার্স্ট অ্যাপ্রোচ ব্যবহার করে একটি রেস্পনসিভ ডেভেলপমেন্ট স্ট্র্যাটেজি তৈরি করুন", verb: "develop" },
      { question: "একটি অনলাইন টেস্টিং প্ল্যাটফর্মের পূর্ণাঙ্গ সিস্টেম ডিজাইন করুন", verb: "create" }
    ]
  };

  // Generate questions for each level
  Object.values(BloomsTaxonomyLevel).forEach(level => {
    const count = questionCounts[level];
    const successRate = successRates[level];
    const verbs = bloomsLevelInfo[level].verbs;
    const sampleQs = sampleQuestions[level];

    for (let i = 0; i < count; i++) {
      const isCorrect = Math.random() < successRate;
      const sampleQ = sampleQs[i % sampleQs.length];
      const verb = verbs[i % verbs.length];
      
      const question: BloomsTaxonomyQuestion = {
        id: `${level}-${i}-${courseId}${studentId || ''}`,
        question: sampleQ.question,
        bloomVerb: sampleQ.verb,
        level: level,
        isCorrect: isCorrect,
        timeTaken: Math.floor(20 + Math.random() * 60)
      };
      
      questions[level].push(question);
      levelScores[level].total++;
      if (isCorrect) {
        levelScores[level].correct++;
      }
    }
  });

  return {
    levelScores,
    questions
  };
}

// Get question type descriptions
export const getQuestionTypeDescriptions = () => {
  return {
    mcq_factual: {
      name: "Multiple Choice (Factual)",
      nameBn: "বহুনির্বাচনী (তথ্যমূলক)",
      description: "Tests recall of specific facts and information"
    },
    fill_in_blank: {
      name: "Fill in the Blank",
      nameBn: "শূন্যস্থান পূরণ",
      description: "Tests recall of key terms or concepts"
    },
    mcq_conceptual: {
      name: "Multiple Choice (Conceptual)",
      nameBn: "বহুনির্বাচনী (ধারণামূলক)",
      description: "Tests understanding of concepts and relationships"
    },
    problem_solving: {
      name: "Problem Solving",
      nameBn: "সমস্যা সমাধান",
      description: "Tests ability to apply knowledge to solve problems"
    },
    compare_contrast: {
      name: "Compare and Contrast",
      nameBn: "তুলনা ও পার্থক্য",
      description: "Tests ability to analyze relationships between concepts"
    },
    critical_review: {
      name: "Critical Review",
      nameBn: "সমালোচনামূলক পর্যালোচনা",
      description: "Tests ability to evaluate ideas based on criteria"
    },
    design_task: {
      name: "Design Task",
      nameBn: "ডিজাইন কার্যক্রম",
      description: "Tests ability to create original solutions"
    }
  };
}; 