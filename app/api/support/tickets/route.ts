import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const ticket = await db.supportTicket.create({
      data: {
        ...values,
        userId: session.user.id,
        status: "OPEN",
      },
    });

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("[SUPPORT_TICKET_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 