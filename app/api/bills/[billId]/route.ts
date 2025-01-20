import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { billId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    const bill = await db.bill.update({
      where: {
        id: params.billId,
        userId: session.user.id,
      },
      data: values,
    });

    return NextResponse.json(bill);
  } catch (error) {
    console.error("[BILL_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.bill.delete({
      where: {
        id: params.billId,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[BILL_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 