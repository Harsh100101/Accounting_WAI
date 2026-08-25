export type LearningMode = 'beginner' | 'intermediate' | 'advanced';

export type SignalType = 
  | 'POSITIVE_SIGNAL'
  | 'WATCH'
  | 'RED_FLAG'
  | 'WORTH_INVESTIGATING'
  | 'NEEDS_CONTEXT'
  | 'STRONG_TREND'
  | 'WEAKENING_TREND'
  | 'MIXED_SIGNAL';

export type MarketStatus = 'LIVE' | 'DELAYED' | 'MARKET_CLOSED' | 'DATA_UNAVAILABLE';

export type SectorType = 
  | 'IT_SERVICES'
  | 'BANKING_FINANCE'
  | 'ENERGY_OIL_GAS'
  | 'CONSUMER_RETAIL'
  | 'AUTOMOTIVE'
  | 'PHARMACEUTICALS'
  | 'TELECOMMUNICATIONS'
  | 'CONGLOMERATE'
  | 'SEMICONDUCTORS'
  | 'MANUFACTURING';

export interface MarketIndex {
  symbol: string;
  name: string;
  region: 'INDIA' | 'GLOBAL';
  currentValue: number;
  changeValue: number;
  changePercent: number;
  sparkline: number[];
  status: MarketStatus;
  lastUpdated: string;
}

export interface Company {
  id: string;
  legalName: string;
  displayName: string;
  ticker: string;
  exchange: 'NSE' | 'BSE' | 'NASDAQ' | 'NYSE' | 'LSE';
  country: 'India' | 'United States' | 'United Kingdom';
  currency: 'INR' | 'USD' | 'GBP';
  currencySymbol: string;
  isin?: string;
  sector: SectorType;
  sectorName: string;
  industry: string;
  marketCap: number; // in raw numbers
  currentPrice: number;
  changeValue: number;
  changePercent: number;
  peRatio?: number;
  pbRatio?: number;
  dividendYield?: number;
  high52Week: number;
  low52Week: number;
  dataSource: string;
  lastUpdated: string;
  marketStatus: MarketStatus;
  isDemoData: boolean;
}

export interface BusinessSegment {
  name: string;
  revenueSharePercent: number;
  description: string;
}

export interface CompanyProfile {
  company: Company;
  plainLanguageOverview: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  howItMakesMoney: string[];
  businessSegments: BusinessSegment[];
  geographicExposure: { region: string; percent: number }[];
  keyCustomersOrPartners: string[];
  majorDependencies: string[];
  peerTickers: string[];
}

export interface AnnualIncomeStatement {
  year: number; // e.g. 2026, 2025, 2024
  revenue: number;
  revenueGrowthPercent: number;
  rawMaterialCosts?: number;
  employeeCosts?: number;
  ebitda: number;
  ebitdaMarginPercent: number;
  depreciation: number;
  ebit: number;
  interestExpense: number;
  interestCoverageRatio: number;
  taxExpense: number;
  netProfit: number;
  netProfitMarginPercent: number;
  eps: number;
  sharesOutstanding: number; // in millions
}

export interface AnnualBalanceSheet {
  year: number;
  totalAssets: number;
  totalLiabilities: number;
  shareholdersEquity: number;
  totalDebt: number;
  shortTermDebt: number;
  longTermDebt: number;
  cashAndEquivalents: number;
  receivables: number;
  inventory?: number;
  currentAssets: number;
  currentLiabilities: number;
  workingCapital: number;
  currentRatio: number;
  quickRatio: number;
  debtToEquityRatio: number;
}

export interface AnnualCashFlow {
  year: number;
  operatingCashFlow: number;
  capitalExpenditure: number; // Capex (positive or negative convention)
  freeCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  dividendsPaid: number;
  netChangeInCash: number;
}

// Banking / NBFC specific statement extensions
export interface BankingFinancialMetrics {
  year: number;
  netInterestIncome: number;
  netInterestMargin: number; // NIM %
  grossNPA: number;
  grossNPAPercent: number; // GNPA %
  netNPA: number;
  netNPAPercent: number; // NNPA %
  casaRatio: number; // CASA %
  capitalAdequacyRatio: number; // CAR %
  costToIncomeRatio: number;
  returnOnAssets: number; // ROA %
  returnOnEquity: number; // ROE %
  totalAdvances: number;
  totalDeposits: number;
  creditGrowthPercent: number;
  depositGrowthPercent: number;
}

export interface QuarterlyFinancialSnapshot {
  quarter: string; // e.g. "Q1 FY26", "Q4 FY25"
  periodEndDate: string;
  revenue: number;
  netProfit: number;
  operatingCashFlow?: number;
  ebitdaMarginPercent: number;
  receivables?: number;
  debt?: number;
  yoyRevenueGrowth: number;
  yoyProfitGrowth: number;
}

export interface MultiYearFinancials {
  ticker: string;
  currency: string;
  currencySymbol: string;
  incomeStatements: AnnualIncomeStatement[];
  balanceSheets: AnnualBalanceSheet[];
  cashFlowStatements: AnnualCashFlow[];
  quarterlySnapshots: QuarterlyFinancialSnapshot[];
  bankingMetrics?: BankingFinancialMetrics[];
}

export interface ThreeQuestionExplanation {
  metricKey: string;
  metricLabel: string;
  currentValue: string | number;
  unit?: string;
  benchmark?: string;
  signal: SignalType;
  whatItMeans: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  whyYouShouldCare: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  whatToInvestigate: string[];
  relatedMetrics: string[];
  conceptDeepDive?: string;
}

export interface ContradictionAnomaly {
  id: string;
  title: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
  signal: SignalType;
  primaryMetricsInvolved: string[];
  plainLanguageSummary: string;
  evidence: {
    statement: string;
    metric: string;
    trend: string;
  }[];
  whyItMatters: string;
  investigativeQuestions: {
    id: string;
    question: string;
    accountingExplanation: string;
  }[];
}

export interface FinancialStoryYear {
  year: number;
  revenue: number;
  profit: number;
  cashFlow: number;
  debt: number;
  receivables: number;
  keyShiftTitle: string;
  summary: string;
}

export interface FinancialStory {
  ticker: string;
  title: string;
  headlineSummary: string;
  evolutionTimeline: FinancialStoryYear[];
  theNarrative: string;
  biggestStrengths: string[];
  biggestBlindspots: string[];
  overallSignal: SignalType;
}

export interface HealthPillar {
  name: 'Profitability' | 'Liquidity' | 'Solvency' | 'Cash Flow' | 'Growth' | 'Efficiency' | 'Earnings Quality';
  score: number; // 0 - 100
  status: 'Strong' | 'Moderate' | 'Watch' | 'Concern';
  signal: SignalType;
  trend: 'Improving' | 'Stable' | 'Deteriorating';
  keyDrivers: string[];
  aiExplanation: string;
  whatToInvestigate: string;
  supportingMetrics: { label: string; value: string; status: 'good' | 'warning' | 'neutral' }[];
}

export interface FinancialHealthScorecard {
  overallHealthRating: 'Strong' | 'Moderate' | 'Watch' | 'Concern';
  overallSignal: SignalType;
  pillars: HealthPillar[];
  methodologyNote: string;
}

export interface RedFlagItem {
  id: string;
  category: 
    | 'Liquidity Risk' 
    | 'Debt Risk' 
    | 'Cash Flow Risk' 
    | 'Earnings Quality Risk' 
    | 'Working Capital Risk' 
    | 'Dilution Risk' 
    | 'Profitability Risk' 
    | 'Governance & Disclosures';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  evidence: string;
  historicalTrend: string;
  explanation: string;
  possibleCauses: string[];
  questionsToInvestigate: string[];
}

export interface NewsImpactItem {
  id: string;
  headline: string;
  source: string;
  date: string;
  url?: string;
  category: 
    | 'Results' 
    | 'Management' 
    | 'Regulatory' 
    | 'Expansion' 
    | 'Debt & Financing' 
    | 'Acquisition' 
    | 'Litigation' 
    | 'Corporate Governance' 
    | 'Dividend & Buyback' 
    | 'Capex' 
    | 'Industry Macro';
  geminiExplanation: string;
  metricsToWatch: string[];
  potentialStatementImpact: 'Income Statement' | 'Balance Sheet' | 'Cash Flow' | 'Multiple';
}

export interface QuarterlyComparisonChange {
  quarterName: string;
  previousQuarterName: string;
  fiveThingsThatChanged: {
    number: number;
    title: string;
    signal: SignalType;
    explanation: string;
    metricChange: string;
  }[];
}

export interface ThesisChallengeResponse {
  userThesis: string;
  thesisStatus: 'Plausible with Blindspots' | 'Strongly Supported by Data' | 'Significant Contradictions Found';
  thesisSummary: string;
  supportingEvidenceFromFinancials: string[];
  criticalQuestionsChallengingThesis: {
    question: string;
    financialDataPoint: string;
    whyThisMatters: string;
  }[];
  checklistItems: {
    topic: string;
    status: 'Checked - Strong' | 'Checked - Mixed' | 'Checked - Watch' | 'Not Supported';
    detail: string;
  }[];
  suggestedAction: string;
}

export interface BiasCheckResult {
  userInitialView: 'Bullish' | 'Neutral' | 'Bearish' | 'I don\'t know';
  bullishEvidenceCount: number;
  bearishOrWatchEvidenceCount: number;
  biasAnalysisMessage: string;
  groundedFactsFor: string[];
  groundedFactsAgainst: string[];
  learningTakeaway: string;
}

export interface ComparisonCompanyInsight {
  ticker: string;
  displayName: string;
  strengths: string[];
  watchAreas: string[];
}

export interface MultiCompanyComparisonResult {
  companies: Company[];
  summaryNarrative: string;
  differentiatingFactors: string;
  insightsByCompany: ComparisonCompanyInsight[];
  mixedSignals: string[];
  keyQuestionsForInvestors: string[];
  comparisonTableRows: {
    category: string;
    metricKey: string;
    metricLabel: string;
    valuesByTicker: Record<string, string | number>;
    leaderTicker?: string;
    context: string;
  }[];
}

export interface TutorChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  groundedMetricsReferenced?: {
    metric: string;
    value: string;
    period: string;
  }[];
  suggestedFollowUps?: string[];
  sourceDisclaimer: string;
}
