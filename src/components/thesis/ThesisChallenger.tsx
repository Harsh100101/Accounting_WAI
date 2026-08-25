"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Target, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Brain, 
  Send, 
  RotateCcw,
  ShieldCheck
} from "lucide-react";
import { Company, MultiYearFinancials, ThesisChallengeResponse, BiasCheckResult } from "@/types/financials";
import { challengeInvestmentThesis, performInvestorBiasCheck } from "@/lib/engine/thesisEngine";
import confetti from "canvas-confetti";

interface ThesisChallengerProps {
  company: Company;
  financials: MultiYearFinancials;
}

export function ThesisChallenger({ company, financials }: ThesisChallengerProps) {
  const [thesisInput, setThesisInput] = useState("");
  const [thesisResult, setThesisResult] = useState<ThesisChallengeResponse | null>(null);
  
  const [initialView, setInitialView] = useState<"Bullish" | "Neutral" | "Bearish" | "I don't know" | null>(null);
  const [biasResult, setBiasResult] = useState<BiasCheckResult | null>(null);

  const handleChallenge = () => {
    if (!thesisInput.trim()) return;
    const res = challengeInvestmentThesis(thesisInput, company, financials);
    setThesisResult(res);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.85 } });
    } catch (e) {}
  };

  const handleBiasCheck = (view: "Bullish" | "Neutral" | "Bearish" | "I don't know") => {
    setInitialView(view);
    const res = performInvestorBiasCheck(view, financials);
    setBiasResult(res);
  };

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
      {/* Title */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Thesis Challenger & Investor Bias Check
          </h2>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Critical Thinking Engine
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Formulate your investment reasoning and let AI stress-test your assumptions against actual accounting data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Feature 1: My Investment Thesis */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <Target className="w-4 h-4" />
            <span>1. Write &quot;My Investment Thesis&quot;</span>
          </div>

          <div className="space-y-2">
            <textarea
              rows={4}
              placeholder={`Example: I think ${company.displayName} is attractive because of its rapid revenue growth, high ROE, and dominant market position...`}
              value={thesisInput}
              onChange={(e) => setThesisInput(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors leading-relaxed"
            />

            <div className="flex items-center justify-between">
              <button
                onClick={() => setThesisInput(`I like ${company.displayName} because of its steady 5-year revenue expansion, strong operating margins, and healthy cash generation.`)}
                className="text-[11px] text-slate-500 hover:text-indigo-600 underline font-medium"
              >
                Insert sample thesis
              </button>

              <button
                onClick={handleChallenge}
                disabled={!thesisInput.trim()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Challenge My Thesis</span>
              </button>
            </div>
          </div>

          {/* Thesis Result Breakdown */}
          {thesisResult && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-indigo-200 space-y-4 animate-in fade-in duration-200 shadow-xs">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                <span className="text-xs font-bold text-slate-700">Thesis Assessment:</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                  {thesisResult.thesisStatus}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {thesisResult.thesisSummary}
              </p>

              {/* Critical Questions Challenging Thesis */}
              {thesisResult.criticalQuestionsChallengingThesis.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                    Critical Blindspots to Investigate:
                  </span>
                  <div className="space-y-2">
                    {thesisResult.criticalQuestionsChallengingThesis.map((cq, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border border-amber-200 space-y-1 shadow-xs">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span className="text-xs font-bold text-slate-900">{cq.question}</span>
                        </div>
                        <span className="text-[11px] font-bold text-indigo-700 block pl-5">
                          Evidence: {cq.financialDataPoint}
                        </span>
                        <p className="text-[11px] text-slate-600 pl-5 leading-relaxed">
                          {cq.whyThisMatters}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Checklist */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <span className="text-[11px] font-bold uppercase text-slate-500 block">
                  Fundamental Thesis Checklist:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {thesisResult.checklistItems.map((chk, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] flex items-center justify-between shadow-xs">
                      <span className="text-slate-700 font-semibold">{chk.topic}</span>
                      <span className={`font-bold ${
                        chk.status.includes("Strong") ? "text-emerald-700" : chk.status.includes("Mixed") ? "text-amber-700" : "text-rose-700"
                      }`}>
                        {chk.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Feature 2: Investor Bias Check */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            <ShieldCheck className="w-4 h-4" />
            <span>2. Investor Confirmation Bias Check</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
            <span className="text-xs text-slate-700 font-semibold block">
              What was your preliminary view on {company.displayName} before looking at the financials?
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["Bullish", "Neutral", "Bearish", "I don't know"] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => handleBiasCheck(view)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-xs ${
                    initialView === view
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                      : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Bias Result Feedback */}
          {biasResult && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-purple-200 space-y-4 animate-in fade-in duration-200 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="text-xs font-bold text-slate-800">Initial View: {biasResult.userInitialView}</span>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-emerald-700">{biasResult.bullishEvidenceCount} Supporting</span>
                  <span>•</span>
                  <span className="text-amber-700">{biasResult.bearishOrWatchEvidenceCount} Watch Points</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {biasResult.biasAnalysisMessage}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    Supporting Data Facts:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {biasResult.groundedFactsFor.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                    Counter / Caution Points:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {biasResult.groundedFactsAgainst.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 italic">
                {biasResult.learningTakeaway}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
