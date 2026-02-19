"use client";

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Target, Calendar, BarChart3, ShieldCheck, Zap, ArrowRight, Layers, Bot, Cpu } from 'lucide-react';

const FeaturesPage: React.FC = () => {
    const features = [
        {
            title: "Conversational AI Intake",
            description: "Static forms are dead. Our AI engages leads in a natural, human-like dialogue to uncover true pain points and needs.",
            icon: <MessageSquare className="text-primary-400" size={32} />,
            details: ["Context-aware follow-up questions", "Multi-language support", "Brand voice customization"]
        },
        {
            title: "Smart Lead Scoring",
            description: "Our engine analyzes every response in real-time, assigning a score from 0-100 based on your custom ICP criteria.",
            icon: <Target className="text-indigo-400" size={32} />,
            details: ["Budget verification", "Timeline assessment", "Decision-maker identification"]
        },
        {
            title: "Automated Booking",
            description: "Once a lead is qualified as 'Hot', they are immediately presented with your Calendly link to book a discovery call.",
            icon: <Calendar className="text-purple-400" size={32} />,
            details: ["Direct Calendly integration", "Redirect to custom success pages", "Instant email notifications"]
        },
        {
            title: "Advanced Analytics",
            description: "Track your funnel's performance with granular data on lead quality, source conversion, and booking rates.",
            icon: <BarChart3 className="text-blue-400" size={32} />,
            details: ["Channel performance tracking", "AI-driven optimization tips", "Exportable CSV reports"]
        }
    ];

    return (
        <div className="pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-950/50 border border-primary-800/50 text-primary-400 text-sm font-semibold mb-6">
                        <Layers size={16} />
                        <span>Platform Capabilities</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Built for <span className="text-primary-400">High-Ticket</span> Precision
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Stop guessing who to talk to. Our platform combines conversational intelligence with rule-based scoring to filter out the noise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {features.map((f, i) => (
                        <div key={i} className="glass p-10 rounded-3xl border-gray-800/50 hover:border-primary-500/30 transition-all group">
                            <div className="w-16 h-16 bg-dark-800 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                {f.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                {f.description}
                            </p>
                            <ul className="space-y-3">
                                {f.details.map((d, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                                        <Zap size={14} className="text-primary-500" />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Comparison Section */}
                <div className="glass rounded-[3rem] p-12 md:p-20 border-gray-800/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 blur-[100px] rounded-full -z-10"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-8">Why AI Intake Beats Regular Forms</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center shrink-0">
                                        <span className="text-red-500 font-bold">✕</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-2">Static Forms (Typeform, Google Forms)</h4>
                                        <p className="text-gray-400 text-sm">Leads feel interrogated. Drop-off rates are high. No way to ask follow-up questions based on specific nuances in an answer.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center shrink-0">
                                        <span className="text-green-500 font-bold">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-2">QualifyAI Conversational Agent</h4>
                                        <p className="text-gray-400 text-sm">Feels like a discovery session. AI handles objections, clarifies budget, and builds rapport before the call even happens.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-dark-950 p-8 rounded-3xl border border-gray-800 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <Bot className="text-primary-400" />
                                <span className="text-xs font-black uppercase tracking-widest text-gray-500">QualifyAI Agent Demo</span>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-dark-900/50 p-4 rounded-2xl text-sm border border-gray-800 italic text-gray-400">
                                    "I see your goal is $50k/mo. To give you the best advice, can you tell me a bit more about your current monthly revenue and your biggest bottleneck?"
                                </div>
                                <div className="bg-primary-600 p-4 rounded-2xl text-sm text-white self-end ml-12">
                                    "Currently doing around $12k. My biggest bottleneck is finding qualified prospects who can actually afford my $5k package."
                                </div>
                                <div className="bg-dark-900/50 p-4 rounded-2xl text-sm border border-primary-500/20 text-primary-200">
                                    "Perfect. Our program specializes in high-ticket prospecting systems. Since you're already doing $12k, you're exactly the kind of client we get the best results for..."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32 text-center">
                    <Link href="/signup" className="inline-flex items-center gap-2 px-10 py-5 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold text-xl transition-all btn-glow">
                        Get Started Now
                        <ArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;
