import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional().nullable(),
  date: z.string().transform((str) => new Date(str)),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().optional().nullable(),
  isOnline: z.boolean().default(false),
  meetingUrl: z.string().optional().nullable(),
  maxAttendees: z.number().optional().nullable(),
});

export async function POST(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    
    try {
      const validatedData = eventSchema.parse(values);

      // Check if user is a member of the group
      const membership = await db.groupMember.findFirst({
        where: {
          userId: session.user.id,
          groupId: params.groupId,
        },
      });

      if (!membership) {
        return new NextResponse("Must be a group member to create events", { status: 403 });
      }

      const event = await db.groupEvent.create({
        data: {
          title: validatedData.title,
          description: validatedData.description || null,
          date: validatedData.date,
          startTime: validatedData.startTime,
          endTime: validatedData.endTime,
          location: validatedData.location,
          isOnline: validatedData.isOnline,
          meetingUrl: validatedData.meetingUrl,
          maxAttendees: validatedData.maxAttendees,
          status: "upcoming",
          groupId: params.groupId,
          organizerId: session.user.id,
        },
        include: {
          organizer: {
            select: {
              name: true,
              image: true,
            }
          },
          _count: {
            select: {
              attendees: true
            }
          }
        }
      });

      return NextResponse.json(event);
    } catch (validationError) {
      console.error("Validation error:", validationError);
      if (validationError instanceof z.ZodError) {
        return new NextResponse(JSON.stringify({
          error: "Validation failed",
          details: validationError.errors
        }), { 
          status: 422,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      throw validationError;
    }
  } catch (error) {
    console.error("[EVENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "upcoming";

    const events = await db.groupEvent.findMany({
      where: {
        groupId: params.groupId,
        status,
      },
      include: {
        organizer: {
          select: {
            name: true,
            image: true,
          }
        },
        _count: {
          select: {
            attendees: true
          }
        }
      },
      orderBy: {
        date: "asc"
      }
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("[EVENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 