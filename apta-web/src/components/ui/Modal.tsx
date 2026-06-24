import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Modal({ isOpen, onClose, children, className, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Panel */}
      <div 
        className={cn(
          "relative w-full max-w-lg rounded-2xl bg-bg-secondary p-6 shadow-xl animate-scale-in border border-border",
          className
        )}
      >
        <div className="flex items-center justify-between mb-5">
          {title && <h2 className="text-xl font-bold font-display">{title}</h2>}
          <button
            onClick={onClose}
            className="rounded-full p-2 text-text-muted hover:bg-neutral-100 dark:hover:bg-midnight-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ml-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
