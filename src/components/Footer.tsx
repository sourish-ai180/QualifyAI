"use client";

import React from 'react';
import Link from 'next/link';
import { Zap, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="mt-auto border-t border-gray-800 bg-dark-950 pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center glow-primary transition-transform group-hover:scale-110">
                                <Zap className="text-white w-5 h-5 fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                Qualify<span className="text-primary-400">AI</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            The AI-first lead qualification engine for high-ticket service providers. Reclaim your time, talk only to ready-to-buy prospects.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-gray-500 hover:text-primary-400 transition-colors"><Github size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Product</h4>
                        <ul className="space-y-4">
                            <li><Link href="/features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</Link></li>
                            <li><Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</Link></li>
                            <li><Link href="/builder" className="text-gray-400 hover:text-white text-sm transition-colors">AI Builder</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link href="/documentation" className="text-gray-400 hover:text-white text-sm transition-colors">Documentation</Link></li>
                            <li><Link href="/documentation" className="text-gray-400 hover:text-white text-sm transition-colors">Sales Scripts</Link></li>
                            <li><Link href="/documentation" className="text-gray-400 hover:text-white text-sm transition-colors">API Reference</Link></li>
                            <li><Link href="/documentation" className="text-gray-400 hover:text-white text-sm transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        &copy; {new Date().getFullYear()} QualifyAI Technologies Inc. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-[10px] font-mono uppercase tracking-tighter">
                        System Status: 100% Operational
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
