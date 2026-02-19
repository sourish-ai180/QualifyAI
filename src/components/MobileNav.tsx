"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileEdit, Users, LogOut, List } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const MobileNav: React.FC = () => {
    const pathname = usePathname();
    const { logout } = useAuth();

    const isActive = (path: string) => pathname.startsWith(path);

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Qualifiers', href: '/qualifiers', icon: List },
        { name: 'Leads', href: '/leads', icon: Users },
        { name: 'Create', href: '/builder', icon: FileEdit },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-dark-950 border-t border-gray-800/50 z-50 px-6 py-3 flex items-center justify-between">
            {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary-400' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <item.icon size={24} />
                        <span className="text-[10px] font-medium">{item.name}</span>
                    </Link>
                );
            })}
            <button
                onClick={logout}
                className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-400 transition-colors"
            >
                <LogOut size={24} />
                <span className="text-[10px] font-medium">Logout</span>
            </button>
        </div>
    );
};

export default MobileNav;
