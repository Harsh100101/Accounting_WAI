"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Compass, Scale, Bookmark, Bot, GraduationCap } from "lucide-react";
import { useLearning } from "@/context/LearningModeContext";

interface MobileNavProps {
  onOpenTutor?: () => void;
}

export function MobileNav({ onOpenTutor }: MobileNavProps) {
  const pathname = usePathname();
  const { compareList, watchlist } = useLearning();

  const links = [
    { href: "/", label: "Dashboard", icon: Activity },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/compare", label: "Compare", icon: Scale, badge: compareList.length > 0 ? compareList.length : undefined },
    { href: "/portfolio", label: "Portfolio", icon: Bookmark, badge: watchlist.length > 0 ? watchlist.length : undefined },
    { href: "/learn", label: "Learn", icon: GraduationCap },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-40 w-full lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-lg px-2 py-1.5 flex items-center justify-around shadow-lg">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-medium transition-colors relative ${
              isActive ? "text-indigo-600 font-bold" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span>{link.label}</span>
            {link.badge !== undefined && (
              <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                {link.badge}
              </span>
            )}
          </Link>
        );
      })}

      {onOpenTutor && (
        <button
          onClick={onOpenTutor}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-bold text-indigo-600"
        >
          <Bot className="w-5 h-5 mb-0.5" />
          <span>AI Tutor</span>
        </button>
      )}
    </div>
  );
}
