"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ChevronLeft, Plus, Trash2, Calendar, Target, DollarSign, Clock, Layout, Globe, FileText, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { createQualifier } from '@/lib/firestore';

const QualifierBuilder: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [calendly, setCalendly] = useState('');

    // Criteria State
    const [minBudget, setMinBudget] = useState<number | ''>('');
    const [timeline, setTimeline] = useState<number | ''>('');
    const [idealPersona, setIdealPersona] = useState('');
    const [problems, setProblems] = useState<string[]>([]);
    const [newProblem, setNewProblem] = useState('');

    const handleAddProblem = () => {
        if (newProblem && !problems.includes(newProblem)) {
            setProblems([...problems, newProblem]);
            setNewProblem('');
        }
    };

    const removeProblem = (index: number) => {
        setProblems(problems.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (!user) return;
        if (!name.trim()) {
            alert('Please enter a qualifier name.');
            return;
        }
        setLoading(true);

        try {
            const qualifierData = {
                userId: user.uid,
                name,
                description,
                calendlyLink: calendly,
                status: 'active' as const,
                criteria: {
                    minBudget: minBudget || 0,
                    maxTimelineMonths: timeline || 1,
                    idealPersona,
                    keyProblems: problems
                }
            };

            await createQualifier(qualifierData);
            router.push('/qualifiers');
        } catch (error: any) {
            console.error("Error saving qualifier:", error?.code, error?.message, error);
            alert(`Failed to save qualifier: ${error?.code || error?.message || 'Unknown error'}. Check the browser console for details.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => router.push('/qualifiers')} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold text-white">Create Lead Qualifier</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <section className="glass p-8 rounded-2xl border-gray-800/50">
                        <div className="flex items-center gap-3 mb-6">
                            <Layout className="text-primary-400" size={24} />
                            <h2 className="text-xl font-bold text-white">General Information</h2>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Qualifier Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-dark-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="e.g. Sales Coaching Intake"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Description</label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-3 text-gray-500" size={18} />
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full bg-dark-950 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors min-h-[100px]"
                                        placeholder="Briefly describe the purpose of this qualifier..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Calendly / Booking Link</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="url"
                                        value={calendly}
                                        onChange={(e) => setCalendly(e.target.value)}
                                        className="w-full bg-dark-950 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        placeholder="https://calendly.com/..."
                                    />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">This link is shown only to "Hot" qualified leads.</p>
                            </div>
                        </div>
                    </section>

                    {/* Qualification Rules */}
                    <section className="glass p-8 rounded-2xl border-gray-800/50">
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="text-primary-400" size={24} />
                            <h2 className="text-xl font-bold text-white">Qualification Criteria</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Minimum Budget ($)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="number"
                                        value={minBudget}
                                        onChange={(e) => setMinBudget(e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                        placeholder="e.g. 3000"
                                        className="w-full bg-dark-950 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Ideal Timeline (Months)</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="number"
                                        value={timeline}
                                        onChange={(e) => setTimeline(e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                                        placeholder="e.g. 3"
                                        className="w-full bg-dark-950 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Ideal Customer Persona</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    value={idealPersona}
                                    onChange={(e) => setIdealPersona(e.target.value)}
                                    className="w-full bg-dark-950 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="e.g. SaaS Founders with $10k+ MRR"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Key Problems to Identify</label>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {problems.map((p, i) => (
                                    <span key={i} className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-400 border border-primary-500/30 px-3 py-1.5 rounded-lg text-sm font-medium">
                                        {p}
                                        <button onClick={() => removeProblem(i)} className="hover:text-white"><Trash2 size={14} /></button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newProblem}
                                    onChange={(e) => setNewProblem(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddProblem()}
                                    className="flex-1 bg-dark-950 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="e.g. Needs help with sales closing"
                                />
                                <button
                                    onClick={handleAddProblem}
                                    className="px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white rounded-xl transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Preview / Sidebar */}
                <div className="space-y-6">
                    <div className="glass p-6 rounded-2xl border-gray-800/50">
                        <h3 className="font-bold text-white mb-4">Publish Qualifier</h3>
                        <p className="text-sm text-gray-400 mb-6">Once saved, your AI agent will be ready to qualify leads based on these criteria.</p>

                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className={`w-full py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 btn-glow transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Save & Publish
                                </>
                            )}
                        </button>
                    </div>

                    <div className="glass p-6 rounded-2xl border-amber-500/20 bg-amber-500/5">
                        <h4 className="font-bold text-amber-400 text-sm mb-2 uppercase tracking-widest">Pro Tip</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Adding more "Key Problems" helps the AI ask deeper questions to uncover the prospect's true pain, leading to much higher quality calls.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QualifierBuilder;
