import { TrendingUp, Trophy, Check, Clock } from "lucide-react";

interface ProgressData {
  completedChapters: number;
  totalChapters: number;
  completedAssignments: number;
  totalAssignments: number;
  quizScores: {
    courseName: string;
    courseNameEn: string;
    score: number;
    totalQuestions: number;
  }[];
  studyHours: number;
  streakDays: number;
}

interface ProgressMetricProps {
  icon: React.ReactNode;
  label: string;
  labelEn: string;
  value: string | React.ReactNode;
  bgColor: string;
  textColor: string;
  iconColor: string;
}

const ProgressMetric = ({
  icon,
  label,
  labelEn,
  value,
  bgColor,
  textColor,
  iconColor,
}: ProgressMetricProps) => (
  <div className={`${bgColor} rounded-lg p-4 flex items-center`}>
    <div className={`${iconColor} p-2 rounded-full mr-3`}>
      {icon}
    </div>
    <div>
      <h3 className={`text-lg font-bold ${textColor}`}>{label}</h3>
      <p className={`text-xs ${textColor} opacity-75`}>{labelEn}</p>
      <div className={`text-xl font-bold mt-1 ${textColor}`}>{value}</div>
    </div>
  </div>
);

const QuizScore = ({ 
  courseName, 
  courseNameEn, 
  score, 
  totalQuestions 
}: { 
  courseName: string; 
  courseNameEn: string; 
  score: number; 
  totalQuestions: number 
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Calculate color based on score percentage
  let barColor = "bg-red-500";
  if (percentage >= 80) barColor = "bg-emerald-500";
  else if (percentage >= 60) barColor = "bg-blue-500";
  else if (percentage >= 40) barColor = "bg-amber-500";
  
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <div>
          <p className="text-base font-medium text-gray-800 dark:text-white">{courseName}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">{courseNameEn}</p>
        </div>
        <span className="text-sm font-bold text-gray-800 dark:text-white">
          {score}/{totalQuestions} ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className={`${barColor} h-2.5 rounded-full transition-all duration-500 ease-in-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const RecentProgress = () => {
  // Sample data - would typically come from an API
  const progressData: ProgressData = {
    completedChapters: 15,
    totalChapters: 35,
    completedAssignments: 8,
    totalAssignments: 12,
    quizScores: [
      {
        courseName: "জাভাস্ক্রিপ্ট ফাউন্ডেশন",
        courseNameEn: "JavaScript Foundation",
        score: 18,
        totalQuestions: 20,
      },
      {
        courseName: "রিয়েক্ট বেসিকস",
        courseNameEn: "React Basics",
        score: 15,
        totalQuestions: 20,
      },
      {
        courseName: "CSS এডভান্সড",
        courseNameEn: "CSS Advanced",
        score: 12,
        totalQuestions: 20,
      },
    ],
    studyHours: 45,
    streakDays: 7,
  };

  const calculateProgress = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="rounded-xl border border-purple-100 dark:border-purple-900/30 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800/50 shadow-md p-6 transition-all duration-300 hover:shadow-lg h-full">
      <div className="flex flex-col space-y-1.5 mb-4">
        <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-300 mb-1">
          আপনার সাম্প্রতিক অগ্রগতি
        </h2>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Your Recent Progress
        </p>
        <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
          গত ৩০ দিনের শিক্ষা অগ্রগতি
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <ProgressMetric
          icon={<TrendingUp size={22} />}
          label="অধ্যায় সম্পন্ন"
          labelEn="Chapters Completed"
          value={
            <div className="flex items-center">
              <span>{progressData.completedChapters}/{progressData.totalChapters}</span>
              <span className="text-sm ml-2">({calculateProgress(progressData.completedChapters, progressData.totalChapters)}%)</span>
            </div>
          }
          bgColor="bg-blue-100 dark:bg-blue-900/30"
          textColor="text-blue-900 dark:text-blue-100"
          iconColor="bg-blue-200 dark:bg-blue-800"
        />
        <ProgressMetric
          icon={<Check size={22} />}
          label="অ্যাসাইনমেন্ট"
          labelEn="Assignments"
          value={
            <div className="flex items-center">
              <span>{progressData.completedAssignments}/{progressData.totalAssignments}</span>
              <span className="text-sm ml-2">({calculateProgress(progressData.completedAssignments, progressData.totalAssignments)}%)</span>
            </div>
          }
          bgColor="bg-emerald-100 dark:bg-emerald-900/30"
          textColor="text-emerald-900 dark:text-emerald-100"
          iconColor="bg-emerald-200 dark:bg-emerald-800"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-3">
          <h3 className="text-base font-bold text-gray-800 dark:text-white">সাম্প্রতিক কুইজ স্কোর</h3>
          <span className="text-xs text-gray-600 dark:text-gray-400">Recent Quiz Scores</span>
        </div>
        <div className="bg-white dark:bg-gray-800/60 rounded-lg p-4 shadow-sm">
          {progressData.quizScores.map((quiz, index) => (
            <QuizScore
              key={index}
              courseName={quiz.courseName}
              courseNameEn={quiz.courseNameEn}
              score={quiz.score}
              totalQuestions={quiz.totalQuestions}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProgressMetric
          icon={<Clock size={22} />}
          label="অধ্যয়ন সময়"
          labelEn="Study Hours"
          value={`${progressData.studyHours} ঘণ্টা`}
          bgColor="bg-amber-100 dark:bg-amber-900/30"
          textColor="text-amber-900 dark:text-amber-100"
          iconColor="bg-amber-200 dark:bg-amber-800"
        />
        <ProgressMetric
          icon={<Trophy size={22} />}
          label="ধারাবাহিকতা"
          labelEn="Streak"
          value={`${progressData.streakDays} দিন`}
          bgColor="bg-purple-100 dark:bg-purple-900/30"
          textColor="text-purple-900 dark:text-purple-100"
          iconColor="bg-purple-200 dark:bg-purple-800"
        />
      </div>
    </div>
  );
}; 