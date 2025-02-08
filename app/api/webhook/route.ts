import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  console.log("🔵 Webhook received");

  if (!signature) {
    console.log("❌ No Stripe signature found");
    return new NextResponse("No Stripe signature found", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    console.log(`✅ Webhook event type: ${event.type}`);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Log all session data
      console.log("📦 Full session data:", JSON.stringify(session, null, 2));
      
      const userId = session.metadata?.userId;
      const courseId = session.metadata?.courseId;

      console.log("🔑 User ID:", userId);
      console.log("📚 Course ID:", courseId);

      if (!userId || !courseId) {
        console.log("❌ Missing metadata:", session.metadata);
        return new NextResponse("Missing metadata", { status: 400 });
      }

      try {
        // Check if user exists
        const user = await db.user.findUnique({
          where: { id: userId }
        });

        if (!user) {
          console.log("❌ User not found:", userId);
          return new NextResponse("User not found", { status: 404 });
        }

        // Check if course exists
        const course = await db.course.findUnique({
          where: { id: courseId }
        });

        if (!course) {
          console.log("❌ Course not found:", courseId);
          return new NextResponse("Course not found", { status: 404 });
        }

        // Create enrollment
        const enrollment = await db.enrollment.create({
          data: {
            userId,
            courseId,
          }
        });
        
        console.log("✅ Enrollment created:", enrollment);

        return NextResponse.json({ 
          success: true,
          url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/student?success=1`
        });
      } catch (error) {
        console.error("❌ Enrollment creation error:", error);
        // Log the full error object
        console.error("Full error:", JSON.stringify(error, null, 2));
        return new NextResponse("Failed to create enrollment", { status: 500 });
      }
    }

    return new NextResponse(null, { status: 200 });

  } catch (error: any) {
    console.error("❌ Webhook error:", error);
    return new NextResponse(
      `Webhook Error: ${error.message}`, 
      { status: 400 }
    );
  }
}

export const runtime = 'edge';