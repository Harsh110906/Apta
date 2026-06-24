import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  indicatorColor?: string;
  showLabel?: boolean;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, indicatorColor = "bg-orange-500", showLabel = false, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className={cn("w-full", className)} ref={ref} {...props}>
        {showLabel && (
          <div className="flex justify-between items-center mb-1 text-sm text-text-secondary">
            <span>Progress</span>
            <span className="font-mono">{Math.round(percentage)}%</span>
          </div>
        )}
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-midnight-800">
          <div
            className={cn("h-full transition-all duration-500 ease-in-out", indicatorColor)}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

// Circular variant can be added here if needed, keeping it lean for now
