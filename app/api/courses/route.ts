import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";


export async function POST(
  req: Request,
) {
  try {
    const user = await currentUser();
    const { title } = await req.json();
   
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const userId = user?.id

    const course = await db.course.create({
      data: {
        userId,
        title,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}