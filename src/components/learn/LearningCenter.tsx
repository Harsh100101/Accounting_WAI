"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  FileSpreadsheet,
  Target
} from "lucide-react";
import { useLearning } from "@/context/LearningModeContext";
import { METRIC_DEFINITIONS } from "@/lib/engine/threeQuestionEngine";

export function LearningCenter() {
  const { explainNumber } = useLearning();
  const [activeModule, setActiveModule] = useState<"framework" | "traps" | "statements" | "glossary">("framework");

  const traps = [
    {
      title: "Trap #1: Growth Without Cash (The Optical Sales Illusion)",
      symptom: "Revenue ↑↑, Receivables ↑↑, Operating Cash Flow ↓",
      explanation: "A company can report rapid revenue growth on the income statement by offering lax 120-day credit to customers. But if customers take too long to pay or default, the company starves of real cash and must take emergency bank loans.",
      whatToInvestigate: "Check Days Sales Outstanding (DSO) and compare Operating Cash Flow to Net Profit."
    },
    {
      title: "Trap #2: Leverage-Driven ROE (The Debt Multiplier)",
      symptom: "ROE ↑↑, Debt-to-Equity ↑↑",
      explanation: "Return on Equity (ROE = Net Profit / Equity). If a company replaces equity with massive bank borrowings, the equity denominator shrinks, causing ROE to skyrocket mechanically. If interest rates rise or sales drop, bankruptcy risk surges.",
      whatToInvestigate: "Look at ROCE and Interest Coverage Ratio alongside ROE."
    },
    {
      title: "Trap #3: Earnings Quality Disconnect (Other Income Distortion)",
      symptom: "Net Profit ↑, Operating Profit (EBIT) ↓",
      explanation: "Net profit can be temporarily boosted by selling a piece of real estate, foreign currency swings, or tax write-backs. These one-off gains do not reflect sustainable core business health.",
      whatToInvestigate: "Check EBITDA Margin and Core Operating Margin trends."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Investor Education & Financial Intelligence Academy
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Non-Commerce Guide
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Learn how to think like a seasoned financial analyst without a commerce background
            </p>
          </div>
        </div>

        {/* Module Navigation Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveModule("framework")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeModule === "framework"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>The Three-Question Framework</span>
          </button>

          <button
            onClick={() => setActiveModule("traps")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeModule === "traps"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Common Financial Traps</span>
          </button>

          <button
            onClick={() => setActiveModule("statements")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeModule === "statements"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Understanding the 3 Statements</span>
          </button>

          <button
            onClick={() => setActiveModule("glossary")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeModule === "glossary"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Ratio Glossary</span>
          </button>
        </div>
      </div>

      {/* Module 1: The Three-Question Framework */}
      {activeModule === "framework" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              The Core Philosophy: &quot;Explain Every Number&quot;
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Traditional finance platforms flood first-time investors with 50+ isolated ratios (P/E, ROE, Current Ratio) without context. Our platform solves the <strong>Vocabulary Problem</strong> and the <strong>Interpretation Problem</strong> by demanding three answers for every number:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-indigo-200 space-y-2 shadow-xs">
                <span className="text-xs uppercase font-bold text-indigo-700 block">Question 1</span>
                <h3 className="text-base font-bold text-slate-900">What Does This Mean?</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Converts jargon into simple, concrete everyday analogies (e.g. &quot;₹18 profit for every ₹100 of owners&apos; capital&quot;).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-amber-200 space-y-2 shadow-xs">
                <span className="text-xs uppercase font-bold text-amber-700 block">Question 2</span>
                <h3 className="text-base font-bold text-slate-900">Why Should I Care?</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Connects the number to investment risk, capital preservation, compounding capacity, and margin of safety.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-purple-200 space-y-2 shadow-xs">
                <span className="text-xs uppercase font-bold text-purple-700 block">Question 3</span>
                <h3 className="text-base font-bold text-slate-900">What to Investigate Next?</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Generates follow-up investigative questions that teach you how to cross-examine other financial statements.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module 2: Common Financial Traps */}
      {activeModule === "traps" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {traps.map((trap, idx) => (
            <div key={idx} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <h3 className="text-base font-bold text-slate-900">{trap.title}</h3>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-indigo-700">
                Warning Symptom: {trap.symptom}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {trap.explanation}
              </p>
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 font-medium">
                <strong>How to detect it:</strong> {trap.whatToInvestigate}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Module 3: Understanding the 3 Statements */}
      {activeModule === "statements" && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            How the Three Statements Connect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-xs">
              <span className="text-xs font-bold text-emerald-800 uppercase block">1. Income Statement</span>
              <h3 className="text-base font-bold text-slate-900">The Video of Operations</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Shows revenue, expenses, and net profit over a 12-month period. Uses the accrual method (sales counted when invoiced, not when cash is received).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-xs">
              <span className="text-xs font-bold text-indigo-700 uppercase block">2. Balance Sheet</span>
              <h3 className="text-base font-bold text-slate-900">The Photo of Financial Position</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                A snapshot on the final day of the fiscal year: What the company owns (Assets) versus what it owes (Liabilities) and what belongs to shareholders (Equity).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 shadow-xs">
              <span className="text-xs font-bold text-purple-700 uppercase block">3. Cash Flow Statement</span>
              <h3 className="text-base font-bold text-slate-900">The Bank Ledger Reality Check</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Reconciles the Income Statement to actual bank cash receipts. Strips away non-cash accounting adjustments to show pure cash generation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Module 4: Interactive Ratio Glossary */}
      {activeModule === "glossary" && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4 animate-in fade-in duration-200">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Interactive Ratio & Metric Glossary
          </h2>
          <p className="text-xs text-slate-500">
            Click any metric to launch the Three-Question Explanation
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {Object.values(METRIC_DEFINITIONS).map((m) => (
              <button
                key={m.key}
                onClick={() => explainNumber(m.key, "Glossary Item")}
                className="p-4 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 text-left transition-all space-y-1 group shadow-xs cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase text-indigo-700 font-bold">{m.category}</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Unit: {m.unit}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {m.label}
                </h3>
                <span className="text-[11px] text-slate-500 group-hover:text-indigo-600 font-semibold block pt-1">
                  Click for 3-Question breakdown →
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
