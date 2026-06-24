import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlowEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "orange" | "blue" | "gold" | "rose";
  position?: "center" | "top" | "bottom" | "left" | "right";
  size?: "sm" | "md" | "lg" | "xl";
}

export function GlowEffect({ color = "orange", position = "center", size = "md", className, ...props }: GlowEffectProps) {
  const colors = {
    orange: "bg-orange-500/20",
    blue: "bg-sky-500/20",
    gold: "bg-gold/20",
    rose: "bg-rose-500/20",
  };

  const positions = {
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
    right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  };

  const sizes = {
    sm: "w-32 h-32 blur-2xl",
    md: "w-64 h-64 blur-3xl",
    lg: "w-96 h-96 blur-[100px]",
    xl: "w-[600px] h-[600px] blur-[140px]",
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full mix-blend-screen opacity-50 dark:opacity-30",
        colors[color],
        positions[position],
        sizes[size],
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}
