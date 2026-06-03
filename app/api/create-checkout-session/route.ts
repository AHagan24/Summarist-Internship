import { NextResponse } from "next/server";
import Stripe from "stripe";

type Plan = "monthly" | "yearly";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      appInfo: {
        name: "Summarist",
      },
    })
  : null;

function isPlan(value: unknown): value is Plan {
  return value === "monthly" || value === "yearly";
}

function getPriceId(plan: Plan) {
  return plan === "monthly"
    ? process.env.STRIPE_MONTHLY_PRICE_ID
    : process.env.STRIPE_YEARLY_PRICE_ID;
}

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { error: "Application base URL is not configured." },
      { status: 500 },
    );
  }

  let body: { plan?: unknown; customerEmail?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (!isPlan(body.plan)) {
    return NextResponse.json(
      { error: "Plan must be monthly or yearly." },
      { status: 400 },
    );
  }

  const plan = body.plan;
  const priceId = getPriceId(plan);

  if (!priceId) {
    return NextResponse.json(
      { error: `Stripe ${plan} price ID is not configured.` },
      { status: 500 },
    );
  }

  const customerEmail =
    typeof body.customerEmail === "string" && body.customerEmail.includes("@")
      ? body.customerEmail
      : undefined;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: customerEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        plan,
      },
      success_url: `${baseUrl}/settings?success=true&plan=${plan}`,
      cancel_url: `${baseUrl}/choose-plan?canceled=true`,
      ...(plan === "yearly"
        ? {
            subscription_data: {
              trial_period_days: 7,
              metadata: {
                plan,
              },
            },
          }
        : {}),
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to create checkout session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
