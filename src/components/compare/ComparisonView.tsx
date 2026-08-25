"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Scale, 
  Sparkles, 
  X, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle,
  ChevronRight 
} from "lucide-react";
import { DEMO_COMPANIES, DEMO_MULTI_YEAR_FINANCIALS } from "@/lib/providers/demoData";
import { Company, MultiCompanyComparisonResult, MultiYearFinancials } from "@/types/financials";
import { generateComparisonInsights } from "@/lib/gemini/geminiClient";
import { useLearning } from "@/context/LearningModeContext";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface ComparisonViewProps {
  initialTickers?: string[];
}

export function ComparisonView({ initialTickers = ["TCS", "INFY"] }: ComparisonViewProps) {
  const { compareList, addToCompare, removeFromCompare, explainNumber } = useLearning();
  const [activeTickers, setActiveTickers] = useState<string[]>(
    compareList.length > 0 ? compareList : initialTickers
  );
  const [showAddMenu, setShowAddMenu] = useState(false);

  const selectedCompanies = DEMO_COMPANIES.filter((c) => activeTickers.includes(c.ticker));
  const financialsMap: Record<string, MultiYearFinancials> = {};
  for (const c of selectedCompanies) {
    if (DEMO_MULTI_YEAR_FINANCIALS[c.ticker]) {
      financialsMap[c.ticker] = DEMO_MULTI_YEAR_FINANCIALS[c.ticker];
    }
  }

  const [comparisonResult, setComparisonResult] = useState<MultiCompanyComparisonResult | null>(null);

  React.useEffect(() => {
    generateComparisonInsights(selectedCompanies, financialsMap).then(setComparisonResult);
  }, [activeTickers]);

  const handleAddTicker = (ticker: string) => {
    if (!activeTickers.includes(ticker) && activeTickers.length < 4) {
      const updated = [...activeTickers, ticker];
      setActiveTickers(updated);
      addToCompare(ticker);
    }
    setShowAddMenu(false);
  };

  const handleRemoveTicker = (ticker: string) => {
    if (activeTickers.length > 1) {
      const updated = activeTickers.filter((t) => t !== ticker);
      setActiveTickers(updated);
      removeFromCompare(ticker);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Company Chips */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600" />
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Multi-Company Comparative Intelligence
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {selectedCompanies.length} Companies Selected
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Side-by-side financial statement benchmarking and AI operational differentiation analysis
            </p>
          </div>

          {/* Add Company Selector */}
          <div className="relative">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              disabled={activeTickers.length >= 4}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Company (Max 4)</span>
            </button>

            {showAddMenu && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setShowAddMenu(false)}
              >
                <div className="px-2 py-1.5 text-[11px] font-bold text-slate-500 uppercase">
                  Available Companies
                </div>
                {DEMO_COMPANIES.filter((c) => !activeTickers.includes(c.ticker)).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleAddTicker(c.ticker)}
                    className="w-full text-left p-2 rounded-lg text-xs hover:bg-slate-50 text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-semibold">{c.displayName}</span>
                    <span className="font-mono text-slate-500 text-[10px]">{c.ticker}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Company Badges */}
        <div className="flex items-center gap-3 flex-wrap">
          {selectedCompanies.map((c) => (
            <div
              key={c.id}
              className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center border border-indigo-200">
                {c.ticker.slice(0, 3)}
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{c.displayName}</span>
                <span className="text-[10px] text-slate-500 font-semibold">{formatCurrency(c.currentPrice, c.currency, false)}</span>
              </div>
              {activeTickers.length > 1 && (
                <button
                  onClick={() => handleRemoveTicker(c.ticker)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors ml-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Comparison Synthesis Card */}
      {comparisonResult && (
        <div className="rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/80 border border-indigo-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-slate-200 pb-3">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI Synthesis: What Actually Differentiates These Companies?</span>
          </div>

          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
            {comparisonResult.summaryNarrative}
          </p>

          {/* Differentiating Strengths by Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {comparisonResult.insightsByCompany.map((insight) => (
              <div
                key={insight.ticker}
                className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900 text-sm">{insight.displayName}</span>
                  <Link
                    href={`/company/${insight.ticker}`}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-0.5"
                  >
                    <span>Lens</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    Key Strengths:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {insight.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Key Questions for Investors */}
          <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200 space-y-2 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-800 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <span>What An Investor Should Investigate When Choosing Between Them:</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {comparisonResult.keyQuestionsForInvestors.map((q, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Table */}
      {comparisonResult && (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">Side-by-Side Financial Benchmark</h3>
            <span className="text-xs text-slate-500 font-medium">Click any metric row for Three-Question breakdown</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="p-3.5 sm:p-4 font-bold text-slate-800">Metric / Ratio</th>
                  {selectedCompanies.map((c) => (
                    <th key={c.id} className="p-3.5 sm:p-4 font-bold text-right text-slate-900">
                      {c.displayName}
                    </th>
                  ))}
                  <th className="p-3.5 sm:p-4 font-bold text-slate-500 hidden md:table-cell">Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonResult.comparisonTableRows.map((row, idx) => (
                  <tr
                    key={idx}
                    onClick={() => explainNumber(row.metricKey, row.metricLabel)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="p-3.5 sm:p-4 font-semibold text-slate-800">
                      <span className="hover:text-indigo-600 transition-colors">{row.metricLabel}</span>
                    </td>
                    {selectedCompanies.map((c) => (
                      <td key={c.id} className="p-3.5 sm:p-4 text-right font-bold text-indigo-700">
                        {row.valuesByTicker[c.ticker] || "N/A"}
                      </td>
                    ))}
                    <td className="p-3.5 sm:p-4 text-slate-500 text-xs hidden md:table-cell">
                      {row.context}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
