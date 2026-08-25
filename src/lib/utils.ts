import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SignalType } from "@/types/financials";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency amounts with proper Indian Crores/Lakhs or Global Millions/Billions
 */
export function formatCurrency(
  value: number | undefined | null,
  currency: 'INR' | 'USD' | 'GBP' = 'INR',
  compact: boolean = true
): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "N/A";
  }

  const symbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '£';
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  if (currency === 'INR') {
    if (!compact) {
      return `${isNegative ? '-' : ''}${symbol}${absValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    }
    if (absValue >= 10000000) {
      // Crores (1 Cr = 10,000,000)
      const crores = absValue / 10000000;
      if (crores >= 100000) {
        return `${isNegative ? '-' : ''}${symbol}${(crores / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Lakh Cr`;
      }
      return `${isNegative ? '-' : ''}${symbol}${crores.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`;
    }
    if (absValue >= 100000) {
      // Lakhs (1 Lakh = 100,000)
      const lakhs = absValue / 100000;
      return `${isNegative ? '-' : ''}${symbol}${lakhs.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Lakh`;
    }
    if (absValue >= 1000) {
      return `${isNegative ? '-' : ''}${symbol}${absValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    }
    return `${isNegative ? '-' : ''}${symbol}${absValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  } else {
    // USD / GBP formatting
    if (!compact) {
      return `${isNegative ? '-' : ''}${symbol}${absValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    }
    if (absValue >= 1e12) {
      return `${isNegative ? '-' : ''}${symbol}${(absValue / 1e12).toLocaleString('en-US', { maximumFractionDigits: 2 })}T`;
    }
    if (absValue >= 1e9) {
      return `${isNegative ? '-' : ''}${symbol}${(absValue / 1e9).toLocaleString('en-US', { maximumFractionDigits: 2 })}B`;
    }
    if (absValue >= 1e6) {
      return `${isNegative ? '-' : ''}${symbol}${(absValue / 1e6).toLocaleString('en-US', { maximumFractionDigits: 2 })}M`;
    }
    if (absValue >= 1e3) {
      return `${isNegative ? '-' : ''}${symbol}${(absValue / 1e3).toLocaleString('en-US', { maximumFractionDigits: 2 })}k`;
    }
    return `${isNegative ? '-' : ''}${symbol}${absValue.toFixed(2)}`;
  }
}

/**
 * Format corporate financial amounts into Indian Crores (Cr) or Global Billions/Millions.
 * Handles both raw currency amounts (e.g. 1431360000000 -> ₹1,43,136 Cr) 
 * and pre-scaled statement amounts (e.g. 254800 -> ₹2,54,800 Cr).
 */
export function formatFinancialAmount(
  value: number | undefined | null,
  currencySymbol: string = "₹",
  isRatioOrEPS: boolean = false
): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "N/A";
  }

  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // If it's EPS or a small unit
  if (isRatioOrEPS || (absValue < 1000 && absValue > 0)) {
    return `${isNegative ? '-' : ''}${currencySymbol}${absValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  const isINR = currencySymbol === "₹" || currencySymbol === "INR";

  if (isINR) {
    if (absValue >= 10000000) {
      // Raw currency value (e.g. 1431360000000 -> 143136 Cr)
      const crores = absValue / 10000000;
      if (crores >= 100000) {
        return `${isNegative ? '-' : ''}${currencySymbol}${(crores / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Lakh Cr`;
      }
      return `${isNegative ? '-' : ''}${currencySymbol}${crores.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`;
    }
    if (absValue >= 1000) {
      // Pre-scaled statement numbers in Crores (e.g. 254800 -> ₹2,54,800 Cr)
      return `${isNegative ? '-' : ''}${currencySymbol}${absValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`;
    }
    return `${isNegative ? '-' : ''}${currencySymbol}${absValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  } else {
    // USD / Global symbols ($, £, €)
    if (absValue >= 1e12) {
      return `${isNegative ? '-' : ''}${currencySymbol}${(absValue / 1e12).toFixed(2)}T`;
    }
    if (absValue >= 1e9) {
      return `${isNegative ? '-' : ''}${currencySymbol}${(absValue / 1e9).toFixed(2)}B`;
    }
    if (absValue >= 1e6) {
      return `${isNegative ? '-' : ''}${currencySymbol}${(absValue / 1e6).toFixed(2)}M`;
    }
    if (absValue >= 1e3) {
      return `${isNegative ? '-' : ''}${currencySymbol}${(absValue / 1e3).toFixed(1)}k`;
    }
    return `${isNegative ? '-' : ''}${currencySymbol}${absValue.toFixed(2)}`;
  }
}

/**
 * Format percentages with plus/minus sign and customizable decimals
 */
export function formatPercent(value: number | undefined | null, includeSign: boolean = true, decimals: number = 1): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "N/A";
  }
  const sign = includeSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Format raw numbers cleanly
 */
export function formatNumber(value: number | undefined | null, decimals: number = 2): string {
  if (value === undefined || value === null || isNaN(value)) {
    return "N/A";
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/**
 * Get color styling class based on signal type
 */
export function getSignalBadgeColor(signal: SignalType): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  switch (signal) {
    case 'POSITIVE_SIGNAL':
    case 'STRONG_TREND':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-500',
      };
    case 'WATCH':
    case 'NEEDS_CONTEXT':
    case 'WEAKENING_TREND':
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/15',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/30',
        dot: 'bg-amber-500',
      };
    case 'RED_FLAG':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-500/15',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-500/30',
        dot: 'bg-rose-500',
      };
    case 'WORTH_INVESTIGATING':
    case 'MIXED_SIGNAL':
    default:
      return {
        bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
        text: 'text-indigo-600 dark:text-indigo-400',
        border: 'border-indigo-500/30',
        dot: 'bg-indigo-500',
      };
  }
}

/**
 * Human-readable label for signals
 */
export function getSignalLabel(signal: SignalType): string {
  switch (signal) {
    case 'POSITIVE_SIGNAL':
      return 'Positive Signal';
    case 'STRONG_TREND':
      return 'Strong Trend';
    case 'WATCH':
      return 'Watch';
    case 'WEAKENING_TREND':
      return 'Weakening Trend';
    case 'RED_FLAG':
      return 'Red Flag';
    case 'WORTH_INVESTIGATING':
      return 'Worth Investigating';
    case 'NEEDS_CONTEXT':
      return 'Needs Context';
    case 'MIXED_SIGNAL':
      return 'Mixed Signal';
    default:
      return 'Signal';
  }
}
