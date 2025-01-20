import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { groupId: string; eventId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    const status = values.status || "attending";

    // Check if user is already attending
    const existingAttendee = await db.groupEventAttendee.findUnique({
      where: {
        eventId_userId: {
          eventId: params.eventId,
          userId: session.user.id,
        },
      },
    });

    if (existingAttendee) {
      // Update attendance status
      const updatedAttendee = await db.groupEventAttendee.update({
        where: {
          id: existingAttendee.id,
        },
        data: {
          status,
        },
      });

      return NextResponse.json(updatedAttendee);
    }

    // Check if event has reached max attendees
    const event = await db.groupEvent.findUnique({
      where: {
        id: params.eventId,
      },
      include: {
        _count: {
          select: {
            attendees: {
              where: {
                status: "attending",
              },
            },
          },
        },
      },
    });

    if (
      event?.maxAttendees &&
      event._count.attendees >= event.maxAttendees &&
      status === "attending"
    ) {
      return new NextResponse("Event is full", { status: 400 });
    }

    // Create new attendance
    const attendee = await db.groupEventAttendee.create({
      data: {
        eventId: params.eventId,
        userId: session.user.id,
        status,
      },
    });

    return NextResponse.json(attendee);
  } catch (error) {
    console.error("[EVENT_ATTEND]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 