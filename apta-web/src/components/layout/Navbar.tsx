"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-bg-secondary/80 backdrop-blur-md border-b border-border py-3 shadow-sm" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm overflow-hidden">
            <span className="font-display font-bold text-lg relative z-10">A</span>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white/20 rounded-full blur-sm transition-transform group-hover:scale-150" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">{APP_NAME}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {NAV_LINKS.marketing.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === link.href
                  ? "bg-neutral-100 text-foreground dark:bg-midnight-800"
                  : "text-text-secondary hover:text-foreground hover:bg-neutral-50 dark:hover:bg-midnight-800/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hidden lg:inline-flex">Sign In</Button>
          </Link>
          <Link href="/login">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-text-secondary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-bg-secondary border-b border-border shadow-lg md:hidden animate-fade-in-down">
          <div className="px-4 py-4 space-y-2 flex flex-col">
            {NAV_LINKS.marketing.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium",
                  pathname === link.href
                    ? "bg-neutral-100 text-foreground dark:bg-midnight-800"
                    : "text-text-secondary hover:bg-neutral-50 dark:hover:bg-midnight-800/50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border flex flex-col gap-3">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full justify-center">Sign In</Button>
              </Link>
              <Link href="/login" className="w-full">
                <Button className="w-full justify-center">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
