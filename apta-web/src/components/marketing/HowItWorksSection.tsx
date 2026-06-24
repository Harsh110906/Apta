import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Smartphone, Brain, TrendingUp, Users, Zap, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Sign Up & Import",
    description: "Connect your LinkedIn or manually add your work history. Our AI pre-fills your profile in under 2 minutes.",
    icon: <Smartphone className="w-7 h-7" />,
    color: "text-sky",
    bgColor: "bg-sky/10",
    borderColor: "border-sky/20",
    mockup: (
      <div className="bg-bg-tertiary rounded-xl p-4 border border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#0077b5] flex items-center justify-center text-white text-xs font-bold">in</div>
          <div className="flex-1">
            <div className="h-2.5 bg-border rounded-full w-3/4 mb-1.5" />
            <div className="h-2 bg-border/60 rounded-full w-1/2" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-emerald/10 border border-emerald/20 rounded-md flex-1 flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-emerald" />
          </div>
          <div className="h-6 bg-emerald/10 border border-emerald/20 rounded-md flex-1 flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-emerald" />
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Take Daily Tests",
    description: "Spend 5 minutes on domain-specific questions. Build your streak. Each correct answer earns ranking points.",
    icon: <Brain className="w-7 h-7" />,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    mockup: (
      <div className="bg-bg-tertiary rounded-xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-text-muted">Q3 of 5</span>
          <span className="text-xs font-bold text-orange-500">🔥 45 days</span>
        </div>
        <div className="h-1.5 bg-border rounded-full mb-3 overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full w-3/5 transition-all" />
        </div>
        <div className="space-y-2">
          <div className="h-7 bg-bg-secondary rounded-lg border border-border" />
          <div className="h-7 bg-orange-500/10 rounded-lg border border-orange-500/30" />
          <div className="h-7 bg-bg-secondary rounded-lg border border-border" />
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Climb the Ranks",
    description: "Your verified actions — tests, streaks, certifications — feed into a weekly ranking algorithm. Rise from Unranked to Legend.",
    icon: <TrendingUp className="w-7 h-7" />,
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/20",
    mockup: (
      <div className="bg-bg-tertiary rounded-xl p-4 border border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky to-sky-light flex items-center justify-center text-white text-[10px] font-bold">💎</div>
          <div className="flex-1">
            <div className="text-xs font-bold">Diamond Tier</div>
            <div className="h-1.5 bg-border rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-sky rounded-full w-4/5" />
            </div>
          </div>
        </div>
        <div className="text-[10px] text-text-muted text-right">1,200 pts to Elite</div>
      </div>
    ),
  },
  {
    number: "04",
    title: "Get Discovered",
    description: "Recruiters see your verified profile, rank, and skills. They swipe right to shortlist you — no resume parsing needed.",
    icon: <Users className="w-7 h-7" />,
    color: "text-emerald",
    bgColor: "bg-emerald/10",
    borderColor: "border-emerald/20",
    mockup: (
      <div className="bg-bg-tertiary rounded-xl p-4 border border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-rose flex items-center justify-center text-white text-[10px] font-bold">AR</div>
          <div className="flex-1">
            <div className="h-2.5 bg-border rounded-full w-2/3 mb-1" />
            <div className="h-2 bg-border/60 rounded-full w-1/2" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 flex-1 rounded-lg border-2 border-rose/30 flex items-center justify-center text-rose text-xs">✕</div>
          <div className="h-8 flex-1 rounded-lg bg-sky text-white flex items-center justify-center text-xs">👍</div>
        </div>
      </div>
    ),
  },
];

export function HowItWorksSection() {
  return (
    <SectionWrapper background="secondary" hasBottomDivider className="overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <MotionWrapper animation="fade-up">
          <div className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-600 dark:text-orange-400 mb-6">
            <Zap className="w-4 h-4 mr-2" /> How It Works
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            From sign-up to hired.<br />In four steps.
          </h2>
          <p className="text-lg text-text-secondary">
            A streamlined path that turns daily effort into career momentum.
          </p>
        </MotionWrapper>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Vertical timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border-strong to-transparent hidden md:block" />
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border-strong to-transparent md:hidden" />

        <div className="space-y-12 md:space-y-16">
          {steps.map((step, idx) => (
            <MotionWrapper
              key={step.number}
              animation={idx % 2 === 0 ? "fade-right" : "fade-left"}
              delay={idx * 150}
            >
              <div className={`flex flex-col md:flex-row items-start gap-6 md:gap-12 relative ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-16 h-16 rounded-2xl ${step.bgColor} border-2 ${step.borderColor} flex items-center justify-center shadow-lg bg-bg-secondary`}>
                    <span className={step.color}>{step.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 pl-28 md:pl-0 ${idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                  <span className={`font-mono text-sm font-bold ${step.color} mb-2 block`}>{step.number}</span>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{step.description}</p>
                </div>

                {/* Mini mockup */}
                <div className={`flex-1 pl-28 md:pl-0 ${idx % 2 !== 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <div className="max-w-xs md:max-w-none">
                    {step.mockup}
                  </div>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
