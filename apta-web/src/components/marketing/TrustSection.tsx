import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ShieldAlert } from "lucide-react";

export function TrustSection() {
  return (
    <SectionWrapper background="primary" hasBottomDivider>
      <div className="max-w-4xl mx-auto bg-midnight rounded-3xl p-8 md:p-12 relative overflow-hidden border border-midnight-600 shadow-2xl">
        {/* Background effects */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-grid-dark opacity-30" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <MotionWrapper animation="scale" className="shrink-0">
            <div className="w-24 h-24 rounded-full bg-midnight-800 border-2 border-border-strong flex items-center justify-center shadow-lg">
              <ShieldAlert className="w-10 h-10 text-orange-500" />
            </div>
          </MotionWrapper>

          <MotionWrapper animation="fade-left" delay={200} className="text-center md:text-left text-neutral-50">
            <h2 className="text-3xl font-bold mb-4">Merit is the only currency</h2>
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              Apta is built on a strict <span className="text-white font-bold">no pay-to-win</span> policy. 
              While our Pro plan offers advanced AI coaching and analytics, it does not give candidates extra points, a higher rank, or priority visibility to recruiters. Your rank is yours alone, earned through verified skill.
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Fairness Guarantee Active
            </div>
          </MotionWrapper>
        </div>
      </div>
    </SectionWrapper>
  );
}
