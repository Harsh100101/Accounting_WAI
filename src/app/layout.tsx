"use client";

import React, { useState } from "react";
import "./globals.css";
import { LearningProvider } from "@/context/LearningModeContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { MetricExplainerModal } from "@/components/modals/MetricExplainerModal";
import { CommandPalette } from "@/components/search/CommandPalette";
import { AiFinancialTutor } from "@/components/tutor/AiFinancialTutor";
import { DEMO_COMPANIES, DEMO_MULTI_YEAR_FINANCIALS } from "@/lib/providers/demoData";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  // Default active company for global tutor drawer
  const defaultCompany = DEMO_COMPANIES[0];
  const defaultFinancials = DEMO_MULTI_YEAR_FINANCIALS[defaultCompany.ticker];

  return (
    <html lang="en">
      <head>
        <title>AI-Powered Investment Lens | Financial Intelligence & Investor Education</title>
        <meta
          name="description"
          content="Don't just show investors the number. Teach them what the number means, why they should care, and what to investigate next."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-slate-900 min-h-screen flex flex-col justify-between antialiased">
        <LearningProvider>
          <div className="flex-1 flex flex-col">
            <Navbar
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenTutor={() => setIsTutorOpen(true)}
            />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {children}
            </main>

            <Footer />
            <MobileNav onOpenTutor={() => setIsTutorOpen(true)} />
          </div>

          <CommandPalette
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />

          <MetricExplainerModal />

          {defaultCompany && defaultFinancials && (
            <AiFinancialTutor
              isOpen={isTutorOpen}
              onClose={() => setIsTutorOpen(false)}
              company={defaultCompany}
              financials={defaultFinancials}
            />
          )}
        </LearningProvider>
      </body>
    </html>
  );
}
