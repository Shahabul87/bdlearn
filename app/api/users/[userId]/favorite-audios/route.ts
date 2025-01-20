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

    // Validate required fields for favorite audio creation
    if (!title || !platform || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create a new favorite audio in the database
    const newFavoriteAudio = await db.favoriteAudio.create({
      data: {
        title,
        platform,
        url,
        category,
        userId: user.id, // Associate favorite audio with the current user
      },
    });

    // Return the newly created favorite audio information
    return new NextResponse(JSON.stringify(newFavoriteAudio), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("[POST ERROR] Favorite Audio Creation:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
