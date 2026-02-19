"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Send, Zap, Calendar, ArrowRight, RefreshCcw, User, Loader2 } from 'lucide-react';
import { useQualifier } from '@/hooks/useFirestore';
import { createLead, getUserProfile } from '@/lib/firestore';
import { analyzeLeadResponse } from '@/actions/ai';
import { ChatMessage, LeadStatus } from '@/types';

const ChatIntake: React.FC = () => {
    const params = useParams();
    const qualifierId = params?.id as string;

    const { qualifier, loading } = useQualifier(qualifierId);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [leadStatus, setLeadStatus] = useState<LeadStatus | null>(null);
    const [score, setScore] = useState(0);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Initialize chat when qualifier loads
    useEffect(() => {
        if (qualifier && messages.length === 0) {
            setMessages([
                { role: 'assistant', content: `Hi! I'm the digital assistant for ${qualifier.name}. I'd love to learn a bit about your goals to see if we're a match. Ready to dive in?` }
            ]);
        }
    }, [qualifier, messages.length]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim() || isTyping || !qualifier) return;

        const userMsg = inputValue;
        setInputValue('');

        const newHistory: ChatMessage[] = [...messages, { role: 'user', content: userMsg }];
        setMessages(newHistory);
        setIsTyping(true);

        try {
            const result = await analyzeLeadResponse(newHistory, userMsg, qualifier.criteria);

            const aiMsg: ChatMessage = { role: 'assistant', content: result.nextQuestion };
            setMessages(prev => [...prev, aiMsg]);

            if (result.isComplete) {
                setIsComplete(true);
                setScore(result.score || 0);
                const status = (result.status as LeadStatus) || LeadStatus.COLD;
                setLeadStatus(status);

                // Save Lead

                const leadId = await createLead({
                    qualifierId: qualifier.id,
                    userId: qualifier.userId,
                    name: 'Guest User', // Ideally ask for name/email in chat or capture from params if available
                    email: '', // Placeholder
                    responses: { summary: result.summary || 'No summary provided' },
                    score: result.score || 0,
                    status: status,
                    transcription: JSON.stringify(newHistory)
                });

                // Trigger Email if HOT
                if (status === LeadStatus.HOT) {
                    try {
                        const ownerProfile = await getUserProfile(qualifier.userId);
                        if (ownerProfile?.email) {
                            await fetch('/api/email', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    leadId,
                                    leadName: 'Guest User',
                                    leadEmail: '',
                                    leadScore: result.score,
                                    summary: result.summary,
                                    ownerEmail: ownerProfile.email
                                })
                            });
                        }
                    } catch (emailError) {
                        console.error("Failed to send email notification", emailError);
                    }
                }
            }
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having a bit of trouble connecting to my brain right now. Could you say that again?" }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-dark-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!qualifier) {
        return (
            <div className="fixed inset-0 bg-dark-950 flex items-center justify-center p-6 text-center">
                <div className="max-w-md">
                    <h1 className="text-2xl font-bold text-white mb-2">Qualifier Not Found</h1>
                    <p className="text-gray-400">This link might be invalid or expired.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-dark-950 flex flex-col">
            {/* Header */}
            <div className="glass px-6 py-4 border-b border-gray-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center glow-primary">
                        <Zap className="text-white w-5 h-5 fill-current" />
                    </div>
                    <span className="font-bold text-white tracking-tight">Qualify<span className="text-primary-400">AI</span></span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-900 border border-gray-800 px-2 py-1 rounded">
                    {qualifier.name}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'assistant' ? 'bg-primary-900/50 border border-primary-500/30' : 'bg-dark-800 border border-gray-700'}`}>
                                {m.role === 'assistant' ? <Zap size={14} className="text-primary-400" /> : <User size={14} className="text-gray-400" />}
                            </div>
                            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'assistant'
                                ? 'bg-dark-900 border border-gray-800 text-gray-200 rounded-tl-none'
                                : 'bg-primary-600 text-white rounded-tr-none'
                                }`}>
                                {m.content}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-900/50 border border-primary-500/30 flex items-center justify-center shrink-0">
                                <Zap size={14} className="text-primary-400" />
                            </div>
                            <div className="bg-dark-900 border border-gray-800 p-4 rounded-2xl rounded-tl-none">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isComplete && (
                        <div className="pt-8 text-center animate-float">
                            <div className="max-w-sm mx-auto glass p-8 rounded-3xl border-primary-500/30 glow-primary">
                                <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    {leadStatus === LeadStatus.HOT ? (
                                        <Calendar size={32} className="text-primary-400" />
                                    ) : (
                                        <RefreshCcw size={32} className="text-gray-400" />
                                    )}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2">
                                    {leadStatus === LeadStatus.HOT ? "You're Qualified!" : "Thanks for chatting!"}
                                </h3>
                                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                                    {leadStatus === LeadStatus.HOT
                                        ? "Based on your responses, we believe we're a great fit. Let's schedule a call!"
                                        : "We appreciate your interest. Based on your goals, we might not be the best fit right now."}
                                </p>

                                {leadStatus === LeadStatus.HOT && qualifier.calendlyLink && (
                                    <a
                                        href={qualifier.calendlyLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 btn-glow transition-all"
                                    >
                                        Book Your Call
                                        <ArrowRight size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Input Area */}
            {!isComplete && (
                <div className="p-4 md:p-8 bg-dark-950 border-t border-gray-800 shrink-0">
                    <div className="max-w-3xl mx-auto flex gap-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            className="flex-1 bg-dark-900 border border-gray-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-500 transition-all text-sm"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isTyping}
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isTyping ? 'bg-gray-800 text-gray-600' : 'bg-primary-600 hover:bg-primary-500 text-white glow-primary btn-glow'}`}
                        >
                            <Send size={22} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatIntake;
