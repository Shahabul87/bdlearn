import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { eventId } = await req.json();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const event = await db.groupEvent.findUnique({
      where: { id: eventId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            role: true,
            isTwoFactorEnabled: true,
            phone: true,
          }
        },
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
    });

    if (!event) {
      return new NextResponse("Event not found", { status: 404 });
    }

    // Send email notification to both creator and organizer if they exist
    const recipients = [
      event.creator?.email,
      event.organizer?.email
    ].filter(Boolean) as string[];

    if (recipients.length > 0) {
      await resend.emails.send({
        from: 'notifications@yourdomain.com',
        to: recipients,
        subject: `Reminder: ${event.title}`,
        html: `
          <h2>Event Reminder</h2>
          <p>Your event "${event.title}" is starting soon.</p>
          <p>Time: ${event.startTime}</p>
          ${event.location ? `<p>Location: ${event.location}</p>` : ''}
          ${event.isOnline && event.meetingUrl ? `<p>Meeting URL: ${event.meetingUrl}</p>` : ''}
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[NOTIFICATION_SEND]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 