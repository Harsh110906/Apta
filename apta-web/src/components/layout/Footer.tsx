import Link from "next/link";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-bg-tertiary border-t border-border py-12 md:py-16 mt-auto">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm">
                <span className="font-display font-bold text-lg">A</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-foreground">{APP_NAME}</span>
            </Link>
            <p className="text-text-secondary text-sm">
              Learn, rank, get hired. Apta helps candidates prove their potential and recruiters discover merit-based talent.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {NAV_LINKS.marketing.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-orange-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {NAV_LINKS.marketing.slice(4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-orange-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {NAV_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-orange-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-text-muted">
            <span>Built for Competition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
