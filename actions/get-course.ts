"use server";

import { db } from "@/lib/db";
import { Course, Chapter, Section } from "@prisma/client";

export type CourseWithChaptersAndSections = Course & {
  chapters: (Chapter & {
    sections: (Section & {
      videos: any[];
      blogs: any[];
      articles: any[];
      notes: any[];
      codeExplanations: any[];
      userProgress: any[];
    })[];
  })[];
};

export async function getCourse(courseId: string): Promise<{ 
  course: CourseWithChaptersAndSections | null; 
  error?: string;
}> {
  try {
    if (!courseId) {
      return {
        course: null,
        error: "Course ID is required"
      };
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          orderBy: {
            position: 'asc'
          },
          include: {
            sections: {
              orderBy: {
                position: 'asc'
              },
              include: {
                videos: {
                  orderBy: {
                    createdAt: 'desc'
                  }
                },
                blogs: {
                  orderBy: {
                    createdAt: 'desc'
                  }
                },
                articles: {
                  orderBy: {
                    createdAt: 'desc'
                  }
                },
                notes: {
                  orderBy: {
                    createdAt: 'desc'
                  }
                },
                codeExplanations: {
                  orderBy: {
                    createdAt: 'desc'
                  }
                },
                userProgress: true
              }
            }
          }
        }
      }
    });

    if (!course) {
      return {
        course: null,
        error: "Course not found"
      };
    }

    return {
      course
    };

  } catch (error) {
    console.error("[GET_COURSE]", error);
    return {
      course: null,
      error: "Failed to fetch course"
    };
  }
} 