"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  Search, 
  Layers, 
  Bookmark, 
  GraduationCap, 
  Bot, 
  Activity, 
  Scale, 
  Compass, 
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";
import { useLearning } from "@/context/LearningModeContext";
import { LearningMode } from "@/types/financials";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenTutor?: () => void;
}

export function Navbar({ onOpenSearch, onOpenTutor }: NavbarProps) {
  const pathname = usePathname();
  const { learningMode, setLearningMode, compareList, watchlist } = useLearning();
  const [showModeDropdown, setShowModeDropdown] = useState(false);

  const navLinks = [
    { href: "/", label: "Dashboard", icon: Activity },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/compare", label: "Compare", icon: Scale, badge: compareList.length > 0 ? compareList.length : undefined },
    { href: "/portfolio", label: "Portfolio", icon: Bookmark, badge: watchlist.length > 0 ? watchlist.length : undefined },
    { href: "/learn", label: "Learn", icon: GraduationCap },
  ];

  const modeLabels: Record<LearningMode, { label: string; desc: string; badge: string }> = {
    beginner: { label: "Beginner", desc: "Everyday language, zero jargon", badge: "bg-emerald-100 text-emerald-800" },
    intermediate: { label: "Intermediate", desc: "Clear accounting terminology", badge: "bg-indigo-100 text-indigo-800" },
    advanced: { label: "Advanced", desc: "In-depth financial & DuPont analysis", badge: "bg-purple-100 text-purple-800" },
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Educational Banner */}
      <div className="bg-indigo-50/90 border-b border-indigo-100/80 px-4 py-1.5 text-center text-xs text-indigo-900">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span className="font-bold text-indigo-950">Investment Lens Rule:</span> We teach you what numbers mean and why to care. No BUY/SELL advice.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
            </div>
          </div>
          <div>
            <div className="font-bold text-slate-900 tracking-tight text-base sm:text-lg flex items-center gap-1.5">
              Investment Lens
              <span className="text-[10px] uppercase font-sans px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-bold border border-indigo-200">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Financial Intelligence & Investor Education</p>
          </div>
        </Link>

        {/* Search Bar Trigger - Fixed alignment, clean wording, truncation protection */}
        <div className="flex-1 max-w-md hidden md:block min-w-0">
          <button
            onClick={onOpenSearch}
            className="w-full h-10 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-indigo-300 text-left text-sm text-slate-500 hover:text-slate-800 flex items-center justify-between transition-all group shadow-xs cursor-pointer"
          >
            <span className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
              <span className="truncate text-xs sm:text-sm text-slate-500 group-hover:text-slate-700">
                Search companies, tickers, or metrics...
              </span>
            </span>
            <kbd className="hidden lg:inline-flex text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md bg-white text-slate-500 border border-slate-200 shadow-xs shrink-0">
              Ctrl + K
            </kbd>
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors relative ${
                  isActive
                    ? "text-indigo-700 bg-indigo-50 border border-indigo-200/80 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-600" : "text-slate-500"}`} />
                {link.label}
                {link.badge !== undefined && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Learning Mode Selector & AI Tutor */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 md:hidden"
            aria-label="Search companies"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Learning Mode Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowModeDropdown(!showModeDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 shadow-xs transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline text-slate-500 font-normal">Mode:</span>
              <span className="font-bold text-slate-900 capitalize">{learningMode}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showModeDropdown && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setShowModeDropdown(false)}
              >
                <div className="px-2 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Investor Learning Mode
                </div>
                {(["beginner", "intermediate", "advanced"] as LearningMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setLearningMode(mode);
                      setShowModeDropdown(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex flex-col gap-0.5 ${
                      learningMode === mode
                        ? "bg-indigo-50 border border-indigo-200 text-indigo-900"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>{modeLabels[mode].label}</span>
                      {learningMode === mode && (
                        <span className="text-[10px] text-indigo-600 font-bold">Active</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">{modeLabels[mode].desc}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Analyst Trigger */}
          {onOpenTutor && (
            <button
              onClick={onOpenTutor}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask AI Tutor</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
