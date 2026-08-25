import {
  LearningMode,
  SignalType,
  ThreeQuestionExplanation,
} from "@/types/financials";
import { formatCurrency, formatPercent } from "@/lib/utils";

export interface MetricDefinition {
  key: string;
  label: string;
  unit: string;
  category: 'Profitability' | 'Cash Flow' | 'Solvency & Debt' | 'Liquidity' | 'Efficiency' | 'Banking Specific' | 'Valuation';
  calculateSignal: (value: number, context?: any) => SignalType;
  getExplanation: (value: number | string, context?: any) => Omit<ThreeQuestionExplanation, 'metricKey' | 'metricLabel' | 'currentValue' | 'signal'>;
}

export const METRIC_DEFINITIONS: Record<string, MetricDefinition> = {
  roe: {
    key: "roe",
    label: "Return on Equity (ROE)",
    unit: "%",
    category: "Profitability",
    calculateSignal: (val) => (val >= 20 ? "POSITIVE_SIGNAL" : val >= 12 ? "NEEDS_CONTEXT" : val >= 0 ? "WATCH" : "RED_FLAG"),
    getExplanation: (val) => ({
      unit: "%",
      benchmark: "15% - 25% (Sector dependent)",
      whatItMeans: {
        beginner: `For every ₹100 (or $100) that shareholders own in the company, the business generated about ₹${Number(val).toFixed(1)} in net profit this year.`,
        intermediate: `Return on Equity measures accounting profitability relative to book shareholders' equity. At ${val}%, it shows how efficiently the equity base is generating net income.`,
        advanced: `ROE (${val}%) can be decomposed via DuPont analysis: (Net Margin) × (Asset Turnover) × (Equity Multiplier). High ROE driven by margin/turnover indicates competitive moat, whereas high financial leverage can artificially inflate ROE.`
      },
      whyYouShouldCare: {
        beginner: "It tells you if the company is generating healthy returns on the money that belongs to shareholders, or just hoarding cash without putting it to work.",
        intermediate: "Companies with consistently high ROE (>18%) without excessive debt can compound internal cash flows faster without diluting equity or needing heavy bank loans.",
        advanced: "Sustainable ROE exceeding the cost of equity (Ke) creates economic value added (EVA). If ROE drops below bank deposit or bond yields, the company is destroying equity value."
      },
      whatToInvestigate: [
        "Is the high ROE driven by genuine operational profitability or high debt (leverage multiplier)?",
        "Has ROE been consistent over the last 3-5 years or is it a one-time cyclical peak?",
        "How much of the profit is being retained vs paid out as dividends?"
      ],
      relatedMetrics: ["ROCE", "Debt/Equity", "Net Profit Margin", "Asset Turnover"],
      conceptDeepDive: "DuPont Analysis decomposes ROE into Net Margin × Asset Turnover × Financial Leverage. If debt is high, ROE looks artificially boosted even if underlying operating efficiency is weak."
    })
  },
  roce: {
    key: "roce",
    label: "Return on Capital Employed (ROCE)",
    unit: "%",
    category: "Profitability",
    calculateSignal: (val) => (val >= 22 ? "POSITIVE_SIGNAL" : val >= 14 ? "NEEDS_CONTEXT" : val >= 8 ? "WATCH" : "RED_FLAG"),
    getExplanation: (val) => ({
      unit: "%",
      benchmark: "> 18%",
      whatItMeans: {
        beginner: `For every ₹100 of total money invested into running the business (from both shareholders and loans), the company generated ₹${Number(val).toFixed(1)} in operating earnings.`,
        intermediate: `ROCE measures the pre-tax operating efficiency of all long-term capital deployed (Equity + Long-Term Debt). At ${val}%, it assesses total capital productivity regardless of financing structure.`,
        advanced: `ROCE = EBIT / (Total Assets - Current Liabilities). It removes capital structure bias, allowing an apples-to-apples operational comparison between highly leveraged and debt-free companies.`
      },
      whyYouShouldCare: {
        beginner: "It prevents you from being tricked by high debt. If a company borrows a lot to look profitable, ROCE will reveal the true operating return.",
        intermediate: "A company that earns a ROCE well above its borrowing cost (e.g., ROCE of 25% vs 8% loan interest) generates genuine excess economic profit.",
        advanced: "Reinvestment at high incremental ROCE is the primary mathematical driver of multi-bagger long-term equity compounding."
      },
      whatToInvestigate: [
        "Is ROCE higher than the company's weighted average cost of debt?",
        "Are newly deployed assets (Capex) generating similar returns or dragging down overall ROCE?",
        "How does ROCE compare with direct peers in the same industry?"
      ],
      relatedMetrics: ["ROE", "EBIT", "Capital Employed", "Debt/Equity"]
    })
  },
  operatingCashFlow: {
    key: "operatingCashFlow",
    label: "Operating Cash Flow (OCF)",
    unit: "Currency",
    category: "Cash Flow",
    calculateSignal: (val, ctx) => {
      if (typeof val === 'number' && val < 0) return "RED_FLAG";
      if (ctx?.netProfit && typeof val === 'number' && val < ctx.netProfit * 0.8) return "WATCH";
      return "POSITIVE_SIGNAL";
    },
    getExplanation: (val, ctx) => ({
      benchmark: "Should match or exceed Net Profit over multi-year cycles",
      whatItMeans: {
        beginner: `This is actual cash deposited into the company's bank accounts from running its day-to-day business, after paying employees, suppliers, and taxes.`,
        intermediate: `Operating Cash Flow is Net Income adjusted for non-cash expenses (depreciation) and working capital shifts (receivables, inventory, payables). It reflects pure operational cash generation.`,
        advanced: `OCF reflects cash earnings before discretionary capital allocation. An OCF-to-Net Profit ratio consistently >= 1.0 confirms high earnings quality and clean revenue recognition.`
      },
      whyYouShouldCare: {
        beginner: "Profits on paper can be fake or delayed, but cash in the bank cannot be faked easily. Companies can survive years without accounting profits, but go bankrupt quickly without cash.",
        intermediate: "If reported profit rises while Operating Cash Flow falls, the company is not collecting real cash from its customers or is getting stuck with unsold goods.",
        advanced: "High operating cash flow funds internal research & development, organic capex, debt retirement, and shareholder dividends without requiring external equity dilution."
      },
      whatToInvestigate: [
        "Is Operating Cash Flow growing in tandem with reported Net Profit?",
        "Has working capital (receivables or inventory) absorbed significant cash this year?",
        "Is the cash conversion ratio (OCF / EBITDA) consistently above 70%?"
      ],
      relatedMetrics: ["Free Cash Flow", "Net Profit", "Receivables", "Working Capital"]
    })
  },
  freeCashFlow: {
    key: "freeCashFlow",
    label: "Free Cash Flow (FCF)",
    unit: "Currency",
    category: "Cash Flow",
    calculateSignal: (val) => (typeof val === 'number' && val > 0 ? "POSITIVE_SIGNAL" : "WATCH"),
    getExplanation: (val) => ({
      benchmark: "Positive and growing FCF",
      whatItMeans: {
        beginner: `This is the 'free pocket money' left over after the business has paid all its bills AND built/maintained its factories, computers, and equipment (Capex).`,
        intermediate: `Free Cash Flow = Operating Cash Flow minus Capital Expenditures (Capex). It represents the unencumbered cash available for dividends, acquisitions, debt reduction, or share buybacks.`,
        advanced: `FCF is the fundamental basis of Discounted Cash Flow (DCF) valuation. Owner earnings reflect the net cash that can be extracted from the business without impairing its competitive position.`
      },
      whyYouShouldCare: {
        beginner: "A company with positive free cash flow can pay you dividends or buy other companies without begging banks for money.",
        intermediate: "Companies with negative Free Cash Flow must continually issue new shares (diluting existing investors) or borrow more debt to survive.",
        advanced: "FCF Yield (FCF / Market Cap) gives a much cleaner valuation multiple than P/E because it is free of accounting depreciation policies and accruals."
      },
      whatToInvestigate: [
        "Is current Capex for maintenance or aggressive future growth expansion?",
        "What is the company's FCF conversion rate (FCF / Net Profit)?",
        "How is management allocating excess Free Cash Flow (dividends vs buybacks vs M&A)?"
      ],
      relatedMetrics: ["Operating Cash Flow", "Capital Expenditure", "FCF Yield", "Dividend Payout"]
    })
  },
  debtToEquityRatio: {
    key: "debtToEquityRatio",
    label: "Debt-to-Equity Ratio",
    unit: "x",
    category: "Solvency & Debt",
    calculateSignal: (val) => (val <= 0.3 ? "POSITIVE_SIGNAL" : val <= 0.9 ? "NEEDS_CONTEXT" : val <= 1.5 ? "WATCH" : "RED_FLAG"),
    getExplanation: (val) => ({
      unit: "x",
      benchmark: "< 0.5 for non-financials, < 1.0 for capital intensive",
      whatItMeans: {
        beginner: `For every ₹1 of owners' money in the company, the company has borrowed ₹${Number(val).toFixed(2)} from banks and lenders.`,
        intermediate: `The D/E ratio measures financial leverage. At ${val}x, it indicates the proportion of debt financing relative to total shareholders' book equity.`,
        advanced: `D/E reflects financial risk and solvency cushion. In downturns, high leverage creates fixed interest and principal repayment obligations regardless of operating cash generation.`
      },
      whyYouShouldCare: {
        beginner: "Heavy loans are like high credit card debt. If business slows down, interest payments can choke the company and wipe out shareholder equity.",
        intermediate: "Low debt gives companies the resilience to survive severe economic recessions and acquire weakened competitors at bargain prices.",
        advanced: "High debt raises the weighted average cost of capital (WACC) if default risk climbs, reducing equity enterprise valuation."
      },
      whatToInvestigate: [
        "What is the company's Interest Coverage Ratio (EBIT / Interest Expense)?",
        "Is the debt long-term fixed rate or vulnerable to rising short-term interest rates?",
        "Does the company have enough cash on hand to cover upcoming debt maturities?"
      ],
      relatedMetrics: ["Interest Coverage Ratio", "Total Debt", "Cash and Equivalents", "Current Ratio"]
    })
  },
  currentRatio: {
    key: "currentRatio",
    label: "Current Ratio",
    unit: "x",
    category: "Liquidity",
    calculateSignal: (val) => (val >= 1.5 ? "POSITIVE_SIGNAL" : val >= 1.0 ? "NEEDS_CONTEXT" : val >= 0.8 ? "WATCH" : "RED_FLAG"),
    getExplanation: (val) => ({
      unit: "x",
      benchmark: "1.2x - 2.5x (Industry specific)",
      whatItMeans: {
        beginner: `The company has ₹${Number(val).toFixed(2)} of short-term assets (cash, customer dues) for every ₹1 of bills due within the next 12 months.`,
        intermediate: `Current Ratio = Current Assets / Current Liabilities. At ${val}x, it measures the buffer available to settle short-term obligations over the coming 12-month operating cycle.`,
        advanced: `Liquidity coverage must be interpreted alongside the cash conversion cycle. Negative working capital retailers or tech firms (like Apple) can operate safely with current ratios < 1.0 due to instant customer cash collection and deferred supplier terms.`
      },
      whyYouShouldCare: {
        beginner: "If this number drops too low (< 1.0), the company might struggle to pay suppliers or short-term bills on time without emergency borrowing.",
        intermediate: "A sudden decline in the current ratio signals liquidity tightening, often caused by rising short-term debt or cash burn.",
        advanced: "Excessively high current ratios (> 3.5x) can indicate capital inefficiency—hoarding idle non-interest-bearing cash or failing to collect old receivables."
      },
      whatToInvestigate: [
        "What portion of current assets is actual cash vs slow-moving inventory or receivables?",
        "Has the Quick Ratio (Current Assets excluding inventory) also held up?",
        "Are short-term borrowings increasing faster than trade payables?"
      ],
      relatedMetrics: ["Quick Ratio", "Cash and Equivalents", "Working Capital", "Receivables Days"]
    })
  },
  netProfitMargin: {
    key: "netProfitMargin",
    label: "Net Profit Margin",
    unit: "%",
    category: "Profitability",
    calculateSignal: (val) => (val >= 18 ? "POSITIVE_SIGNAL" : val >= 10 ? "NEEDS_CONTEXT" : val >= 3 ? "WATCH" : "RED_FLAG"),
    getExplanation: (val) => ({
      unit: "%",
      benchmark: "Sector dependent (IT: 15-22%, Retail: 3-6%, Pharma: 12-18%)",
      whatItMeans: {
        beginner: `For every ₹100 of goods or services sold, the company kept ₹${Number(val).toFixed(1)} as pure profit in its pocket after paying every expense, tax, and interest.`,
        intermediate: `Net Profit Margin = (Net Income / Total Revenue) × 100. At ${val}%, it reflects the bottom-line profitability and pricing power after all operating and non-operating costs.`,
        advanced: `Net margin integrity reflects pricing power and moat resilience. A company that maintains stable net margins during high inflation proves it can pass raw material costs to customers.`
      },
      whyYouShouldCare: {
        beginner: "A higher margin gives a safety cushion. If costs rise 5%, a high-margin company stays profitable, while a 2% margin company plunges into heavy losses.",
        intermediate: "Consistent margin expansion indicates operating leverage—fixed costs stay flat while revenues expand.",
        advanced: "Compare net margin with EBITDA margin: wide divergence indicates heavy interest burdens, high depreciation charges, or volatile tax rates."
      },
      whatToInvestigate: [
        "Is margin expansion driven by price increases or one-off other income (selling land/assets)?",
        "Are raw material costs rising faster than selling prices?",
        "How do margins compare against industry peers?"
      ],
      relatedMetrics: ["EBITDA Margin", "Gross Margin", "Revenue Growth", "Operating Leverage"]
    })
  },
  nim: {
    key: "nim",
    label: "Net Interest Margin (NIM)",
    unit: "%",
    category: "Banking Specific",
    calculateSignal: (val) => (val >= 3.8 ? "POSITIVE_SIGNAL" : val >= 3.2 ? "NEEDS_CONTEXT" : val >= 2.5 ? "WATCH" : "RED_FLAG"),
    getExplanation: (val) => ({
      unit: "%",
      benchmark: "3.2% - 4.2% for Indian retail banks",
      whatItMeans: {
        beginner: `For a bank, this is the net spread it makes: the gap between the interest rate it charges borrowers minus the interest rate it pays you on deposits, relative to its total loans.`,
        intermediate: `Net Interest Margin = (Interest Income - Interest Expensed) / Total Earning Assets. At ${val}%, it is the single most important profitability yardstick for commercial banks.`,
        advanced: `NIM dynamics reflect asset-liability management (ALM). Banks with high CASA deposit franchises enjoy lower cost of funds and maintain superior NIMs during rising interest rate cycles.`
      },
      whyYouShouldCare: {
        beginner: "A higher NIM means the bank has cheap access to money and strong pricing power over its borrowers.",
        intermediate: "When central banks cut interest rates, banks with fixed-rate liabilities and floating-rate loans experience NIM compression.",
        advanced: "NIM multiplied by Asset Turnover determines a bank's Return on Assets (ROA), setting the ceiling on sustainable equity compounding."
      },
      whatToInvestigate: [
        "Is the bank's CASA ratio (Current & Savings Accounts) expanding or losing share to expensive term deposits?",
        "Are loan yields falling due to intense competition in retail mortgages?",
        "What is the repricing timeline of the loan book versus deposit liabilities?"
      ],
      relatedMetrics: ["CASA Ratio", "Cost of Funds", "Gross NPA", "Return on Assets (ROA)"]
    })
  },
  grossNPA: {
    key: "grossNPA",
    label: "Gross Non-Performing Assets (GNPA %)",
    unit: "%",
    category: "Banking Specific",
    calculateSignal: (val) => (val <= 1.5 ? "POSITIVE_SIGNAL" : val <= 2.8 ? "NEEDS_CONTEXT" : val <= 4.5 ? "WATCH" : "RED_FLAG"),
    getExplanation: (val) => ({
      unit: "%",
      benchmark: "< 2.0% for high-quality private banks",
      whatItMeans: {
        beginner: `Out of every ₹100 the bank lent out, ₹${Number(val).toFixed(2)} is overdue or in default because borrowers stopped paying their monthly installments on time.`,
        intermediate: `Gross NPA percentage represents the proportion of total gross advances classified as non-performing (typically overdue > 90 days) before deducting provisioning buffers.`,
        advanced: `GNPA trends reflect underwriting discipline and systemic macro credit stress. Persistent GNPA accumulation requires income statement provisioning, reducing net profits and depleting Tier-1 capital.`
      },
      whyYouShouldCare: {
        beginner: "When borrowers stop paying, the bank loses money. If defaults spike, the bank's profits can get wiped out entirely.",
        intermediate: "A declining GNPA trend signals that old bad loans are being recovered and new loans are healthy.",
        advanced: "Always compare GNPA with Net NPA and the Provision Coverage Ratio (PCR). A bank with 1.5% GNPA and 80%+ PCR is thoroughly protected against write-offs."
      },
      whatToInvestigate: [
        "What is the Net NPA after deducting provisions (ideally < 0.5%)?",
        "Which loan sector is contributing most to defaults (unsecured personal loans vs corporate)?",
        "What is the fresh slippage ratio and write-off rate this quarter?"
      ],
      relatedMetrics: ["Net NPA %", "Provision Coverage Ratio", "Credit Cost", "Capital Adequacy Ratio"]
    })
  },
  receivablesGrowthVsRevenue: {
    key: "receivablesGrowthVsRevenue",
    label: "Receivables vs Revenue Trend",
    unit: "Trend",
    category: "Efficiency",
    calculateSignal: (val, ctx) => (ctx?.receivablesGrowth > ctx?.revenueGrowth + 10 ? "WATCH" : "POSITIVE_SIGNAL"),
    getExplanation: (val, ctx) => ({
      benchmark: "Receivables growth should align closely with Revenue growth",
      whatItMeans: {
        beginner: `This compares how fast the company is booking sales on paper versus how fast unpaid IOUs from customers are piling up.`,
        intermediate: `When Accounts Receivable growth outpaces Sales growth, the Days Sales Outstanding (DSO) expands, meaning customers are taking longer to pay their invoices.`,
        advanced: `Receivables expansion faster than top-line revenue indicates potential channel stuffing, aggressive revenue recognition policies, or customer credit deterioration.`
      },
      whyYouShouldCare: {
        beginner: "If a company sells ₹100 of goods but ₹50 is still unpaid six months later, it might never collect that money.",
        intermediate: "Excessive receivables lock up cash in working capital, forcing the company to borrow bank overdrafts to pay immediate suppliers.",
        advanced: "Tracking DSO trend over 3 years prevents falling for accounting optical growth that fails to convert into bank cash."
      },
      whatToInvestigate: [
        "Has the company loosened its customer credit terms to meet quarterly sales targets?",
        "Are older receivables aging past 180 days without adequate bad debt provisions?",
        "Is this receivables spike seasonal or structural across multiple years?"
      ],
      relatedMetrics: ["Operating Cash Flow", "DSO (Days Sales Outstanding)", "Working Capital", "Revenue Growth"]
    })
  }
};

export function getThreeQuestionExplanation(
  metricKey: string,
  currentValue: number | string,
  context?: any
): ThreeQuestionExplanation {
  const metricDef = METRIC_DEFINITIONS[metricKey];
  if (!metricDef) {
    // Default fallback explanation
    return {
      metricKey,
      metricLabel: metricKey.charAt(0).toUpperCase() + metricKey.slice(1),
      currentValue,
      signal: "NEEDS_CONTEXT",
      whatItMeans: {
        beginner: `This financial indicator provides insight into the company's financial operations and performance.`,
        intermediate: `This metric measures operational or structural financial performance for the period.`,
        advanced: `This quantitative ratio reflects financial health and capital allocation efficiency.`
      },
      whyYouShouldCare: {
        beginner: `Understanding this number helps you evaluate whether the business is growing sustainably.`,
        intermediate: `Tracking changes across reporting cycles reveals underlying business trends.`,
        advanced: `Cross-referencing this metric with the three financial statements provides a check against accounting anomalies.`
      },
      whatToInvestigate: [
        "How has this metric evolved over the last 3-5 years?",
        "How does it compare with industry benchmarks and direct peers?",
        "Is the trend corroborated by actual operating cash flow?"
      ],
      relatedMetrics: ["Revenue", "Operating Cash Flow", "Net Profit"]
    };
  }

  const numVal = typeof currentValue === "number" ? currentValue : parseFloat(String(currentValue).replace(/[^0-9.-]/g, "")) || 0;
  const signal = metricDef.calculateSignal(numVal, context);
  const explanation = metricDef.getExplanation(currentValue, context);

  return {
    metricKey: metricDef.key,
    metricLabel: metricDef.label,
    currentValue,
    unit: explanation.unit,
    benchmark: explanation.benchmark,
    signal,
    whatItMeans: explanation.whatItMeans,
    whyYouShouldCare: explanation.whyYouShouldCare,
    whatToInvestigate: explanation.whatToInvestigate,
    relatedMetrics: explanation.relatedMetrics || [],
    conceptDeepDive: explanation.conceptDeepDive,
  };
}
