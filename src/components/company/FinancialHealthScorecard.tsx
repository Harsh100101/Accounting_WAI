"use client";

import React, { useState } from "react";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Compass, 
  Sparkles,
  Info
} from "lucide-react";
import { FinancialHealthScorecard as ScorecardType, HealthPillar } from "@/types/financials";
import { useLearning } from "@/context/LearningModeContext";
import { getSignalBadgeColor } from "@/lib/utils";

interface FinancialHealthScorecardProps {
  scorecard: ScorecardType;
}

export function FinancialHealthScorecard({ scorecard }: FinancialHealthScorecardProps) {
  const { explainNumber } = useLearning();
  const [selectedPillar, setSelectedPillar] = useState<string>(scorecard.pillars[0]?.name || "Profitability");

  const activePillar = scorecard.pillars.find((p) => p.name === selectedPillar) || scorecard.pillars[0];

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header & Overall Rating */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              Financial Health Scorecard & 7 Pillars
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Overall: {scorecard.overallHealthRating}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent scoring methodology based on verified multi-statement accounting metrics
          </p>
        </div>

        {/* Methodology note badge */}
        <div className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 max-w-sm shadow-xs">
          <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>Every score explains its operational evidence and questions to investigate.</span>
        </div>
      </div>

      {/* 7 Pillars Interactive Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {scorecard.pillars.map((pillar) => {
          const isSelected = pillar.name === selectedPillar;
          const badge = getSignalBadgeColor(pillar.signal);

          return (
            <button
              key={pillar.name}
              onClick={() => setSelectedPillar(pillar.name)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between group cursor-pointer ${
                isSelected
                  ? "bg-indigo-50 border-indigo-300 shadow-xs ring-1 ring-indigo-300"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200"
              }`}
            >
              <div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 block truncate">
                  {pillar.name}
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-base font-bold text-slate-900">{pillar.score}</span>
                  <span className="text-[10px] text-slate-500 font-semibold">/100</span>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${badge.bg} ${badge.text} ${badge.border}`}>
                  {pillar.status}
                </span>
                {pillar.trend === "Improving" ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                ) : pillar.trend === "Deteriorating" ? (
                  <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                ) : (
                  <Minus className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Deep Dive Card */}
      {activePillar && (
        <div className="rounded-2xl bg-slate-50/70 border border-slate-200 p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center border border-indigo-200">
                {activePillar.score}
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  {activePillar.name} Pillar Analysis
                  <span className="text-xs font-semibold text-slate-500">
                    ({activePillar.trend} Trend)
                  </span>
                </h3>
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Click any metric below to launch the Three-Question Explainer
            </span>
          </div>

          {/* Key Drivers and Supporting Clickable Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Supporting Metrics (Clickable) */}
            <div className="md:col-span-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Supporting Financial Metrics
              </span>
              <div className="space-y-2">
                {activePillar.supportingMetrics.map((m, idx) => (
                  <div
                    key={idx}
                    onClick={() => explainNumber(m.label.toLowerCase().replace(/[^a-z]/g, ""), m.value)}
                    className="p-3 rounded-xl bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 flex items-center justify-between cursor-pointer group transition-all shadow-xs"
                  >
                    <div>
                      <span className="text-xs text-slate-700 group-hover:text-indigo-700 font-semibold block">
                        {m.label}
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {m.value}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      Explain →
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Explanation & What to Investigate */}
            <div className="md:col-span-7 space-y-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Health Diagnosis</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activePillar.aiExplanation}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-800">
                  <Compass className="w-3.5 h-3.5 text-purple-600" />
                  <span>What To Investigate Next</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activePillar.whatToInvestigate}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
