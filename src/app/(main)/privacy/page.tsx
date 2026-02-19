"use client";

import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="pt-20 pb-32">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Privacy Policy</h1>
                <div className="glass p-10 rounded-3xl border-gray-800/50 space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
                        <p>At QualifyAI, we collect information that you provide directly to us when you create an account, build a qualifier, or when your prospects interact with our AI agents. This includes names, email addresses, business information, and conversation transcripts.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, including to facilitate lead qualification and scoring. We also use your data to communicate with you about updates, security alerts, and support.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">3. Data Security</h2>
                        <p>We implement a variety of security measures to maintain the safety of your personal information. Your sensitive data is encrypted via SSL technology and stored securely within our infrastructure.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">4. Third-Party Disclosure</h2>
                        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website and servicing you, so long as those parties agree to keep this information confidential.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
