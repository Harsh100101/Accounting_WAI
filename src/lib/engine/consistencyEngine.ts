import {
  MultiYearFinancials,
  ContradictionAnomaly,
  SignalType,
} from "@/types/financials";
import { formatCurrency, formatPercent, formatFinancialAmount } from "@/lib/utils";

export function analyzeThreeStatementConsistency(
  financials: MultiYearFinancials
): ContradictionAnomaly[] {
  const anomalies: ContradictionAnomaly[] = [];
  const { incomeStatements, balanceSheets, cashFlowStatements, currencySymbol } = financials;

  if (incomeStatements.length < 2 || balanceSheets.length < 2 || cashFlowStatements.length < 2) {
    return anomalies;
  }

  const latestInc = incomeStatements[0];
  const prevInc = incomeStatements[1];
  const latestBal = balanceSheets[0];
  const prevBal = balanceSheets[1];
  const latestCF = cashFlowStatements[0];
  const prevCF = cashFlowStatements[1];

  // 1. Growth-Cash Mismatch: Revenue ↑ + Receivables ↑↑ + OCF ↓
  const revGrowth = latestInc.revenueGrowthPercent;
  const recGrowth = prevBal.receivables > 0 
    ? ((latestBal.receivables - prevBal.receivables) / prevBal.receivables) * 100 
    : 0;
  const ocfGrowth = prevCF.operatingCashFlow > 0 
    ? ((latestCF.operatingCashFlow - prevCF.operatingCashFlow) / prevCF.operatingCashFlow) * 100 
    : 0;

  if (revGrowth > 5 && recGrowth > revGrowth + 12 && ocfGrowth < 0) {
    anomalies.push({
      id: "growth-cash-mismatch",
      title: "Growth-Cash Mismatch (Receivables Surge)",
      severity: "HIGH",
      signal: "WATCH",
      primaryMetricsInvolved: ["Revenue Growth", "Receivables Growth", "Operating Cash Flow"],
      plainLanguageSummary: `Revenue expanded by ${formatPercent(revGrowth)}, but customer receivables grew much faster by ${formatPercent(recGrowth)}, while Operating Cash Flow dropped by ${formatPercent(Math.abs(ocfGrowth))}.`,
      evidence: [
        { statement: "Income Statement", metric: "Revenue", trend: `${formatFinancialAmount(latestInc.revenue, currencySymbol)} (${formatPercent(revGrowth)})` },
        { statement: "Balance Sheet", metric: "Receivables", trend: `${formatFinancialAmount(latestBal.receivables, currencySymbol)} (${formatPercent(recGrowth)})` },
        { statement: "Cash Flow", metric: "Operating Cash Flow", trend: `${formatFinancialAmount(latestCF.operatingCashFlow, currencySymbol)} (${formatPercent(ocfGrowth)})` }
      ],
      whyItMatters: "When sales grow on paper but cash collection lags, it indicates customers are taking longer to pay, or sales recognition terms have been softened. This locks up liquidity.",
      investigativeQuestions: [
        {
          id: "q-rec-1",
          question: "Are customers genuinely delaying payments or is this an end-of-year billing spike?",
          accountingExplanation: "Look at Days Sales Outstanding (DSO = Receivables / Daily Sales). If DSO expands over multiple consecutive quarters, customer credit terms may be deteriorating."
        },
        {
          id: "q-rec-2",
          question: "Has the company relaxed its credit policies to win enterprise deals?",
          accountingExplanation: "Companies sometimes offer 90-120 day payment terms instead of 30 days to hit revenue targets, which boosts accounting sales but starves bank cash."
        },
        {
          id: "q-rec-3",
          question: "Is there any risk of uncollectible bad debts?",
          accountingExplanation: "Check Note on Trade Receivables in the Annual Report for receivables aged > 6 months and corresponding expected credit loss (ECL) provisions."
        }
      ]
    });
  }

  // 2. Earnings-Quality Divergence: Net Profit ↑ but Operating Cash Flow ↓
  const profitGrowth = prevInc.netProfit > 0 
    ? ((latestInc.netProfit - prevInc.netProfit) / prevInc.netProfit) * 100 
    : 0;

  if (profitGrowth > 8 && ocfGrowth < -5) {
    anomalies.push({
      id: "earnings-quality-divergence",
      title: "Earnings-Quality Divergence (Profit vs Cash Flow)",
      severity: "HIGH",
      signal: "WATCH",
      primaryMetricsInvolved: ["Net Profit", "Operating Cash Flow"],
      plainLanguageSummary: `Reported Net Profit increased by ${formatPercent(profitGrowth)}, but actual cash generated from operations declined by ${formatPercent(Math.abs(ocfGrowth))}.`,
      evidence: [
        { statement: "Income Statement", metric: "Net Profit", trend: `${formatFinancialAmount(latestInc.netProfit, currencySymbol)} (${formatPercent(profitGrowth)})` },
        { statement: "Cash Flow", metric: "Operating Cash Flow", trend: `${formatFinancialAmount(latestCF.operatingCashFlow, currencySymbol)} (${formatPercent(ocfGrowth)})` }
      ],
      whyItMatters: "Accounting net profit uses the accrual method, counting future promises to pay. When net profit diverges downwards from cash flow for multiple periods, it points to working capital absorption or non-cash accounting items.",
      investigativeQuestions: [
        {
          id: "q-eq-1",
          question: "Why did net profit grow when cash flow declined?",
          accountingExplanation: "Inspect the cash flow statement's 'Changes in Working Capital' section to see which bucket (Inventory, Receivables, or Payables) absorbed the missing cash."
        },
        {
          id: "q-eq-2",
          question: "Was profit boosted by non-operating 'Other Income'?",
          accountingExplanation: "Check if one-time asset sales, forex gains, or fair-value adjustments inflated income statement net profit without bringing recurring operating cash."
        }
      ]
    });
  }

  // 3. Leverage-Driven ROE: High ROE driven primarily by heavy Debt expansion
  const latestROE = latestBal.shareholdersEquity > 0 ? (latestInc.netProfit / latestBal.shareholdersEquity) * 100 : 0;
  const prevROE = prevBal.shareholdersEquity > 0 ? (prevInc.netProfit / prevBal.shareholdersEquity) * 100 : 0;
  const debtGrowth = prevBal.totalDebt > 0 
    ? ((latestBal.totalDebt - prevBal.totalDebt) / prevBal.totalDebt) * 100 
    : 0;

  if (latestROE > 18 && latestBal.debtToEquityRatio > 1.2 && debtGrowth > 15) {
    anomalies.push({
      id: "leverage-driven-roe",
      title: "Leverage-Driven ROE (Debt Multiplier Effect)",
      severity: "MEDIUM",
      signal: "NEEDS_CONTEXT",
      primaryMetricsInvolved: ["ROE", "Debt-to-Equity Ratio", "Total Debt Growth"],
      plainLanguageSummary: `The company posts an impressive ROE of ${latestROE.toFixed(1)}%, but total debt grew by ${formatPercent(debtGrowth)} with a Debt/Equity ratio of ${latestBal.debtToEquityRatio.toFixed(2)}x.`,
      evidence: [
        { statement: "Ratios", metric: "ROE", trend: `${latestROE.toFixed(1)}%` },
        { statement: "Balance Sheet", metric: "Total Debt", trend: `${formatFinancialAmount(latestBal.totalDebt, currencySymbol)} (+${debtGrowth.toFixed(1)}%)` },
        { statement: "Balance Sheet", metric: "Debt/Equity", trend: `${latestBal.debtToEquityRatio.toFixed(2)}x` }
      ],
      whyItMatters: "Borrowing money shrinks the equity denominator, mechanically increasing Return on Equity. If interest rates rise or revenues dip, high debt can swiftly crush earnings.",
      investigativeQuestions: [
        {
          id: "q-lev-1",
          question: "Is the operating return (ROCE) comfortably above the interest cost of debt?",
          accountingExplanation: "If ROCE is 14% but the company borrows at 9%, the financial spread is thin. If ROCE falls below 9%, leverage turns destructive."
        },
        {
          id: "q-lev-2",
          question: "What is the Interest Coverage Ratio?",
          accountingExplanation: "EBIT divided by Interest Expense. An interest coverage ratio below 3.0x indicates thin safety margin."
        }
      ]
    });
  }

  // 4. Inventory Buildup Anomaly: Inventory growing significantly faster than Revenue
  if (latestBal.inventory && prevBal.inventory && prevBal.inventory > 0) {
    const invGrowth = ((latestBal.inventory - prevBal.inventory) / prevBal.inventory) * 100;
    if (invGrowth > revGrowth + 15 && invGrowth > 12) {
      anomalies.push({
        id: "inventory-buildup",
        title: "Inventory Buildup vs Sales Rate",
        severity: "MEDIUM",
        signal: "WATCH",
        primaryMetricsInvolved: ["Inventory Growth", "Revenue Growth", "Working Capital"],
        plainLanguageSummary: `Inventory stockpiles grew by ${formatPercent(invGrowth)}, whereas Revenue only grew by ${formatPercent(revGrowth)}.`,
        evidence: [
          { statement: "Balance Sheet", metric: "Inventory", trend: `${formatFinancialAmount(latestBal.inventory, currencySymbol)} (${formatPercent(invGrowth)})` },
          { statement: "Income Statement", metric: "Revenue", trend: `${formatFinancialAmount(latestInc.revenue, currencySymbol)} (${formatPercent(revGrowth)})` }
        ],
        whyItMatters: "Rapid inventory accumulation can mean unsold products, risk of product obsolescence, future discounting, or write-downs.",
        investigativeQuestions: [
          {
            id: "q-inv-1",
            question: "Is the buildup due to anticipated demand or slow-moving goods?",
            accountingExplanation: "Check Inventory Days (Inventory / Cost of Goods Sold × 365). A multi-quarter upward trend suggests sluggish inventory turnover."
          }
        ]
      });
    }
  }

  // 5. Positive Alignment Check: If no negative contradictions exist
  if (anomalies.length === 0) {
    anomalies.push({
      id: "harmonious-statements",
      title: "Clean Three-Statement Consistency",
      severity: "INFORMATIONAL",
      signal: "POSITIVE_SIGNAL",
      primaryMetricsInvolved: ["Revenue", "Operating Cash Flow", "Debt", "Margins"],
      plainLanguageSummary: `Revenue (${formatPercent(revGrowth)}), Net Profit (${formatPercent(profitGrowth)}), and Cash Flow are moving in clean mutual alignment with healthy solvency.`,
      evidence: [
        { statement: "Income Statement", metric: "Revenue", trend: `${formatFinancialAmount(latestInc.revenue, currencySymbol)} (${formatPercent(revGrowth)})` },
        { statement: "Cash Flow", metric: "Operating Cash Flow", trend: `${formatFinancialAmount(latestCF.operatingCashFlow, currencySymbol)} (${formatPercent(ocfGrowth)})` },
        { statement: "Balance Sheet", metric: "Debt/Equity", trend: `${latestBal.debtToEquityRatio.toFixed(2)}x (Stable)` }
      ],
      whyItMatters: "When the income statement, balance sheet, and cash flow statement corroborate each other, accounting transparency and cash conversion quality are high.",
      investigativeQuestions: [
        {
          id: "q-harm-1",
          question: "Can this high cash-conversion pace be sustained over the next 2 years?",
          accountingExplanation: "Look at industry competitive dynamics and customer demand pipeline."
        }
      ]
    });
  }

  return anomalies;
}
