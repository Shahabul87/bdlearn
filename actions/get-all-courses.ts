import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { Prisma } from "@prisma/client";

// Define types using Prisma's inferred types
type Course = Prisma.CourseGetPayload<{}>;
type Category = Prisma.CategoryGetPayload<{}>;

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
};

export const getCoursesForHomepage = async () => {
  const user = await currentUser();

  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        chapters: true,
        category: true,
        purchases: {
          where: {
            userId: user?.id
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return courses;
  } catch (error) {
    console.error("[GET_COURSES]", error);
    return [];
  }
};

