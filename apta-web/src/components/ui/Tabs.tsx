import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    // We pass the context via cloneElement for simplicity in this lean implementation
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, { value, onValueChange });
      }
      return child;
    });

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {childrenWithProps}
      </div>
    );
  }
);
Tabs.displayName = "Tabs";

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "underline" | "pill";
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant = "pill", children, ...props }, ref) => {
    const isPill = variant === "pill";
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          isPill ? "rounded-xl bg-neutral-100 dark:bg-midnight-800 p-1" : "border-b border-border w-full justify-start space-x-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  variant?: "underline" | "pill";
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps & { onValueChange?: (val: string) => void, currentValue?: string }>(
  ({ className, value, variant = "pill", onValueChange, currentValue, children, ...props }, ref) => {
    // In a real implementation we'd use context, but for this prototype we'll assume 
    // the parent injects currentValue and onValueChange, or we manage it locally if needed.
    // Since we clone elements in Tabs, we receive them here (typing might need any cast from parent).
    const isSelected = currentValue === value;
    const isPill = variant === "pill";

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onValueChange?.(value)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
          isPill 
            ? "rounded-lg px-4 py-2 text-sm font-medium ring-offset-background" 
            : "border-b-2 px-1 py-3 text-sm font-medium",
          isPill && isSelected ? "bg-bg-secondary text-foreground shadow-sm" : isPill && !isSelected ? "text-text-muted hover:text-foreground hover:bg-bg-secondary/50" : "",
          !isPill && isSelected ? "border-orange-500 text-orange-500" : !isPill && !isSelected ? "border-transparent text-text-muted hover:text-foreground hover:border-border" : "",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps & { currentValue?: string }>(
  ({ className, value, currentValue, children, ...props }, ref) => {
    if (currentValue !== value) return null;
    return (
      <div
        ref={ref}
        className={cn("mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 animate-fade-in", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";
