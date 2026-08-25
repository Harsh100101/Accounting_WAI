import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, HelpCircle, BookOpen, AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-600 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 p-0.5 shadow-xs">
                <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">AI-Powered Investment Lens</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 max-w-md">
              A financial intelligence and investor-education platform designed to transform complex corporate accounting and market data into plain-language, actionable understanding for non-commerce investors.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg w-fit shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Grounded in verified multi-year financial statements. Zero invented numbers.</span>
            </div>
          </div>

          {/* Col 2: Signature Frameworks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Core Frameworks</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/learn" className="hover:text-indigo-600 transition-colors">Three-Question Metric Framework</Link></li>
              <li><Link href="/learn" className="hover:text-indigo-600 transition-colors">Three-Statement Consistency Engine</Link></li>
              <li><Link href="/learn" className="hover:text-indigo-600 transition-colors">Financial Storyline Synthesis</Link></li>
              <li><Link href="/learn" className="hover:text-indigo-600 transition-colors">Contradiction & Anomaly Detector</Link></li>
              <li><Link href="/learn" className="hover:text-indigo-600 transition-colors">Thesis Challenger & Bias Check</Link></li>
            </ul>
          </div>

          {/* Col 3: Supported Markets */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Coverage</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> NSE & BSE Equities (India)</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> NIFTY 50, SENSEX, Sectoral Indices</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> NASDAQ & NYSE (US Equities)</li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Sector-Aware Banking & Non-Financial Models</li>
            </ul>
          </div>
        </div>

        {/* Mandatory Regulatory & Educational Disclaimer */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex items-start gap-3 bg-amber-50/70 border border-amber-200 p-4 rounded-xl text-xs leading-relaxed text-slate-700">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900 block mb-1">Strict Educational & Informational Disclaimer</span>
              AI-Powered Investment Lens is an educational and financial intelligence research platform. It does not provide buy, sell, or hold recommendations, investment advice, portfolio management, or financial advisory services. All financial metrics and AI-generated interpretations are for conceptual training and research purposes only. Past performance does not guarantee future financial results. Always conduct independent research and consult a licensed SEBI / SEC registered financial advisor before making any financial investment decisions.
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 AI-Powered Investment Lens. Built with modern financial engineering.</p>
            <div className="flex items-center gap-6">
              <span>Timezone: Asia/Kolkata (IST) & America/New_York (EDT)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
