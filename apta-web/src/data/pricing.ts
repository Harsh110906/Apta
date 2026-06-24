import type { PricingPlan } from "@/types";

export const CANDIDATE_PLANS: PricingPlan[] = [
  {
    name: "Free",
    priceMonthly: "$0",
    priceYearly: "$0",
    description: "Everything you need to prove your potential and get discovered.",
    features: [
      "Full profile creation & hosting",
      "LinkedIn profile linking",
      "Unlimited certification uploads",
      "Daily domain tests",
      "Weekly ranking eligibility",
      "Basic recruiter discovery",
      "2 streak repairs per month"
    ]
  },
  {
    name: "Pro",
    priceMonthly: "$9",
    priceYearly: "$7",
    description: "Advanced AI tools to accelerate your growth.",
    isPopular: true,
    features: [
      "Everything in Free",
      "AI resume optimization",
      "Advanced AI mock interviews",
      "Personalized skill-gap analysis",
      "Weekly career growth plans",
      "Faster verification queue",
      "Premium support"
    ]
  }
];

export const RECRUITER_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    priceMonthly: "$199",
    priceYearly: "$159",
    description: "For small teams hiring occasionally.",
    features: [
      "2 team hiring seats",
      "Priority access to top-ranked candidates",
      "Saved talent pipelines",
      "50 AI-generated outreach emails",
      "Basic hiring funnel analytics",
      "Verified recruiter badge"
    ]
  },
  {
    name: "Growth",
    priceMonthly: "$499",
    priceYearly: "$399",
    description: "For growing startups scaling their teams.",
    isPopular: true,
    features: [
      "10 team hiring seats",
      "Advanced candidate filters",
      "Unlimited AI-generated emails",
      "Shortlist comparison tools",
      "Weekly talent alerts",
      "Recruiter analytics",
      "Priority support"
    ]
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    description: "For high-volume hiring teams.",
    features: [
      "Unlimited team seats",
      "Custom AI model training",
      "ATS integration",
      "Export candidate summaries",
      "Dedicated account manager",
      "Custom API access"
    ]
  }
];
