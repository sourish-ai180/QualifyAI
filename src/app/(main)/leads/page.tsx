"use client";

import React, { useState } from 'react';
import { Search, Filter, Download, ArrowUpDown, ChevronRight, User } from 'lucide-react';
import { LeadStatus, Lead } from '@/types';
import { useUserLeads } from '@/hooks/useFirestore';

const LeadsPage: React.FC = () => {
    const { leads, loading } = useUserLeads();
    const [searchTerm, setSearchTerm] = useState('');

    const getStatusStyle = (status: LeadStatus) => {
        switch (status) {
            case LeadStatus.HOT: return 'bg-green-500/10 text-green-400 border border-green-500/20';
            case LeadStatus.WARM: return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
            case LeadStatus.COLD: return 'bg-red-500/10 text-red-400 border border-red-500/20';
            default: return 'bg-gray-800 text-gray-400';
        }
    };

    const formatDate = (timestamp: number) => {
        if (!timestamp) return 'N/A';
        // Check if timestamp is a Firestore Timestamp object (seconds, nanoseconds) or a number
        // The type says number, but Firestore often returns Timestamp objects effectively.
        // If it's a number from Date.now(), it's milliseconds.
        // If it's a Firestore timestamp, we might need to handle it.
        // Helper:
        const date = new Date(timestamp); // Assuming number for now, if hook handles conversion

        // Simple relative time or date
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Filter leads
    const filteredLeads = leads.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        if (filteredLeads.length === 0) return;

        const headers = ['Name', 'Email', 'Status', 'Score', 'Budget', 'Source', 'Date', 'Summary'];
        const csvContent = [
            headers.join(','),
            ...filteredLeads.map(l => [
                `"${l.name}"`,
                `"${l.email}"`,
                l.status,
                l.score,
                `"${l.budget || ''}"`,
                `"${l.source || ''}"`,
                `"${new Date(l.createdAt).toLocaleDateString()}"`,
                `"${(l.responses as any)?.summary || ''}"`.replace(/"/g, '""') // Escape quotes
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'leads_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
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
                    <h1 className="text-3xl font-bold text-white mb-2">Prospect Intelligence</h1>
                    <p className="text-gray-400">Manage and analyze your high-ticket service leads.</p>
                </div>
                <button
                    onClick={handleExport}
                    className="px-5 py-2.5 bg-dark-800 hover:bg-dark-700 text-white rounded-xl font-bold transition-all border border-gray-700 flex items-center gap-2"
                >
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            <div className="glass rounded-3xl border-gray-800/50 overflow-hidden">
                {/* Toolbar */}
                <div className="p-6 border-b border-gray-800 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-dark-950 border border-gray-800 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary-500 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-4 py-3 bg-dark-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-medium">
                            <Filter size={16} />
                            Filters
                        </button>
                        <button className="flex-1 md:flex-none px-4 py-3 bg-dark-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-medium">
                            <ArrowUpDown size={16} />
                            Sort
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-dark-900/50">
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Prospect</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Score / Fitness</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Budget</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Channel</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest">Received</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No leads found. Share your qualifier link to get started!
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((l) => (
                                    <tr key={l.id} className="group hover:bg-dark-900/40 transition-colors cursor-pointer">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-xs font-black text-white glow-primary shrink-0">
                                                    {(l.name || 'Unknown').split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors">{l.name || 'Unknown User'}</div>
                                                    <div className="text-[10px] text-gray-500 font-mono">{l.email || 'No email'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-black tracking-wider uppercase ${getStatusStyle(l.status)}`}>
                                                    {l.status}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-12 h-1 bg-gray-800 rounded-full overflow-hidden">
                                                        <div className={`h-full ${l.score > 80 ? 'bg-green-500' : l.score > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${l.score}%` }}></div>
                                                    </div>
                                                    <span className="text-xs font-mono font-bold text-gray-400">{l.score}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-gray-300">
                                            {l.budget || '-'}
                                        </td>
                                        <td className="px-6 py-5 text-xs text-gray-500">
                                            {l.source || 'Direct'}
                                        </td>
                                        <td className="px-6 py-5 text-xs text-gray-500">
                                            {formatDate(l.createdAt)}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                                                <ChevronRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Showing {filteredLeads.length} of {leads.length} leads</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-dark-900 border border-gray-800 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-all disabled:opacity-50" disabled>Previous</button>
                        <button className="px-4 py-2 bg-dark-900 border border-gray-800 rounded-lg text-xs font-bold text-gray-400 hover:text-white transition-all disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsPage;
