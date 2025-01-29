import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; sectionId: string } }
) {
  try {
    const user = await currentUser();
    const { videoId, completed } = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Update or create progress record
    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: user.id,
          chapterId: videoId,
        }
      },
      update: {
        isCompleted: completed,
      },
      create: {
        userId: user.id,
        chapterId: videoId,
        isCompleted: completed,
        chapter: {
          connect: { id: videoId }
        },
        section: {
          connect: { id: params.sectionId }
        }
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.error("[COURSE_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 