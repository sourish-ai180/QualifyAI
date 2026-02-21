"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit3, Trash2, ExternalLink, Globe, Zap, Settings, MoreVertical, Copy, Check } from 'lucide-react';
import { useQualifiers, useUserLeads } from '@/hooks/useFirestore';
import { LeadStatus } from '@/types';

const QualifiersPage: React.FC = () => {
    const { qualifiers, loading: qualifiersLoading } = useQualifiers();
    const { leads, loading: leadsLoading } = useUserLeads();
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Enrich qualifiers with stats
    const enrichedQualifiers = qualifiers.map(q => {
        const qualifierLeads = leads.filter(l => l.qualifierId === q.id);
        const totalLeads = qualifierLeads.length;
        const hotLeads = qualifierLeads.filter(l => l.status === LeadStatus.HOT).length;
        const conversionRate = totalLeads > 0 ? ((hotLeads / totalLeads) * 100).toFixed(0) + '%' : '0%';

        return {
            ...q,
            leadsCount: totalLeads,
            conversionRate: conversionRate,
            formattedDate: new Date(q.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        };
    });

    const handleCopyLink = (id: string) => {
        const url = `${window.location.origin}/chat?id=${id}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (qualifiersLoading || leadsLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Qualifiers</h1>
                    <p className="text-gray-400">Build and manage your AI-powered intake funnels.</p>
                </div>
                <Link
                    href="/builder"
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 btn-glow transition-all"
                >
                    <Plus size={20} />
                    Create New Qualifier
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrichedQualifiers.map((q) => (
                    <div key={q.id} className="glass p-6 rounded-2xl border-gray-800/50 hover:border-primary-500/30 transition-all flex flex-col group">
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-12 h-12 bg-dark-800 rounded-xl flex items-center justify-center group-hover:bg-primary-600/20 transition-colors">
                                <Zap className={`w-6 h-6 ${q.status === 'active' ? 'text-primary-400' : 'text-gray-600'}`} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${q.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
                                    {q.status}
                                </span>
                                <button className="text-gray-500 hover:text-white"><MoreVertical size={18} /></button>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{q.name}</h3>
                        <p className="text-xs text-gray-500 mb-6">Created on {q.formattedDate}</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-dark-950/50 p-3 rounded-xl border border-gray-800">
                                <div className="text-lg font-black text-white">{q.leadsCount}</div>
                                <div className="text-[10px] text-gray-500 uppercase font-black">Total Leads</div>
                            </div>
                            <div className="bg-dark-950/50 p-3 rounded-xl border border-gray-800">
                                <div className="text-lg font-black text-white">{q.conversionRate}</div>
                                <div className="text-[10px] text-gray-500 uppercase font-black">Conv. Rate</div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-800 flex items-center justify-between gap-2">
                            <button
                                onClick={() => handleCopyLink(q.id)}
                                className="flex-1 py-2.5 bg-dark-800 hover:bg-dark-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all border border-transparent hover:border-gray-700"
                                title="Copy Link"
                            >
                                {copiedId === q.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                {copiedId === q.id ? 'Copied' : 'Copy'}
                            </button>
                            <Link
                                href={`/chat?id=${q.id}`}
                                target="_blank"
                                className="flex-1 py-2.5 bg-primary-600/10 hover:bg-primary-600/20 text-primary-400 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all border border-primary-500/20"
                            >
                                <ExternalLink size={14} />
                                Test
                            </Link>
                            <Link
                                href={`/builder?id=${q.id}`}
                                className="flex-1 py-2.5 bg-dark-800 hover:bg-dark-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all border border-transparent hover:border-gray-700"
                            >
                                <Edit3 size={14} />
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}

                <Link
                    href="/builder"
                    className="border-2 border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-primary-500/50 transition-all group min-h-[300px]"
                >
                    <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus className="text-gray-500 group-hover:text-primary-400" size={32} />
                    </div>
                    <span className="text-gray-500 font-bold group-hover:text-white transition-colors">Add New Qualifier</span>
                </Link>
            </div>
        </div>
    );
};

export default QualifiersPage;
