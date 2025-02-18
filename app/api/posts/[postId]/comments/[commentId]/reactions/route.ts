import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { type, action } = await req.json();
    const { commentId } = params;

    // Check if reaction already exists
    const existingReaction = await db.reaction.findFirst({
      where: {
        userId: user.id,
        commentId: commentId,
        type: type,
      },
    });

    if (action === 'remove' && existingReaction) {
      // Remove reaction
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
    
    if (action === 'add' && !existingReaction) {
      // Add new reaction
      const reaction = await db.reaction.create({
        data: {
          type,
          userId: user.id,
          commentId,
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
    }

    return NextResponse.json({ message: "No action taken" });
  } catch (error) {
    console.error("[COMMENT_REACTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 