import Image from "next/image";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CheckCircle2 } from "lucide-react";

export function CandidateSection() {
  const benefits = [
    "Take 5-minute domain tests to prove current knowledge",
    "Maintain a learning streak to boost your visibility",
    "Verify certifications to earn trust instantly",
    "Use AI to optimize your resume and practice interviews"
  ];

  return (
    <SectionWrapper background="secondary" hasBottomDivider className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <MotionWrapper animation="fade-right">
          <div className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-sm font-medium text-orange-600 dark:text-orange-400 mb-6">
            For Candidates
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Your rank is your resume</h2>
          <p className="text-lg text-text-secondary mb-8">
            Stop sending static PDFs into the void. Build a verified profile, take daily domain tests, and let your proven rank do the talking. 
          </p>

          <ul className="space-y-4 mb-10">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-orange-500 shrink-0" />
                <span className="text-foreground font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
        </MotionWrapper>

        <MotionWrapper animation="fade-left" delay={200} className="relative">
          <div className="relative rounded-2xl border border-border bg-bg-tertiary p-6 shadow-2xl h-[500px] overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-grid opacity-50" />
            
            {/* Mock Candidate Dashboard Fragment */}
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 border-4 border-bg-secondary flex items-center justify-center text-white text-xl font-bold shadow-glow">
                    AR
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Alex Rivera</h3>
                    <p className="text-sm text-text-secondary">Frontend Engineering</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-text-muted mb-1">Weekly Rank</div>
                  <div className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-sm font-bold text-sky-500">
                    Platinum
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-bg-secondary border border-border">
                  <div className="text-sm text-text-secondary mb-1">Current Streak</div>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-orange-500">🔥</span> 45 Days
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-bg-secondary border border-border">
                  <div className="text-sm text-text-secondary mb-1">Total Points</div>
                  <div className="text-2xl font-bold">12,450</div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-bg-secondary border border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Daily Domain Test</span>
                  <span className="text-sm text-orange-500 font-medium">Pending</span>
                </div>
                <div className="w-full bg-orange-500 text-white rounded-lg py-2.5 text-center font-medium shadow-sm">
                  Start Today's Test
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-bg-tertiary to-transparent z-20" />
          </div>
        </MotionWrapper>
      </div>
    </SectionWrapper>
  );
}
