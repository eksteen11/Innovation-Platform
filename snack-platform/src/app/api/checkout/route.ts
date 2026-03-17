import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// We initialize Stripe with a dummy key if env var is missing during build
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: Request) {
  try {
    const { items, schoolId, studentName } = await req.json()

    // Format line items for Stripe Checkout
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    }))

    // In a real app, you would create a record in your database as 'pending' here.
    
    // For local dev, construct the absolute URL
    const origin = req.headers.get('origin') || 'http://localhost:3000'

    // Only create session if we have a real key, otherwise return a fake success URL for dev
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ url: `${origin}/success` })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        schoolId,
        studentName,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
}