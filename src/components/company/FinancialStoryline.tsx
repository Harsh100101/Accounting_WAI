"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle 
} from "lucide-react";
import { FinancialStory, MultiYearFinancials } from "@/types/financials";
import { formatCurrency, formatPercent, formatFinancialAmount } from "@/lib/utils";
import { useLearning } from "@/context/LearningModeContext";

interface FinancialStorylineProps {
  story: FinancialStory;
  financials: MultiYearFinancials;
}

export function FinancialStoryline({ story, financials }: FinancialStorylineProps) {
  const { explainNumber } = useLearning();
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(story.evolutionTimeline.length - 1);

  const activeYear = story.evolutionTimeline[selectedYearIndex] || story.evolutionTimeline[0];
  const { currencySymbol } = financials;

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Title & Signature Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Signature Feature: The Financial Storyline
            </h2>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              AI Synthesis
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Connecting Revenue, Profit, Operating Cash Flow, Receivables, and Debt over time into a unified narrative
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Multi-Year Timeline
        </span>
      </div>

      {/* Interactive Year Evolution Scrubber */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
          Select Fiscal Year to Scrub Timeline:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {story.evolutionTimeline.map((item, idx) => {
            const isSelected = idx === selectedYearIndex;
            return (
              <button
                key={item.year}
                onClick={() => setSelectedYearIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-indigo-50 border-indigo-400 text-indigo-950 shadow-xs ring-1 ring-indigo-300"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">FY{item.year}</span>
                  {isSelected && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-600 text-white font-bold">
                      Active
                    </span>
                  )}
                </div>
                <span className="text-xs text-indigo-700 font-bold block mt-1 truncate">
                  {item.keyShiftTitle}
                </span>
                <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] font-semibold text-slate-600">
                  Rev: {formatFinancialAmount(item.revenue, currencySymbol)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Year Snapshot Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
        {/* Revenue */}
        <div 
          onClick={() => explainNumber("revenue", formatFinancialAmount(activeYear.revenue, currencySymbol))}
          className="p-3 rounded-xl bg-white hover:bg-indigo-50/50 cursor-pointer transition-colors border border-slate-200 hover:border-indigo-300 shadow-xs"
        >
          <span className="text-[10px] font-bold text-slate-500 uppercase block">1. Revenue (Sales)</span>
          <span className="text-sm sm:text-base font-bold text-slate-900 font-sans block mt-0.5">
            {formatFinancialAmount(activeYear.revenue, currencySymbol)}
          </span>
          <span className="text-[10px] text-indigo-600 font-semibold block mt-0.5">Top-Line Growth</span>
        </div>

        {/* Net Profit */}
        <div 
          onClick={() => explainNumber("netProfit", formatFinancialAmount(activeYear.profit, currencySymbol))}
          className="p-3 rounded-xl bg-white hover:bg-emerald-50/50 cursor-pointer transition-colors border border-slate-200 hover:border-emerald-300 shadow-xs"
        >
          <span className="text-[10px] font-bold text-slate-500 uppercase block">2. Net Profit</span>
          <span className="text-sm sm:text-base font-bold text-emerald-700 font-sans block mt-0.5">
            {formatFinancialAmount(activeYear.profit, currencySymbol)}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Accounting Income</span>
        </div>

        {/* Operating Cash Flow */}
        <div 
          onClick={() => explainNumber("operatingCashFlow", formatFinancialAmount(activeYear.cashFlow, currencySymbol))}
          className="p-3 rounded-xl bg-white hover:bg-indigo-50/50 cursor-pointer transition-colors border border-slate-200 hover:border-indigo-300 shadow-xs"
        >
          <span className="text-[10px] font-bold text-slate-500 uppercase block">3. Operating Cash</span>
          <span className="text-sm sm:text-base font-bold text-indigo-700 font-sans block mt-0.5">
            {formatFinancialAmount(activeYear.cashFlow, currencySymbol)}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Bank Deposits</span>
        </div>

        {/* Receivables */}
        <div 
          onClick={() => explainNumber("receivables", formatFinancialAmount(activeYear.receivables, currencySymbol))}
          className="p-3 rounded-xl bg-white hover:bg-amber-50/50 cursor-pointer transition-colors border border-slate-200 hover:border-amber-300 shadow-xs"
        >
          <span className="text-[10px] font-bold text-slate-500 uppercase block">4. Receivables</span>
          <span className="text-sm sm:text-base font-bold text-amber-700 font-sans block mt-0.5">
            {formatFinancialAmount(activeYear.receivables, currencySymbol)}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Uncollected IOUs</span>
        </div>

        {/* Debt */}
        <div 
          onClick={() => explainNumber("debtToEquityRatio", formatFinancialAmount(activeYear.debt, currencySymbol))}
          className="p-3 rounded-xl bg-white hover:bg-slate-100 cursor-pointer transition-colors border border-slate-200 hover:border-slate-300 shadow-xs"
        >
          <span className="text-[10px] font-bold text-slate-500 uppercase block">5. Total Debt</span>
          <span className="text-sm sm:text-base font-bold text-slate-800 font-sans block mt-0.5">
            {formatFinancialAmount(activeYear.debt, currencySymbol)}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Bank Borrowing</span>
        </div>
      </div>

      {/* The AI Narrative Story Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/80 border border-indigo-200/80 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>The Story of This Business Evolution</span>
        </div>
        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
          {story.theNarrative}
        </p>
      </div>

      {/* Strengths and Blindspots Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core Strengths */}
        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Key Demonstrated Strengths</span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
            {story.biggestStrengths.map((st, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{st}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Blindspots & Key Questions */}
        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Key Questions to Investigate</span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
            {story.biggestBlindspots.map((bl, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{bl}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
