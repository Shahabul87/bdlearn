import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(
  req: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const section = await db.section.findUnique({
      where: {
        id: params.sectionId,
      },
      include: {
        chapter: {
          include: {
            course: true
          }
        },
        videos: true,
        blogs: true,
        articles: true,
        notes: true,
        codeExplanations: true,
      },
    });

    if (!section) {
      return new NextResponse("Section not found", { status: 404 });
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error("[SECTION_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 