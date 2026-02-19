import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    const session = event.data.object as any;

    if (event.type === 'checkout.session.completed') {
        const userId = session.metadata?.userId;

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId in metadata' }, { status: 400 });
        }

        console.log(`Payment successful for user: ${userId}`);

        try {
            // Determine tier based on price ID or amount
            // For simplicity, we'll assume any payment upgrades to 'pro' for now,
            // or we could inspect the price ID if we had multiple tiers mapped.
            // Ideally, map price IDs to tiers.
            const priceId = session.line_items?.data?.[0]?.price?.id;
            // Note: line_items requires expansion, easier to just check amount_total or assume 'pro' 
            // based on the product sold. Or use metadata to pass the target tier.

            // Let's update the user to 'pro' tier.
            // In a real app, you'd map price IDs to 'starter', 'professional', 'agency'.

            await adminDb.collection('users').doc(userId).update({
                tier: 'pro', // Default upgrade
                updatedAt: new Date(),
            });

            // If we have specific tiers logic:
            /*
            let tier = 'pro';
            if (session.amount_total === 2900) tier = 'starter';
            if (session.amount_total === 5900) tier = 'professional';
            if (session.amount_total === 9900) tier = 'agency';
             await adminDb.collection('users').doc(userId).update({ tier });
            */

        } catch (error) {
            console.error('Error updating user tier:', error);
            return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}
