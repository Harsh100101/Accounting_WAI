"use client";

import React, { useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  ShieldAlert, 
  Sparkles,
  BookOpen
} from "lucide-react";
import { ContradictionAnomaly } from "@/types/financials";
import { getSignalBadgeColor, getSignalLabel } from "@/lib/utils";

interface ContradictionDetectorProps {
  anomalies: ContradictionAnomaly[];
}

export function ContradictionDetector({ anomalies }: ContradictionDetectorProps) {
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  const hasConcerns = anomalies.some((a) => a.signal === "WATCH" || a.signal === "RED_FLAG");

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              Are the Numbers Telling the Same Story?
            </h2>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              hasConcerns 
                ? "bg-amber-100 text-amber-800 border-amber-300" 
                : "bg-emerald-100 text-emerald-800 border-emerald-300"
            }`}>
              {hasConcerns ? "Mixed Signals Detected" : "Harmonious Consistency"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Three-statement consistency engine comparing Income Statement, Balance Sheet, and Cash Flow Statement
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Consistency Engine
        </span>
      </div>

      {/* Anomalies List */}
      <div className="space-y-6">
        {anomalies.map((anomaly) => {
          const badge = getSignalBadgeColor(anomaly.signal);
          const isHarmonious = anomaly.severity === "INFORMATIONAL";

          return (
            <div
              key={anomaly.id}
              className={`rounded-2xl border p-5 sm:p-6 space-y-5 transition-all shadow-xs ${
                isHarmonious
                  ? "bg-emerald-50/30 border-emerald-200"
                  : "bg-amber-50/30 border-amber-200"
              }`}
            >
              {/* Anomaly Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-2.5">
                  {isHarmonious ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  )}
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{anomaly.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {anomaly.primaryMetricsInvolved.map((m, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono font-semibold px-2 py-0.2 rounded bg-white text-slate-700 border border-slate-200"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border w-fit ${badge.bg} ${badge.text} ${badge.border}`}>
                  {getSignalLabel(anomaly.signal)}
                </span>
              </div>

              {/* Plain Language Summary */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Plain-Language Finding:
                </span>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {anomaly.plainLanguageSummary}
                </p>
              </div>

              {/* Cross-Statement Evidence Table */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Multi-Statement Evidence Corroboration:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {anomaly.evidence.map((ev, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs space-y-0.5"
                    >
                      <span className="text-[10px] font-bold text-indigo-700 uppercase block">
                        {ev.statement}
                      </span>
                      <span className="text-xs text-slate-600 font-semibold block">{ev.metric}</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block font-sans">
                        {ev.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why It Matters */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="font-bold text-indigo-800 block mb-0.5">Why This Matters:</span>
                {anomaly.whyItMatters}
              </div>

              {/* "Ask the Next Question" - Interactive Accounting Education */}
              {anomaly.investigativeQuestions.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-purple-600" />
                      <span>Ask the Next Analytical Questions:</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Click to learn the underlying accounting concept</span>
                  </div>

                  <div className="space-y-2">
                    {anomaly.investigativeQuestions.map((q, idx) => {
                      const isExpanded = expandedQuestionId === q.id;
                      return (
                        <div
                          key={q.id}
                          className="rounded-xl bg-white border border-slate-200 shadow-xs overflow-hidden transition-colors"
                        >
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className="w-full p-3 text-left flex items-start justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                                {q.question}
                              </span>
                            </div>
                            <span className="text-xs text-indigo-700 font-bold shrink-0 flex items-center gap-1">
                              {isExpanded ? (
                                <>
                                  <span>Hide Concept</span>
                                  <ChevronUp className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  <span>Explain Concept</span>
                                  <ChevronDown className="w-4 h-4" />
                                </>
                              )}
                            </span>
                          </button>

                          {isExpanded && (
                            <div className="px-4 pb-3.5 pt-1 text-xs sm:text-sm text-slate-700 bg-purple-50/70 border-t border-purple-200 flex items-start gap-2.5 leading-relaxed">
                              <BookOpen className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-purple-900 block mb-0.5">Accounting Explanation:</span>
                                {q.accountingExplanation}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
