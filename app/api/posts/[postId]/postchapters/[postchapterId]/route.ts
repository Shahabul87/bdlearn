
import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";



export async function DELETE(
  req: Request,
  { params }: { params: { postId: string; postchapterId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the user owns the post before proceeding
    const ownPost = await db.post.findUnique({
      where: {
        id: params.postId,
        userId: user.id,
      },
    });

    if (!ownPost) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the post chapter exists before attempting to delete
    const chapterExists = await db.postChapterSection.findUnique({
      where: {
        id: params.postchapterId,
      },
    });

    if (!chapterExists) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Delete the post chapter
    const deletedChapter = await db.postChapterSection.delete({
      where: {
        id: params.postchapterId,
      },
    });

    // After deleting the chapter, check if there are any published chapters left in the post
    const publishedChaptersInPost = await db.postChapterSection.findMany({
      where: {
        postId: params.postId,
        isPublished: true,
      },
    });

    // If there are no published chapters left, update the post to be unpublished
    if (publishedChaptersInPost.length === 0) {
      await db.post.update({
        where: {
          id: params.postId,
        },
        data: {
          published: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[DELETE_POSTCHAPTER_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}





export async function PATCH(
  req: Request,
  { params }: { params: { postId: string; postchapterId: string } }
) {
  try {
    // Validate user
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract and validate the provided values
    const values = await req.json();
    if (!values || Object.keys(values).length === 0) {
      return new NextResponse("No values provided for update", { status: 400 });
    }

    // Verify that the post exists and belongs to the user
    const post = await db.post.findFirst({
      where: {
        id: params.postId,
        userId: user.id,
      },
    });
    if (!post) {
      return new NextResponse("Unauthorized or post not found", { status: 404 });
    }

    // Verify that the PostChapterSection exists and is linked to the post
    const postChapterSection = await db.postChapterSection.findFirst({
      where: {
        id: params.postchapterId,
        postId: params.postId,
      },
    });
    if (!postChapterSection) {
      return new NextResponse("Post chapter section not found", { status: 404 });
    }

    // Update PostChapterSection with provided values
    const updatedPostChapterSection = await db.postChapterSection.update({
      where: {
        id: params.postchapterId,
      },
      data: {
        ...values,
      },
    });

    // Return the updated post chapter section
    return new NextResponse(JSON.stringify(updatedPostChapterSection), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    // Use a type guard to check for a message on the error object
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    console.error("[PATCH ERROR] Post/PostChapterSection:", errorMessage);
    // Provide a more descriptive error response
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error", details: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
