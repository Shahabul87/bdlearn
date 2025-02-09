import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature");

    console.log("🔵 Webhook received at:", new Date().toISOString());
    console.log("📝 Request body length:", body.length);
    console.log("🔑 Webhook Secret exists:", !!process.env.STRIPE_WEBHOOK_SECRET);
    console.log("🔒 Signature received:", signature?.slice(0, 20) + "...");

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("❌ Missing STRIPE_WEBHOOK_SECRET");
      throw new Error("Missing STRIPE_WEBHOOK_SECRET");
    }

    if (!signature) {
      console.error("❌ No signature in request");
      throw new Error("No Stripe signature found");
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    console.log(`✅ Webhook event:`, {
      type: event.type,
      id: event.id,
      created: new Date(event.created * 1000).toISOString()
    });

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("💳 Checkout session:", {
        id: session.id,
        customer: session.customer,
        metadata: session.metadata,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency
      });

      const userId = session.metadata?.userId;
      const courseId = session.metadata?.courseId;

      if (!userId || !courseId) {
        throw new Error(`Missing metadata: userId=${userId}, courseId=${courseId}`);
      }

      // Create enrollment
      const enrollment = await db.enrollment.create({
        data: {
          userId,
          courseId,
        },
        include: {
          user: true,
          course: true
        }
      });
      
      console.log("✅ Created enrollment:", {
        id: enrollment.id,
        userId: enrollment.userId,
        courseId: enrollment.courseId,
        courseName: enrollment.course.title,
        userName: enrollment.user.name
      });

      return NextResponse.json({ 
        success: true,
        message: "Enrollment created successfully",
        enrollmentId: enrollment.id
      });
    }

    return NextResponse.json({ 
      success: true,
      message: `Handled ${event.type} event`
    });

  } catch (error: any) {
    console.error("❌ Webhook error:", {
      message: error.message,
      type: error.type,
      stack: error.stack?.split('\n')
    });
    throw error;
  }
}