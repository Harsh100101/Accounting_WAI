"use client";

import React from "react";
import { 
  X, 
  HelpCircle, 
  Target, 
  Compass, 
  Sparkles, 
  BookOpen, 
  SlidersHorizontal,
  ChevronRight
} from "lucide-react";
import { useLearning } from "@/context/LearningModeContext";
import { getSignalBadgeColor, getSignalLabel } from "@/lib/utils";
import { LearningMode } from "@/types/financials";

export function MetricExplainerModal() {
  const { explainingMetric, closeExplainer, learningMode, setLearningMode, explainNumber } = useLearning();

  if (!explainingMetric) return null;

  const badgeStyle = getSignalBadgeColor(explainingMetric.signal);
  const signalLabel = getSignalLabel(explainingMetric.signal);

  const whatItMeans = explainingMetric.whatItMeans[learningMode] || explainingMetric.whatItMeans.beginner;
  const whyYouShouldCare = explainingMetric.whyYouShouldCare[learningMode] || explainingMetric.whyYouShouldCare.beginner;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                Three-Question Framework
              </span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`}></span>
                {signalLabel}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {explainingMetric.metricLabel}
              <span className="text-indigo-700 text-lg font-bold">
                = {explainingMetric.currentValue}
                {explainingMetric.unit && explainingMetric.unit !== "Currency" ? ` ${explainingMetric.unit}` : ""}
              </span>
            </h2>
            {explainingMetric.benchmark && (
              <p className="text-xs text-slate-500 mt-1">
                Typical Benchmark: <span className="text-slate-800 font-semibold">{explainingMetric.benchmark}</span>
              </p>
            )}
          </div>

          <button
            onClick={closeExplainer}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close explainer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Learning Mode Quick Switcher */}
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-semibold">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
            <span>Explanation Depth:</span>
          </div>
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
            {(["beginner", "intermediate", "advanced"] as LearningMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setLearningMode(mode)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize transition-all cursor-pointer ${
                  learningMode === mode
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* The Three Questions */}
        <div className="space-y-4">
          {/* Question 1: What does this number mean? */}
          <div className="rounded-2xl bg-indigo-50/60 border border-indigo-100 p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>1. What does this number mean?</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {whatItMeans}
            </p>
          </div>

          {/* Question 2: Why should I care? */}
          <div className="rounded-2xl bg-amber-50/60 border border-amber-200/80 p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Target className="w-4 h-4 text-amber-600" />
              <span>2. Why should I care as an investor?</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {whyYouShouldCare}
            </p>
          </div>

          {/* Question 3: What should I investigate next? */}
          <div className="rounded-2xl bg-purple-50/60 border border-purple-200/80 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-800">
              <Compass className="w-4 h-4 text-purple-600" />
              <span>3. What should I investigate next?</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {explainingMetric.whatToInvestigate.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-purple-100 shadow-xs">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concept Deep Dive if available */}
          {explainingMetric.conceptDeepDive && (
            <div className="rounded-2xl bg-slate-50 border border-indigo-200 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Accounting Concept Deep Dive</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {explainingMetric.conceptDeepDive}
              </p>
            </div>
          )}
        </div>

        {/* Related Metrics */}
        {explainingMetric.relatedMetrics.length > 0 && (
          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500 block mb-2 font-semibold">Explore Related Metrics:</span>
            <div className="flex flex-wrap gap-2">
              {explainingMetric.relatedMetrics.map((m, i) => (
                <button
                  key={i}
                  onClick={() => explainNumber(m.toLowerCase().replace(/[^a-z]/g, ""), "Explore")}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-xs font-bold text-slate-700 hover:text-indigo-700 flex items-center gap-1 transition-colors shadow-xs cursor-pointer"
                >
                  <span>{m}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
