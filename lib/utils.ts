import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Compact number formatter: 1204 -> "1.2k" */
export function compact(n: number): string {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

/** Relative time: Date -> "2m", "1h", "3d" */
export function timeAgo(date: Date | string | number): string {
  const d = typeof date === "object" ? date : new Date(date);
  const secs = Math.round((Date.now() - d.getTime()) / 1000);
  const units: [number, string][] = [
    [60, "s"],
    [60, "m"],
    [24, "h"],
    [7, "d"],
    [4.34, "w"],
    [12, "mo"],
    [Number.POSITIVE_INFINITY, "y"],
  ];
  let val = secs;
  let unit = "s";
  let acc = 1;
  for (const [div, label] of units) {
    if (Math.abs(val) < acc * div) {
      unit = label;
      break;
    }
    acc *= div;
    unit = label;
  }
  return `${Math.max(0, Math.floor(secs / acc))}${unit}`;
}