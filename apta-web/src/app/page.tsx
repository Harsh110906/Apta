import { HeroSection } from "@/components/marketing/HeroSection";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { CandidateSection } from "@/components/marketing/CandidateSection";
import { RecruiterSection } from "@/components/marketing/RecruiterSection";
import { RankingSection } from "@/components/marketing/RankingSection";
import { AIFeaturesSection } from "@/components/marketing/AIFeaturesSection";
import { TrustSection } from "@/components/marketing/TrustSection";
import { ProductShowcase } from "@/components/marketing/ProductShowcase";
import { PricingSection } from "@/components/pricing/PricingSection";
import { WhyNowSection } from "@/components/marketing/WhyNowSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { CTASection } from "@/components/marketing/CTASection";

export default function HomePage() {
  return (
    <main className="flex-1 w-full">
      {/* 1. Hero */}
      <HeroSection />
      {/* 2. Problem */}
      <ProblemSection />
      {/* 3. Solution */}
      <SolutionSection />
      {/* 4. How It Works */}
      <HowItWorksSection />
      {/* 5. Candidate Experience */}
      <CandidateSection />
      {/* 6. Recruiter Experience */}
      <RecruiterSection />
      {/* 7. Ranking Engine */}
      <RankingSection />
      {/* 8. AI Features */}
      <AIFeaturesSection />
      {/* 9. Trust & Fairness */}
      <TrustSection />
      {/* 10. Product Showcase */}
      <ProductShowcase />
      {/* 11. Pricing */}
      <PricingSection />
      {/* 12. Why Now / Market */}
      <WhyNowSection />
      {/* 13. FAQ */}
      <FAQSection />
      {/* 14. CTA Footer */}
      <CTASection />
    </main>
  );
}
