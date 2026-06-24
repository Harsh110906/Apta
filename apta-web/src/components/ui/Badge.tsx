import * as React from "react";
import { cn } from "@/lib/utils";
import type { RankTier } from "@/types";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline";
  rank?: RankTier;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", rank, children, ...props }, ref) => {
    const variants = {
      default: "bg-neutral-100 text-neutral-800 dark:bg-midnight-700 dark:text-neutral-200",
      success: "bg-emerald-light/30 text-emerald dark:bg-emerald/20 dark:text-emerald-light",
      warning: "bg-gold-light/30 text-gold dark:bg-gold/20 dark:text-gold-light",
      error: "bg-rose-light/30 text-rose dark:bg-rose/20 dark:text-rose-light",
      info: "bg-sky-light/30 text-sky dark:bg-sky/20 dark:text-sky-light",
      outline: "border border-border text-foreground",
    };

    const rankColors: Record<RankTier, string> = {
      Unranked: "bg-neutral-100 text-neutral-600 dark:bg-midnight-700 dark:text-neutral-400",
      Bronze: "bg-[#CD7F32]/10 text-[#CD7F32]",
      Silver: "bg-slate-300/20 text-slate-500 dark:text-slate-300",
      Gold: "bg-gold/10 text-gold",
      Platinum: "bg-sky-400/10 text-sky-500",
      Diamond: "bg-blue-500/10 text-blue-500",
      Elite: "bg-purple-500/10 text-purple-500",
      Legend: "bg-gradient-to-r from-gold via-orange-500 to-rose text-white",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
          rank ? rankColors[rank] : variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";
