"use client";

import React, { useState } from "react";
import { 
  Building2, 
  DollarSign, 
  PieChart, 
  Globe, 
  AlertCircle, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle 
} from "lucide-react";
import { CompanyProfile } from "@/types/financials";
import { useLearning } from "@/context/LearningModeContext";

interface BusinessModelExplainerProps {
  profile: CompanyProfile;
}

export function BusinessModelExplainer({ profile }: BusinessModelExplainerProps) {
  const { learningMode } = useLearning();
  const [explainLikeImNew, setExplainLikeImNew] = useState(false);

  const plainOverview = explainLikeImNew
    ? profile.plainLanguageOverview.beginner
    : profile.plainLanguageOverview[learningMode] || profile.plainLanguageOverview.beginner;

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Title & Beginner Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            What Does {profile.company.displayName} Actually Do?
          </h2>
          <p className="text-xs text-slate-500">Core business model, revenue streams, and major operating dependencies</p>
        </div>

        <button
          onClick={() => setExplainLikeImNew(!explainLikeImNew)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all shadow-xs ${
            explainLikeImNew
              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
              : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Explain like I&apos;m new to investing</span>
        </button>
      </div>

      {/* Plain Language Summary */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Executive Summary & Business Overview</span>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {plainOverview}
        </p>
      </div>

      {/* Grid: How it makes money & Business Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: How Company Makes Money */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <DollarSign className="w-4 h-4" />
            <span>How This Company Makes Money</span>
          </div>
          <div className="space-y-2">
            {profile.howItMakesMoney.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Revenue by Business Segment */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <PieChart className="w-4 h-4" />
            <span>Revenue Breakdown by Business Segment</span>
          </div>
          <div className="space-y-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
            {profile.businessSegments.map((seg, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{seg.name}</span>
                  <span className="font-bold text-indigo-700">{seg.revenueSharePercent}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-brand-600 to-indigo-600 h-full rounded-full"
                    style={{ width: `${seg.revenueSharePercent}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">{seg.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Geographic Exposure & Major Dependencies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        {/* Geographic Exposure */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
            <Globe className="w-4 h-4" />
            <span>Geographic Revenue Exposure</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {profile.geographicExposure.map((geo, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium truncate mr-2">{geo.region}</span>
                <span className="text-xs font-bold text-blue-700">{geo.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Major Dependencies & Risk Factors */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
            <AlertCircle className="w-4 h-4" />
            <span>Key Dependencies to Watch</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
            {profile.majorDependencies.map((dep, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-amber-600 font-bold">•</span>
                <span>{dep}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
