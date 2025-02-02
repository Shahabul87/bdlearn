import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string } }
) {
  try {
    const session = await auth();
    const values = await req.json();

    console.log("Received section update data:", values);
    console.log("Params:", params);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the course exists and belongs to the user
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: session.user.id,
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Update the section
    const section = await db.section.update({
      where: {
        id: params.sectionId,
        chapterId: params.chapterId,
      },
      data: {
        ...values,
      },
    });

    console.log("Updated section:", section);
    return NextResponse.json(section);
  } catch (error) {
    console.error("[SECTION_UPDATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 