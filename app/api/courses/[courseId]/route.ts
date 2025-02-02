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
    const session = await auth();
    const values = await req.json();

    console.log("Updating course:", {
      courseId: params.courseId,
      userId: session?.user?.id,
      values
    });

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: params.courseId,
        userId: session.user.id
      },
      data: {
        ...values,
        // Ensure price is properly typed as a number
        ...(values.price !== undefined && {
          price: Number(values.price)
        })
      }
    });

    console.log("Updated course:", course);
    return NextResponse.json(course);
  } catch (error) {
    console.error("[COURSE_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}