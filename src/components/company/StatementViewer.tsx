"use client";

import React, { useState } from "react";
import { 
  FileSpreadsheet, 
  HelpCircle, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight,
  SlidersHorizontal 
} from "lucide-react";
import { MultiYearFinancials } from "@/types/financials";
import { formatCurrency, formatPercent, formatFinancialAmount } from "@/lib/utils";
import { useLearning } from "@/context/LearningModeContext";

interface StatementViewerProps {
  financials: MultiYearFinancials;
}

export function StatementViewer({ financials }: StatementViewerProps) {
  const { explainNumber } = useLearning();
  const [activeTab, setActiveTab] = useState<"income" | "balance" | "cashflow" | "ratios">("income");
  const [viewPeriod, setViewPeriod] = useState<"annual" | "quarterly">("annual");

  const { incomeStatements, balanceSheets, cashFlowStatements, quarterlySnapshots, currencySymbol } = financials;
  const years = incomeStatements.map((i) => i.year);

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
              Financial Statements & Key Statements
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {currencySymbol === "₹" ? "Values in ₹ Crores (Cr)" : "Values in Financial Units"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click on any line item or number to open the Three-Question Educational Explainer
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Statement Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab("income")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "income" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Income Statement
            </button>
            <button
              onClick={() => setActiveTab("balance")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "balance" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Balance Sheet
            </button>
            <button
              onClick={() => setActiveTab("cashflow")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "cashflow" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Cash Flow
            </button>
            <button
              onClick={() => setActiveTab("ratios")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === "ratios" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Ratios
            </button>
          </div>

          {/* Period Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setViewPeriod("annual")}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewPeriod === "annual" ? "bg-white text-slate-900 border border-slate-200 shadow-xs" : "text-slate-600"
              }`}
            >
              Annual
            </button>
            <button
              onClick={() => setViewPeriod("quarterly")}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewPeriod === "quarterly" ? "bg-white text-slate-900 border border-slate-200 shadow-xs" : "text-slate-600"
              }`}
            >
              Quarterly
            </button>
          </div>
        </div>
      </div>

      {/* AI Interpretation Hint Banner */}
      <div className="p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between text-xs text-slate-700">
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            {activeTab === "income"
              ? "Always compare Revenue Growth with Operating Cash Flow and Receivables before concluding growth quality is strong."
              : activeTab === "balance"
              ? "Check whether Working Capital is expanding because of cash accumulation or customer receivables delay."
              : activeTab === "cashflow"
              ? "Operating Cash Flow reflects pure bank cash receipts. High OCF funds growth without equity dilution."
              : "Ratios are contextual. Inspect 3-5 year trend trajectory rather than isolated single-period snapshots."}
          </span>
        </span>
      </div>

      {/* Statement Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        {viewPeriod === "annual" ? (
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-sans">
              <tr>
                <th className="p-3.5 sm:p-4 font-bold text-slate-800">Financial Metric</th>
                {years.map((yr) => (
                  <th key={yr} className="p-3.5 sm:p-4 font-bold text-right text-slate-800">
                    FY{yr}
                  </th>
                ))}
                <th className="p-3.5 sm:p-4 font-bold text-right text-indigo-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {activeTab === "income" && (
                <>
                  <TableRow
                    label="Total Revenue (Sales)"
                    metricKey="revenue"
                    values={incomeStatements.map((i) => formatFinancialAmount(i.revenue, currencySymbol))}
                    growth={formatPercent(incomeStatements[0]?.revenueGrowthPercent)}
                    onExplain={() => explainNumber("revenue", formatFinancialAmount(incomeStatements[0]?.revenue, currencySymbol))}
                    isBold
                  />
                  <TableRow
                    label="Revenue Growth YoY"
                    metricKey="revenueGrowth"
                    values={incomeStatements.map((i) => formatPercent(i.revenueGrowthPercent))}
                    onExplain={() => explainNumber("revenueGrowth", formatPercent(incomeStatements[0]?.revenueGrowthPercent))}
                  />
                  <TableRow
                    label="EBITDA"
                    metricKey="ebitda"
                    values={incomeStatements.map((i) => formatFinancialAmount(i.ebitda, currencySymbol))}
                    onExplain={() => explainNumber("ebitda", formatFinancialAmount(incomeStatements[0]?.ebitda, currencySymbol))}
                  />
                  <TableRow
                    label="EBITDA Margin"
                    metricKey="ebitdaMargin"
                    values={incomeStatements.map((i) => `${i.ebitdaMarginPercent.toFixed(1)}%`)}
                    onExplain={() => explainNumber("ebitdaMargin", `${incomeStatements[0]?.ebitdaMarginPercent.toFixed(1)}%`)}
                  />
                  <TableRow
                    label="Operating Profit (EBIT)"
                    metricKey="ebit"
                    values={incomeStatements.map((i) => formatFinancialAmount(i.ebit, currencySymbol))}
                    onExplain={() => explainNumber("ebit", formatFinancialAmount(incomeStatements[0]?.ebit, currencySymbol))}
                  />
                  <TableRow
                    label="Interest Expense"
                    metricKey="interestExpense"
                    values={incomeStatements.map((i) => formatFinancialAmount(i.interestExpense, currencySymbol))}
                    onExplain={() => explainNumber("interestExpense", formatFinancialAmount(incomeStatements[0]?.interestExpense, currencySymbol))}
                  />
                  <TableRow
                    label="Interest Coverage Ratio"
                    metricKey="interestCoverage"
                    values={incomeStatements.map((i) => `${i.interestCoverageRatio.toFixed(1)}x`)}
                    onExplain={() => explainNumber("interestCoverage", `${incomeStatements[0]?.interestCoverageRatio.toFixed(1)}x`)}
                  />
                  <TableRow
                    label="Net Profit (PAT)"
                    metricKey="netProfit"
                    values={incomeStatements.map((i) => formatFinancialAmount(i.netProfit, currencySymbol))}
                    onExplain={() => explainNumber("netProfit", formatFinancialAmount(incomeStatements[0]?.netProfit, currencySymbol))}
                    isBold
                    highlight
                  />
                  <TableRow
                    label="Net Profit Margin"
                    metricKey="netProfitMargin"
                    values={incomeStatements.map((i) => `${i.netProfitMarginPercent.toFixed(1)}%`)}
                    onExplain={() => explainNumber("netProfitMargin", `${incomeStatements[0]?.netProfitMarginPercent.toFixed(1)}%`)}
                  />
                  <TableRow
                    label="Earnings Per Share (EPS)"
                    metricKey="eps"
                    values={incomeStatements.map((i) => formatFinancialAmount(i.eps, currencySymbol, true))}
                    onExplain={() => explainNumber("eps", formatFinancialAmount(incomeStatements[0]?.eps, currencySymbol, true))}
                  />
                </>
              )}

              {activeTab === "balance" && (
                <>
                  <TableRow
                    label="Total Assets"
                    metricKey="totalAssets"
                    values={balanceSheets.map((b) => formatFinancialAmount(b.totalAssets, currencySymbol))}
                    onExplain={() => explainNumber("totalAssets", formatFinancialAmount(balanceSheets[0]?.totalAssets, currencySymbol))}
                    isBold
                  />
                  <TableRow
                    label="Shareholders' Equity"
                    metricKey="equity"
                    values={balanceSheets.map((b) => formatFinancialAmount(b.shareholdersEquity, currencySymbol))}
                    onExplain={() => explainNumber("equity", formatFinancialAmount(balanceSheets[0]?.shareholdersEquity, currencySymbol))}
                  />
                  <TableRow
                    label="Total Debt"
                    metricKey="debt"
                    values={balanceSheets.map((b) => formatFinancialAmount(b.totalDebt, currencySymbol))}
                    onExplain={() => explainNumber("debt", formatFinancialAmount(balanceSheets[0]?.totalDebt, currencySymbol))}
                  />
                  <TableRow
                    label="Cash & Equivalents"
                    metricKey="cash"
                    values={balanceSheets.map((b) => formatFinancialAmount(b.cashAndEquivalents, currencySymbol))}
                    onExplain={() => explainNumber("cash", formatFinancialAmount(balanceSheets[0]?.cashAndEquivalents, currencySymbol))}
                  />
                  <TableRow
                    label="Trade Receivables (Customer Dues)"
                    metricKey="receivables"
                    values={balanceSheets.map((b) => formatFinancialAmount(b.receivables, currencySymbol))}
                    onExplain={() => explainNumber("receivables", formatFinancialAmount(balanceSheets[0]?.receivables, currencySymbol))}
                  />
                  <TableRow
                    label="Working Capital"
                    metricKey="workingCapital"
                    values={balanceSheets.map((b) => formatFinancialAmount(b.workingCapital, currencySymbol))}
                    onExplain={() => explainNumber("workingCapital", formatFinancialAmount(balanceSheets[0]?.workingCapital, currencySymbol))}
                  />
                  <TableRow
                    label="Current Ratio"
                    metricKey="currentRatio"
                    values={balanceSheets.map((b) => `${b.currentRatio.toFixed(2)}x`)}
                    onExplain={() => explainNumber("currentRatio", `${balanceSheets[0]?.currentRatio.toFixed(2)}x`)}
                  />
                  <TableRow
                    label="Debt-to-Equity Ratio"
                    metricKey="debtToEquityRatio"
                    values={balanceSheets.map((b) => `${b.debtToEquityRatio.toFixed(2)}x`)}
                    onExplain={() => explainNumber("debtToEquityRatio", `${balanceSheets[0]?.debtToEquityRatio.toFixed(2)}x`)}
                    isBold
                  />
                </>
              )}

              {activeTab === "cashflow" && (
                <>
                  <TableRow
                    label="Operating Cash Flow (OCF)"
                    metricKey="operatingCashFlow"
                    values={cashFlowStatements.map((c) => formatFinancialAmount(c.operatingCashFlow, currencySymbol))}
                    onExplain={() => explainNumber("operatingCashFlow", formatFinancialAmount(cashFlowStatements[0]?.operatingCashFlow, currencySymbol))}
                    isBold
                    highlight
                  />
                  <TableRow
                    label="Capital Expenditure (Capex)"
                    metricKey="capex"
                    values={cashFlowStatements.map((c) => formatFinancialAmount(c.capitalExpenditure, currencySymbol))}
                    onExplain={() => explainNumber("capex", formatFinancialAmount(cashFlowStatements[0]?.capitalExpenditure, currencySymbol))}
                  />
                  <TableRow
                    label="Free Cash Flow (FCF)"
                    metricKey="freeCashFlow"
                    values={cashFlowStatements.map((c) => formatFinancialAmount(c.freeCashFlow, currencySymbol))}
                    onExplain={() => explainNumber("freeCashFlow", formatFinancialAmount(cashFlowStatements[0]?.freeCashFlow, currencySymbol))}
                    isBold
                  />
                  <TableRow
                    label="Dividends Paid"
                    metricKey="dividends"
                    values={cashFlowStatements.map((c) => formatFinancialAmount(c.dividendsPaid, currencySymbol))}
                    onExplain={() => explainNumber("dividends", formatFinancialAmount(cashFlowStatements[0]?.dividendsPaid, currencySymbol))}
                  />
                </>
              )}

              {activeTab === "ratios" && (
                <>
                  <TableRow
                    label="Return on Equity (ROE)"
                    metricKey="roe"
                    values={balanceSheets.map((b, idx) => {
                      const inc = incomeStatements[idx];
                      const roe = b.shareholdersEquity > 0 && inc ? (inc.netProfit / b.shareholdersEquity) * 100 : 0;
                      return `${roe.toFixed(1)}%`;
                    })}
                    onExplain={() => explainNumber("roe", "ROE")}
                    isBold
                    highlight
                  />
                  <TableRow
                    label="Return on Capital Employed (ROCE)"
                    metricKey="roce"
                    values={balanceSheets.map((b, idx) => {
                      const inc = incomeStatements[idx];
                      const ce = b.totalAssets - b.currentLiabilities;
                      const roce = ce > 0 && inc ? (inc.ebit / ce) * 100 : 0;
                      return `${roce.toFixed(1)}%`;
                    })}
                    onExplain={() => explainNumber("roce", "ROCE")}
                  />
                  <TableRow
                    label="Net Profit Margin"
                    metricKey="netProfitMargin"
                    values={incomeStatements.map((i) => `${i.netProfitMarginPercent.toFixed(1)}%`)}
                    onExplain={() => explainNumber("netProfitMargin", `${incomeStatements[0]?.netProfitMarginPercent.toFixed(1)}%`)}
                  />
                  <TableRow
                    label="Debt-to-Equity Ratio"
                    metricKey="debtToEquityRatio"
                    values={balanceSheets.map((b) => `${b.debtToEquityRatio.toFixed(2)}x`)}
                    onExplain={() => explainNumber("debtToEquityRatio", `${balanceSheets[0]?.debtToEquityRatio.toFixed(2)}x`)}
                  />
                  <TableRow
                    label="Current Ratio"
                    metricKey="currentRatio"
                    values={balanceSheets.map((b) => `${b.currentRatio.toFixed(2)}x`)}
                    onExplain={() => explainNumber("currentRatio", `${balanceSheets[0]?.currentRatio.toFixed(2)}x`)}
                  />
                </>
              )}
            </tbody>
          </table>
        ) : (
          /* Quarterly Snapshots Table */
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="p-3.5 sm:p-4 font-bold text-slate-800">Quarter</th>
                <th className="p-3.5 sm:p-4 font-bold text-right text-slate-800">Revenue</th>
                <th className="p-3.5 sm:p-4 font-bold text-right text-slate-800">YoY Rev Growth</th>
                <th className="p-3.5 sm:p-4 font-bold text-right text-slate-800">Net Profit</th>
                <th className="p-3.5 sm:p-4 font-bold text-right text-slate-800">EBITDA Margin</th>
                <th className="p-3.5 sm:p-4 font-bold text-right text-indigo-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quarterlySnapshots.map((q, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">{q.quarter}</td>
                  <td className="p-3.5 sm:p-4 text-right text-slate-700 font-semibold">{formatFinancialAmount(q.revenue, currencySymbol)}</td>
                  <td className="p-3.5 sm:p-4 text-right text-emerald-700 font-bold">{formatPercent(q.yoyRevenueGrowth)}</td>
                  <td className="p-3.5 sm:p-4 text-right text-emerald-700 font-bold">{formatFinancialAmount(q.netProfit, currencySymbol)}</td>
                  <td className="p-3.5 sm:p-4 text-right text-slate-700 font-semibold">{q.ebitdaMarginPercent.toFixed(1)}%</td>
                  <td className="p-3.5 sm:p-4 text-right">
                    <button
                      onClick={() => explainNumber("quarterlyRevenue", formatFinancialAmount(q.revenue, currencySymbol))}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                    >
                      Explain →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

function TableRow({
  label,
  metricKey,
  values,
  growth,
  onExplain,
  isBold = false,
  highlight = false,
}: {
  label: string;
  metricKey: string;
  values: (string | number)[];
  growth?: string;
  onExplain: () => void;
  isBold?: boolean;
  highlight?: boolean;
}) {
  return (
    <tr
      onClick={onExplain}
      className={`hover:bg-indigo-50/40 cursor-pointer transition-colors group ${
        highlight ? "bg-indigo-50/20" : ""
      }`}
    >
      <td className={`p-3.5 sm:p-4 flex items-center justify-between gap-2 ${
        isBold ? "font-bold text-slate-900" : "font-medium text-slate-700"
      }`}>
        <span className="group-hover:text-indigo-700 transition-colors">{label}</span>
        {growth && (
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
            {growth}
          </span>
        )}
      </td>
      {values.map((val, idx) => (
        <td
          key={idx}
          className={`p-3.5 sm:p-4 text-right ${
            idx === 0 ? "text-slate-900 font-bold" : "text-slate-700"
          } ${isBold ? "font-bold" : ""}`}
        >
          {val}
        </td>
      ))}
      <td className="p-3.5 sm:p-4 text-right">
        <span className="text-xs text-indigo-600 opacity-60 group-hover:opacity-100 flex items-center justify-end gap-1 font-bold">
          <span>Explain</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </td>
    </tr>
  );
}
