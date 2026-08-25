"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { LearningMode, ThreeQuestionExplanation } from "@/types/financials";
import { getThreeQuestionExplanation } from "@/lib/engine/threeQuestionEngine";

interface LearningContextType {
  learningMode: LearningMode;
  setLearningMode: (mode: LearningMode) => void;
  watchlist: string[];
  toggleWatchlist: (ticker: string) => void;
  isInWatchlist: (ticker: string) => boolean;
  compareList: string[];
  addToCompare: (ticker: string) => void;
  removeFromCompare: (ticker: string) => void;
  clearCompare: () => void;
  explainingMetric: ThreeQuestionExplanation | null;
  explainNumber: (metricKey: string, value: string | number, context?: any) => void;
  closeExplainer: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [learningMode, setLearningModeState] = useState<LearningMode>("beginner");
  const [watchlist, setWatchlist] = useState<string[]>(["TCS", "RELIANCE", "HDFCBANK", "AAPL"]);
  const [compareList, setCompareList] = useState<string[]>(["TCS", "INFY"]);
  const [explainingMetric, setExplainingMetric] = useState<ThreeQuestionExplanation | null>(null);

  useEffect(() => {
    try {
      const savedMode = localStorage.getItem("investor_learning_mode") as LearningMode;
      if (savedMode && ["beginner", "intermediate", "advanced"].includes(savedMode)) {
        setLearningModeState(savedMode);
      }
      const savedWatchlist = localStorage.getItem("investor_watchlist");
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
    } catch (e) {
      // Local storage unavailable
    }
  }, []);

  const setLearningMode = (mode: LearningMode) => {
    setLearningModeState(mode);
    try {
      localStorage.setItem("investor_learning_mode", mode);
    } catch (e) {}
  };

  const toggleWatchlist = (ticker: string) => {
    setWatchlist((prev) => {
      const exists = prev.includes(ticker);
      const updated = exists ? prev.filter((t) => t !== ticker) : [...prev, ticker];
      try {
        localStorage.setItem("investor_watchlist", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const isInWatchlist = (ticker: string) => watchlist.includes(ticker);

  const addToCompare = (ticker: string) => {
    setCompareList((prev) => {
      if (prev.includes(ticker)) return prev;
      if (prev.length >= 4) {
        return [...prev.slice(1), ticker];
      }
      return [...prev, ticker];
    });
  };

  const removeFromCompare = (ticker: string) => {
    setCompareList((prev) => prev.filter((t) => t !== ticker));
  };

  const clearCompare = () => setCompareList([]);

  const explainNumber = (metricKey: string, value: string | number, context?: any) => {
    const explanation = getThreeQuestionExplanation(metricKey, value, context);
    setExplainingMetric(explanation);
  };

  const closeExplainer = () => setExplainingMetric(null);

  return (
    <LearningContext.Provider
      value={{
        learningMode,
        setLearningMode,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        explainingMetric,
        explainNumber,
        closeExplainer,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used within a LearningProvider");
  }
  return context;
}
