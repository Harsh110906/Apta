import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
  labelClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, labelClassName, ...props }, ref) => {
    const inputElement = (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-border bg-bg-secondary px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          error && "border-rose focus-visible:ring-rose",
          className
        )}
        ref={ref}
        {...props}
      />
    );

    if (label) {
      return (
        <label className={cn("block", labelClassName)}>
          <span className="text-sm text-text-secondary mb-1 block">{label}</span>
          {inputElement}
        </label>
      );
    }

    return inputElement;
  }
);
Input.displayName = "Input";
