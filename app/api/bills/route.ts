import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { BillCategory, BillStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    console.log("Creating bill with values:", values);

    const bill = await db.bill.create({
      data: {
        ...values,
        userId: session.user.id,
      },
    });

    console.log("Created bill:", bill);
    return NextResponse.json(bill);
  } catch (error) {
    console.error("[BILLS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    //console.log("Session:", session);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Remove date filter temporarily to check if any bills exist
    const bills = await db.bill.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        attachments: true,
        paymentHistory: {
          orderBy: {
            paymentDate: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });

    //console.log("All bills found:", bills);
    return NextResponse.json(bills);
  } catch (error) {
    console.error("[BILLS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 