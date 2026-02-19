import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { leadId, leadName, leadEmail, leadScore, summary, ownerEmail } = body;

        // Basic validation
        if (!ownerEmail) {
            return NextResponse.json({ error: 'Owner email is required' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'QualifyAI <onboarding@resend.dev>', // Update this with your verified domain
            to: [ownerEmail],
            subject: `🔥 HOT LEAD ALERT: ${leadName || 'New Lead'} scored ${leadScore}/100`,
            html: `
                <h1>New Hot Lead Detected!</h1>
                <p><strong>Name:</strong> ${leadName || 'N/A'}</p>
                <p><strong>Email:</strong> ${leadEmail || 'N/A'}</p>
                <p><strong>Score:</strong> ${leadScore}</p>
                <p><strong>Summary:</strong></p>
                <blockquote>${summary || 'No summary provided.'}</blockquote>
                <br />
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads/${leadId}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Lead in Dashboard</a>
            `,
        });

        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
