import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string } }
) {
  try {
    const user = await currentUser();
    const { title, description, url, duration, clarityRating, position } = await req.json();

    // Check if the user is authenticated
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the current user owns the course
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the specified chapter exists within the course
    const chapterData = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
    });

    if (!chapterData) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    // Check if the specified section exists within the chapter
    const sectionData = await db.section.findUnique({
      where: {
        id: params.sectionId,
      },
    });

    if (!sectionData) {
      return new NextResponse("Section not found", { status: 404 });
    }


    // Validate required fields for video creation
    if (!title || !url || !duration || !clarityRating || !position) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create a new video entry in the database
    const newVideo = await db.video.create({
      data: {
        title,
        description,
        url,
        duration,
        clarityRating,
        position,
        sectionId: params.sectionId, // Link video to the section
        userId: user.id, // Associate video with the current user
      },
    });

    // Return the newly created video information
    return new NextResponse(JSON.stringify(newVideo), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("[POST ERROR] Courses/Chapter/Section ID:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
