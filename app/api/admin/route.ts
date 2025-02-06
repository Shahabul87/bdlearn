import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  if (!await isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  // Admin only logic here
  return NextResponse.json({ message: "Admin access granted" });
}