import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string } }
) {
  try {
    const user = await currentUser();
    const { heading, code, explanation } = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const sectionOwner = await db.section.findUnique({
      where: {
        id: params.sectionId,
        chapter: {
          courseId: params.courseId
        }
      }
    });

    if (!sectionOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const codeExplanation = await db.codeExplanation.create({
      data: {
        heading,
        code,
        explanation,
        sectionId: params.sectionId,
      }
    });

    return NextResponse.json(codeExplanation);
  } catch (error) {
    console.log("[CODE_EXPLANATION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 