import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { type, action } = await req.json();

    // Find existing reaction
    const existingReaction = await db.reaction.findFirst({
      where: {
        userId: session.user.id,
        commentId: params.commentId,
        type
      },
    });

    if (action === 'remove' && existingReaction) {
      // Remove reaction (decrement)
      await db.reaction.delete({
        where: { id: existingReaction.id },
      });
      return NextResponse.json({ message: "Reaction removed" });
    } 
    
    if (action === 'add' && !existingReaction) {
      // Add reaction (increment)
      const reaction = await db.reaction.create({
        data: {
          type,
          userId: session.user.id,
          commentId: params.commentId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      });
      return NextResponse.json(reaction);
    }

    return NextResponse.json({ message: "No action taken" });
  } catch (error) {
    console.error("[REACTION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 