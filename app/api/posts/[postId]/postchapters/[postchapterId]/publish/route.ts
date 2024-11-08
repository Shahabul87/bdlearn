import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { postId?: string; postchapterId?: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Ensure both postId and postChapterId are defined
    if (!params.postId || !params.postchapterId) {
      return new NextResponse("Missing required parameters", { status: 400 });
    }

    // Verify that the post exists and belongs to the user
    const post = await db.post.findUnique({
      where: { id: params.postId, userId: user.id },
      include: { postchapter: true },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    // Verify that the specific post chapter exists
    const postChapter = await db.postChapterSection.findUnique({
      where: { id: params.postchapterId },
    });

    if (!postChapter) {
      return new NextResponse("Post chapter not found", { status: 404 });
    }

    // Toggle the published status of the post chapter
    const updatedPostChapter = await db.postChapterSection.update({
      where: { id: params.postchapterId },
      data: { isPublished: !postChapter.isPublished },
    });

    return NextResponse.json(updatedPostChapter);
  } catch (error) {
    console.error("[POSTCHAPTER_ID_PUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

