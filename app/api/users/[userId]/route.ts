import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userDetails = await db.user.findUnique({
      where: {
        id: params.userId,
      },
      include: {
        profileLinks: true,
      },
    });

    return NextResponse.json(userDetails);
  } catch (error) {
    console.error("[USER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 