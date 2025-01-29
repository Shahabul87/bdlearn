import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    
    const query = searchParams.get("query");
    const categories = searchParams.get("categories")?.split(",");
    const status = searchParams.get("status")?.split(",");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const events = await db.calendarEvent.findMany({
      where: {
        userId: session.user.id,
        AND: [
          // Search query
          query ? {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          } : {},
          // Date range filter
          startDate ? {
            startDate: { gte: new Date(startDate) },
          } : {},
          endDate ? {
            endDate: { lte: new Date(endDate) },
          } : {},
        ],
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
} 