import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  console.log("Webhook received");
  console.log("Signature:", signature?.slice(0, 20) + "...");
  console.log("Webhook Secret configured:", !!process.env.STRIPE_WEBHOOK_SECRET);

  if (!signature) {
    console.log("No Stripe signature found");
    return new NextResponse("No Stripe signature found", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    console.log(`Webhook event received: ${event.type}`);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Session metadata:", session.metadata);
      
      try {
        const enrollment = await db.enrollment.create({
          data: {
            userId: session.metadata?.userId!,
            courseId: session.metadata?.courseId!,
          },
        });
        
        console.log("Enrollment created:", enrollment);
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error("Enrollment creation error:", error);
        return new NextResponse("Failed to create enrollment", { status: 500 });
      }
    }

    return new NextResponse(null, { status: 200 });

  } catch (error: any) {
    console.error("Webhook error:", error);
    return new NextResponse(
      `Webhook Error: ${error.message}`, 
      { status: 400 }
    );
  }
}

export const runtime = 'edge';