import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

// type CourseWithProgressWithCategory = Course & {
//   category: Category | null;
//   chapters: { id: string }[];
//   progress: number | null;
// };

type CourseForHomepage = {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    price:number;
    category: {
      id: string;
      name: string;
    } | null;
  };
type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getAllSearchCourses = async ({
  title,
  categoryId
}: GetCourses): Promise<CourseForHomepage[]> => {
  console.log(title)
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        price:true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    

    return courses as CourseForHomepage[];
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
}

