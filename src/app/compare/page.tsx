"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ComparisonView } from "@/components/compare/ComparisonView";

function CompareContent() {
  const searchParams = useSearchParams();
  const tickersParam = searchParams.get("tickers");
  const initialTickers = tickersParam ? tickersParam.split(",") : ["TCS", "INFY"];

  return <ComparisonView initialTickers={initialTickers} />;
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono">Loading Comparison Engine...</div>}>
      <CompareContent />
    </Suspense>
  );
}
