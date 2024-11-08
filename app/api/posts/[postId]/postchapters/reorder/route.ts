import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    // Ensure the user is authenticated
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = user.id;

    // Parse request body and validate `list`
    const { list } = await req.json();
    if (!Array.isArray(list) || list.length === 0) {
      return new NextResponse("Invalid data: 'list' must be a non-empty array", { status: 400 });
    }

    // Check that each item has `id` and `position` properties
    for (const item of list) {
      if (typeof item.id !== "string" || typeof item.position !== "number") {
        return new NextResponse("Each item must have a valid 'id' (string) and 'position' (number)", { status: 400 });
      }
    }

    // Verify the post belongs to the current user
    const post = await db.post.findFirst({
      where: {
        id: params.postId,
        userId: userId,
      },
    });
    if (!post) {
      return new NextResponse("Unauthorized or post not found", { status: 404 });
    }

    // Perform the updates in a transaction
    const updatePromises = list.map((item) =>
      db.postChapterSection.update({
        where: { id: item.id },
        data: { position: item.position },
      })
    );

    await db.$transaction(updatePromises);

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("[REORDER ERROR]", error);

    // Extract error message if available, otherwise return a generic message
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new NextResponse(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
