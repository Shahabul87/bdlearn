import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
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

    // Check if reaction already exists
    const existingReaction = await db.reaction.findFirst({
      where: {
        userId: user.id,
        commentId: commentId,
        type: type,
      },
    });

    if (existingReaction) {
      // Remove reaction if it exists
      await db.reaction.delete({
        where: {
          id: existingReaction.id,
        },
      });

      return NextResponse.json({ 
        message: "Reaction removed",
        action: "remove"
      });
    } 
    
    // Add new reaction
    const reaction = await db.reaction.create({
      data: {
        type: type,
        userId: user.id, // Now we know user.id is defined
        commentId: commentId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ 
      message: "Reaction added",
      action: "add",
      reaction 
    });
  } catch (error) {
    console.error("[COMMENT_REACTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 