"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id?: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  /** Either pass an array of items... */
  items?: AccordionItem[];
  /** ...or use a single item via title + children composition. */
  title?: string;
  children?: React.ReactNode;
  className?: string;
  allowMultiple?: boolean;
}

function slugify(str: string) {
  return (
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") ||
    "item"
  );
}

export function Accordion({ items, title, children, className, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) newSet.clear();
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Resolve items from either the items prop or the composition API (title + children)
  let resolvedItems: AccordionItem[] = [];
  if (Array.isArray(items) && items.length > 0) {
    resolvedItems = items;
  } else if (title) {
    resolvedItems = [
      {
        id: slugify(title),
        title,
        content: children,
      },
    ];
  }

  // Ensure every item has a stable id (append index if needed)
  resolvedItems = resolvedItems.map((it, idx) => ({ ...it, id: it.id ?? `${slugify(it.title)}-${idx}` }));

  return (
    <div className={cn("w-full divide-y divide-border", className)}>
      {resolvedItems.map((item) => {
        const isOpen = openItems.has(item.id!);
        return (
          <div key={item.id} className="py-4">
            <button
              className="flex w-full items-center justify-between py-2 font-medium transition-colors hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg text-left"
              onClick={() => toggleItem(item.id!)}
            >
              <span className="text-lg">{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-text-muted transition-transform duration-200",
                  isOpen && "rotate-180 text-orange-500"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              )}
            >
              <div className="pb-4 text-text-secondary leading-relaxed">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
