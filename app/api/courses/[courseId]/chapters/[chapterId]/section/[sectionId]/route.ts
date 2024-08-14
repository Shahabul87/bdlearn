
import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string, sectionId:string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the user owns the course before proceeding
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the chapter exists before attempting to delete
    const chapterExists = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      }
    });

    if (!chapterExists) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Delete the chapter
    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId,
      }
    });

    // After deleting the chapter, check if there are any published chapters left in the course
    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      }
    });

    // If there are no published chapters left, update the course to be unpublished
    if (publishedChaptersInCourse.length === 0) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        }
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[DELETE_CHAPTER_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string, sectionId:string } }
) {
  try {
    const user = await currentUser();
    const { videoUrl, ...values } = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the current user owns the course
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapterData = await db.chapter.findUnique({
        where:{
            id: params.chapterId
        }
    })

    if (!chapterData) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

    // Update chapter with new values including videoUrl
    const updatedSection = await db.section.update({
      where: {
        id: params.sectionId,
      },
      data: {
        ...values,
        videoUrl, // This assumes videoUrl is part of your Chapter model
      }
    });

    // Return the updated chapter information
    return new NextResponse(JSON.stringify(updatedSection), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.log("[PATCH ERROR] Courses/Chapter ID:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


