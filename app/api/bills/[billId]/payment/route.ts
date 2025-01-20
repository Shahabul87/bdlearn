import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { billId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    const { amount, method, reference } = values;

    // Create payment record
    const payment = await db.billPayment.create({
      data: {
        amount,
        method,
        reference,
        paymentDate: new Date(),
        status: "successful",
        billId: params.billId,
      },
    });

    // Update bill status and last payment details
    await db.bill.update({
      where: {
        id: params.billId,
        userId: session.user.id,
      },
      data: {
        status: "PAID",
        lastPaidAmount: amount,
        lastPaidDate: new Date(),
      },
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error("[BILL_PAYMENT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 