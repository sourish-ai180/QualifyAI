"use client";

import React from 'react';
import { Book, Code, Zap, Shield } from 'lucide-react';

const DocumentationPage: React.FC = () => {
    const sections = [
        { title: "Quick Start", icon: <Zap className="text-amber-400" />, content: "Learn how to set up your first AI Lead Qualifier in under 5 minutes." },
        { title: "API Guide", icon: <Code className="text-blue-400" />, content: "Integrate QualifyAI directly into your existing tech stack using our REST API." },
        { title: "Best Practices", icon: <Book className="text-green-400" />, content: "Tips on crafting the perfect qualifying questions for high-ticket closing." },
        { title: "Security", icon: <Shield className="text-primary-400" />, content: "Understand how we protect your lead data and ensure privacy compliance." }
    ];

    return (
        <div className="pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-5xl font-black text-white mb-12 tracking-tight text-center">Documentation</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {sections.map((s, i) => (
                        <div key={i} className="glass p-8 rounded-2xl border-gray-800/50 hover:border-primary-500/30 transition-all">
                            <div className="flex items-center gap-4 mb-4">
                                {s.icon}
                                <h3 className="text-xl font-bold text-white">{s.title}</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6">{s.content}</p>
                            <button className="text-primary-400 font-bold text-sm hover:underline">Read Guide →</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage;
