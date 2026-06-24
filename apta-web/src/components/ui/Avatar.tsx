import * as React from "react";
import { cn } from "@/lib/utils";
import type { RankTier } from "@/types";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg" | "xl";
  rank?: RankTier;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, initials, size = "md", rank, ...props }, ref) => {
    const sizes = {
      sm: "w-8 h-8 text-xs",
      md: "w-12 h-12 text-sm",
      lg: "w-16 h-16 text-base",
      xl: "w-24 h-24 text-xl",
    };

    const rankBorders: Record<RankTier, string> = {
      Unranked: "border-transparent",
      Bronze: "border-[#CD7F32] shadow-[0_0_10px_rgba(205,127,50,0.3)]",
      Silver: "border-slate-300 shadow-[0_0_10px_rgba(203,213,225,0.3)]",
      Gold: "border-gold shadow-[0_0_15px_rgba(234,179,8,0.4)]",
      Platinum: "border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)]",
      Diamond: "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]",
      Elite: "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]",
      Legend: "border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.6)] animate-pulse-glow", // Simplified for demo
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-200 dark:bg-midnight-800 border-2",
          sizes[size],
          rank ? rankBorders[rank] : "border-transparent",
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt || "Avatar"} className="h-full w-full object-cover" />
        ) : (
          <span className="font-semibold text-text-secondary uppercase">
            {initials || "?"}
          </span>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";
