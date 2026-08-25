"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  Target, 
  Compass, 
  CheckCircle2, 
  Layers,
  Search
} from "lucide-react";
import { useLearning } from "@/context/LearningModeContext";

interface HeroPhilosophyProps {
  onOpenSearch: () => void;
}

export function HeroPhilosophy({ onOpenSearch }: HeroPhilosophyProps) {
  const { explainNumber } = useLearning();
  const [activeTab, setActiveTab] = useState<"roe" | "ocf" | "de">("roe");

  const demoExamples = {
    roe: {
      metric: "ROE = 18.2%",
      label: "Return on Equity",
      whatItMeans: "For every ₹100 of equity owned by shareholders, the company generated ₹18.20 in net profit this year.",
      whyItMatters: "Reveals how efficiently shareholder capital compounds without relying purely on new stock issuance.",
      whatToInvestigate: "Is the 18% ROE driven by superior profit margins or high debt borrowing leverage?"
    },
    ocf: {
      metric: "Operating Cash Flow vs Net Profit",
      label: "Cash Flow Reality Check",
      whatItMeans: "Compares paper accounting profits on the income statement with actual cash deposited in company bank accounts.",
      whyItMatters: "Companies can survive years with paper losses, but quickly collapse if cash flow turns negative.",
      whatToInvestigate: "Are customer receivables piling up or is cash collection keeping pace with reported sales?"
    },
    de: {
      metric: "Debt-to-Equity = 0.08x",
      label: "Solvency Cushion",
      whatItMeans: "The company holds only ₹0.08 of debt for every ₹1.00 of shareholder equity.",
      whyItMatters: "Low debt provides immense resilience during industry downturns and eliminates interest rate risk.",
      whatToInvestigate: "Does the company have enough high-return opportunities to reinvest its massive cash surplus?"
    }
  };

  const current = demoExamples[activeTab];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-indigo-50/30 to-slate-50 border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-sm">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 -z-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 -z-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Vision & Philosophy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Investor Education & Financial Intelligence Layer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Understand the numbers. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600">
              Ask better questions.
            </span> <br />
            Invest with context.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
            Don&apos;t just look at arbitrary ratios or generic stock ratings. We translate complex financial statements into plain-language stories, detect cross-statement contradictions, and teach you how to think like a professional investor.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenSearch}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-semibold text-sm flex items-center gap-2 shadow-md shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Companies (TCS, Reliance, Apple...)</span>
            </button>

            <Link
              href="/learn"
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>See How It Works</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
          </div>

          {/* Differentiating Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs text-slate-600 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No Buy/Sell signals</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>3-Question Framework</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Contradiction Detection</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3-Question Framework Showcase */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-7 shadow-lg space-y-4">
            {/* Demo Selector Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Interactive Principle Demo
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setActiveTab("roe")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "roe" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  ROE Example
                </button>
                <button
                  onClick={() => setActiveTab("ocf")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "ocf" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Cash Flow
                </button>
                <button
                  onClick={() => setActiveTab("de")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    activeTab === "de" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Debt
                </button>
              </div>
            </div>

            {/* Step 0: The Raw Number */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">{current.label}</span>
                <span className="text-lg font-bold text-slate-900 font-sans">{current.metric}</span>
              </div>
              <button
                onClick={() => explainNumber(activeTab === "roe" ? "roe" : activeTab === "ocf" ? "operatingCashFlow" : "debtToEquityRatio", current.metric)}
                className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs font-bold transition-all shadow-xs"
              >
                Click to Explain
              </button>
            </div>

            {/* Step 1: What it means */}
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-800 uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                <span>1. What does this number mean?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {current.whatItMeans}
              </p>
            </div>

            {/* Step 2: Why you should care */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <Target className="w-3.5 h-3.5 text-amber-600" />
                <span>2. Why should I care as an investor?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {current.whyItMatters}
              </p>
            </div>

            {/* Step 3: What to investigate next */}
            <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-800 uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-purple-600" />
                <span>3. What should I investigate next?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {current.whatToInvestigate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
