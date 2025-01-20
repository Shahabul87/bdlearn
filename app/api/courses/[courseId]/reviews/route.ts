import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { rating, comment } = await req.json();

    if (!rating || !comment) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if user has already reviewed this course
    const existingReview = await db.courseReview.findFirst({
      where: {
        courseId: params.courseId,
        userId: user.id,
      },
    });

    if (existingReview) {
      return new NextResponse("You have already reviewed this course", { status: 400 });
    }

    const review = await db.courseReview.create({
      data: {
        rating,
        comment,
        courseId: params.courseId,
        userId: user.id,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("[COURSE_REVIEW_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const reviews = await db.courseReview.findMany({
      where: {
        courseId: params.courseId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("[COURSE_REVIEWS_GET_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 