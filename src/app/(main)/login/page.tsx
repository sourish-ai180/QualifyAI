"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError('Invalid email or password');
            console.error(err);
        }
    };

    if (loading) return null; // Or a loading spinner matching App.tsx? App.tsx had one. I'll skip for now to avoid complexity or copy it if I find it.
    // App.tsx spinner:
    // <div className="min-h-screen bg-dark-950 flex items-center justify-center">
    //   <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    // </div>
    // I will just return null for redirect check to avoid flash.

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 mt-12">
            {/* Note: height calc adjusted to vh for nextjs safety, original was 100-80px which implies 100% of parent */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/5 blur-[120px] rounded-full -z-10"></div>

            <div className="max-w-md w-full glass p-8 md:p-12 rounded-3xl border-gray-800/50 shadow-2xl">
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6 glow-primary">
                        <Zap className="text-white w-7 h-7 fill-current" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-gray-400">Log in to your QualifyAI account.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-dark-950 border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center pl-1">
                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Password</label>
                            <a href="#" className="text-[10px] font-black text-primary-400 hover:text-primary-300 uppercase tracking-widest">Forgot?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-dark-950 border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 btn-glow transition-all"
                    >
                        Sign In
                        <ArrowRight size={20} />
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account? <Link href="/signup" className="text-primary-400 font-bold hover:text-primary-300">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
