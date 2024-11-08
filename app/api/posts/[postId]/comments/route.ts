import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    // Authenticate the user
    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = user.id;
    const { comment } = await req.json();

    // Validate that the comment text is provided
    if (!comment || typeof comment !== "string" || comment.trim() === "") {
      return new NextResponse("Comment text is required", { status: 400 });
    }

    // Verify that the post exists
    const post = await db.post.findUnique({
      where: {
        id: params.postId,
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    // Create a new comment in the Comment model
    const newComment = await db.comment.create({
      data: {
        comments: comment,
        userId: userId,
        postId: params.postId,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(newComment);

  } catch (error) {
    console.error("[CREATE_COMMENT_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

