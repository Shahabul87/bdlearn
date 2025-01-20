import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; blogId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the favorite blog exists and belongs to the current user
    const favoriteBlog = await db.favoriteBlog.findUnique({
      where: {
        id: params.blogId,
      },
    });

    if (!favoriteBlog || favoriteBlog.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Delete the favorite blog
    const deletedFavoriteBlog = await db.favoriteBlog.delete({
      where: {
        id: params.blogId,
      },
    });

    return NextResponse.json(deletedFavoriteBlog);
  } catch (error) {
    console.error("[DELETE_FAVORITE_BLOG_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; blogId: string } }
) {
  try {
    const user = await currentUser();
    const { title, platform, url, category } = await req.json();

    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedBlog = await db.favoriteBlog.update({
      where: {
        id: params.blogId,
        userId: params.userId,
      },
      data: {
        title,
        platform,
        url,
        category,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("[FAVORITE BLOG UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
