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

    console.log("Webhook event type:", event.type);

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    console.log("Webhook metadata:", { userId, courseId });

    if (event.type === "checkout.session.completed") {
      if (!userId || !courseId) {
        console.log("Missing metadata in webhook");
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

        console.log("Existing enrollment:", existingEnrollment);

        if (!existingEnrollment) {
          // Create enrollment
          const enrollment = await db.enrollment.create({
            data: {
              userId: userId,
              courseId: courseId,
            }
          });
          console.log("Created new enrollment:", enrollment);
        }

        return new Response(null, { status: 200 });
      } catch (error) {
        console.error("Webhook DB error:", error);
        return new Response("Webhook Error: Database error", { status: 500 });
      }
    }

    return new Response(null, { status: 200 });
  } catch (error: any) {
    console.error("Webhook construction error:", error);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
}