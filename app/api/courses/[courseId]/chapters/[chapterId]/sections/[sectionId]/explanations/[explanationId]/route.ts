import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string; explanationId: string } }
) {
  try {
    const user = await currentUser();
    const { heading, code, explanation } = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedExplanation = await db.codeExplanation.update({
      where: {
        id: params.explanationId,
        sectionId: params.sectionId,
      },
      data: {
        heading,
        code,
        explanation,
      }
    });

    return NextResponse.json(updatedExplanation);
  } catch (error) {
    console.log("[EXPLANATION_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string; explanationId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedExplanation = await db.codeExplanation.delete({
      where: {
        id: params.explanationId,
        sectionId: params.sectionId,
      }
    });

    return NextResponse.json(deletedExplanation);
  } catch (error) {
    console.log("[EXPLANATION_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string; explanationId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const explanation = await db.codeExplanation.findUnique({
      where: {
        id: params.explanationId,
        sectionId: params.sectionId,
      }
    });

    return NextResponse.json(explanation);
  } catch (error) {
    console.log("[EXPLANATION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 