import React from "react";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-xs animate-pulse">
          <Sparkles className="w-6 h-6 text-indigo-600 animate-spin" style={{ animationDuration: "3s" }} />
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
        Loading Financial Intelligence...
      </p>
    </div>
  );
}
