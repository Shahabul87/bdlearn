import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const event = await db.calendarEvent.findUnique({
      where: {
        id: params.eventId,
        userId: session.user.id,
      },
    });

    if (!event) {
      return new NextResponse("Not found", { status: 404 });
    }

    await db.calendarEvent.delete({
      where: {
        id: params.eventId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[EVENT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const event = await db.calendarEvent.findUnique({
      where: {
        id: params.eventId,
        userId: session.user.id,
      },
    });

    if (!event) {
      return new NextResponse("Not found", { status: 404 });
    }

    const updatedEvent = await db.calendarEvent.update({
      where: {
        id: params.eventId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("[EVENT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 