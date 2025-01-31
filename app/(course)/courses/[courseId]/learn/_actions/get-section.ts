"use server";

import { db } from "@/lib/db";

export async function getSection(sectionId: string) {
  const section = await db.section.findUnique({
    where: { id: sectionId },
    include: {
      videos: true,
      articles: true,
      codeExplanations: true,
    }
  });
  
  return section;
} 