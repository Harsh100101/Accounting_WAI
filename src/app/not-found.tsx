"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Search, Compass, Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 shadow-sm">
        <HelpCircle className="w-8 h-8 text-indigo-600 animate-pulse" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full mb-3">
        404 Page Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
        Financial Intelligence Page Not Found
      </h1>

      <p className="text-slate-600 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        The company ticker or resource you are looking for may have moved, or the symbol might not be registered in our registry yet.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl transition shadow-sm"
        >
          <Home className="w-4 h-4" />
          Back to Overview
        </Link>

        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 transition shadow-xs"
        >
          <Compass className="w-4 h-4 text-slate-500" />
          Explore Companies
        </Link>
      </div>
    </div>
  );
}
