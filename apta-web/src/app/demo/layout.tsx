import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
      {/* Minimal Top Bar for demos */}
      <div className="h-14 border-b border-border bg-bg-secondary flex items-center px-4 justify-between sticky top-0 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Demo
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-orange-500 text-white shadow-sm">
            <span className="font-display font-bold text-xs">A</span>
          </div>
          <span className="text-sm font-bold tracking-tight">Prototype Mode</span>
        </div>
      </div>
      
      {/* Demo Content */}
      <div className="flex-1 flex flex-col relative">
        {children}
      </div>
    </div>
  );
}
