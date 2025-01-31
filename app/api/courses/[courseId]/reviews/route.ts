import { NextResponse } from "next/server";
import { db } from "@/lib/db";

import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    

    if (!user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

    const userId = user?.id;

    const { rating, comment } = await req.json();

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return new NextResponse("Invalid rating", { status: 400 });
    }

    if (!comment || comment.length < 10) {
      return new NextResponse("Review comment must be at least 10 characters", { status: 400 });
    }

    // Check if course exists
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Check if user has already reviewed this course
    const existingReview = await db.courseReview.findFirst({
      where: {
        courseId: params.courseId,
        userId,
      },
    });

    if (existingReview) {
      return new NextResponse("You have already reviewed this course", { status: 400 });
    }

    // Create the review
    const review = await db.courseReview.create({
      data: {
        rating,
        comment,
        courseId: params.courseId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("[COURSE_REVIEW_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Get all reviews for a course
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
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("[COURSE_REVIEWS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 