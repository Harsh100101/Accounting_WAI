import {
  MultiYearFinancials,
  Company,
  ThesisChallengeResponse,
  BiasCheckResult,
} from "@/types/financials";
import { formatPercent } from "@/lib/utils";

export function challengeInvestmentThesis(
  userThesis: string,
  company: Company,
  financials: MultiYearFinancials
): ThesisChallengeResponse {
  const latestInc = financials.incomeStatements[0];
  const latestBal = financials.balanceSheets[0];
  const latestCF = financials.cashFlowStatements[0];
  const prevCF = financials.cashFlowStatements[1] || latestCF;

  const ocfToProfit = latestInc.netProfit > 0 ? (latestCF.operatingCashFlow / latestInc.netProfit) * 100 : 100;
  const deRatio = latestBal.debtToEquityRatio;
  const peRatio = company.peRatio || 25;
  const revGrowth = latestInc.revenueGrowthPercent;

  const questions: { question: string; financialDataPoint: string; whyThisMatters: string }[] = [];
  const supporting: string[] = [];

  // Evaluate Revenue & Growth
  if (revGrowth > 7) {
    supporting.push(`Strong top-line expansion with ${formatPercent(revGrowth)} revenue growth in FY${latestInc.year}.`);
  } else {
    questions.push({
      question: "Is top-line revenue growth sufficient to support long-term compounding?",
      financialDataPoint: `Revenue growth is ${formatPercent(revGrowth)} YoY.`,
      whyThisMatters: "If revenue is expanding slower than inflation or sector averages, growth must rely purely on margin cuts or cost reductions."
    });
  }

  // Evaluate Cash Conversion
  if (ocfToProfit < 85) {
    questions.push({
      question: "Have you verified how much reported profit actually converts into cash in the bank?",
      financialDataPoint: `Operating Cash Flow is ${ocfToProfit.toFixed(0)}% of reported Net Profit.`,
      whyThisMatters: "A gap between profit and cash flow often indicates customer receivables build-up or working capital absorption."
    });
  } else {
    supporting.push(`High cash conversion: Operating Cash Flow reaches ${ocfToProfit.toFixed(0)}% of reported Net Profit.`);
  }

  // Evaluate Debt & Solvency
  if (deRatio > 0.8) {
    questions.push({
      question: "Have you stress-tested the company's debt burden against potential interest rate shocks?",
      financialDataPoint: `Debt-to-Equity stands at ${deRatio.toFixed(2)}x.`,
      whyThisMatters: "High leverage amplifies downside risk during cyclical industry downturns."
    });
  } else {
    supporting.push(`Conservative balance sheet with low Debt-to-Equity of ${deRatio.toFixed(2)}x.`);
  }

  // Evaluate Valuation
  if (peRatio > 40) {
    questions.push({
      question: "Are you factoring in high valuation multiple expectations?",
      financialDataPoint: `Trailing P/E ratio is ${peRatio.toFixed(1)}x.`,
      whyThisMatters: "Elevated multiples price in years of flawless future execution, leaving little margin of safety."
    });
  }

  const checklistItems: ThesisChallengeResponse["checklistItems"] = [
    {
      topic: "Revenue Growth",
      status: revGrowth >= 8 ? "Checked - Strong" : "Checked - Mixed",
      detail: `FY${latestInc.year} revenue grew ${formatPercent(revGrowth)}.`
    },
    {
      topic: "Cash Conversion",
      status: ocfToProfit >= 90 ? "Checked - Strong" : ocfToProfit >= 75 ? "Checked - Mixed" : "Checked - Watch",
      detail: `OCF to Net Profit ratio is ${ocfToProfit.toFixed(0)}%.`
    },
    {
      topic: "Debt & Solvency",
      status: deRatio <= 0.3 ? "Checked - Strong" : deRatio <= 0.8 ? "Checked - Mixed" : "Checked - Watch",
      detail: `Debt-to-Equity is ${deRatio.toFixed(2)}x.`
    },
    {
      topic: "Valuation & Margin of Safety",
      status: peRatio <= 30 ? "Checked - Strong" : "Checked - Mixed",
      detail: `Trading at ${peRatio.toFixed(1)}x P/E.`
    },
    {
      topic: "Earnings Quality",
      status: ocfToProfit >= 85 ? "Checked - Strong" : "Checked - Watch",
      detail: "Assessed via cross-statement cash flow corroboration."
    }
  ];

  const status: ThesisChallengeResponse["thesisStatus"] =
    questions.length === 0
      ? "Strongly Supported by Data"
      : questions.length <= 2
      ? "Plausible with Blindspots"
      : "Significant Contradictions Found";

  return {
    userThesis,
    thesisStatus: status,
    thesisSummary: `You identified compelling business drivers for ${company.displayName}. Our consistency engine verified ${supporting.length} key data points in the financial statements, while surfacing ${questions.length} critical blindspots to investigate.`,
    supportingEvidenceFromFinancials: supporting,
    criticalQuestionsChallengingThesis: questions,
    checklistItems,
    suggestedAction: "Investigate the working capital and receivables trend before finalizing your investment conviction."
  };
}

export function performInvestorBiasCheck(
  initialView: "Bullish" | "Neutral" | "Bearish" | "I don't know",
  financials: MultiYearFinancials
): BiasCheckResult {
  const latestInc = financials.incomeStatements[0];
  const latestBal = financials.balanceSheets[0];
  const latestCF = financials.cashFlowStatements[0];

  const roe = latestBal.shareholdersEquity > 0 ? (latestInc.netProfit / latestBal.shareholdersEquity) * 100 : 0;
  const ocfToProfit = latestInc.netProfit > 0 ? (latestCF.operatingCashFlow / latestInc.netProfit) * 100 : 100;
  const deRatio = latestBal.debtToEquityRatio;
  const revGrowth = latestInc.revenueGrowthPercent;

  const factsFor: string[] = [];
  const factsAgainst: string[] = [];

  if (revGrowth >= 6) factsFor.push(`Revenue expanded ${formatPercent(revGrowth)} YoY.`);
  else factsAgainst.push(`Revenue growth is modest at ${formatPercent(revGrowth)}.`);

  if (roe >= 15) factsFor.push(`High Return on Equity of ${roe.toFixed(1)}%.`);
  else factsAgainst.push(`ROE of ${roe.toFixed(1)}% is below 15% benchmark.`);

  if (ocfToProfit >= 85) factsFor.push(`Solid cash generation with OCF at ${ocfToProfit.toFixed(0)}% of profit.`);
  else factsAgainst.push(`Operating cash flow is only ${ocfToProfit.toFixed(0)}% of reported profits.`);

  if (deRatio <= 0.4) factsFor.push(`Strong solvency with D/E at only ${deRatio.toFixed(2)}x.`);
  else factsAgainst.push(`Elevated debt with D/E at ${deRatio.toFixed(2)}x.`);

  let analysisMessage = "";
  if (initialView === "Bullish") {
    analysisMessage = `Your initial stance was Bullish. While ${factsFor.length} financial indicators strongly support this view, we identified ${factsAgainst.length} potential friction points that require unbiased investigation.`;
  } else if (initialView === "Bearish") {
    analysisMessage = `Your initial stance was Bearish. While ${factsAgainst.length} areas warrant caution, the company also possesses ${factsFor.length} resilient operational strengths that counter a purely negative thesis.`;
  } else {
    analysisMessage = `You entered with a balanced/neutral mindset. The financial statements present ${factsFor.length} positive signals alongside ${factsAgainst.length} watch areas for objective evaluation.`;
  }

  return {
    userInitialView: initialView,
    bullishEvidenceCount: factsFor.length,
    bearishOrWatchEvidenceCount: factsAgainst.length,
    biasAnalysisMessage: analysisMessage,
    groundedFactsFor: factsFor,
    groundedFactsAgainst: factsAgainst,
    learningTakeaway: "Thinking like a professional investor means actively searching for disconfirming evidence rather than only gathering data that validates your initial hunch."
  };
}
