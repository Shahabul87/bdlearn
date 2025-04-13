import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { TeacherAnalyticsContent } from "./_components/teacher-analytics-content";
import { UserRole } from "@prisma/client";

// Dummy data for testing when no real courses are available
const generateDummyData = (teacherId: string) => {
  const dummyStudents = [
    { 
      id: "s1", 
      name: "রাকিব হাসান", 
      email: "rakib@example.com", 
      image: null
    },
    { 
      id: "s2", 
      name: "জান্নাতুল ফেরদৌস", 
      email: "jannatul@example.com", 
      image: null
    },
    { 
      id: "s3", 
      name: "আহমেদ হোসেন", 
      email: "ahmed@example.com", 
      image: null
    },
    { 
      id: "s4", 
      name: "নুসরাত জাহান", 
      email: "nusrat@example.com", 
      image: null
    },
    { 
      id: "s5", 
      name: "সাকিব আল হাসান", 
      email: "sakib@example.com", 
      image: null
    }
  ];

  const createDummyEnrollments = (courseId: string, students: any[]) => {
    return students.map(student => ({
      id: `e-${courseId}-${student.id}`,
      userId: student.id,
      courseId: courseId,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      user: student
    }));
  };

  const createDummyChapters = (courseId: string, numChapters: number, studentIds: string[]) => {
    const chapters = [];
    for (let i = 1; i <= numChapters; i++) {
      const userProgressItems = studentIds.map(studentId => {
        // Randomly determine if chapter is completed (weighted towards completion for earlier chapters)
        const isCompleted = Math.random() < (1 - i/numChapters + 0.3);
        return {
          id: `up-${courseId}-ch${i}-${studentId}`,
          userId: studentId,
          chapterId: `ch-${courseId}-${i}`,
          sectionId: `s-${courseId}-${i}-1`,
          isCompleted,
          updatedAt: new Date(Date.now() - Math.floor(Math.random() * 5000000000))
        };
      });

      chapters.push({
        id: `ch-${courseId}-${i}`,
        title: `অধ্যায় ${i}: ${["পরিচিতি", "মৌলিক ধারণা", "উন্নত প্রযুক্তি", "প্রজেক্ট কাজ", "চূড়ান্ত মূল্যায়ন"][Math.min(i-1, 4)]}`,
        courseId,
        position: i,
        isPublished: true,
        isFree: i === 1,
        userProgress: userProgressItems,
        sections: [
          {
            id: `s-${courseId}-${i}-1`,
            title: `সেকশন ${i}.1`,
            chapterId: `ch-${courseId}-${i}`,
            position: 1,
            isPublished: true
          }
        ]
      });
    }
    return chapters;
  };

  return [
    {
      id: "course-1",
      title: "ওয়েব ডিজাইন ও ডেভেলপমেন্ট",
      description: "এই কোর্সে আপনি HTML, CSS, জাভাস্ক্রিপ্ট এবং রিয়েক্ট শিখবেন।",
      price: 1999,
      userId: teacherId,
      category: { id: "cat-1", name: "প্রোগ্রামিং" },
      enrollments: createDummyEnrollments("course-1", dummyStudents.slice(0, 3)),
      chapters: createDummyChapters("course-1", 5, dummyStudents.slice(0, 3).map(s => s.id)),
      isPublished: true,
      createdAt: new Date("2023-10-01")
    },
    {
      id: "course-2",
      title: "ডাটা সায়েন্স এবং এআই পরিচিতি",
      description: "পাইথন, এমএল এবং ডেটা এনালিটিক্স সম্পর্কে শিখুন।",
      price: 2499,
      userId: teacherId,
      category: { id: "cat-2", name: "ডাটা সায়েন্স" },
      enrollments: createDummyEnrollments("course-2", dummyStudents.slice(1, 5)),
      chapters: createDummyChapters("course-2", 6, dummyStudents.slice(1, 5).map(s => s.id)),
      isPublished: true,
      createdAt: new Date("2023-12-15")
    },
    {
      id: "course-3",
      title: "মোবাইল অ্যাপ ডেভেলপমেন্ট",
      description: "রিয়েক্ট নেটিভ এবং ফ্লাটার ব্যবহার করে মোবাইল অ্যাপ তৈরি করুন।",
      price: 2199,
      userId: teacherId,
      category: { id: "cat-3", name: "মোবাইল অ্যাপ" },
      enrollments: createDummyEnrollments("course-3", [dummyStudents[0], dummyStudents[2], dummyStudents[4]]),
      chapters: createDummyChapters("course-3", 4, [dummyStudents[0].id, dummyStudents[2].id, dummyStudents[4].id]),
      isPublished: true,
      createdAt: new Date("2024-02-05")
    }
  ] as any[];
};

export default async function TeacherAnalyticsPage() {
  const user = await currentUser();

  if (!user) {
    return redirect("/auth/login");
  }

  // Redirect if not a teacher
  if (user.role !== "TEACHER") {
    if (user.role === "STUDENT") {
      return redirect("/dashboard/student");
    } else {
      return redirect("/dashboard");
    }
  }

  // Ensure user.id exists
  if (!user.id) {
    return redirect("/auth/login");
  }

  // Fetch all courses created by this teacher with enrollments and students
  let courses = await db.course.findMany({
    where: {
      userId: user.id,
    },
    include: {
      category: true,
      enrollments: {
        include: {
          user: true,
          course: true,
        }
      },
      chapters: {
        include: {
          sections: true,
          userProgress: {
            // Include only the fields we need for our components
            select: {
              userId: true,
              isCompleted: true,
              updatedAt: true,
              chapterId: true,
              sectionId: true
            }
          }
        }
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  // Use dummy data if no courses are found
  if (!courses || courses.length === 0) {
    courses = generateDummyData(user.id);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <ConditionalHeader user={user} />
      <TeacherAnalyticsContent 
        courses={courses} 
        teacherId={user.id}
      />
    </div>
  );
} 