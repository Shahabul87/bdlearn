import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { content } = await req.json();
    const { postId, commentId } = params;

    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }

    const reply = await db.reply.create({
      data: {
        content,
        userId: user.id,
        postId,
        commentId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        reactions: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(reply);
  } catch (error) {
    console.error("[REPLY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


