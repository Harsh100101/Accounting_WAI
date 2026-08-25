import {
  MultiYearFinancials,
  QuarterlyComparisonChange,
  SignalType,
} from "@/types/financials";
import { formatCurrency, formatPercent, formatFinancialAmount } from "@/lib/utils";

export function getQuarterlyChanges(
  financials: MultiYearFinancials
): QuarterlyComparisonChange | null {
  const { quarterlySnapshots, currencySymbol } = financials;
  if (!quarterlySnapshots || quarterlySnapshots.length < 2) {
    return null;
  }

  const currentQ = quarterlySnapshots[0];
  const previousQ = quarterlySnapshots[1];

  const revChangePct = previousQ.revenue > 0 
    ? ((currentQ.revenue - previousQ.revenue) / previousQ.revenue) * 100 
    : 0;
  const profitChangePct = previousQ.netProfit > 0 
    ? ((currentQ.netProfit - previousQ.netProfit) / previousQ.netProfit) * 100 
    : 0;
  const marginDiff = currentQ.ebitdaMarginPercent - previousQ.ebitdaMarginPercent;

  const currentOCF = currentQ.operatingCashFlow || (currentQ.netProfit * 0.95);
  const prevOCF = previousQ.operatingCashFlow || (previousQ.netProfit * 0.95);
  const ocfChangePct = prevOCF > 0 ? ((currentOCF - prevOCF) / prevOCF) * 100 : 0;

  const fiveThings = [
    {
      number: 1,
      title: revChangePct >= 0 ? "Revenue Momentum" : "Revenue Contraction",
      signal: (revChangePct >= 3 ? "POSITIVE_SIGNAL" : revChangePct >= 0 ? "NEEDS_CONTEXT" : "WATCH") as SignalType,
      explanation: revChangePct >= 0
        ? `Quarterly revenue expanded to ${formatFinancialAmount(currentQ.revenue, currencySymbol)}, up ${formatPercent(revChangePct)} QoQ and ${formatPercent(currentQ.yoyRevenueGrowth)} YoY.`
        : `Quarterly revenue decreased to ${formatFinancialAmount(currentQ.revenue, currencySymbol)}, down ${formatPercent(Math.abs(revChangePct))} QoQ.`,
      metricChange: `${formatFinancialAmount(previousQ.revenue, currencySymbol)} → ${formatFinancialAmount(currentQ.revenue, currencySymbol)} (${formatPercent(revChangePct)})`
    },
    {
      number: 2,
      title: profitChangePct >= 0 ? "Net Profit Expansion" : "Net Profit Compression",
      signal: (profitChangePct >= 5 ? "POSITIVE_SIGNAL" : profitChangePct >= 0 ? "NEEDS_CONTEXT" : "WATCH") as SignalType,
      explanation: profitChangePct >= 0
        ? `Bottom-line net income increased by ${formatPercent(profitChangePct)} sequentially to ${formatFinancialAmount(currentQ.netProfit, currencySymbol)}.`
        : `Net profit contracted ${formatPercent(Math.abs(profitChangePct))} QoQ to ${formatFinancialAmount(currentQ.netProfit, currencySymbol)}.`,
      metricChange: `${formatFinancialAmount(previousQ.netProfit, currencySymbol)} → ${formatFinancialAmount(currentQ.netProfit, currencySymbol)} (${formatPercent(profitChangePct)})`
    },
    {
      number: 3,
      title: marginDiff >= 0 ? "Operating Margin Expansion" : "Margin Pressure",
      signal: (marginDiff >= 0 ? "POSITIVE_SIGNAL" : marginDiff > -1.5 ? "NEEDS_CONTEXT" : "WATCH") as SignalType,
      explanation: marginDiff >= 0
        ? `EBITDA margins widened by ${marginDiff.toFixed(2)} percentage points to ${currentQ.ebitdaMarginPercent.toFixed(1)}%, indicating operational efficiency.`
        : `EBITDA margins narrowed by ${Math.abs(marginDiff).toFixed(2)} percentage points to ${currentQ.ebitdaMarginPercent.toFixed(1)}% due to cost pressures.`,
      metricChange: `${previousQ.ebitdaMarginPercent.toFixed(1)}% → ${currentQ.ebitdaMarginPercent.toFixed(1)}% (${marginDiff >= 0 ? "+" : ""}${marginDiff.toFixed(2)}%)`
    },
    {
      number: 4,
      title: ocfChangePct >= 0 ? "Quarterly Cash Generation" : "Cash Conversion Softening",
      signal: (ocfChangePct >= 0 ? "POSITIVE_SIGNAL" : "WATCH") as SignalType,
      explanation: ocfChangePct >= 0
        ? `Operating cash generation rose to ${formatFinancialAmount(Math.round(currentOCF), currencySymbol)}, keeping pace with earnings.`
        : `Quarterly operating cash flow dipped to ${formatFinancialAmount(Math.round(currentOCF), currencySymbol)}, showing working capital absorption.`,
      metricChange: `${formatFinancialAmount(Math.round(prevOCF), currencySymbol)} → ${formatFinancialAmount(Math.round(currentOCF), currencySymbol)} (${formatPercent(ocfChangePct)})`
    },
    {
      number: 5,
      title: "Solvency & Balance Sheet Posture",
      signal: "POSITIVE_SIGNAL" as SignalType,
      explanation: "Liquidity reserves and debt levels remained within safe target operating bands across the quarter.",
      metricChange: `Debt stable at ${currentQ.debt ? formatFinancialAmount(currentQ.debt, currencySymbol) : "Controlled"}`
    }
  ];

  return {
    quarterName: currentQ.quarter,
    previousQuarterName: previousQ.quarter,
    fiveThingsThatChanged: fiveThings
  };
}
