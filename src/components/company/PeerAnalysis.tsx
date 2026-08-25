"use client";

import React from "react";
import Link from "next/link";
import { 
  Users, 
  Scale, 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  TrendingDown 
} from "lucide-react";
import { Company } from "@/types/financials";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { useLearning } from "@/context/LearningModeContext";

interface PeerAnalysisProps {
  currentCompany: Company;
  peerCompanies: Company[];
}

export function PeerAnalysis({ currentCompany, peerCompanies }: PeerAnalysisProps) {
  const { addToCompare } = useLearning();

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Industry Peer Landscape
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {currentCompany.sectorName}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare operational metrics and pricing power against direct sector peers
          </p>
        </div>

        <Link
          href={`/compare?tickers=${[currentCompany.ticker, ...peerCompanies.map((p) => p.ticker)].slice(0, 3).join(",")}`}
          className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Launch Full Multi-Peer Comparison</span>
        </Link>
      </div>

      {/* Peer Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {peerCompanies.map((peer) => {
          const isPositive = peer.changePercent >= 0;

          return (
            <div
              key={peer.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-3 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-slate-900 text-sm truncate">{peer.displayName}</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-white text-slate-700 border border-slate-200">
                    {peer.ticker}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{peer.industry}</p>
              </div>

              {/* Price & P/E */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-sans">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase block">Price</span>
                  <span className="font-bold text-slate-900">{formatCurrency(peer.currentPrice, peer.currency, false)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase block">P/E Multiple</span>
                  <span className="font-bold text-indigo-700">{peer.peRatio ? `${peer.peRatio.toFixed(1)}x` : "N/A"}</span>
                </div>
              </div>

              {/* Quick Action Links */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <Link
                  href={`/company/${peer.ticker}`}
                  className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 transition-colors"
                >
                  <span>View Lens</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>

                <button
                  onClick={() => addToCompare(peer.ticker)}
                  className="px-2 py-0.5 rounded-lg bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-[11px] font-bold transition-colors shadow-xs"
                >
                  + Add to Compare
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
