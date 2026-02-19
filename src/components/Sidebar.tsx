"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileEdit, Users, LogOut, Zap, List } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => pathname.startsWith(path);

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Qualifiers', href: '/qualifiers', icon: List },
        { name: 'Leads', href: '/leads', icon: Users },
        { name: 'Create', href: '/builder', icon: FileEdit },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-64 h-screen fixed top-0 left-0 bg-dark-950 border-r border-gray-800/50 z-50">
            {/* Logo Area */}
            <div className="p-6 border-b border-gray-800/50">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-300">
                        <Zap className="text-white w-5 h-5 fill-current" />
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-white">
                        Qualify<span className="text-primary-400">AI</span>
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active
                                ? 'bg-primary-600/10 text-primary-400 border border-primary-500/20'
                                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className={active ? 'text-primary-400' : 'text-gray-400 group-hover:text-white'} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User / Logout Area */}
            <div className="p-4 border-t border-gray-800/50">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
