import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = user.id;

    const post = await db.post.findUnique({
      where: {
        id: params.postId,
        userId: userId,
      },
      include: {
        comments: true,
        reactions: true,
        tags: true,
        postchapter: true,
        imageSections: true,
      },
    });

    if (!post) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedPost = await db.post.delete({
      where: {
        id: params.postId,
      },
    });

    return NextResponse.json(deletedPost);
  } catch (error) {
    console.log("[POST_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}



export async function PATCH(
    req: Request,
    { params }: { params: { postId: string } }
  ) {
    try {
      const user = await currentUser();
      const { postId } = params;
      const values = await req.json();

     
  
      if (!user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const userId = user?.id;
      // Check if the post exists and belongs to the user
    const postExists = await db.post.findFirst({
      where: {
        id: postId,
        userId: userId,
      },
    });

    if (!postExists) {
      return new NextResponse("Post not found or unauthorized", { status: 404 });
    }
  
    // Proceed to update the post
    const updatedPost = await db.post.update({
      where: { id: postId },
      data: {
        ...values,
      },
    });

    

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log("[POST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
  }