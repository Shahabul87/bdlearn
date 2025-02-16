import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string } }
) {
  try {
    const session = await auth();
    const { title, description, videoUrl, rating } = await req.json();

    console.log("Received video data:", { title, description, videoUrl });
    console.log("Params:", params);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First verify the section exists
    const section = await db.section.findUnique({
      where: {
        id: params.sectionId,
      },
    });

    if (!section) {
      return new NextResponse("Section not found", { status: 404 });
    }

    // Create the video with proper fields
    const video = await db.video.create({
      data: {
        title,
        description,
        url: videoUrl,
        rating: Number(rating),
        sectionId: params.sectionId,
        userId: session.user.id,
        isPublished: true,
        position: 0,
      },
    });

    console.log("Created video:", video);
    return NextResponse.json(video);
  } catch (error) {
    console.error("[VIDEOS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    const videos = await db.video.findMany({
      where: {
        sectionId: params.sectionId,
      },
      orderBy: {
        position: "asc",
      },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("[VIDEOS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 