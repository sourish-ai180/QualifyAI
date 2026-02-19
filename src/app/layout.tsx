import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QualifyAI | Stop Wasting Time on Unqualified Leads",
  description: "AI-powered lead qualification SaaS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <div className="min-h-screen bg-dark-950 text-gray-100 selection:bg-primary-500 selection:text-white">
            {children}
            <Analytics />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
