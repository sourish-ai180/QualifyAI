"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { usePathname } from 'next/navigation';
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAppPage = pathname.startsWith('/dashboard') ||
        pathname.startsWith('/qualifiers') ||
        pathname.startsWith('/leads') ||
        pathname.startsWith('/builder');

    if (isAppPage) {
        return (
            <div className="flex min-h-screen bg-dark-950">
                <Sidebar />
                <main className="flex-grow lg:pl-64 min-h-screen bg-dark-950 text-gray-100 pb-20 lg:pb-0">
                    {children}
                </main>
                <MobileNav />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
