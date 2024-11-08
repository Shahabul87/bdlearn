import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const user = await currentUser();
    const { title, description, isPublished = false, isFree = false } = await req.json();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = user.id;

    // Verify that the user owns the post
    const postOwner = await db.post.findUnique({
      where: {
        id: params.postId,
        userId: userId,
      },
    });

    if (!postOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the last chapter to set the position of the new chapter
    const lastChapter = await db.postChapterSection.findFirst({
      where: {
        postId: params.postId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    // Create a new PostChapterSection
    const newChapter = await db.postChapterSection.create({
      data: {
        title,
        description,
        isPublished,
        isFree,
        postId: params.postId,
        position: newPosition,
      },
    });

    return NextResponse.json(newChapter);
  } catch (error) {
    console.log("[POSTCHAPTERSECTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
