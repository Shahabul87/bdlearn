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

    // Find and delete the post
    const post = await db.post.delete({
      where: {
        id: params.postId,
        userId: user.id, // Ensure the post belongs to the user
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("[POST_DELETE]", error);
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