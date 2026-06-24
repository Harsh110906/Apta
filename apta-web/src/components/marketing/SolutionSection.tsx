import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ArrowRight, Brain, ShieldCheck, TrendingUp, SearchCode } from "lucide-react";

export function SolutionSection() {
  const steps = [
    {
      title: "Learn Daily",
      desc: "Take domain-specific quizzes to build a streak.",
      icon: <Brain className="w-6 h-6 text-foreground" />
    },
    {
      title: "Verify Proof",
      desc: "Connect LinkedIn and upload certificates.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald" />
    },
    {
      title: "Earn Rank",
      desc: "Move up the weekly domain leaderboards.",
      icon: <TrendingUp className="w-6 h-6 text-orange-500" />
    },
    {
      title: "Get Discovered",
      desc: "Recruiters swipe on your verified profile.",
      icon: <SearchCode className="w-6 h-6 text-sky" />
    }
  ];

  return (
    <SectionWrapper background="primary" hasBottomDivider className="overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <MotionWrapper animation="fade-up">
          <div className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-midnight-800 px-3 py-1 text-sm font-medium text-text-secondary mb-6">
            The Apta Method
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">One platform. Two sides.<br/>Zero noise.</h2>
          <p className="text-lg text-text-secondary">
            Candidates prove their skills daily. Recruiters discover high-signal talent instantly.
          </p>
        </MotionWrapper>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border-strong to-transparent -translate-y-1/2 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <MotionWrapper key={idx} animation="scale" delay={idx * 150} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-bg-secondary border-2 border-border shadow-lg flex items-center justify-center mb-6 relative group transition-transform duration-300 hover:-translate-y-2">
                {step.icon}
                <div className="absolute inset-0 rounded-2xl bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-text-secondary">{step.desc}</p>
              
              {/* Arrow for mobile */}
              {idx < steps.length - 1 && (
                <div className="md:hidden mt-6 text-border-strong">
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}
            </MotionWrapper>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
