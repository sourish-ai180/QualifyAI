"use client";

import React from 'react';

const TermsOfServicePage: React.FC = () => {
    return (
        <div className="pt-20 pb-32">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Terms of Service</h1>
                <div className="glass p-10 rounded-3xl border-gray-800/50 space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing or using the QualifyAI platform, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use the service.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">2. Account Responsibility</h2>
                        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">3. Use of AI Technology</h2>
                        <p>QualifyAI utilizes advanced Large Language Models (LLMs) for conversational intake. While we strive for accuracy, you acknowledge that AI-generated responses may occasionally contain errors or inaccuracies.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                        <p>In no event shall QualifyAI be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the platform.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;
