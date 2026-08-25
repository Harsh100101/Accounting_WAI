"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  X, 
  TrendingUp, 
  TrendingDown, 
  Scale, 
  Bookmark, 
  ChevronRight, 
  RefreshCw,
  Sparkles
} from "lucide-react";
import { DEMO_COMPANIES } from "@/lib/providers/demoData";
import { Company } from "@/types/financials";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { useLearning } from "@/context/LearningModeContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { addToCompare, toggleWatchlist, isInWatchlist } = useLearning();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Company[]>(DEMO_COMPANIES);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearchQuery("");
      setResults(DEMO_COMPANIES);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Live async search with 250ms debounce
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setResults(DEMO_COMPANIES);
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`/api/market/search?q=${encodeURIComponent(searchQuery.trim())}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setResults(json.data);
          } else {
            // Local filter fallback
            const q = searchQuery.toLowerCase().trim();
            const matched = DEMO_COMPANIES.filter(
              (c) =>
                c.ticker.toLowerCase().includes(q) ||
                c.displayName.toLowerCase().includes(q) ||
                c.legalName.toLowerCase().includes(q) ||
                c.sectorName.toLowerCase().includes(q) ||
                c.industry.toLowerCase().includes(q)
            );
            // If no match found in demo, create a direct navigable item for the entered ticker
            if (matched.length === 0 && searchQuery.trim().length >= 1) {
              const sym = searchQuery.toUpperCase().trim();
              matched.push({
                id: `dynamic-${sym.toLowerCase()}`,
                legalName: `${sym} Enterprise`,
                displayName: sym,
                ticker: sym,
                exchange: "NASDAQ",
                country: "United States",
                currency: "USD",
                currencySymbol: "$",
                sector: "IT_SERVICES",
                sectorName: "Public Stock",
                industry: "Global Market",
                marketCap: 0,
                currentPrice: 0,
                changeValue: 0,
                changePercent: 0,
                high52Week: 0,
                low52Week: 0,
                dataSource: "Live API Search",
                lastUpdated: "Just Now",
                marketStatus: "LIVE",
                isDemoData: false,
              });
            }
            setResults(matched);
          }
        })
        .catch(() => {
          const q = searchQuery.toLowerCase().trim();
          setResults(
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

  if (!isOpen) return null;

  const handleSelect = (company: Company) => {
    router.push(`/company/${company.ticker}`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/80">
          {loading ? (
            <RefreshCw className="w-5 h-5 text-indigo-600 shrink-0 mr-3 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-indigo-600 shrink-0 mr-3" />
          )}
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a company name or ticker (e.g. TCS, Reliance, AAPL, NVDA, INFY)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
              } else if (e.key === "Enter" && results[selectedIndex]) {
                e.preventDefault();
                handleSelect(results[selectedIndex]);
              }
            }}
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md bg-white text-slate-500 border border-slate-200 shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-100">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Companies & Stocks ({results.length})</span>
            <span className="text-[10px] text-indigo-600 font-semibold">Live Intelligence</span>
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              <p>No company found for &quot;{searchQuery}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">
                Type any ticker symbol (like AAPL, MSFT, NVDA) to fetch its financial analysis.
              </p>
            </div>
          ) : (
            results.map((c, index) => {
              const isSelected = index === selectedIndex;
              const isPositive = c.changePercent >= 0;
              const inWatch = isInWatchlist(c.ticker);

              return (
                <div
                  key={c.id || c.ticker}
                  onClick={() => handleSelect(c)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full px-3 py-2.5 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer group ${
                    isSelected ? "bg-indigo-50/80 border border-indigo-200 text-slate-900" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center font-sans font-bold text-xs text-indigo-700 shrink-0">
                      {c.ticker.slice(0, 4)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{c.displayName}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {c.exchange}: {c.ticker}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {c.country}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">
                        {c.sectorName} • {c.industry}
                      </p>
                    </div>
                  </div>

                  {/* Price & Quick Actions */}
                  <div className="flex items-center gap-3">
                    {c.currentPrice > 0 ? (
                      <div className="text-right">
                        <div className="font-sans font-bold text-sm text-slate-900">
                          {formatCurrency(c.currentPrice, c.currency, false)}
                        </div>
                        <div className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {formatPercent(c.changePercent)}
                        </div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-indigo-600 font-semibold px-2 py-1 rounded bg-indigo-50 border border-indigo-200">
                        Open Analysis →
                      </span>
                    )}

                    <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        title="Add to Compare"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCompare(c.ticker);
                        }}
                        className="p-1.5 rounded-lg bg-white hover:bg-indigo-50 border border-slate-200 text-slate-600 hover:text-indigo-700 transition-colors shadow-xs"
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title={inWatch ? "Remove from Watchlist" : "Add to Watchlist"}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWatchlist(c.ticker);
                        }}
                        className={`p-1.5 rounded-lg border transition-colors shadow-xs ${
                          inWatch
                            ? "bg-amber-100 border-amber-300 text-amber-800"
                            : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span><kbd className="font-sans font-semibold bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-xs">↑↓</kbd> Navigate</span>
            <span><kbd className="font-sans font-semibold bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-xs">Enter</kbd> Open Lens</span>
            <span><kbd className="font-sans font-semibold bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-xs">Esc</kbd> Close</span>
          </div>
          <span className="text-indigo-600 font-semibold hidden sm:inline">AI Financial Lens Ready</span>
        </div>
      </div>
    </div>
  );
}
