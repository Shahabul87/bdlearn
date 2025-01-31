"use server";

import { db } from "@/lib/db";

export async function getSectionContent(sectionId: string) {
  const section = await db.section.findUnique({
    where: { id: sectionId },
    include: {
      chapter: {
        include: { course: true }
      },
      videos: true,
      articles: true,
      codeExplanations: true,
    }
  });
  
  return section;
} 