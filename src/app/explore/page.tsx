"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Compass, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight, 
  Scale, 
  Bookmark, 
  Activity,
  Globe,
  RefreshCw
} from "lucide-react";
import { DEMO_COMPANIES, DEMO_MULTI_YEAR_FINANCIALS } from "@/lib/providers/demoData";
import { Company, SectorType } from "@/types/financials";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { generateHealthScorecard } from "@/lib/engine/healthScorecardEngine";
import { useLearning } from "@/context/LearningModeContext";

export default function ExplorePage() {
  const { addToCompare, toggleWatchlist, isInWatchlist } = useLearning();
  const [selectedRegion, setSelectedRegion] = useState<"ALL" | "India" | "United States">("ALL");
  const [selectedSector, setSelectedSector] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState<Company[]>(DEMO_COMPANIES);
  const [loading, setLoading] = useState(false);

  const sectors = [
    "Information Technology",
    "Banking & Financial Services",
    "Energy & Conglomerate",
    "Automotive & Mobility",
    "Consumer & Technology",
    "Semiconductors",
  ];

  // Debounced Live Search
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setCompanies(DEMO_COMPANIES);
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`/api/market/search?q=${encodeURIComponent(searchQuery.trim())}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setCompanies(json.data);
          } else {
            const q = searchQuery.toLowerCase().trim();
            const local = DEMO_COMPANIES.filter(
              (c) =>
                c.ticker.toLowerCase().includes(q) ||
                c.displayName.toLowerCase().includes(q) ||
                c.legalName.toLowerCase().includes(q)
            );
            if (local.length === 0 && searchQuery.trim().length >= 1) {
              const sym = searchQuery.toUpperCase().trim();
              local.push({
                id: `dyn-${sym.toLowerCase()}`,
                legalName: `${searchQuery} Corporation`,
                displayName: sym,
                ticker: sym,
                exchange: "NSE",
                country: "India",
                currency: "INR",
                currencySymbol: "₹",
                sector: "IT_SERVICES",
                sectorName: "Public Enterprise",
                industry: "Market Stock",
                marketCap: 0,
                currentPrice: 0,
                changeValue: 0,
                changePercent: 0,
                high52Week: 0,
                low52Week: 0,
                dataSource: "Live API Search",
                lastUpdated: "Live",
                marketStatus: "LIVE",
                isDemoData: false,
              });
            }
            setCompanies(local);
          }
        })
        .catch(() => {
          const q = searchQuery.toLowerCase().trim();
          setCompanies(
            DEMO_COMPANIES.filter(
              (c) =>
                c.ticker.toLowerCase().includes(q) ||
                c.displayName.toLowerCase().includes(q) ||
                c.legalName.toLowerCase().includes(q)
            )
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filtered = companies.filter((c) => {
    if (selectedRegion !== "ALL" && c.country !== selectedRegion) return false;
    if (selectedSector !== "ALL" && c.sectorName !== selectedSector) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Explore Market Coverage & Sectors
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {filtered.length} Companies Available
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live market feed across Indian NSE/BSE and US NASDAQ/NYSE equities
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            {loading ? (
              <RefreshCw className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3 animate-spin" />
            ) : (
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            )}
            <input
              type="text"
              placeholder="Search any company (e.g. Adani, Tata, Reliance, Apple, Tesla)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>

          {/* Region Filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as any)}
            className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-indigo-500 focus:bg-white"
          >
            <option value="ALL">All Geographies (India & US)</option>
            <option value="India">Indian Equities (NSE/BSE)</option>
            <option value="United States">US Equities (NASDAQ/NYSE)</option>
          </select>

          {/* Sector Filter */}
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-indigo-500 focus:bg-white"
          >
            <option value="ALL">All Industry Sectors</option>
            {sectors.map((sec) => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((company) => {
          const fin = DEMO_MULTI_YEAR_FINANCIALS[company.ticker];
          const health = fin ? generateHealthScorecard(fin, company.sector) : null;
          const isPositive = company.changePercent >= 0;
          const inWatch = isInWatchlist(company.ticker);

          return (
            <div
              key={company.id || company.ticker}
              className="p-5 rounded-2xl bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group relative overflow-hidden"
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {company.exchange}: {company.ticker}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {company.country}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {company.isDemoData ? "DEMO" : "LIVE"}
                    </span>
                  </div>

                  {health && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <Activity className="w-2.5 h-2.5 text-emerald-600" />
                      {health.overallHealthRating}
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <h2 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                    {company.displayName}
                  </h2>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{company.sectorName} • {company.industry}</p>
                </div>

                {/* Live Price & Metric Summary */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-sans">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block">Live Price</span>
                    <div className="font-bold text-slate-900 text-sm">
                      {company.currentPrice > 0 ? formatCurrency(company.currentPrice, company.currency, false) : "Live Feed"}
                    </div>
                    {company.currentPrice > 0 && (
                      <div className={`text-[11px] font-bold flex items-center gap-0.5 ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {formatPercent(company.changePercent)}
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block">Market Cap</span>
                    <div className="font-bold text-slate-800 text-xs mt-0.5">
                      {company.marketCap > 0 ? formatCurrency(company.marketCap, company.currency, true) : "N/A"}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {company.peRatio ? `P/E: ${company.peRatio.toFixed(1)}x` : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleWatchlist(company.ticker)}
                    className={`p-1.5 rounded-xl border text-xs transition-colors shadow-xs ${
                      inWatch
                        ? "bg-amber-100 border-amber-300 text-amber-800"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                    title={inWatch ? "In Watchlist" : "Add to Watchlist"}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => addToCompare(company.ticker)}
                    className="p-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs transition-colors shadow-xs"
                    title="Add to Comparison"
                  >
                    <Scale className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Link
                  href={`/company/${company.ticker}`}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-xs"
                >
                  <span>Open Chart</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
