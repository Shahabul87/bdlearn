import Stripe from "stripe";
import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      }
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Check if user is already enrolled
    const existingEnrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
    });

    if (existingEnrollment) {
      return new NextResponse("Already enrolled", { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/student?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
      mode: "payment",
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: course.title,
              description: course.description!,
            },
            unit_amount: Math.round(course.price! * 100),
          },
          quantity: 1,
        }
      ]
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[COURSE_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}