import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    const user = await currentUser();
    const { title, platform, url } = await req.json();

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
        userId: user.id, // Associate favorite video with the current user
      },
    });

    // Return the newly created favorite video information
    return new NextResponse(JSON.stringify(newFavoriteVideo), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("[POST ERROR] Favorite Video Creation:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
