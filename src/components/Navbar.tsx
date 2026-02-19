"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const isAuthenticated = !!user;

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="sticky top-0 z-50 glass border-b border-gray-800 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-300">
                        <Zap className="text-white w-6 h-6 fill-current" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-white text-glow">
                        Qualify<span className="text-primary-400">AI</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    {!isAuthenticated ? (
                        <>
                            <Link
                                href="/features"
                                className={`transition-colors font-medium ${isActive('/features') ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                Features
                            </Link>
                            <Link
                                href="/pricing"
                                className={`transition-colors font-medium ${isActive('/pricing') ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                Pricing
                            </Link>
                            <Link href="/login" className="text-gray-400 hover:text-white transition-colors font-medium">Log in</Link>
                            <Link href="/signup" className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-full font-bold transition-all btn-glow">
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/features"
                                className={`transition-colors font-medium ${isActive('/features') ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                Features
                            </Link>
                            <Link
                                href="/pricing"
                                className={`transition-colors font-medium ${isActive('/pricing') ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                Pricing
                            </Link>
                            <button
                                onClick={logout}
                                className="text-gray-400 hover:text-red-400 transition-colors font-medium flex items-center gap-2"
                            >
                                <LogOut size={18} />
                                Log out
                            </button>
                            <Link href="/dashboard" className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-full font-bold transition-all btn-glow">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
