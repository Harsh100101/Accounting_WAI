import {
  Company,
  CompanyProfile,
  MultiYearFinancials,
  MarketIndex,
  NewsImpactItem,
} from "@/types/financials";

export interface MarketDataProvider {
  getMarketIndices(): Promise<MarketIndex[]>;
  searchCompanies(query: string): Promise<Company[]>;
  getCompanyQuote(ticker: string): Promise<Company | null>;
  getHistoricalPrices(ticker: string, range: '1M' | '6M' | '1Y' | '5Y'): Promise<{ date: string; price: number }[]>;
}

export interface FinancialStatementsProvider {
  getMultiYearFinancials(ticker: string): Promise<MultiYearFinancials | null>;
}

export interface CompanyProfileProvider {
  getCompanyProfile(ticker: string): Promise<CompanyProfile | null>;
  getPeerCompanies(ticker: string): Promise<Company[]>;
}

export interface NewsProvider {
  getCompanyNews(ticker: string): Promise<NewsImpactItem[]>;
}
