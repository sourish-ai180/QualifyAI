"use client";

import React, { Suspense } from 'react';
import ChatClient from './ChatClient';

export default function Page() {
    return (
        <Suspense fallback={<div className="fixed inset-0 bg-dark-950 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div></div>}>
            <ChatClient />
        </Suspense>
    );
}
