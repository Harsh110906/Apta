"use client";

import { useState } from "react";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CANDIDATE_PLANS, RECRUITER_PLANS } from "@/data/pricing";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import type { PricingPlan } from "@/types";

function PricingCard({ plan, isYearly }: { plan: PricingPlan; isYearly: boolean }) {
  const price = isYearly ? plan.priceYearly : plan.priceMonthly;
  const isCustom = price === "Custom";
  const hasDiscount = isYearly && !isCustom && plan.priceMonthly !== "$0";

  return (
    <div className={`flex flex-col p-8 rounded-3xl border ${plan.isPopular ? 'border-orange-500 shadow-xl relative bg-bg-secondary' : 'border-border bg-bg-tertiary'}`}>
      {plan.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
          Most Popular
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
        <div className="flex items-end gap-2 mb-1">
          <div className="text-4xl font-display font-bold">
            {price}
            {!isCustom && <span className="text-lg text-text-muted font-normal">/mo</span>}
          </div>
          {hasDiscount && (
            <div className="bg-emerald/10 text-emerald text-xs font-bold px-2 py-0.5 rounded-full mb-2">
              Save 20%
            </div>
          )}
        </div>
        {hasDiscount ? (
          <p className="text-sm text-text-muted mb-3 font-medium">Billed annually</p>
        ) : (
          <p className="text-sm text-text-muted mb-3 font-medium min-h-[20px]"></p>
        )}
        <p className="text-sm text-text-secondary h-10">{plan.description}</p>
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {plan.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className={`w-5 h-5 shrink-0 ${plan.isPopular ? 'text-orange-500' : 'text-emerald'}`} />
            <span className="text-sm font-medium">{feature}</span>
          </li>
        ))}
      </ul>
      <Button variant={plan.isPopular ? 'primary' : 'outline'} className="w-full">
        {isCustom ? 'Contact Sales' : 'Get Started'}
      </Button>
    </div>
  );
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <main className="flex-1 w-full pt-20">
      <SectionWrapper background="primary">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionWrapper animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
            <p className="text-lg text-text-secondary mb-8">
              Free forever for candidates to earn rank. Powerful tools for growth and hiring.
            </p>

            {/* Monthly/Yearly Toggle */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-text-muted'}`}>Monthly</span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-12 h-6 rounded-full bg-neutral-200 dark:bg-midnight-600 transition-colors focus:outline-none"
              >
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-orange-500 transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-sm font-medium flex items-center gap-1.5 ${isYearly ? 'text-foreground' : 'text-text-muted'}`}>
                Yearly <span className="bg-emerald/10 text-emerald text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Save 20%</span>
              </span>
            </div>
          </MotionWrapper>
        </div>

        <MotionWrapper animation="fade-up" delay={150}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">For Candidates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-20">
              {CANDIDATE_PLANS.map(plan => <PricingCard key={plan.name} plan={plan} isYearly={isYearly} />)}
            </div>

            <h2 className="text-2xl font-bold mb-8 text-center">For Hiring Teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {RECRUITER_PLANS.map(plan => <PricingCard key={plan.name} plan={plan} isYearly={isYearly} />)}
            </div>
          </div>
        </MotionWrapper>
      </SectionWrapper>
    </main>
  );
}
