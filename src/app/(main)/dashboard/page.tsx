"use client";

import React from 'react';
import Link from 'next/link';
import { Users, FileText, CheckCircle, TrendingUp, Search, MoreHorizontal, ArrowUpRight, MessageSquare, Zap, List } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useUserLeads, useQualifiers } from '@/hooks/useFirestore';
import { LeadStatus } from '@/types';

const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const { leads, loading: leadsLoading } = useUserLeads();
    const { qualifiers, loading: qualifiersLoading } = useQualifiers();

    const totalLeads = leads.length;
    const hotLeads = leads.filter(l => l.status === LeadStatus.HOT).length;
    const conversionRate = totalLeads > 0 ? ((hotLeads / totalLeads) * 100).toFixed(1) : '0.0';
    const activeQualifiers = qualifiers.filter(q => q.status === 'active').length;

    // Mock stats with real values where possible
    const stats = [
        { label: 'Total Leads', value: totalLeads.toString(), icon: <Users className="text-blue-400" />, change: '+12.5%' },
        { label: 'Qualified (Hot)', value: hotLeads.toString(), icon: <CheckCircle className="text-green-400" />, change: '+5.2%' },
        { label: 'Conversion Rate', value: `${conversionRate}%`, icon: <TrendingUp className="text-purple-400" />, change: '+2.1%' },
        { label: 'Active Qualifiers', value: activeQualifiers.toString(), icon: <List className="text-amber-400" />, change: '0' },
    ];

    const recentLeads = leads.slice(0, 5);

    if (leadsLoading || qualifiersLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back, {user?.displayName || 'Admin'}</h1>
                    <p className="text-gray-400">Here's what's happening with your high-ticket funnel.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/qualifiers" className="px-5 py-2.5 bg-dark-800 border border-gray-700 hover:bg-dark-700 text-white rounded-xl font-bold transition-all flex items-center gap-2">
                        <List size={18} />
                        Manage Qualifiers
                    </Link>
                    <Link href="/builder" className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 btn-glow">
                        <Zap size={18} />
                        New Qualifier
                    </Link>
                </div>
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((s, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border-gray-800/50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center">
                                {s.icon}
                            </div>
                            <span className="text-xs font-bold text-green-400 px-2 py-1 bg-green-400/10 rounded-full">
                                {s.change}
                            </span>
                        </div>
                        <div className="text-2xl font-black text-white mb-1">{s.value}</div>
                        <p className="text-gray-500 text-sm">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Leads Table */}
                <div className="lg:col-span-2 glass rounded-2xl border-gray-800/50 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-white">Recent Leads</h2>
                        <Link href="/leads" className="text-sm text-primary-400 hover:text-primary-300 font-medium flex items-center gap-1">
                            View All <ArrowUpRight size={14} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-dark-900/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Lead</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Score</th>
                                    <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-black text-gray-500 uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {recentLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">
                                            No leads yet. Share your qualifier to get started!
                                        </td>
                                    </tr>
                                ) : (
                                    recentLeads.map((l) => (
                                        <tr key={l.id} className="hover:bg-dark-900/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors">{l.name}</div>
                                                <div className="text-xs text-gray-500">{l.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                        <div className={`h-full ${l.score > 80 ? 'bg-green-500' : l.score > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${l.score}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-mono font-bold text-gray-400">{l.score}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-wider uppercase ${l.status === LeadStatus.HOT ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                    l.status === LeadStatus.WARM ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                        'bg-red-500/10 text-red-400 border border-red-500/20'
                                                    }`}>
                                                    {l.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href="/leads" className="text-gray-500 hover:text-white transition-colors">
                                                    <ArrowUpRight size={18} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Tips / AI Insight */}
                <div className="space-y-6">
                    <div className="glass p-6 rounded-2xl border-gray-800/50 bg-gradient-to-br from-primary-600/10 to-indigo-600/10">
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="text-primary-400" size={24} />
                            <h3 className="font-bold text-white">AI Optimization Insight</h3>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            "Your leads from LinkedIn are converting 2.4x better than Facebook. Consider increasing your LinkedIn ad spend to maximize ROI."
                        </p>
                        <button className="w-full py-2 bg-dark-800 hover:bg-dark-700 text-white rounded-lg text-sm font-bold transition-all border border-gray-700">
                            Apply Recommendation
                        </button>
                    </div>

                    <div className="glass p-6 rounded-2xl border-gray-800/50">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="text-amber-400" size={24} />
                            <h3 className="font-bold text-white">Live Conversation Tip</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-dark-900/50 p-4 rounded-xl text-xs border border-gray-800">
                                <p className="text-primary-400 font-bold mb-1">QualifyAI:</p>
                                <p className="text-gray-400 italic">"Based on our data, try asking about their 'revenue bottleneck' instead of 'budget' first. It uncovers 15% more high-intent leads."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
