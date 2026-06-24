"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MotionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "stagger";
  delay?: number;
}

export function MotionWrapper({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  ...props
}: MotionWrapperProps) {
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animationClass = {
    "fade-up": "scroll-animate",
    "fade-left": "scroll-animate-left",
    "fade-right": "scroll-animate-right",
    "scale": "scroll-animate-scale",
    "stagger": "stagger-children",
  };

  return (
    <div ref={elementRef} className={cn(animationClass[animation], className)} {...props}>
      {children}
    </div>
  );
}
