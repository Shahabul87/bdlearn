import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  BarChart,
  Calendar,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { currentUser } from '@/lib/auth'
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import ConditionalHeader from "@/app/(homepage)/user-header";


export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing the learning platform",
};

interface AnalyticCard {
  title: string;
  value: string;
  description: string;
  icon: any;
  trend: number;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastActive: Date;
  coursesEnrolled: number;
}

interface RecentCourse {
  id: string;
  title: string;
  instructor: string;
  enrollments: number;
  revenue: number;
  rating: number;
}

async function getAnalytics() {
  // In real app, fetch from your API
  const analytics: AnalyticCard[] = [
    {
      title: "Total Revenue",
      value: "$12,345",
      description: "Monthly revenue",
      icon: DollarSign,
      trend: 12.5,
    },
    {
      title: "Active Users",
      value: "1,234",
      description: "Monthly active users",
      icon: Users,
      trend: 8.2,
    },
    {
      title: "Course Enrollments",
      value: "456",
      description: "New enrollments this month",
      icon: BookOpen,
      trend: -3.4,
    },
    {
      title: "Completion Rate",
      value: "78%",
      description: "Average course completion",
      icon: Activity,
      trend: 5.1,
    },
  ];
  return analytics;
}

async function getRecentUsers() {
  // In real app, fetch from your API
  const users: RecentUser[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "/avatars/1.png",
      lastActive: new Date(),
      coursesEnrolled: 3,
    },
    // Add more users...
  ];
  return users;
}

async function getRecentCourses() {
  // In real app, fetch from your API
  const courses: RecentCourse[] = [
    {
      id: "1",
      title: "Advanced Web Development",
      instructor: "Jane Smith",
      enrollments: 156,
      revenue: 7890,
      rating: 4.8,
    },
    // Add more courses...
  ];
  return courses;
}

export default async function AdminDashboard(): Promise<JSX.Element> {
  const session = await auth();
  const user = await currentUser();

  if (!session) {
    redirect('/sign-in');
  }

  if (session?.user?.role !== "ADMIN") {
    redirect('/');
  }

  const [analytics, recentUsers, recentCourses] = await Promise.all([
    getAnalytics(),
    getRecentUsers(),
    getRecentCourses(),
  ]);

  return (
    <>
      <ConditionalHeader user={user} />
      <SidebarDemo>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8 mt-16 sm:mt-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Admin Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Manage your learning platform
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap">Select Period</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  <Settings className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap">Settings</span>
                </Button>
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {analytics.map((card) => (
                <Card key={card.title} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      {card.title}
                    </CardTitle>
                    <card.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-xl sm:text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      {card.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <TrendingUp className={cn(
                        "w-4 h-4",
                        card.trend > 0 ? "text-green-500" : "text-red-500"
                      )} />
                      <span className={cn(
                        "text-xs sm:text-sm",
                        card.trend > 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {Math.abs(card.trend)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
              {/* Recent Users */}
              <Card className="lg:col-span-1">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg sm:text-xl">Recent Users</CardTitle>
                  <CardDescription>Latest user activities</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <ScrollArea className="h-[300px] sm:h-[400px] pr-4">
                    <div className="space-y-3 sm:space-y-4">
                      {recentUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm sm:text-base">{user.name}</p>
                              <p className="text-xs sm:text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs sm:text-sm font-medium">
                              {user.coursesEnrolled} courses
                            </p>
                            <p className="text-xs text-gray-500">
                              Active {new Date(user.lastActive).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Course Performance */}
              <Card className="lg:col-span-2">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg sm:text-xl">Course Performance</CardTitle>
                  <CardDescription>Revenue and enrollment metrics</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <ScrollArea className="h-[300px] sm:h-[400px]">
                    <div className="space-y-3 sm:space-y-4">
                      {recentCourses.map((course) => (
                        <div
                          key={course.id}
                          className="p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                            <div>
                              <h4 className="font-medium text-sm sm:text-base">{course.title}</h4>
                              <p className="text-xs sm:text-sm text-gray-500">
                                by {course.instructor}
                              </p>
                            </div>
                            <Badge variant="secondary" className="self-start sm:self-center">
                              ⭐ {course.rating.toFixed(1)}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                            <div>
                              <p className="text-xs sm:text-sm text-gray-500">Enrollments</p>
                              <p className="text-base sm:text-lg font-medium">{course.enrollments}</p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm text-gray-500">Revenue</p>
                              <p className="text-base sm:text-lg font-medium">
                                ${course.revenue.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Progress value={75} className="mt-3 sm:mt-4" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarDemo>
    </>
  );
} 