"use server";

import { db } from "@/lib/db";
import { Section, Chapter, Video, Blog, Article, Note, CodeExplanation, UserProgress } from "@prisma/client";

export type SectionWithAllRelations = Section & {
  chapter: Chapter & {
    sections: Section[];
  };
  videos: Video[];
  blogs: Blog[];
  articles: Article[];
  notes: Note[];
  codeExplanations: CodeExplanation[];
  userProgress: UserProgress[];
};

export async function getSection(
  sectionId: string,
  chapterId: string,
  courseId: string
): Promise<{
  section: SectionWithAllRelations | null;
  nextSection: Section | null;
  prevSection: Section | null;
  error?: string;
}> {
  try {
    if (!sectionId || !chapterId || !courseId) {
      return {
        section: null,
        nextSection: null,
        prevSection: null,
        error: "Section ID, Chapter ID and Course ID are required"
      };
    }

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        chapterId: chapterId
      },
      include: {
        chapter: {
          include: {
            sections: {
              orderBy: {
                position: 'asc'
              }
            }
          }
        },
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
            sectionId: sectionId
          }
        }
      }
    });

    if (!section) {
      return {
        section: null,
        nextSection: null,
        prevSection: null,
        error: "Section not found"
      };
    }

    // Get current section index for navigation
    const currentSectionIndex = section.chapter.sections.findIndex(
      (s) => s.id === section.id
    );

    // Get next and previous sections
    const nextSection = section.chapter.sections[currentSectionIndex + 1] || null;
    const prevSection = section.chapter.sections[currentSectionIndex - 1] || null;

    return {
      section,
      nextSection,
      prevSection
    };

  } catch (error) {
    console.error("[GET_SECTION]", error);
    return {
      section: null,
      nextSection: null,
      prevSection: null,
      error: "Failed to fetch section"
    };
  }
} 