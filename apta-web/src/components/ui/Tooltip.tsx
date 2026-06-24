"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <div
        className={cn(
          "absolute z-50 whitespace-nowrap rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-all duration-200 pointer-events-none dark:bg-neutral-100 dark:text-neutral-900",
          positionClasses[position],
          isVisible ? "opacity-100 transform scale-100" : "scale-95"
        )}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
}
