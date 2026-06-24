import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number to a compact string (e.g., 1.2k, 1M)
 */
export function formatCompactNumber(number: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(number);
}

/**
 * Format a number with commas (e.g., 1,000)
 */
export function formatNumber(number: number) {
  return new Intl.NumberFormat("en-US").format(number);
}
