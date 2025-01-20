import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = user.id;
    const { replyContent, parentReplyId } = await req.json();

    // Validate that the reply content is provided
    if (!replyContent || typeof replyContent !== "string" || replyContent.trim() === "") {
      return new NextResponse("Reply content is required", { status: 400 });
    }

    // Check if the post exists
    const postExists = await db.post.findUnique({
      where: { id: params.postId },
      select: { id: true },
    });

    if (!postExists) {
      return new NextResponse("Post not found", { status: 404 });
    }

    // Check if the comment exists and belongs to the specified post
    const commentExists = await db.comment.findFirst({
      where: {
        id: params.commentId,
        postId: params.postId,
      },
      select: { id: true },
    });

    if (!commentExists) {
      return new NextResponse("Comment not found for the specified post", { status: 404 });
    }

    // Create the reply with optional parentReplyId
    const newReply = await db.reply.create({
      data: {
        replyContent,
        userId,
        postId: params.postId,
        commentId: params.commentId,
        ...(parentReplyId ? { parentReplyId } : {}), // Only include if parentReplyId exists
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        reactions: true,
      },
    });

    return NextResponse.json(newReply);
  } catch (error) {
    console.error("[CREATE_REPLY_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


