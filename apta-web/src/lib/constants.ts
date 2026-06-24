export const APP_NAME = "Apta";
export const TAGLINE = "Learn, rank, get hired.";

export const RANK_TIERS = [
  "Unranked",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Elite",
  "Legend",
] as const;

export type RankTier = typeof RANK_TIERS[number];

export const NAV_LINKS = {
  marketing: [
    { label: "For Candidates", href: "/candidates" },
    { label: "For Recruiters", href: "/recruiters" },
    { label: "Rankings", href: "/rankings" },
    { label: "AI Tools", href: "/ai-tools" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Fairness Guarantee", href: "/fairness" },
  ],
};
