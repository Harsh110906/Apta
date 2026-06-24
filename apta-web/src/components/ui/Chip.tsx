import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-default",
          active
            ? "bg-orange-500 text-white"
            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-midnight-700 dark:text-neutral-300 dark:hover:bg-midnight-600",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Chip.displayName = "Chip";
