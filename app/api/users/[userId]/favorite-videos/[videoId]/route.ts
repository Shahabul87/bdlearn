import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; videoId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the favorite video exists and belongs to the current user
    const favoriteVideo = await db.favoriteVideo.findUnique({
      where: {
        id: params.videoId,
      },
    });

    if (!favoriteVideo || favoriteVideo.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Delete the favorite video
    const deletedFavoriteVideo = await db.favoriteVideo.delete({
      where: {
        id: params.videoId,
      },
    });

    return NextResponse.json(deletedFavoriteVideo);
  } catch (error) {
    console.error("[DELETE_FAVORITE_VIDEO_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}



export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; videoId: string } }
) {
  try {
    const user = await currentUser();
    const { title, platform, url, category } = await req.json();

    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedVideo = await db.favoriteVideo.update({
      where: {
        id: params.videoId,
        userId: params.userId,
      },
      data: {
        title,
        platform,
        url,
        category,
      },
    });

    return NextResponse.json(updatedVideo);
  } catch (error) {
    console.error("[FAVORITE VIDEO UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
