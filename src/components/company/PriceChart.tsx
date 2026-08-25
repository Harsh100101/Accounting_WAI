"use client";

import React, { useState, useEffect } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Activity, 
  Maximize2,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface PricePoint {
  date: string;
  price: number;
  volume?: number;
}

interface PriceChartProps {
  ticker: string;
  currency: 'INR' | 'USD' | 'GBP' | string;
  currencySymbol: string;
  currentPrice: number;
}

export function PriceChart({
  ticker,
  currency,
  currencySymbol,
  currentPrice,
}: PriceChartProps) {
  const safeCurrency: 'INR' | 'USD' | 'GBP' = 
    currency === 'INR' ? 'INR' : currency === 'GBP' ? 'GBP' : 'USD';
  const [range, setRange] = useState<"1M" | "6M" | "1Y" | "5Y">("1M");
  const [data, setData] = useState<PricePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<PricePoint | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/company/${ticker}/chart?range=${range}`)
      .then((res) => res.json())
      .then((json) => {
        if (isMounted && json.success && json.data) {
          setData(json.data);
        }
      })
      .catch((err) => {
        console.warn("Error fetching price chart:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [ticker, range]);

  const firstPoint = data[0];
  const lastPoint = data[data.length - 1];
  const startPrice = firstPoint ? firstPoint.price : currentPrice;
  const endPrice = lastPoint ? lastPoint.price : currentPrice;
  const activePrice = hoveredPoint ? hoveredPoint.price : endPrice;
  const priceDiff = activePrice - startPrice;
  const percentDiff = startPrice > 0 ? (priceDiff / startPrice) * 100 : 0;
  const isPositive = priceDiff >= 0;

  const minPrice = data.length > 0 ? Math.min(...data.map((d) => d.price)) : 0;
  const maxPrice = data.length > 0 ? Math.max(...data.map((d) => d.price)) : 100;
  const yPadding = (maxPrice - minPrice) * 0.1 || 5;

  return (
    <div className="rounded-2xl bg-slate-50/80 border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
      {/* Top Controls: Timeframe, Live Price Display, Range Change */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Interactive Price & Trend Chart
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 border border-indigo-200">
              {range} TIMEFRAME
            </span>
          </div>

          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              {formatCurrency(activePrice, safeCurrency, false)}
            </span>
            <span
              className={`text-xs sm:text-sm font-bold flex items-center gap-1 ${
                isPositive ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {isPositive ? `+${priceDiff.toFixed(2)}` : priceDiff.toFixed(2)} (
              {formatPercent(percentDiff)})
            </span>
          </div>

          {hoveredPoint ? (
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              {new Date(hoveredPoint.date).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          ) : (
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              Period: {range} performance
            </span>
          )}
        </div>

        {/* Range Buttons */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 self-stretch sm:self-auto justify-center shadow-xs">
          {(["1M", "6M", "1Y", "5Y"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                range === r
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative h-64 sm:h-72 w-full pt-2">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Fetching live historical price series...</span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              onMouseMove={(e: any) => {
                if (e && e.activePayload && e.activePayload.length > 0) {
                  setHoveredPoint(e.activePayload[0].payload);
                }
              }}
              onMouseLeave={() => setHoveredPoint(null)}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="priceGradientLight" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isPositive ? "#059669" : "#e11d48"}
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor={isPositive ? "#059669" : "#e11d48"}
                    stopOpacity={0.0}
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(str) => {
                  const d = new Date(str);
                  return range === "1M"
                    ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    : d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
                }}
              />

              <YAxis
                domain={[Math.max(0, minPrice - yPadding), maxPrice + yPadding]}
                stroke="#94a3b8"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                orientation="right"
                tickFormatter={(val) => `${currencySymbol}${val >= 1000 ? (val / 1000).toFixed(1) + "k" : val.toFixed(0)}`}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const pt = payload[0].payload as PricePoint;
                    return (
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xl text-xs space-y-1">
                        <div className="text-slate-500 text-[10px]">{pt.date}</div>
                        <div className="text-slate-900 font-bold text-sm font-sans">
                          {formatCurrency(pt.price, safeCurrency, false)}
                        </div>
                        {pt.volume ? (
                          <div className="text-slate-500 text-[10px]">
                            Vol: {(pt.volume / 1000000).toFixed(2)}M shares
                          </div>
                        ) : null}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#059669" : "#e11d48"}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#priceGradientLight)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Range Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-200 text-xs font-sans">
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-[10px] font-semibold block">Period Low</span>
          <span className="font-bold text-slate-900">
            {formatCurrency(minPrice, safeCurrency, false)}
          </span>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-[10px] font-semibold block">Period High</span>
          <span className="font-bold text-slate-900">
            {formatCurrency(maxPrice, safeCurrency, false)}
          </span>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-[10px] font-semibold block">Period Spread</span>
          <span className="font-bold text-indigo-700">
            {formatCurrency(maxPrice - minPrice, safeCurrency, false)}
          </span>
        </div>
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-500 text-[10px] font-semibold block">Data Points</span>
          <span className="font-bold text-slate-900">{data.length} sessions</span>
        </div>
      </div>
    </div>
  );
}
