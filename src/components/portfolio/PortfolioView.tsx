"use client";

import React from "react";
import Link from "next/link";
import { 
  Bookmark, 
  Trash2, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Activity, 
  Plus 
} from "lucide-react";
import { DEMO_COMPANIES, DEMO_MULTI_YEAR_FINANCIALS } from "@/lib/providers/demoData";
import { useLearning } from "@/context/LearningModeContext";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { generateHealthScorecard } from "@/lib/engine/healthScorecardEngine";

interface PortfolioViewProps {
  onOpenSearch: () => void;
}

export function PortfolioView({ onOpenSearch }: PortfolioViewProps) {
  const { watchlist, toggleWatchlist } = useLearning();

  const watchlistCompanies = DEMO_COMPANIES.filter((c) => watchlist.includes(c.ticker));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-indigo-600" />
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                My Watchlist & Financial Health Tracker
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {watchlistCompanies.length} Companies
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Track fundamental business health, cash flow quality, and emerging risks across your watch set
            </p>
          </div>

          <button
            onClick={onOpenSearch}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Companies</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>This tracker monitors operational statements, not price speculation or buy/sell calls.</span>
        </div>
      </div>

      {/* Watchlist Table */}
      {watchlistCompanies.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center space-y-4 shadow-xs">
          <Bookmark className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Your Watchlist is Empty</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Search for companies like TCS, Reliance, Apple, or HDFC Bank and add them to monitor their financial health and accounting trends.
          </p>
          <button
            onClick={onOpenSearch}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Search Companies Now
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="p-3.5 sm:p-4 font-bold text-slate-800">Company</th>
                  <th className="p-3.5 sm:p-4 font-bold text-right text-slate-800">Price</th>
                  <th className="p-3.5 sm:p-4 font-bold text-right text-slate-800">Change</th>
                  <th className="p-3.5 sm:p-4 font-bold text-center text-slate-800">Health Score</th>
                  <th className="p-3.5 sm:p-4 font-bold text-right text-slate-800">P/E</th>
                  <th className="p-3.5 sm:p-4 font-bold text-right text-indigo-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {watchlistCompanies.map((c) => {
                  const fin = DEMO_MULTI_YEAR_FINANCIALS[c.ticker];
                  const health = fin ? generateHealthScorecard(fin, c.sector) : null;
                  const isPositive = c.changePercent >= 0;

                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 sm:p-4">
                        <Link href={`/company/${c.ticker}`} className="group block">
                          <span className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                            {c.displayName}
                          </span>
                          <span className="text-[11px] text-slate-500 block font-normal">
                            {c.exchange}: {c.ticker} • {c.sectorName}
                          </span>
                        </Link>
                      </td>
                      <td className="p-3.5 sm:p-4 text-right font-bold text-slate-900">
                        {formatCurrency(c.currentPrice, c.currency, false)}
                      </td>
                      <td className={`p-3.5 sm:p-4 text-right font-bold ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                        <div className="flex items-center justify-end gap-0.5">
                          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          {formatPercent(c.changePercent)}
                        </div>
                      </td>
                      <td className="p-3.5 sm:p-4 text-center">
                        {health ? (
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                            health.overallHealthRating === "Strong"
                              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                              : "bg-indigo-100 text-indigo-800 border-indigo-300"
                          }`}>
                            <Activity className="w-3 h-3" />
                            {health.overallHealthRating}
                          </span>
                        ) : (
                          <span className="text-slate-400">N/A</span>
                        )}
                      </td>
                      <td className="p-3.5 sm:p-4 text-right font-bold text-slate-800">
                        {c.peRatio ? `${c.peRatio.toFixed(1)}x` : "N/A"}
                      </td>
                      <td className="p-3.5 sm:p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/company/${c.ticker}`}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-bold transition-colors shadow-xs"
                          >
                            Open Lens →
                          </Link>
                          <button
                            title="Remove"
                            onClick={() => toggleWatchlist(c.ticker)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
