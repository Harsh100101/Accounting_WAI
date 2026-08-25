"use client";

import React from "react";
import { 
  Newspaper, 
  Sparkles, 
  Layers, 
  Eye, 
  ExternalLink, 
  Calendar 
} from "lucide-react";
import { NewsImpactItem } from "@/types/financials";
import { useLearning } from "@/context/LearningModeContext";

interface NewsImpactSectionProps {
  news: NewsImpactItem[];
}

export function NewsImpactSection({ news }: NewsImpactSectionProps) {
  const { explainNumber } = useLearning();

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-indigo-600" />
              Corporate Developments & Financial Statement Impact
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              News → Financials
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Connecting recent news headlines to potential impacts on the Income Statement, Balance Sheet, and Cash Flow
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Impact Engine
        </span>
      </div>

      {/* News Cards */}
      {news.length === 0 ? (
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center text-slate-500 text-sm">
          No corporate announcements for the current period.
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-3.5 shadow-xs"
            >
              {/* Category & Date Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    Source: <span className="text-slate-800 font-semibold">{item.source}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Headline */}
              <h3 className="text-base font-bold text-slate-900 leading-snug">{item.headline}</h3>

              {/* AI Financial Impact Synthesis */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Why This Matters Financially:</span>
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Impacts: {item.potentialStatementImpact}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {item.geminiExplanation}
                </p>
              </div>

              {/* Metrics to Watch Chips */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                  <Eye className="w-3.5 h-3.5 text-purple-600" />
                  <span>Financial Metrics to Watch:</span>
                </span>
                {item.metricsToWatch.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => explainNumber(m.toLowerCase().replace(/[^a-z]/g, ""), "Related to news")}
                    className="px-2.5 py-0.5 rounded-lg bg-white hover:bg-indigo-50 border border-slate-200 text-xs font-bold text-slate-700 hover:text-indigo-700 transition-colors shadow-xs cursor-pointer"
                  >
                    {m} →
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
