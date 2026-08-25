"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Scale, 
  Bookmark, 
  ChevronRight, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Brain,
  Compass,
  ArrowRight
} from "lucide-react";
import { HeroPhilosophy } from "@/components/home/HeroPhilosophy";
import { MarketOverview } from "@/components/home/MarketOverview";
import { CommandPalette } from "@/components/search/CommandPalette";
import { DEMO_COMPANIES, DEMO_MULTI_YEAR_FINANCIALS } from "@/lib/providers/demoData";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { generateHealthScorecard } from "@/lib/engine/healthScorecardEngine";
import { useLearning } from "@/context/LearningModeContext";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { addToCompare, toggleWatchlist, isInWatchlist } = useLearning();

  return (
    <div className="space-y-12">
      {/* Hero & Three-Question Framework Showcase */}
      <HeroPhilosophy onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Live Market Overview (Indian & Global) */}
      <MarketOverview />

      {/* Featured Companies Intelligence Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              Featured Companies & Intelligence Lenses
            </h2>
            <p className="text-xs text-slate-500">
              Select any company to explore plain-language business breakdowns, 5-year financial stories, and anomaly checks
            </p>
          </div>

          <Link
            href="/explore"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors"
          >
            <span>View All Companies</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_COMPANIES.slice(0, 6).map((company) => {
            const fin = DEMO_MULTI_YEAR_FINANCIALS[company.ticker];
            const health = fin ? generateHealthScorecard(fin, company.sector) : null;
            const isPositive = company.changePercent >= 0;
            const inWatch = isInWatchlist(company.ticker);

            return (
              <div
                key={company.id}
                className="p-5 rounded-2xl bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group relative overflow-hidden"
              >
                <div className="space-y-3">
                  {/* Top Tags */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {company.exchange}: {company.ticker}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {company.country}
                      </span>
                    </div>

                    {health && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <Activity className="w-2.5 h-2.5 text-emerald-600" />
                        {health.overallHealthRating} Health
                      </span>
                    )}
                  </div>

                  {/* Company Name & Sector */}
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                      {company.displayName}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{company.sectorName} • {company.industry}</p>
                  </div>

                  {/* Price & Metrics */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 font-sans">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">Live Price</span>
                      <span className="text-sm font-bold text-slate-900">
                        {formatCurrency(company.currentPrice, company.currency, false)}
                      </span>
                      <div className={`text-[11px] font-bold flex items-center gap-0.5 mt-0.5 ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {formatPercent(company.changePercent)}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">Market Cap</span>
                      <span className="text-xs font-bold text-slate-800 block mt-0.5">
                        {formatCurrency(company.marketCap, company.currency, true)}
                      </span>
                      <span className="text-[10px] text-indigo-600 font-semibold block mt-0.5">
                        P/E: {company.peRatio ? `${company.peRatio.toFixed(1)}x` : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/company/${company.ticker}`}
                    className="flex-1 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-all"
                  >
                    <span>Open Company Lens</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    title="Add to Compare"
                    onClick={() => addToCompare(company.ticker)}
                    className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
                  >
                    <Scale className="w-4 h-4" />
                  </button>

                  <button
                    title="Watchlist"
                    onClick={() => toggleWatchlist(company.ticker)}
                    className={`p-2 rounded-xl border transition-colors shadow-xs ${
                      inWatch
                        ? "bg-amber-100 border-amber-300 text-amber-800"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Signature Features Showcase Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-50 via-slate-50 to-purple-50 border border-indigo-100 p-8 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <Sparkles className="w-4 h-4" />
            <span>Signature Differentiating Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How We Transform Investors From Number-Watchers To Analytical Thinkers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase block">1. Financial Story</span>
            <h3 className="text-sm font-bold text-slate-900">Multi-Year Trajectory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synthesizes 5 years of Revenue, Profit, Cash Flow, and Debt into a continuous narrative.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase block">2. Contradictions</span>
            <h3 className="text-sm font-bold text-slate-900">Cross-Statement Detector</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detects when Revenue rises while Cash Flow drops or Debt drives high ROE.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-purple-600 uppercase block">3. Thesis Challenger</span>
            <h3 className="text-sm font-bold text-slate-900">Blindspot Stress-Testing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Write your investment hypothesis and let AI challenge your confirmation bias.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase block">4. Learning Mode</span>
            <h3 className="text-sm font-bold text-slate-900">3 Depth Levels</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Switch effortlessly between Beginner, Intermediate, and Advanced accounting depth.
            </p>
          </div>
        </div>
      </section>

      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
