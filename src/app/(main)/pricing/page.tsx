"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Zap, HelpCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const PricingPage: React.FC = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

    const faqs = [
        {
            q: "What counts as a 'Lead'?",
            a: "A lead is any unique prospect who starts a conversation with your AI Qualifier. We only count leads that finish at least 3 messages of the conversation."
        },
        {
            q: "Can I use my own domain?",
            a: "Yes! Professional and Agency plans allow you to host the intake on your own subdomains (e.g., qualify.yourdomain.com)."
        },
        {
            q: "Does it integrate with my CRM?",
            a: "Currently, we integrate with Calendly and provide Webhook support. Direct HubSpot and Pipedrive integrations are launching in Q1 2026."
        },
        {
            q: "Is there a limit on how much the AI can chat?",
            a: "Each lead can have an unlimited back-and-forth within the intake session. Your monthly limit only applies to the number of unique leads."
        }
    ];

    return (
        <div className="pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Plans for Every <span className="text-primary-400 text-glow">Scale</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Choose the plan that fits your current volume. Scale up as your business grows and your time becomes more valuable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-32">
                    <PricingCard
                        name="Starter"
                        price="29"
                        priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_STARTER}
                        description="Perfect for solo coaches starting out."
                        features={["1 AI Qualifier", "100 Leads / month", "Calendly Integration", "Basic Lead Scoring", "Email Notifications"]}
                    />
                    <PricingCard
                        name="Professional"
                        price="59"
                        priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO}
                        featured={true}
                        description="Ideal for growing agencies & consultants."
                        features={["3 AI Qualifiers", "500 Leads / month", "Advanced AI Insights", "Email Nurture Sequence", "Custom Branding", "Webhook Support"]}
                    />
                    <PricingCard
                        name="Agency"
                        price="99"
                        priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_AGENCY}
                        description="For large teams with high volume."
                        features={["Unlimited Qualifiers", "2,000 Leads / month", "Team Seats (up to 5)", "White-label Option", "API Access", "Priority Support"]}
                    />
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-12">
                        <HelpCircle className="text-primary-400" />
                        <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass p-8 rounded-2xl border-gray-800/50">
                                <h4 className="text-lg font-bold text-white mb-3">{faq.q}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-32 glass p-12 rounded-[3rem] border-primary-500/20 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600/5 blur-[120px] rounded-full -z-10"></div>
                    <h3 className="text-3xl font-bold text-white mb-4">Still have questions?</h3>
                    <p className="text-gray-400 mb-8">Our team is happy to help you find the right plan for your business needs.</p>
                    <button className="px-8 py-4 bg-dark-800 border border-gray-700 hover:bg-dark-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 mx-auto">
                        Contact Sales
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

interface PricingCardProps {
    name: string;
    price: string;
    priceId?: string;
    description: string;
    features: string[];
    featured?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ name, price, priceId, description, features, featured }) => {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        if (!user) {
            router.push('/signup');
            return;
        }

        if (!priceId) {
            alert("Price ID not configured yet. Please check back later.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId,
                    userId: user.uid,
                    email: user.email,
                    returnUrl: window.location.origin,
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Failed to start checkout.');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col h-full ${featured ? 'bg-dark-900 border-primary-500 scale-105 z-10 glow-primary' : 'bg-dark-950 border-gray-800 hover:border-gray-700'}`}>
            {featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full">
                    Most Popular
                </div>
            )}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
            <div className="mb-8">
                <span className="text-4xl font-black text-white">${price}</span>
                <span className="text-gray-500">/mo</span>
            </div>
            <ul className="space-y-4 mb-12">
                {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-primary-400 flex-shrink-0" />
                        {f}
                    </li>
                ))}
            </ul>
            <button
                onClick={handleCheckout}
                disabled={isLoading}
                className={`mt-auto w-full text-center py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${featured ? 'bg-primary-600 hover:bg-primary-500 text-white btn-glow' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
            >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : `Choose ${name}`}
            </button>
        </div>
    );
};

export default PricingPage;
