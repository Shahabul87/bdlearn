import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { label, icon } = await req.json();

    const customTab = await db.customTab.create({
      data: {
        label,
        icon,
        userId: session.user.id,
      },
    });

    return NextResponse.json(customTab);
  } catch (error) {
    console.error("[CUSTOM_TABS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 