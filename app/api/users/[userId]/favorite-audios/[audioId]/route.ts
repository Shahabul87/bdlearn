import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; audioId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the favorite audio exists and belongs to the current user
    const favoriteAudio = await db.favoriteAudio.findUnique({
      where: {
        id: params.audioId,
      },
    });

    if (!favoriteAudio || favoriteAudio.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Delete the favorite audio
    const deletedFavoriteAudio = await db.favoriteAudio.delete({
      where: {
        id: params.audioId,
      },
    });

    return NextResponse.json(deletedFavoriteAudio);
  } catch (error) {
    console.error("[DELETE_FAVORITE_AUDIO_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; audioId: string } }
) {
  try {
    const { userId, audioId } = params;
    const { title, platform, url, category } = await req.json();

    const audio = await db.favoriteAudio.update({
      where: {
        id: audioId,
        userId: userId,
      },
      data: {
        title,
        platform,
        url,
        category,
      },
    });

    return NextResponse.json(audio);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
