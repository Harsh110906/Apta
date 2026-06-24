import { Shield, Star, Hexagon, Diamond, Zap, Flame, Crown, Minus } from "lucide-react";
import type { RankTier } from "@/types";

interface RankBadgeProps {
  rank: RankTier;
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabel?: boolean;
}

export function RankBadge({ rank, size = "md", className = "", showLabel = true }: RankBadgeProps) {
  const configs: Record<RankTier, { icon: any; colorClass: string; bgClass: string; borderClass: string; glowClass?: string }> = {
    Unranked: {
      icon: Minus,
      colorClass: "text-neutral-400 dark:text-neutral-500",
      bgClass: "bg-neutral-100 dark:bg-neutral-800",
      borderClass: "border-neutral-200 dark:border-neutral-700",
    },
    Bronze: {
      icon: Shield,
      colorClass: "text-amber-700 dark:text-amber-600",
      bgClass: "bg-amber-100 dark:bg-amber-950",
      borderClass: "border-amber-300 dark:border-amber-800",
    },
    Silver: {
      icon: Star,
      colorClass: "text-slate-500 dark:text-slate-400",
      bgClass: "bg-slate-100 dark:bg-slate-900",
      borderClass: "border-slate-300 dark:border-slate-700",
    },
    Gold: {
      icon: Hexagon,
      colorClass: "text-yellow-600 dark:text-yellow-500",
      bgClass: "bg-yellow-100/80 dark:bg-yellow-950/50",
      borderClass: "border-yellow-400 dark:border-yellow-600/50",
      glowClass: "shadow-[0_0_10px_rgba(234,179,8,0.2)]",
    },
    Platinum: {
      icon: Zap,
      colorClass: "text-teal-600 dark:text-teal-400",
      bgClass: "bg-teal-100/50 dark:bg-teal-900/30",
      borderClass: "border-teal-300 dark:border-teal-500/50",
      glowClass: "shadow-[0_0_15px_rgba(45,212,191,0.2)]",
    },
    Diamond: {
      icon: Diamond,
      colorClass: "text-sky-600 dark:text-sky-400",
      bgClass: "bg-sky-100/50 dark:bg-sky-900/30",
      borderClass: "border-sky-300 dark:border-sky-500/50",
      glowClass: "shadow-[0_0_20px_rgba(56,189,248,0.3)]",
    },
    Elite: {
      icon: Flame,
      colorClass: "text-rose-600 dark:text-rose-500",
      bgClass: "bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-950/50 dark:to-orange-950/50",
      borderClass: "border-rose-400 dark:border-rose-500/50",
      glowClass: "shadow-[0_0_25px_rgba(244,63,94,0.4)]",
    },
    Legend: {
      icon: Crown,
      colorClass: "text-purple-600 dark:text-purple-400",
      bgClass: "bg-gradient-to-br from-purple-100 via-fuchsia-100 to-orange-100 dark:from-purple-900/50 dark:via-fuchsia-900/50 dark:to-orange-900/50",
      borderClass: "border-purple-400 dark:border-purple-500/50",
      glowClass: "shadow-[0_0_30px_rgba(168,85,247,0.5)]",
    },
  };

  const config = configs[rank];
  const Icon = config.icon;

  const sizeClasses = {
    sm: {
      container: "px-2 py-0.5 rounded-md gap-1.5",
      icon: "w-3 h-3",
      text: "text-[10px] font-bold tracking-wider uppercase",
    },
    md: {
      container: "px-3 py-1 rounded-lg gap-2",
      icon: "w-4 h-4",
      text: "text-xs font-bold tracking-widest uppercase",
    },
    lg: {
      container: "px-4 py-1.5 rounded-xl gap-2.5",
      icon: "w-5 h-5",
      text: "text-sm font-bold tracking-widest uppercase",
    },
  };

  const sz = sizeClasses[size];

  return (
    <div className={`inline-flex items-center justify-center border ${config.bgClass} ${config.borderClass} ${config.colorClass} ${config.glowClass || ''} ${sz.container} ${className}`}>
      <Icon className={`${sz.icon} shrink-0`} />
      {showLabel && <span className={sz.text}>{rank}</span>}
    </div>
  );
}
