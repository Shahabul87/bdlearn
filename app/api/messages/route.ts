import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const messages = await db.message.findMany({
      where: {
        recipientId: session.user.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { recipientId, content } = await req.json();

    const message = await db.message.create({
      data: {
        content,
        senderId: session.user.id,
        recipientId,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("[MESSAGE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { messageId } = await req.json();

    const message = await db.message.update({
      where: {
        id: messageId,
        recipientId: session.user.id,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("[MESSAGE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}