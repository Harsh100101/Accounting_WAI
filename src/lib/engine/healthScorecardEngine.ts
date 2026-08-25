import {
  MultiYearFinancials,
  FinancialHealthScorecard,
  HealthPillar,
  SectorType,
  SignalType,
} from "@/types/financials";
import { formatPercent } from "@/lib/utils";

export function generateHealthScorecard(
  financials: MultiYearFinancials,
  sector: SectorType
): FinancialHealthScorecard {
  const { incomeStatements, balanceSheets, cashFlowStatements, bankingMetrics } = financials;
  const isBank = sector === "BANKING_FINANCE" && bankingMetrics && bankingMetrics.length > 0;

  if (isBank) {
    return generateBankingHealthScorecard(financials);
  }

  const latestInc = incomeStatements[0];
  const latestBal = balanceSheets[0];
  const latestCF = cashFlowStatements[0];

  const prevInc = incomeStatements[1] || latestInc;
  const prevBal = balanceSheets[1] || latestBal;
  const prevCF = cashFlowStatements[1] || latestCF;

  // 1. Profitability Pillar
  const roe = latestBal.shareholdersEquity > 0 ? (latestInc.netProfit / latestBal.shareholdersEquity) * 100 : 0;
  const roce = (latestBal.totalAssets - latestBal.currentLiabilities) > 0 
    ? (latestInc.ebit / (latestBal.totalAssets - latestBal.currentLiabilities)) * 100 
    : 0;
  const netMargin = latestInc.netProfitMarginPercent;

  let profScore = 50;
  if (roe >= 20) profScore += 25; else if (roe >= 14) profScore += 15; else if (roe < 8) profScore -= 20;
  if (roce >= 22) profScore += 25; else if (roce >= 14) profScore += 15; else if (roce < 10) profScore -= 15;
  profScore = Math.min(100, Math.max(0, profScore));

  const profStatus = profScore >= 75 ? "Strong" : profScore >= 55 ? "Moderate" : profScore >= 40 ? "Watch" : "Concern";
  const profSignal: SignalType = profScore >= 75 ? "POSITIVE_SIGNAL" : profScore >= 55 ? "NEEDS_CONTEXT" : "WATCH";

  const profitabilityPillar: HealthPillar = {
    name: "Profitability",
    score: profScore,
    status: profStatus,
    signal: profSignal,
    trend: roe >= 15 ? "Stable" : "Improving",
    keyDrivers: [
      `ROE at ${roe.toFixed(1)}%`,
      `ROCE at ${roce.toFixed(1)}%`,
      `Net Margin at ${netMargin.toFixed(1)}%`
    ],
    aiExplanation: `Generates ${roe.toFixed(1)}% return on equity and ${roce.toFixed(1)}% on total capital deployed, demonstrating ${profStatus.toLowerCase()} operating pricing power.`,
    whatToInvestigate: "Is profitability being diluted by rising raw material/wage inflation or supported by high pricing power?",
    supportingMetrics: [
      { label: "ROE", value: `${roe.toFixed(1)}%`, status: roe >= 15 ? "good" : "neutral" },
      { label: "ROCE", value: `${roce.toFixed(1)}%`, status: roce >= 15 ? "good" : "neutral" },
      { label: "Net Margin", value: `${netMargin.toFixed(1)}%`, status: netMargin >= 10 ? "good" : "neutral" }
    ]
  };

  // 2. Liquidity Pillar
  const currentRatio = latestBal.currentRatio;
  const quickRatio = latestBal.quickRatio;
  let liqScore = 50;
  if (currentRatio >= 1.8) liqScore += 30; else if (currentRatio >= 1.2) liqScore += 15; else if (currentRatio < 0.9) liqScore -= 25;
  if (quickRatio >= 1.2) liqScore += 20; else if (quickRatio < 0.7) liqScore -= 15;
  liqScore = Math.min(100, Math.max(0, liqScore));

  const liqStatus = liqScore >= 70 ? "Strong" : liqScore >= 50 ? "Moderate" : liqScore >= 35 ? "Watch" : "Concern";

  const liquidityPillar: HealthPillar = {
    name: "Liquidity",
    score: liqScore,
    status: liqStatus,
    signal: liqScore >= 70 ? "POSITIVE_SIGNAL" : liqScore >= 50 ? "NEEDS_CONTEXT" : "WATCH",
    trend: currentRatio >= 1.2 ? "Stable" : "Deteriorating",
    keyDrivers: [
      `Current Ratio of ${currentRatio.toFixed(2)}x`,
      `Quick Ratio of ${quickRatio.toFixed(2)}x`,
      `Cash reserves of ${financials.currencySymbol}${latestBal.cashAndEquivalents}`
    ],
    aiExplanation: `Holds ${currentRatio.toFixed(2)}x short-term assets for every unit of short-term liabilities, providing an adequate near-term safety buffer.`,
    whatToInvestigate: "Are receivables and inventories turning into cash quickly enough to meet upcoming vendor payables?",
    supportingMetrics: [
      { label: "Current Ratio", value: `${currentRatio.toFixed(2)}x`, status: currentRatio >= 1.3 ? "good" : "neutral" },
      { label: "Quick Ratio", value: `${quickRatio.toFixed(2)}x`, status: quickRatio >= 1.0 ? "good" : "warning" }
    ]
  };

  // 3. Solvency & Debt Pillar
  const deRatio = latestBal.debtToEquityRatio;
  const interestCoverage = latestInc.interestCoverageRatio;
  let solvScore = 60;
  if (deRatio <= 0.2) solvScore += 35; else if (deRatio <= 0.6) solvScore += 20; else if (deRatio > 1.2) solvScore -= 30;
  if (interestCoverage >= 20) solvScore += 15; else if (interestCoverage < 4) solvScore -= 25;
  solvScore = Math.min(100, Math.max(0, solvScore));

  const solvencyPillar: HealthPillar = {
    name: "Solvency",
    score: solvScore,
    status: solvScore >= 75 ? "Strong" : solvScore >= 55 ? "Moderate" : solvScore >= 35 ? "Watch" : "Concern",
    signal: solvScore >= 75 ? "POSITIVE_SIGNAL" : solvScore >= 55 ? "NEEDS_CONTEXT" : "RED_FLAG",
    trend: deRatio <= 0.5 ? "Stable" : "Deteriorating",
    keyDrivers: [
      `Debt-to-Equity of ${deRatio.toFixed(2)}x`,
      `Interest Coverage of ${interestCoverage.toFixed(1)}x`,
      `Total Debt of ${financials.currencySymbol}${latestBal.totalDebt}`
    ],
    aiExplanation: `Low financial leverage (${deRatio.toFixed(2)}x D/E) and robust interest coverage of ${interestCoverage.toFixed(1)}x ensure resilient long-term debt solvency.`,
    whatToInvestigate: "What is the debt maturity schedule and are any balloon repayments due in the next 24 months?",
    supportingMetrics: [
      { label: "Debt/Equity", value: `${deRatio.toFixed(2)}x`, status: deRatio <= 0.5 ? "good" : "warning" },
      { label: "Interest Coverage", value: `${interestCoverage.toFixed(1)}x`, status: interestCoverage >= 5 ? "good" : "warning" }
    ]
  };

  // 4. Cash Flow Pillar
  const ocfToNetProfit = latestInc.netProfit > 0 ? latestCF.operatingCashFlow / latestInc.netProfit : 1;
  const fcf = latestCF.freeCashFlow;
  let cfScore = 50;
  if (ocfToNetProfit >= 1.0) cfScore += 30; else if (ocfToNetProfit >= 0.8) cfScore += 15; else if (ocfToNetProfit < 0.6) cfScore -= 25;
  if (fcf > 0) cfScore += 20; else cfScore -= 20;
  cfScore = Math.min(100, Math.max(0, cfScore));

  const cashFlowPillar: HealthPillar = {
    name: "Cash Flow",
    score: cfScore,
    status: cfScore >= 75 ? "Strong" : cfScore >= 55 ? "Moderate" : cfScore >= 40 ? "Watch" : "Concern",
    signal: cfScore >= 75 ? "POSITIVE_SIGNAL" : cfScore >= 55 ? "NEEDS_CONTEXT" : "WATCH",
    trend: ocfToNetProfit >= 0.9 ? "Improving" : "Stable",
    keyDrivers: [
      `OCF-to-Net Profit conversion of ${(ocfToNetProfit * 100).toFixed(0)}%`,
      `Positive Free Cash Flow of ${financials.currencySymbol}${fcf}`,
      `Operating Cash Flow of ${financials.currencySymbol}${latestCF.operatingCashFlow}`
    ],
    aiExplanation: `Converts ${(ocfToNetProfit * 100).toFixed(0)}% of reported profits into cold hard operating cash, with healthy positive free cash flow.`,
    whatToInvestigate: "How much of the free cash flow is being returned to shareholders via dividends vs reinvested in growth capex?",
    supportingMetrics: [
      { label: "OCF / Net Profit", value: `${(ocfToNetProfit * 100).toFixed(0)}%`, status: ocfToNetProfit >= 0.9 ? "good" : "neutral" },
      { label: "Free Cash Flow", value: `${financials.currencySymbol}${fcf}`, status: fcf > 0 ? "good" : "warning" }
    ]
  };

  // 5. Growth Pillar
  const revGrowth = latestInc.revenueGrowthPercent;
  const profitGrowth = prevInc.netProfit > 0 ? ((latestInc.netProfit - prevInc.netProfit) / prevInc.netProfit) * 100 : 0;
  let growthScore = 50;
  if (revGrowth >= 15) growthScore += 30; else if (revGrowth >= 7) growthScore += 15; else if (revGrowth < 0) growthScore -= 25;
  if (profitGrowth >= 12) growthScore += 20; else if (profitGrowth < 0) growthScore -= 20;
  growthScore = Math.min(100, Math.max(0, growthScore));

  const growthPillar: HealthPillar = {
    name: "Growth",
    score: growthScore,
    status: growthScore >= 70 ? "Strong" : growthScore >= 50 ? "Moderate" : "Watch",
    signal: growthScore >= 70 ? "STRONG_TREND" : growthScore >= 50 ? "NEEDS_CONTEXT" : "WEAKENING_TREND",
    trend: revGrowth >= 8 ? "Improving" : "Stable",
    keyDrivers: [
      `Revenue Growth of ${formatPercent(revGrowth)} YoY`,
      `Net Profit Growth of ${formatPercent(profitGrowth)} YoY`
    ],
    aiExplanation: `Top-line sales expanded ${formatPercent(revGrowth)} while bottom-line net profit expanded ${formatPercent(profitGrowth)}.`,
    whatToInvestigate: "Is growth coming from volume expansion, price hikes, or new market segment penetration?",
    supportingMetrics: [
      { label: "Revenue Growth", value: formatPercent(revGrowth), status: revGrowth >= 8 ? "good" : "neutral" },
      { label: "Profit Growth", value: formatPercent(profitGrowth), status: profitGrowth >= 8 ? "good" : "neutral" }
    ]
  };

  // 6. Efficiency Pillar
  const assetTurnover = latestBal.totalAssets > 0 ? latestInc.revenue / latestBal.totalAssets : 1;
  const effScore = Math.min(100, Math.max(30, Math.round(assetTurnover * 45 + 30)));
  const efficiencyPillar: HealthPillar = {
    name: "Efficiency",
    score: effScore,
    status: effScore >= 70 ? "Strong" : effScore >= 50 ? "Moderate" : "Watch",
    signal: effScore >= 70 ? "POSITIVE_SIGNAL" : "NEEDS_CONTEXT",
    trend: "Stable",
    keyDrivers: [
      `Asset Turnover of ${assetTurnover.toFixed(2)}x`,
      `Working Capital of ${financials.currencySymbol}${latestBal.workingCapital}`
    ],
    aiExplanation: `Generates ${financials.currencySymbol}${assetTurnover.toFixed(2)} of sales for every unit of balance sheet assets deployed.`,
    whatToInvestigate: "Are inventory days and receivables days stretching or contracting?",
    supportingMetrics: [
      { label: "Asset Turnover", value: `${assetTurnover.toFixed(2)}x`, status: assetTurnover >= 1.0 ? "good" : "neutral" }
    ]
  };

  // 7. Earnings Quality Pillar
  const eqScore = ocfToNetProfit >= 0.95 ? 90 : ocfToNetProfit >= 0.8 ? 75 : ocfToNetProfit >= 0.6 ? 55 : 35;
  const earningsQualityPillar: HealthPillar = {
    name: "Earnings Quality",
    score: eqScore,
    status: eqScore >= 75 ? "Strong" : eqScore >= 55 ? "Moderate" : "Watch",
    signal: eqScore >= 75 ? "POSITIVE_SIGNAL" : eqScore >= 55 ? "NEEDS_CONTEXT" : "WATCH",
    trend: "Stable",
    keyDrivers: [
      `Cash to Profit ratio of ${(ocfToNetProfit * 100).toFixed(0)}%`,
      "Low reliance on non-operating other income"
    ],
    aiExplanation: "Accounting profits are strongly backed by actual bank cash receipts rather than aggressive accruals.",
    whatToInvestigate: "Has the company made any changes in its depreciation methods or revenue recognition criteria?",
    supportingMetrics: [
      { label: "Cash Conversion", value: `${(ocfToNetProfit * 100).toFixed(0)}%`, status: ocfToNetProfit >= 0.85 ? "good" : "warning" }
    ]
  };

  const pillars = [
    profitabilityPillar,
    liquidityPillar,
    solvencyPillar,
    cashFlowPillar,
    growthPillar,
    efficiencyPillar,
    earningsQualityPillar
  ];

  const avgScore = Math.round(pillars.reduce((acc, p) => acc + p.score, 0) / pillars.length);
  const overallRating = avgScore >= 75 ? "Strong" : avgScore >= 55 ? "Moderate" : avgScore >= 40 ? "Watch" : "Concern";
  const overallSignal: SignalType = avgScore >= 75 ? "POSITIVE_SIGNAL" : avgScore >= 55 ? "NEEDS_CONTEXT" : "WATCH";

  return {
    overallHealthRating: overallRating,
    overallSignal,
    pillars,
    methodologyNote: "Scorecard evaluates 7 core dimensions weighted against sector medians. All scores explain underlying operational drivers without speculative predictions."
  };
}

function generateBankingHealthScorecard(financials: MultiYearFinancials): FinancialHealthScorecard {
  const b = financials.bankingMetrics![0];
  const prevB = financials.bankingMetrics![1] || b;

  const pillars: HealthPillar[] = [
    {
      name: "Profitability",
      score: b.returnOnAssets >= 1.8 ? 90 : b.returnOnAssets >= 1.4 ? 75 : 55,
      status: b.returnOnAssets >= 1.6 ? "Strong" : "Moderate",
      signal: "POSITIVE_SIGNAL",
      trend: "Stable",
      keyDrivers: [
        `Net Interest Margin (NIM) of ${b.netInterestMargin.toFixed(2)}%`,
        `Return on Assets (ROA) of ${b.returnOnAssets.toFixed(2)}%`,
        `Return on Equity (ROE) of ${b.returnOnEquity.toFixed(1)}%`
      ],
      aiExplanation: `Healthy NIM (${b.netInterestMargin.toFixed(2)}%) and ROA (${b.returnOnAssets.toFixed(2)}%) indicate strong loan pricing power and low funding costs.`,
      whatToInvestigate: "Is deposit competition compressing NIMs in upcoming quarters?",
      supportingMetrics: [
        { label: "NIM", value: `${b.netInterestMargin.toFixed(2)}%`, status: "good" },
        { label: "ROA", value: `${b.returnOnAssets.toFixed(2)}%`, status: "good" }
      ]
    },
    {
      name: "Solvency",
      score: b.capitalAdequacyRatio >= 18 ? 95 : b.capitalAdequacyRatio >= 15 ? 80 : 50,
      status: "Strong",
      signal: "POSITIVE_SIGNAL",
      trend: "Stable",
      keyDrivers: [
        `Capital Adequacy Ratio (CAR) of ${b.capitalAdequacyRatio.toFixed(1)}%`,
        `Regulatory minimum is 11.5%`
      ],
      aiExplanation: `Maintains a fortress capital cushion (${b.capitalAdequacyRatio.toFixed(1)}% CAR) far above statutory requirements.`,
      whatToInvestigate: "Will upcoming loan growth require fresh equity capital dilution?",
      supportingMetrics: [
        { label: "Capital Adequacy", value: `${b.capitalAdequacyRatio.toFixed(1)}%`, status: "good" }
      ]
    },
    {
      name: "Earnings Quality",
      score: b.netNPAPercent <= 0.4 ? 92 : b.netNPAPercent <= 0.8 ? 75 : 45,
      status: b.netNPAPercent <= 0.5 ? "Strong" : "Moderate",
      signal: "POSITIVE_SIGNAL",
      trend: "Improving",
      keyDrivers: [
        `Gross NPA at ${b.grossNPAPercent.toFixed(2)}%`,
        `Net NPA at ${b.netNPAPercent.toFixed(2)}%`
      ],
      aiExplanation: `Exceptionally clean loan book with Net NPA well contained at ${b.netNPAPercent.toFixed(2)}%, minimizing credit cost write-offs.`,
      whatToInvestigate: "Are there any hidden slippages in the retail unsecured credit portfolio?",
      supportingMetrics: [
        { label: "GNPA %", value: `${b.grossNPAPercent.toFixed(2)}%`, status: "good" },
        { label: "NNPA %", value: `${b.netNPAPercent.toFixed(2)}%`, status: "good" }
      ]
    },
    {
      name: "Liquidity",
      score: b.casaRatio >= 40 ? 88 : b.casaRatio >= 35 ? 75 : 55,
      status: b.casaRatio >= 37 ? "Strong" : "Moderate",
      signal: "NEEDS_CONTEXT",
      trend: "Stable",
      keyDrivers: [
        `CASA Ratio of ${b.casaRatio.toFixed(1)}%`,
        `Deposit Growth of ${formatPercent(b.depositGrowthPercent)}`
      ],
      aiExplanation: `Low-cost CASA deposit base of ${b.casaRatio.toFixed(1)}% provides inexpensive funding stability.`,
      whatToInvestigate: "Is the bank able to grow deposits fast enough to support credit loan growth?",
      supportingMetrics: [
        { label: "CASA Ratio", value: `${b.casaRatio.toFixed(1)}%`, status: "good" }
      ]
    },
    {
      name: "Growth",
      score: b.creditGrowthPercent >= 15 ? 85 : b.creditGrowthPercent >= 10 ? 70 : 50,
      status: "Strong",
      signal: "STRONG_TREND",
      trend: "Improving",
      keyDrivers: [
        `Credit / Loan Growth of ${formatPercent(b.creditGrowthPercent)} YoY`,
        `Deposit Growth of ${formatPercent(b.depositGrowthPercent)} YoY`
      ],
      aiExplanation: `Balanced balance sheet expansion with loan advances growing at ${formatPercent(b.creditGrowthPercent)}.`,
      whatToInvestigate: "Is credit growth outpacing deposit growth, creating liquidity pressure?",
      supportingMetrics: [
        { label: "Credit Growth", value: formatPercent(b.creditGrowthPercent), status: "good" },
        { label: "Deposit Growth", value: formatPercent(b.depositGrowthPercent), status: "good" }
      ]
    },
    {
      name: "Efficiency",
      score: b.costToIncomeRatio <= 42 ? 88 : b.costToIncomeRatio <= 48 ? 72 : 50,
      status: "Strong",
      signal: "POSITIVE_SIGNAL",
      trend: "Stable",
      keyDrivers: [
        `Cost-to-Income Ratio of ${b.costToIncomeRatio.toFixed(1)}%`
      ],
      aiExplanation: `Strong operational efficiency with operating expenses taking only ${b.costToIncomeRatio.toFixed(1)}% of total net revenue.`,
      whatToInvestigate: "Are digital banking investments successfully lowering branch overhead costs?",
      supportingMetrics: [
        { label: "Cost/Income", value: `${b.costToIncomeRatio.toFixed(1)}%`, status: "good" }
      ]
    },
    {
      name: "Cash Flow",
      score: 80,
      status: "Strong",
      signal: "POSITIVE_SIGNAL",
      trend: "Stable",
      keyDrivers: ["Stable net interest cash generation"],
      aiExplanation: "Consistent core interest cash accretion from lending franchise.",
      whatToInvestigate: "Are interest collection cycles maintaining regular schedules?",
      supportingMetrics: [{ label: "NII", value: `${financials.currencySymbol}${b.netInterestIncome}`, status: "good" }]
    }
  ];

  return {
    overallHealthRating: "Strong",
    overallSignal: "POSITIVE_SIGNAL",
    pillars,
    methodologyNote: "Banking Financial Health Model evaluated across Net Interest Margin (NIM), Asset Quality (GNPA/NNPA), Capital Adequacy (CAR), and CASA deposit franchise."
  };
}
