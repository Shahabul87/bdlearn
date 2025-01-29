import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First verify the course belongs to the user
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: session.user.id,
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Delete the course
    await db.course.delete({
      where: {
        id: params.courseId,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[COURSE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
  ) {
    try {
      const user = await currentUser();
      const { courseId } = params;
      const values = await req.json();
  
      if (!user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const userId = user?.id;
  
      const course = await db.course.update({
        where: {
          id: courseId,
          userId
        },
        data: {
          ...values,
        }
      });
  
      return NextResponse.json(course);
    } catch (error) {
      console.log("[COURSE_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }