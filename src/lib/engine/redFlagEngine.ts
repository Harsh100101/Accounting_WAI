import {
  MultiYearFinancials,
  RedFlagItem,
  SectorType,
} from "@/types/financials";
import { formatPercent } from "@/lib/utils";

export function evaluateRedFlags(
  financials: MultiYearFinancials,
  sector: SectorType
): RedFlagItem[] {
  const flags: RedFlagItem[] = [];
  const { incomeStatements, balanceSheets, cashFlowStatements, currencySymbol } = financials;

  if (incomeStatements.length < 2 || balanceSheets.length < 2 || cashFlowStatements.length < 2) {
    return flags;
  }

  const latestInc = incomeStatements[0];
  const prevInc = incomeStatements[1];
  const latestBal = balanceSheets[0];
  const prevBal = balanceSheets[1];
  const latestCF = cashFlowStatements[0];
  const prevCF = cashFlowStatements[1];

  // 1. Debt Burden & Coverage Risk
  if (latestBal.debtToEquityRatio > 1.2 || latestInc.interestCoverageRatio < 3.5) {
    flags.push({
      id: "rf-debt-coverage",
      category: "Debt Risk",
      severity: latestInc.interestCoverageRatio < 2.5 ? "HIGH" : "MEDIUM",
      title: "Elevated Debt & Thin Interest Coverage",
      evidence: `Debt-to-Equity stands at ${latestBal.debtToEquityRatio.toFixed(2)}x with Interest Coverage of ${latestInc.interestCoverageRatio.toFixed(1)}x.`,
      historicalTrend: `Total debt changed from ${currencySymbol}${prevBal.totalDebt} to ${currencySymbol}${latestBal.totalDebt}.`,
      explanation: "A high proportion of debt to equity increases fixed interest obligations, reducing net profit resilience during economic slowdowns or rising rate environments.",
      possibleCauses: [
        "Major debt-funded capital expenditure programs",
        "Recent acquisitions financed by loan facilities",
        "Higher working capital borrowing needs"
      ],
      questionsToInvestigate: [
        "What is the average interest rate on the debt and the principal repayment schedule over the next 3 years?",
        "Is operating cash flow sufficient to service both interest and mandatory debt repayments without refinancing?"
      ]
    });
  }

  // 2. Cash Flow & Profit Divergence Risk
  const ocfToProfit = latestInc.netProfit > 0 ? latestCF.operatingCashFlow / latestInc.netProfit : 1;
  if (ocfToProfit < 0.75 && latestInc.netProfit > 0) {
    flags.push({
      id: "rf-cash-divergence",
      category: "Cash Flow Risk",
      severity: ocfToProfit < 0.5 ? "HIGH" : "MEDIUM",
      title: "Operating Cash Flow Trails Net Profit",
      evidence: `Operating Cash Flow (${currencySymbol}${latestCF.operatingCashFlow}) represents only ${(ocfToProfit * 100).toFixed(0)}% of reported Net Profit (${currencySymbol}${latestInc.netProfit}).`,
      historicalTrend: `Previous year cash conversion was ${(prevInc.netProfit > 0 ? (prevCF.operatingCashFlow / prevInc.netProfit) * 100 : 100).toFixed(0)}%.`,
      explanation: "Accounting net profit is being booked on an accrual basis faster than actual cash is arriving in company bank accounts.",
      possibleCauses: [
        "Uncollected customer trade receivables",
        "Inventory stockpiling",
        "Unfavorable credit terms offered to drive sales"
      ],
      questionsToInvestigate: [
        "Which line item in the working capital schedule absorbed the cash flow?",
        "Are these deferred cash receipts expected to convert within the next 2 quarters?"
      ]
    });
  }

  // 3. Receivables Expansion Risk
  const revGrowth = latestInc.revenueGrowthPercent;
  const recGrowth = prevBal.receivables > 0 
    ? ((latestBal.receivables - prevBal.receivables) / prevBal.receivables) * 100 
    : 0;

  if (recGrowth > revGrowth + 12 && recGrowth > 15) {
    flags.push({
      id: "rf-receivables-spike",
      category: "Working Capital Risk",
      severity: "MEDIUM",
      title: "Trade Receivables Outpacing Sales Growth",
      evidence: `Trade receivables expanded by ${formatPercent(recGrowth)}, while top-line revenue grew by ${formatPercent(revGrowth)}.`,
      historicalTrend: `Receivables rose from ${currencySymbol}${prevBal.receivables} to ${currencySymbol}${latestBal.receivables}.`,
      explanation: "When unpaid customer invoices pile up faster than sales, it suggests either customers are slowing down payments or sales terms have been extended.",
      possibleCauses: [
        "Macro liquidity tightness among enterprise buyers",
        "Aggressive end-of-year billing to hit targets",
        "Higher proportion of long-term turnkey milestone projects"
      ],
      questionsToInvestigate: [
        "Has Days Sales Outstanding (DSO) increased over the past four quarters?",
        "Are credit loss allowances (bad debt provisions) increasing proportionately?"
      ]
    });
  }

  // 4. Liquidity Cushion Risk
  if (latestBal.currentRatio < 1.0) {
    flags.push({
      id: "rf-liquidity-tight",
      category: "Liquidity Risk",
      severity: "MEDIUM",
      title: "Current Liabilities Exceed Current Assets",
      evidence: `Current Ratio is ${latestBal.currentRatio.toFixed(2)}x (Current Assets: ${currencySymbol}${latestBal.currentAssets}, Current Liabilities: ${currencySymbol}${latestBal.currentLiabilities}).`,
      historicalTrend: `Current Ratio was ${prevBal.currentRatio.toFixed(2)}x in the prior period.`,
      explanation: "The company has more bills due in the next 12 months than short-term liquid assets. (Note: For some fast-inventory retailers or subscription tech businesses, negative working capital can be normal).",
      possibleCauses: [
        "Short-term commercial paper or supplier payables maturing soon",
        "Lean just-in-time inventory operations",
        "Cash used for recent buybacks or capex"
      ],
      questionsToInvestigate: [
        "Does the business have negative working capital due to strong bargaining power (like Apple or FMCG majors), or is it facing genuine liquidity strain?",
        "Are unutilized bank credit lines available to cover short-term liabilities?"
      ]
    });
  }

  // 5. Equity Dilution Risk
  if (latestInc.sharesOutstanding && prevInc.sharesOutstanding) {
    const shareCountGrowth = ((latestInc.sharesOutstanding - prevInc.sharesOutstanding) / prevInc.sharesOutstanding) * 100;
    if (shareCountGrowth > 5) {
      flags.push({
        id: "rf-share-dilution",
        category: "Dilution Risk",
        severity: "LOW",
        title: "Shareholder Dilution from New Share Issuance",
        evidence: `Shares outstanding increased by ${formatPercent(shareCountGrowth)} (from ${prevInc.sharesOutstanding}M to ${latestInc.sharesOutstanding}M).`,
        historicalTrend: `Share count increased ${formatPercent(shareCountGrowth)} YoY.`,
        explanation: "Issuing new shares spreads company earnings across more shares, which dampens Earnings Per Share (EPS) growth for existing investors.",
        possibleCauses: [
          "Employee Stock Option (ESOP) vesting",
          "Qualified Institutional Placement (QIP) equity raise",
          "Stock-financed acquisition"
        ],
        questionsToInvestigate: [
          "Did the equity dilution fund high-return accretive investments or was it used to pay down expensive debt?"
        ]
      });
    }
  }

  return flags;
}
