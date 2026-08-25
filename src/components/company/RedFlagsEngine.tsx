"use client";

import React, { useState } from "react";
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Info 
} from "lucide-react";
import { RedFlagItem } from "@/types/financials";

interface RedFlagsEngineProps {
  redFlags: RedFlagItem[];
}

export function RedFlagsEngine({ redFlags }: RedFlagsEngineProps) {
  const [expandedFlagId, setExpandedFlagId] = useState<string | null>(null);

  const toggleFlag = (id: string) => {
    setExpandedFlagId(expandedFlagId === id ? null : id);
  };

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              Contextual Risk & Red Flag Engine
            </h2>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              redFlags.length > 0
                ? "bg-amber-100 text-amber-800 border-amber-300"
                : "bg-emerald-100 text-emerald-800 border-emerald-300"
            }`}>
              {redFlags.length} Flag{redFlags.length === 1 ? "" : "s"} Surfaced
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Contextual anomaly detection across Debt, Working Capital, Cash Flow, and Dilution risks
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Risk Engine
        </span>
      </div>

      {/* Red Flags List */}
      {redFlags.length === 0 ? (
        <div className="p-8 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Critical Accounting Red Flags Detected</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Solvency, cash conversion, and working capital indicators are within comfortable historical operating bands.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {redFlags.map((flag) => {
            const isExpanded = expandedFlagId === flag.id;
            const isHigh = flag.severity === "HIGH";

            return (
              <div
                key={flag.id}
                className={`rounded-2xl border overflow-hidden transition-all shadow-xs ${
                  isHigh ? "bg-rose-50/30 border-rose-200" : "bg-amber-50/30 border-amber-200"
                }`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleFlag(flag.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isHigh ? "text-rose-600" : "text-amber-600"}`} />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.2 rounded bg-white text-slate-700 border border-slate-200">
                          {flag.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                          isHigh ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {flag.severity} Priority
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">{flag.title}</h3>
                      <p className="text-xs text-slate-600 font-mono mt-0.5">{flag.evidence}</p>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-indigo-700 flex items-center gap-1 shrink-0">
                    <span>{isExpanded ? "Collapse" : "Investigate"}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-200/80 space-y-4 text-xs sm:text-sm bg-white">
                    {/* Explanation */}
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 block">Analytical Explanation:</span>
                      <p className="text-slate-700 leading-relaxed">{flag.explanation}</p>
                    </div>

                    {/* Historical Trend */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700">
                      <span className="text-slate-500 font-semibold block mb-0.5 text-[11px]">Historical Evidence:</span>
                      {flag.historicalTrend}
                    </div>

                    {/* Possible Causes */}
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 block">Possible Operational Causes:</span>
                      <ul className="space-y-1 text-slate-700 text-xs">
                        {flag.possibleCauses.map((cause, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Questions to Investigate */}
                    <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-800 uppercase tracking-wider">
                        <HelpCircle className="w-4 h-4 text-purple-600" />
                        <span>Questions to Investigate:</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {flag.questionsToInvestigate.map((q, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-purple-700 font-bold">{i + 1}.</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
