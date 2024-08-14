// import { currentUser } from "@/lib/auth";
// import { NextResponse } from "next/server";

// import { db } from "@/lib/db";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   try {
//     const user = await currentUser();
    

//     if (!user?.id) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }

//     const userId = user?.id;

//     const ownCourse = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         userId
//       }
//     });

//     if (!ownCourse) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const chapter = await db.chapter.findUnique({
//       where: {
//         id: params.chapterId,
//         courseId: params.courseId,
//       }
//     });

//     const muxData = await db.muxData.findUnique({
//       where: {
//         chapterId: params.chapterId,
//       }
//     });

//     if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
//       return new NextResponse("Missing required fields", { status: 400 });
//     }

//     const publishedChapter = await db.chapter.update({
//       where: {
//         id: params.chapterId,
//         courseId: params.courseId,
//       },
//       data: {
//         isPublished: true,
//       }
//     });

//     return NextResponse.json(publishedChapter);
//   } catch (error) {
//     console.log("[CHAPTER_PUBLISH]", error);
//     return new NextResponse("Internal Error", { status: 500 }); 
//   }
// }

import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the user owns the course
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch the chapter to ensure it exists and has the required fields
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      }
    });

    // Check for the presence of required fields in the chapter
    if (!chapter || !chapter.title || !chapter.description || !chapter.videoUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Publish the chapter
    const publishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
      },
      data: {
        isPublished: true,
      }
    });

    return new NextResponse(JSON.stringify(publishedChapter), { status: 200, headers: {"Content-Type": "application/json"} });
  } catch (error) {
    console.log("[CHAPTER_PUBLISH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
