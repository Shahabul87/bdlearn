import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { type } = await req.json();
    const { commentId } = params;

    const comment = await db.comment.findUnique({
      where: { id: commentId },
      select: { 
        likedBy: true, 
        lovedBy: true,
        likes: true,
        loves: true
      }
    });

    if (!comment) {
      return new NextResponse("Comment not found", { status: 404 });
    }

    let updateData = {};

    if (type === 'like') {
      const hasLiked = comment.likedBy.includes(user.id);
      updateData = {
        likes: hasLiked ? comment.likes - 1 : comment.likes + 1,
        likedBy: hasLiked 
          ? { set: comment.likedBy.filter(id => id !== user.id) }
          : { push: user.id }
      };
    } else if (type === 'love') {
      const hasLoved = comment.lovedBy.includes(user.id);
      updateData = {
        loves: hasLoved ? comment.loves - 1 : comment.loves + 1,
        lovedBy: hasLoved
          ? { set: comment.lovedBy.filter(id => id !== user.id) }
          : { push: user.id }
      };
    }

    const updatedComment = await db.comment.update({
      where: { id: commentId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error("[COMMENT_REACTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 