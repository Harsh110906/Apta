import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClass?: string;
  hasBottomDivider?: boolean;
  background?: "primary" | "secondary" | "tertiary" | "grid";
}

export function SectionWrapper({
  children,
  className,
  containerClass,
  hasBottomDivider = false,
  background = "primary",
  ...props
}: SectionWrapperProps) {
  const bgClasses = {
    primary: "bg-bg-primary",
    secondary: "bg-bg-secondary",
    tertiary: "bg-bg-tertiary",
    grid: "bg-bg-primary bg-grid",
  };

  return (
    <section className={cn("relative py-20 lg:py-28", bgClasses[background], className)} {...props}>
      <div className={cn("container-main relative z-10", containerClass)}>
        {children}
      </div>
      {hasBottomDivider && (
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      )}
    </section>
  );
}
