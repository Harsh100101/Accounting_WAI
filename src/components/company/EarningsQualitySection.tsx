"use client";

import React from "react";
import { 
  ShieldCheck, 
  HelpCircle, 
  TrendingUp, 
  ArrowRight, 
  AlertCircle, 
  Sparkles, 
  Layers 
} from "lucide-react";
import { MultiYearFinancials } from "@/types/financials";
import { formatCurrency, formatPercent, formatFinancialAmount } from "@/lib/utils";
import { useLearning } from "@/context/LearningModeContext";

interface EarningsQualityProps {
  financials: MultiYearFinancials;
}

export function EarningsQualitySection({ financials }: EarningsQualityProps) {
  const { explainNumber } = useLearning();
  const latestInc = financials.incomeStatements[0];
  const latestCF = financials.cashFlowStatements[0];
  const { currencySymbol } = financials;

  const ocfToProfit = latestInc.netProfit > 0 
    ? (latestCF.operatingCashFlow / latestInc.netProfit) * 100 
    : 100;
  const fcfToProfit = latestInc.netProfit > 0 
    ? (latestCF.freeCashFlow / latestInc.netProfit) * 100 
    : 100;

  const rating = ocfToProfit >= 95 ? "Strong" : ocfToProfit >= 80 ? "Moderate" : ocfToProfit >= 60 ? "Watch" : "Concern";

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              Earnings Quality & Cash Flow Corroboration
            </h2>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              rating === "Strong"
                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                : rating === "Moderate"
                ? "bg-indigo-100 text-indigo-800 border-indigo-300"
                : "bg-amber-100 text-amber-800 border-amber-300"
            }`}>
              Rating: {rating}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Verifying whether reported accounting net profits are converting into actual operating bank cash receipts
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Accrual vs Cash Engine
        </span>
      </div>

      {/* Conversion Flow Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Reported Net Profit */}
        <div 
          onClick={() => explainNumber("netProfit", formatFinancialAmount(latestInc.netProfit, currencySymbol))}
          className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 cursor-pointer transition-all space-y-2 shadow-xs"
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            1. Reported Net Profit (PAT)
          </span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
            {formatFinancialAmount(latestInc.netProfit, currencySymbol)}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Accounting bottom-line recorded on accrual basis in FY{latestInc.year}.
          </p>
        </div>

        {/* Card 2: Operating Cash Flow */}
        <div 
          onClick={() => explainNumber("operatingCashFlow", formatFinancialAmount(latestCF.operatingCashFlow, currencySymbol))}
          className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 cursor-pointer transition-all space-y-2 shadow-xs"
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            2. Operating Cash Flow (OCF)
          </span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-700 font-sans">
            {formatFinancialAmount(latestCF.operatingCashFlow, currencySymbol)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-bold">
            <span>{ocfToProfit.toFixed(0)}% Conversion Rate</span>
          </div>
        </div>

        {/* Card 3: Free Cash Flow */}
        <div 
          onClick={() => explainNumber("freeCashFlow", formatFinancialAmount(latestCF.freeCashFlow, currencySymbol))}
          className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 cursor-pointer transition-all space-y-2 shadow-xs"
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            3. Free Cash Flow (FCF)
          </span>
          <div className="text-xl sm:text-2xl font-bold text-indigo-700 font-sans">
            {formatFinancialAmount(latestCF.freeCashFlow, currencySymbol)}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Cash remaining after Capex of {formatFinancialAmount(latestCF.capitalExpenditure, currencySymbol)}.
          </p>
        </div>
      </div>

      {/* Plain Language Earnings Quality Evaluation */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Accounting Quality Diagnostic</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {ocfToProfit >= 90
            ? `Reported Net Profit (${formatFinancialAmount(latestInc.netProfit, currencySymbol)}) is strongly backed by Operating Cash Flow (${formatFinancialAmount(latestCF.operatingCashFlow, currencySymbol)}, ${ocfToProfit.toFixed(0)}% conversion). This indicates that sales are being collected on schedule with low accrual distortion.`
            : `Operating Cash Flow (${formatFinancialAmount(latestCF.operatingCashFlow, currencySymbol)}) trails reported profit (${formatFinancialAmount(latestInc.netProfit, currencySymbol)}) at a ${ocfToProfit.toFixed(0)}% conversion pace. This divergence can stem from customer credit expansion, inventory stockpiling, or timing differences in vendor payments.`}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-200">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Note: Cash flow divergences can arise from healthy growth reinvestment. Always inspect working capital schedules.</span>
        </div>
      </div>
    </section>
  );
}
