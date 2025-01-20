import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user is already enrolled
    const existingEnrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (existingEnrollment) {
      return new NextResponse("Already enrolled", { status: 400 });
    }

    // Create enrollment
    const enrollment = await db.enrollment.create({
      data: {
        userId: user.id,
        courseId: params.courseId,
      },
    });

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("[COURSE_ENROLL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 