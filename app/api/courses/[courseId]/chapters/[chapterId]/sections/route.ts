import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const session = await auth();
    const { title } = await req.json();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the chapter exists and belongs to the user
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      }
    });

    if (!chapter) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Get the position for the new section
    const lastSection = await db.section.findFirst({
      where: {
        chapterId: params.chapterId,
      },
      orderBy: {
        position: 'desc',
      },
    });

    const newPosition = lastSection ? lastSection.position + 1 : 0;

    // Create the section
    const section = await db.section.create({
      data: {
        title,
        chapterId: params.chapterId,
        position: newPosition,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error("[SECTIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 