import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CheckCircle2, ThumbsUp, X } from "lucide-react";

export function RecruiterSection() {
  const benefits = [
    "Review candidate stacks pre-sorted by verified domain rank",
    "Swipe to shortlist or pass in seconds, not hours",
    "Generate highly personalized interview emails using AI",
    "Track your visual hiring funnel from discovery to offer"
  ];

  return (
    <SectionWrapper background="primary" hasBottomDivider className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <MotionWrapper animation="fade-right" delay={200} className="relative order-2 lg:order-1">
          <div className="relative rounded-2xl border border-border bg-bg-tertiary p-6 shadow-2xl h-[550px] overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-grid opacity-50" />
            
            {/* Mock Swipe Card Fragment */}
            <div className="relative z-10 w-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-rose rounded-3xl blur opacity-20 animate-pulse-glow" />
              <div className="relative bg-bg-secondary rounded-2xl shadow-xl border border-border overflow-hidden rotate-2 transition-transform hover:rotate-0 duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 border-2 border-border flex items-center justify-center text-white text-xl font-bold">
                      AR
                    </div>
                    <div className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-bold text-sky-500">
                      Top 5%
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-1">Alex Rivera</h3>
                  <p className="text-text-secondary mb-4">Frontend Developer | React</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-neutral-100 dark:bg-midnight-700 rounded-md text-xs font-medium">React</span>
                    <span className="px-2 py-1 bg-neutral-100 dark:bg-midnight-700 rounded-md text-xs font-medium">TypeScript</span>
                    <span className="px-2 py-1 bg-emerald/10 text-emerald rounded-md text-xs font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 py-3 rounded-xl border border-border flex items-center justify-center text-rose hover:bg-rose/10 transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                    <button className="flex-1 py-3 rounded-xl bg-orange-500 flex items-center justify-center text-white hover:bg-orange-400 transition-colors shadow-sm">
                      <ThumbsUp className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Background card to suggest a stack */}
              <div className="absolute top-4 -right-4 w-full h-full bg-bg-secondary rounded-2xl border border-border shadow-lg -z-10 rotate-6 opacity-60" />
              <div className="absolute top-8 -right-8 w-full h-full bg-bg-secondary rounded-2xl border border-border shadow-lg -z-20 rotate-12 opacity-30" />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-bg-tertiary to-transparent z-20" />
          </div>
        </MotionWrapper>

        <MotionWrapper animation="fade-left" className="order-1 lg:order-2">
          <div className="inline-flex items-center rounded-full bg-sky-100 dark:bg-sky-900/30 px-3 py-1 text-sm font-medium text-sky-600 dark:text-sky-400 mb-6">
            For Recruiters
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Stop filtering.<br/>Start discovering.</h2>
          <p className="text-lg text-text-secondary mb-8">
            Ditch the keyword search. Set your requirements and get a curated stack of candidate cards ordered by verified domain rank. Swipe to shortlist, and let AI draft your outreach.
          </p>

          <ul className="space-y-4 mb-10">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-sky shrink-0" />
                <span className="text-foreground font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
        </MotionWrapper>

      </div>
    </SectionWrapper>
  );
}
