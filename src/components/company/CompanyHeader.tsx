"use client";

import React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Scale, 
  Bookmark, 
  Bot, 
  Download, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Sparkles 
} from "lucide-react";
import { Company } from "@/types/financials";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { useLearning } from "@/context/LearningModeContext";

import { PriceChart } from "./PriceChart";

interface CompanyHeaderProps {
  company: Company;
  onOpenTutor: () => void;
  onOpenThesis: () => void;
}

export function CompanyHeader({ company, onOpenTutor, onOpenThesis }: CompanyHeaderProps) {
  const { isInWatchlist, toggleWatchlist, addToCompare, compareList } = useLearning();
  const inWatch = isInWatchlist(company.ticker);
  const inCompare = compareList.includes(company.ticker);
  const isPositive = company.changePercent >= 0;

  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Top row: Company tags & Action buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              {company.exchange}: {company.ticker}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {company.country}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              {company.sectorName}
            </span>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              {company.isDemoData ? "DEMO DATA" : "LIVE FEED"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {company.legalName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{company.industry}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => toggleWatchlist(company.ticker)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all shadow-xs ${
              inWatch
                ? "bg-amber-100 border-amber-300 text-amber-900"
                : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{inWatch ? "In Watchlist" : "Watchlist"}</span>
          </button>

          <button
            onClick={() => addToCompare(company.ticker)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all shadow-xs ${
              inCompare
                ? "bg-indigo-50 border-indigo-300 text-indigo-800"
                : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{inCompare ? "In Compare" : "Compare"}</span>
          </button>

          <button
            onClick={onOpenThesis}
            className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>My Thesis</span>
          </button>

          <button
            onClick={onOpenTutor}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask AI Tutor</span>
          </button>
        </div>
      </div>

      {/* Embedded Interactive Recharts Price Chart */}
      <PriceChart
        ticker={company.ticker}
        currency={company.currency}
        currencySymbol={company.currencySymbol}
        currentPrice={company.currentPrice}
      />

      {/* Bottom row: Price, Market Cap, 52W Range, Status */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 pt-4 border-t border-slate-100">
        {/* Price & Daily Change */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Live Price</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 font-sans">
            {formatCurrency(company.currentPrice, company.currency, false)}
          </div>
          <div className={`text-xs font-bold flex items-center gap-1 mt-0.5 ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {formatPercent(company.changePercent)} ({company.changeValue >= 0 ? `+${company.changeValue.toFixed(2)}` : company.changeValue.toFixed(2)})
          </div>
        </div>

        {/* Market Cap */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Market Capitalization</span>
          <div className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-sans">
            {formatCurrency(company.marketCap, company.currency, true)}
          </div>
          <span className="text-[11px] text-slate-500">Total company equity value</span>
        </div>

        {/* 52-Week Range */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">52-Week Range</span>
          <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 font-sans">
            {formatCurrency(company.low52Week, company.currency, false)} - {formatCurrency(company.high52Week, company.currency, false)}
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full"
              style={{
                width: `${Math.min(100, Math.max(0, ((company.currentPrice - company.low52Week) / (company.high52Week - company.low52Week || 1)) * 100))}%`
              }}
            ></div>
          </div>
        </div>

        {/* Valuation (P/E & P/B) */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Valuation Multiples</span>
          <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1 font-sans">
            P/E: <span className="text-indigo-600 font-bold">{company.peRatio ? `${company.peRatio.toFixed(1)}x` : "N/A"}</span>
          </div>
          <div className="text-xs text-slate-500">
            P/B: {company.pbRatio ? `${company.pbRatio.toFixed(1)}x` : "N/A"} {company.dividendYield ? `• Div: ${company.dividendYield}%` : ""}
          </div>
        </div>

        {/* Freshness & Status */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Data Source & Status</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-800">{company.marketStatus}</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5 truncate">{company.dataSource}</p>
          <span className="text-[9px] text-slate-400 block">{company.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
