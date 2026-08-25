"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, Clock, Globe, ShieldCheck } from "lucide-react";
import { DEMO_INDICES } from "@/lib/providers/demoData";
import { formatNumber, formatPercent } from "@/lib/utils";

export function MarketOverview() {
  const [selectedRegion, setSelectedRegion] = useState<"ALL" | "INDIA" | "GLOBAL">("ALL");

  const filteredIndices = DEMO_INDICES.filter((idx) => {
    if (selectedRegion === "ALL") return true;
    return idx.region === selectedRegion;
  });

  return (
    <section className="space-y-4">
      {/* Header & Region Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              Market Overview
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Live Data
            </span>
          </div>
          <p className="text-xs text-slate-500">Current benchmarks across Indian and Global exchanges</p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(["ALL", "INDIA", "GLOBAL"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedRegion === r
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {r === "ALL" ? "All Markets" : r === "INDIA" ? "Indian Markets" : "Global Markets"}
            </button>
          ))}
        </div>
      </div>

      {/* Index Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {filteredIndices.map((idx) => {
          const isPositive = idx.changePercent >= 0;
          return (
            <div
              key={idx.symbol}
              className="p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between group relative overflow-hidden shadow-xs hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-indigo-600 truncate">
                    {idx.name}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                    {idx.region}
                  </span>
                </div>
                <div className="font-sans font-bold text-sm sm:text-base text-slate-900">
                  {formatNumber(idx.currentValue)}
                </div>
              </div>

              {/* Change & Mini Trend */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-sans">
                <span className={`flex items-center gap-0.5 font-bold ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {formatPercent(idx.changePercent)}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {isPositive ? `+${idx.changeValue.toFixed(1)}` : idx.changeValue.toFixed(1)}
                </span>
              </div>

              {/* Timestamp */}
              <div className="mt-1 flex items-center gap-1 text-[9px] text-slate-400">
                <Clock className="w-2.5 h-2.5" />
                <span>{idx.lastUpdated}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
