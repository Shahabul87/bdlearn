import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CalendarSync } from "@/app/calendar/_lib/calendar-sync";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { provider } = await req.json();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: { accounts: true },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const account = user.accounts.find(acc => acc.provider === provider);
    if (!account) {
      return new NextResponse("Provider account not found", { status: 404 });
    }

    const calendarSync = new CalendarSync({
      access_token: account.access_token || '',
      refresh_token: account.refresh_token || '',
      expiry_date: account.expires_at ? account.expires_at * 1000 : null,
    });

    const externalEvents = await calendarSync.syncWithGoogle();

    if (!externalEvents) {
      return NextResponse.json({ success: false, message: "No events to sync" });
    }

    // Sync events to database
    for (const event of externalEvents) {
      await db.calendarEvent.upsert({
        where: {
          externalId_source: {
            externalId: event.externalId || '',
            source: event.source || '',
          },
        },
        update: {
          title: event.title || '',
          description: event.description || null,
          startDate: new Date(event.startDate || ''),
          endDate: new Date(event.endDate || ''),
          location: event.location || null,
          isAllDay: !!event.isAllDay,
          source: event.source,
          externalId: event.externalId || '',
        },
        create: {
          title: event.title || '',
          description: event.description || null,
          startDate: new Date(event.startDate || ''),
          endDate: new Date(event.endDate || ''),
          location: event.location || null,
          isAllDay: !!event.isAllDay,
          source: event.source,
          externalId: event.externalId || '',
          userId: session.user.id,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CALENDAR_SYNC]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 