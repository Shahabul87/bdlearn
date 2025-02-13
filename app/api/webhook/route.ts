import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new Response("Webhook Error: Missing metadata", { status: 400 });
    }

    try {
      // Check if enrollment already exists
      const existingEnrollment = await db.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          }
        }
      });

      if (!existingEnrollment) {
        // Create enrollment
        await db.enrollment.create({
          data: {
            userId: userId,
            courseId: courseId,
          }
        });
      }

      return new Response(null, { status: 200 });
    } catch (error) {
      console.log("[WEBHOOK_ERROR]", error);
      return new Response("Webhook Error: Database error", { status: 500 });
    }
  }

  return new Response(null, { status: 200 });
}