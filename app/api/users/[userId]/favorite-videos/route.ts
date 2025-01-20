import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    const user = await currentUser();
    const { title, platform, url, category } = await req.json();

    // Check if the user is authenticated
    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate required fields for favorite video creation
    if (!title || !platform || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create a new favorite video in the database
    const newFavoriteVideo = await db.favoriteVideo.create({
      data: {
        title,
        platform,
        url,
        category,
        userId: user.id, // Associate favorite video with the current user
      },
    });

    // Return the newly created favorite video information
    return NextResponse.json(newFavoriteVideo);
  } catch (error) {
    console.error("[FAVORITE VIDEO POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
