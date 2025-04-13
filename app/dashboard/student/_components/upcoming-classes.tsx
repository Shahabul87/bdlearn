import { CalendarIcon, BookOpen, Video } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface UpcomingClassProps {
  title: string;
  titleEn: string;
  instructor: string;
  datetime: Date;
  duration: string;
  type: "LIVE" | "RECORDED" | "ASSIGNMENT";
}

const ClassCard = ({ 
  title, 
  titleEn, 
  instructor, 
  datetime, 
  duration, 
  type 
}: UpcomingClassProps) => {
  const getGradient = () => {
    switch (type) {
      case "LIVE": 
        return "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 border-blue-500";
      case "RECORDED":
        return "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/10 border-purple-500";
      case "ASSIGNMENT":
        return "from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/10 border-amber-500";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "LIVE": 
        return <Video className="h-10 w-10 text-blue-500" />;
      case "RECORDED":
        return <BookOpen className="h-10 w-10 text-purple-500" />;
      case "ASSIGNMENT":
        return <CalendarIcon className="h-10 w-10 text-amber-500" />;
    }
  };

  const relativeTime = formatDistanceToNow(datetime, { addSuffix: true });

  return (
    <div className={`flex items-center p-4 bg-gradient-to-r ${getGradient()} rounded-lg border-l-4`}>
      <div className="mr-4">
        {getIcon()}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">{titleEn}</p>
        <div className="flex items-center mt-1 text-gray-700 dark:text-gray-300">
          <p className="text-sm font-medium">{instructor} • {duration}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="px-3 py-1 rounded-full bg-white/80 dark:bg-gray-800/50 shadow-sm">
          <p className="text-base font-bold text-gray-900 dark:text-white">{
            datetime.toLocaleTimeString('bn-BD', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })
          }</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {datetime.toLocaleDateString('bn-BD', { 
              day: 'numeric', 
              month: 'long'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export const UpcomingClasses = () => {
  // These would typically come from an API
  const upcomingClasses = [
    {
      id: 1,
      title: "জাভাস্ক্রিপ্ট এবং ES6 ফিচারস",
      titleEn: "JavaScript and ES6 Features",
      instructor: "রাশেদ আহমেদ",
      datetime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      duration: "৬০ মিনিট",
      type: "LIVE" as const
    },
    {
      id: 2,
      title: "রিয়েক্ট কম্পোনেন্ট এবং প্রপস",
      titleEn: "React Components and Props",
      instructor: "সাদিয়া আক্তার",
      datetime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 days from now
      duration: "৪৫ মিনিট",
      type: "RECORDED" as const
    },
    {
      id: 3,
      title: "নেক্সটজেএস প্রজেক্ট সাবমিশন",
      titleEn: "NextJS Project Submission",
      instructor: "মাহমুদ হাসান",
      datetime: new Date(Date.now() + 96 * 60 * 60 * 1000), // 4 days from now
      duration: "স্বনির্ধারিত",
      type: "ASSIGNMENT" as const
    }
  ];

  return (
    <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800/50 shadow-md p-6 transition-all duration-300 hover:shadow-lg h-full">
      <div className="flex flex-col space-y-1.5 mb-4">
        <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-300 mb-1">
          আসন্ন ক্লাসসমূহ
        </h2>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Upcoming Classes
        </p>
        <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-1">
          আপনার আগামী ৭ দিনের ক্লাস এবং অ্যাসাইনমেন্ট
        </p>
      </div>
      
      <div className="space-y-3">
        {upcomingClasses.map(classItem => (
          <ClassCard 
            key={classItem.id}
            title={classItem.title}
            titleEn={classItem.titleEn}
            instructor={classItem.instructor}
            datetime={classItem.datetime}
            duration={classItem.duration}
            type={classItem.type}
          />
        ))}
      </div>
    </div>
  );
}; 