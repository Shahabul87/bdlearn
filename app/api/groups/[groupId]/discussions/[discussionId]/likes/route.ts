import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { groupId: string; discussionId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user has already liked the discussion
    const existingLike = await db.groupDiscussionLike.findUnique({
      where: {
        discussionId_userId: {
          discussionId: params.discussionId,
          userId: session.user.id,
        },
      },
    });

    if (existingLike) {
      // Unlike if already liked
      await db.groupDiscussionLike.delete({
        where: {
          id: existingLike.id,
        },
      });

      await db.groupDiscussion.update({
        where: {
          id: params.discussionId,
        },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({ liked: false });
    }

    // Create new like
    await db.groupDiscussionLike.create({
      data: {
        discussionId: params.discussionId,
        userId: session.user.id,
      },
    });

    await db.groupDiscussion.update({
      where: {
        id: params.discussionId,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ liked: true });
  } catch (error) {
    console.error("[DISCUSSION_LIKE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 