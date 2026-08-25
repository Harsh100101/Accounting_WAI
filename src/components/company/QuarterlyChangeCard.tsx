"use client";

import React from "react";
import { 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { QuarterlyComparisonChange } from "@/types/financials";
import { getSignalBadgeColor, getSignalLabel } from "@/lib/utils";

interface QuarterlyChangeCardProps {
  quarterlyChange: QuarterlyComparisonChange | null;
}

export function QuarterlyChangeCard({ quarterlyChange }: QuarterlyChangeCardProps) {
  if (!quarterlyChange) return null;

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              What Changed Since Last Quarter?
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {quarterlyChange.quarterName} vs {quarterlyChange.previousQuarterName}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            5 key sequential accounting and operational shifts in simple terms for first-time investors
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Sequential Analysis
        </span>
      </div>

      {/* 5 Things List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {quarterlyChange.fiveThingsThatChanged.map((item) => {
          const badge = getSignalBadgeColor(item.signal);
          return (
            <div
              key={item.number}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center border border-indigo-200">
                    {item.number}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
                  {getSignalLabel(item.signal)}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {item.explanation}
              </p>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-sans text-slate-500 font-semibold">
                <span>Sequential Delta:</span>
                <span className="text-indigo-700 font-bold">{item.metricChange}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
