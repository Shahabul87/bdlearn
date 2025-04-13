"use client";

// Bloom's Taxonomy Level Definitions
export enum BloomsTaxonomyLevel {
  REMEMBER = "REMEMBER",
  UNDERSTAND = "UNDERSTAND",
  APPLY = "APPLY",
  ANALYZE = "ANALYZE",
  EVALUATE = "EVALUATE",
  CREATE = "CREATE"
}

// Color scheme for each Bloom's level
export const colorSchemes = {
  [BloomsTaxonomyLevel.REMEMBER]: {
    background: '#e3f2fd',
    border: '#2196f3',
    text: '#0d47a1'
  },
  [BloomsTaxonomyLevel.UNDERSTAND]: {
    background: '#e8f5e9',
    border: '#4caf50',
    text: '#1b5e20'
  },
  [BloomsTaxonomyLevel.APPLY]: {
    background: '#fff3e0',
    border: '#ff9800',
    text: '#e65100'
  },
  [BloomsTaxonomyLevel.ANALYZE]: {
    background: '#f3e5f5',
    border: '#9c27b0',
    text: '#4a148c'
  },
  [BloomsTaxonomyLevel.EVALUATE]: {
    background: '#fce4ec',
    border: '#e91e63',
    text: '#880e4f'
  },
  [BloomsTaxonomyLevel.CREATE]: {
    background: '#e8eaf6',
    border: '#3f51b5',
    text: '#1a237e'
  }
};

interface BloomsLevelInfoItem {
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  color: string;
  weight: number;
  keywords: string[];
  verbs: string[];
  questionTypes: string[];
}

// Information about each bloom's level
export const bloomsLevelInfo: Record<BloomsTaxonomyLevel, BloomsLevelInfoItem> = {
  [BloomsTaxonomyLevel.REMEMBER]: {
    title: "Remember",
    titleBn: "মনে রাখা",
    description: "Recall facts and basic concepts",
    descriptionBn: "তথ্য ও মৌলিক ধারণা স্মরণ করা",
    color: "#2196F3", // blue
    weight: 1,
    keywords: ["define", "list", "recall", "identify", "name", "recognize"],
    verbs: ["define", "list", "state", "identify", "label", "name", "show", "match", "recall"],
    questionTypes: ["Multiple choice", "Fill-in-the-blanks", "True/False"]
  },
  [BloomsTaxonomyLevel.UNDERSTAND]: {
    title: "Understand",
    titleBn: "বোঝা",
    description: "Explain ideas or concepts",
    descriptionBn: "ধারণা বা ভাবনা ব্যাখ্যা করা",
    color: "#4CAF50", // green
    weight: 2,
    keywords: ["explain", "describe", "interpret", "summarize", "classify", "compare"],
    verbs: ["explain", "describe", "interpret", "paraphrase", "summarize", "classify", "compare", "contrast", "discuss"],
    questionTypes: ["Explanation questions", "Summary writing", "Compare/contrast questions"]
  },
  [BloomsTaxonomyLevel.APPLY]: {
    title: "Apply",
    titleBn: "প্রয়োগ করা",
    description: "Use information in new situations",
    descriptionBn: "নতুন পরিস্থিতিতে তথ্য ব্যবহার করা",
    color: "#FF9800", // orange
    weight: 3,
    keywords: ["use", "implement", "solve", "demonstrate", "apply", "calculate"],
    verbs: ["apply", "use", "solve", "demonstrate", "implement", "operate", "prepare", "produce"],
    questionTypes: ["Problem-solving", "Case studies", "Implementation questions"]
  },
  [BloomsTaxonomyLevel.ANALYZE]: {
    title: "Analyze",
    titleBn: "বিশ্লেষণ করা",
    description: "Draw connections among ideas",
    descriptionBn: "ধারণাগুলির মধ্যে সংযোগ স্থাপন করা",
    color: "#9C27B0", // purple
    weight: 4,
    keywords: ["analyze", "examine", "investigate", "categorize", "differentiate", "distinguish"],
    verbs: ["analyze", "examine", "differentiate", "investigate", "categorize", "compare", "contrast", "distinguish"],
    questionTypes: ["Analysis questions", "Classification tasks", "Compare/contrast essays"]
  },
  [BloomsTaxonomyLevel.EVALUATE]: {
    title: "Evaluate",
    titleBn: "মূল্যায়ন করা",
    description: "Justify a stand or decision",
    descriptionBn: "সিদ্ধান্ত বা মতামত যাচাই করা",
    color: "#E91E63", // pink
    weight: 5,
    keywords: ["evaluate", "judge", "critique", "assess", "recommend", "justify"],
    verbs: ["evaluate", "judge", "justify", "critique", "assess", "recommend", "defend", "prioritize"],
    questionTypes: ["Evaluation tasks", "Critical analysis", "Review writing"]
  },
  [BloomsTaxonomyLevel.CREATE]: {
    title: "Create",
    titleBn: "সৃষ্টি করা",
    description: "Produce new or original work",
    descriptionBn: "নতুন বা মৌলিক কাজ তৈরি করা",
    color: "#3F51B5", // indigo
    weight: 6,
    keywords: ["create", "design", "develop", "plan", "construct", "produce"],
    verbs: ["create", "design", "develop", "plan", "construct", "produce", "invent", "compose", "formulate"],
    questionTypes: ["Design tasks", "Creative projects", "Development challenges"]
  }
};

// Common examples for each level
export const bloomsExamples = {
  [BloomsTaxonomyLevel.REMEMBER]: {
    verbs: "Define, Identify, List, Name, Recall, Recognize",
    questions: "What is HTML? What are the primitive types in JavaScript?",
    examples: "Recalling syntax, identifying tags, naming methods, listing elements"
  },
  [BloomsTaxonomyLevel.UNDERSTAND]: {
    verbs: "Explain, Describe, Discuss, Summarize, Compare, Paraphrase",
    questions: "How does the CSS Box Model work? Explain hoisting in JavaScript.",
    examples: "Explaining concepts, comparing frameworks, describing processes"
  },
  [BloomsTaxonomyLevel.APPLY]: {
    verbs: "Use, Implement, Solve, Demonstrate, Calculate, Apply",
    questions: "Write code to validate a form. Implement a responsive navigation bar.",
    examples: "Building components, coding solutions, implementing algorithms"
  },
  [BloomsTaxonomyLevel.ANALYZE]: {
    verbs: "Analyze, Examine, Debug, Differentiate, Diagram, Deconstruct",
    questions: "Why is this code inefficient? Analyze the performance issues.",
    examples: "Debugging code, examining performance, differentiating approaches"
  },
  [BloomsTaxonomyLevel.EVALUATE]: {
    verbs: "Evaluate, Judge, Critique, Assess, Recommend, Prioritize",
    questions: "Which framework is better for this project? Is this design accessible?",
    examples: "Critiquing designs, evaluating frameworks, assessing methodologies"
  },
  [BloomsTaxonomyLevel.CREATE]: {
    verbs: "Create, Design, Develop, Plan, Construct, Produce",
    questions: "Design a database schema. Create a prototype for a delivery app.",
    examples: "Designing systems, creating applications, developing solutions"
  }
};

// Calculate scores based on Bloom's taxonomy level weights
export const calculateBloomsScore = (levelScores: Record<BloomsTaxonomyLevel, { correct: number, total: number }>) => {
  let weightedTotalScore = 0;
  let weightedMaxScore = 0;
  
  const normalizedScores: Record<BloomsTaxonomyLevel, number> = {} as any;
  
  // Calculate normalized score (0-100%) for each level
  Object.entries(levelScores).forEach(([level, scores]) => {
    const taxonomyLevel = level as BloomsTaxonomyLevel;
    const weight = bloomsLevelInfo[taxonomyLevel].weight;
    
    // Avoid division by zero
    if (scores.total === 0) {
      normalizedScores[taxonomyLevel] = 0;
    } else {
      const levelPercentage = (scores.correct / scores.total) * 100;
      normalizedScores[taxonomyLevel] = Math.round(levelPercentage);
      
      // Add to weighted scores
      weightedTotalScore += scores.correct * weight;
      weightedMaxScore += scores.total * weight;
    }
  });
  
  // Calculate overall weighted score
  const overallWeightedPercentage = weightedMaxScore > 0 
    ? Math.round((weightedTotalScore / weightedMaxScore) * 100) 
    : 0;
  
  return {
    normalizedScores,
    overallWeightedPercentage
  };
}; 