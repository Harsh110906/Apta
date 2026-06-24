"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ value, duration = 2000, className, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = React.useState(0);
  const elementRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start animation
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            
            setCount(Math.floor(easeProgress * value));

            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };
          animationFrame = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={elementRef} className={cn("tabular-nums", className)}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
