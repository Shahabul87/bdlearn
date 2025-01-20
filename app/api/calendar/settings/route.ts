import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const settings = await db.userCalendarSettings.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const settings = await db.userCalendarSettings.upsert({
      where: { userId: session.user.id },
      update: body,
      create: {
        ...body,
        userId: session.user.id,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
} 