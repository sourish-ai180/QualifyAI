"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Zap, BarChart3, Clock, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-600/10 blur-[120px] rounded-full -z-10"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-950/50 border border-primary-800/50 text-primary-400 text-sm font-semibold mb-8 animate-pulse-slow">
                            <Zap size={16} />
                            <span>AI-Powered Lead Qualification for 2025</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
                            Stop Wasting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-500">15+ Hours</span> a Week on Unqualified Calls
                        </h1>
                        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                            QualifyAI uses conversational intelligence to pre-screen your prospects, score their fit, and only book the "Hot" leads directly into your calendar.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all btn-glow">
                                Start Qualifying for Free
                                <ArrowRight size={20} />
                            </Link>
                            <a href="#demo" className="w-full sm:w-auto px-8 py-4 bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                                View Live Demo
                            </a>
                        </div>
                    </div>

                    <div className="mt-24 relative max-w-5xl mx-auto group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-dark-900 border border-gray-800 rounded-2xl p-4 md:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-xs text-gray-500 font-mono">qualifyai.app/v/sales-agency-id</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-dark-950/50 rounded-xl border border-gray-800 p-6 flex flex-col gap-4">
                                    <div className="flex items-center gap-3 text-primary-400">
                                        <Clock size={20} />
                                        <span className="font-semibold text-sm">Real-time Lead Scoring</span>
                                    </div>
                                    <div className="h-40 flex items-end justify-between gap-2 px-2">
                                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                            <div
                                                key={i}
                                                className={`w-full rounded-t-lg transition-all duration-1000 ${i === 3 ? 'bg-primary-500 glow-primary' : 'bg-gray-800'}`}
                                                style={{ height: `${h}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center bg-primary-900/20 border border-primary-500/20 p-3 rounded-lg">
                                        <span className="text-sm font-medium text-gray-300">Latest Lead Quality:</span>
                                        <span className="px-2 py-0.5 bg-primary-600 text-white text-[10px] font-bold rounded uppercase tracking-widest">Hot 🔥</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold text-white mb-4">Conversational Intake</h3>
                                    <p className="text-gray-400 mb-6">"Our AI doesn't feel like a form. It's a natural conversation that uncovers budget, timeline, and decision-making power before you even hop on a call."</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-green-400 text-sm">
                                            <CheckCircle2 size={16} />
                                            <span>Automated Calendly Booking</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-green-400 text-sm">
                                            <CheckCircle2 size={16} />
                                            <span>Instant Lead Notification</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-green-400 text-sm">
                                            <CheckCircle2 size={16} />
                                            <span>CRM Auto-Sync (Coming Soon)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pain Points / Features */}
            <section id="features" className="py-24 bg-dark-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Brutal Reality of Sales Calls</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">High-ticket service providers lose thousands every month because they let anyone onto their calendar.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { stat: "67%", text: "of lost sales are due to improper lead qualification", icon: <ShieldCheck className="text-red-500" /> },
                            { stat: "50%", text: "of sales team time is spent on unproductive prospecting", icon: <Clock className="text-yellow-500" /> },
                            { stat: "$12k", text: "lost monthly in opportunity cost for the average solo coach", icon: <BarChart3 className="text-green-500" /> },
                        ].map((p, i) => (
                            <div key={i} className="glass p-8 rounded-2xl border-gray-800/50 hover:border-primary-500/30 transition-all duration-300">
                                <div className="w-12 h-12 bg-dark-800 rounded-lg flex items-center justify-center mb-6">
                                    {p.icon}
                                </div>
                                <div className="text-4xl font-black text-white mb-2">{p.stat}</div>
                                <p className="text-gray-400">{p.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple, Scalable Pricing</h2>
                        <p className="text-gray-400">Save your time. Reclaim your focus. Close more deals.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                        <PricingCard
                            name="Starter"
                            price="29"
                            description="Perfect for solo coaches starting out."
                            features={["1 AI Qualifier", "100 Leads / month", "Calendly Integration", "Basic Lead Scoring"]}
                        />
                        <PricingCard
                            name="Professional"
                            price="59"
                            featured={true}
                            description="Ideal for growing agencies & consultants."
                            features={["3 AI Qualifiers", "500 Leads / month", "Advanced AI Insights", "Email Nurture Sequence", "Custom Branding"]}
                        />
                        <PricingCard
                            name="Agency"
                            price="99"
                            description="For large teams with high volume."
                            features={["Unlimited Qualifiers", "2,000 Leads / month", "Team Seats", "White-label Option", "API Access"]}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

interface PricingCardProps {
    name: string;
    price: string;
    description: string;
    features: string[];
    featured?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ name, price, description, features, featured }) => {
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
            <Link
                href="/signup"
                className={`mt-auto w-full block text-center py-3 rounded-xl font-bold transition-all ${featured ? 'bg-primary-600 hover:bg-primary-500 text-white btn-glow' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
            >
                Choose {name}
            </Link>
        </div>
    );
};

export default LandingPage;
