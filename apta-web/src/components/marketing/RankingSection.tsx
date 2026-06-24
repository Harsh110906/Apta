import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RANK_TIERS } from "@/lib/constants";
import { RankBadge } from "@/components/ui/RankBadge";

export function RankingSection() {
  return (
    <SectionWrapper background="secondary" hasBottomDivider>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <MotionWrapper animation="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Earned, never bought</h2>
          <p className="text-lg text-text-secondary">
            Weekly rankings are calculated purely on merit. Points are awarded for verified certifications, maintaining daily test streaks, and completing challenges.
          </p>
        </MotionWrapper>
      </div>

      <MotionWrapper animation="fade-up" delay={200}>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 md:gap-6">
          {RANK_TIERS.map((tier) => (
            <div key={tier} className="transform transition-transform duration-300 hover:scale-110 hover:-translate-y-2 cursor-default">
              <RankBadge rank={tier} size="lg" className="px-5 py-3 text-base flex-col gap-3 min-w-[120px] shadow-lg" />
            </div>
          ))}
        </div>
      </MotionWrapper>
    </SectionWrapper>
  );
}
