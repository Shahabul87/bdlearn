"use server";

import { db } from "@/lib/db";
import { Chapter, Section, Course } from "@prisma/client";

export type ChapterWithSectionsAndCourse = Chapter & {
  sections: (Section & {
    videos: any[];
    blogs: any[];
    articles: any[];
    notes: any[];
    codeExplanations: any[];
    userProgress: any[];
  })[];
  course: Course;
};

export async function getChapter(
  chapterId: string,
  courseId: string
): Promise<{
  chapter: ChapterWithSectionsAndCourse | null;
  error?: string;
}> {
  try {
    if (!chapterId || !courseId) {
      return {
        chapter: null,
        error: "Chapter ID and Course ID are required"
      };
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId
      },
      include: {
        course: true,
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
            userProgress: {
              where: {
                chapterId: chapterId
              }
            }
          }
        }
      }
    });

    if (!chapter) {
      return {
        chapter: null,
        error: "Chapter not found"
      };
    }

    return {
      chapter
    };

  } catch (error) {
    console.error("[GET_CHAPTER]", error);
    return {
      chapter: null,
      error: "Failed to fetch chapter"
    };
  }
}