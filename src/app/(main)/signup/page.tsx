"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Mail, Lock, User, ArrowRight, Briefcase } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

const SignupPage: React.FC = () => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        business: '',
        password: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            await updateProfile(userCredential.user, {
                displayName: formData.name
            });
            // Optionally save business name to Firestore
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Error creating account');
            console.error(err);
        }
    };

    if (loading) return null;

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 mt-12 mb-12">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/5 blur-[120px] rounded-full -z-10"></div>

            <div className="max-w-xl w-full glass p-8 md:p-12 rounded-3xl border-gray-800/50 shadow-2xl">
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6 glow-primary">
                        <Zap className="text-white w-7 h-7 fill-current" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Create Your Account</h1>
                    <p className="text-gray-400">Start qualifying high-ticket leads today.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-dark-950 border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Business Name</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={formData.business}
                                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                                    className="w-full bg-dark-950 border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="Acme Growth"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-dark-950 border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-dark-950 border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 pl-1 uppercase tracking-widest font-bold">Minimum 8 characters with one number</p>
                    </div>

                    <div className="flex items-start gap-3 pl-1">
                        <input type="checkbox" required className="mt-1 accent-primary-600" id="terms" />
                        <label htmlFor="terms" className="text-xs text-gray-400">
                            I agree to the <a href="#" className="text-primary-400 font-bold hover:text-primary-300">Terms of Service</a> and <a href="#" className="text-primary-400 font-bold hover:text-primary-300">Privacy Policy</a>.
                        </label>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 btn-glow transition-all"
                    >
                        Create Account
                        <ArrowRight size={20} />
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-500">
                        Already have an account? <Link href="/login" className="text-primary-400 font-bold hover:text-primary-300">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
