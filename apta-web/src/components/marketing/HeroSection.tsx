import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlowEffect } from "@/components/ui/GlowEffect";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function HeroSection() {
  return (
    <SectionWrapper 
      className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden relative" 
      background="grid"
      hasBottomDivider
    >
      {/* Background glow for depth */}
      <GlowEffect color="orange" position="top" size="lg" className="opacity-40" />
      <GlowEffect color="blue" position="right" size="lg" className="opacity-30 translate-y-32" />

      <div className="flex flex-col items-center text-center max-w-4xl mx-auto z-10 relative">
        <MotionWrapper animation="fade-up" delay={0}>
          <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-600 dark:text-orange-400 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 animate-pulse" />
            Apta 1.0 is live for competition
          </div>
        </MotionWrapper>

        <MotionWrapper animation="fade-up" delay={100}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            Learn, rank, <br className="hidden md:block" />
            <span className="text-gradient-orange">get hired.</span>
          </h1>
        </MotionWrapper>

        <MotionWrapper animation="fade-up" delay={200}>
          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            Apta turns daily learning into verified rank. Prove your skills with domain tests, build your streak, and let top recruiters discover you based on merit, not keywords.
          </p>
        </MotionWrapper>

        <MotionWrapper animation="fade-up" delay={300} className="w-full">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/demo/candidate/onboarding" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto glow-orange-strong">
                Start as Candidate
              </Button>
            </Link>
            <Link href="/demo/recruiter/setup" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto glass-dark dark:bg-midnight-800">
                Start as Recruiter
              </Button>
            </Link>
          </div>
          <p className="text-sm text-text-muted mt-6">
            No credit card required. Free for candidates forever.
          </p>
        </MotionWrapper>
      </div>

      {/* Abstract Hero Visual representation */}
      <MotionWrapper animation="scale" delay={500} className="mt-16 md:mt-24 mx-auto max-w-5xl relative z-10">
        <div className="relative rounded-2xl border border-border bg-bg-secondary shadow-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-50 z-10" />
          
          <div className="flex gap-4 p-4 items-end w-full h-full pb-8 overflow-hidden opacity-40">
            {/* Decorative abstract elements simulating product UI */}
            <div className="w-1/4 h-3/4 bg-neutral-200 dark:bg-midnight-700 rounded-lg animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-1/4 h-full bg-orange-500/20 rounded-lg border border-orange-500/50 animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="w-1/4 h-4/5 bg-neutral-200 dark:bg-midnight-700 rounded-lg animate-pulse" style={{ animationDelay: '300ms' }} />
            <div className="w-1/4 h-1/2 bg-neutral-200 dark:bg-midnight-700 rounded-lg animate-pulse" style={{ animationDelay: '450ms' }} />
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="glass px-6 py-4 rounded-xl flex items-center gap-4 shadow-xl animate-float">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-rose flex items-center justify-center text-white font-bold text-xl shadow-glow">
                98
              </div>
              <div>
                <div className="text-sm font-medium text-text-secondary">Current Rank</div>
                <div className="text-lg font-bold text-foreground">Diamond Tier</div>
              </div>
            </div>
          </div>
        </div>
      </MotionWrapper>
    </SectionWrapper>
  );
}
