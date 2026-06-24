import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CheckCircle2, TrendingUp, ShieldCheck, Brain, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export const metadata = {
  title: "For Candidates | Apta",
  description: "Prove your potential. Build a verified profile, take daily domain tests, and get discovered by top recruiters.",
};

export default function CandidatesPage() {
  const steps = [
    {
      title: "1. Build your base profile",
      desc: "Connect your LinkedIn to auto-import your work history and basic details.",
      icon: <CheckCircle2 className="w-6 h-6 text-foreground" />
    },
    {
      title: "2. Verify your skills",
      desc: "Upload certifications. Our AI verifies them against issuer databases.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald" />
    },
    {
      title: "3. Take daily domain tests",
      desc: "Spend 5 minutes a day answering domain-specific questions to build your streak.",
      icon: <Brain className="w-6 h-6 text-orange-500" />
    },
    {
      title: "4. Earn your rank",
      desc: "Based on verified actions, move up the weekly leaderboard from Unranked to Legend.",
      icon: <TrendingUp className="w-6 h-6 text-rose" />
    }
  ];

  const candidateTestimonials = TESTIMONIALS.filter(t => t.role !== "Head of Engineering");

  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <SectionWrapper background="grid" className="pt-32 pb-20 relative overflow-hidden" hasBottomDivider>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <MotionWrapper animation="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Stop applying.<br/>
              <span className="text-gradient-orange">Start proving.</span>
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              The resume black hole is dead. Apta gives you a platform to prove your current skills daily, earn a verified rank, and let companies compete for you.
            </p>
            <Link href="/demo/candidate/onboarding">
              <Button size="lg" className="glow-orange-strong">
                Create Free Profile
              </Button>
            </Link>
          </MotionWrapper>
        </div>
      </SectionWrapper>

      {/* How it works */}
      <SectionWrapper background="secondary" hasBottomDivider>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionWrapper animation="fade-up">
            <h2 className="text-3xl font-bold mb-4">How Apta works for you</h2>
            <p className="text-lg text-text-secondary">
              A clear path from signing up to getting hired.
            </p>
          </MotionWrapper>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <MotionWrapper key={idx} animation="fade-right" delay={idx * 100}>
              <div className="flex items-start gap-6 mb-12 relative">
                {idx < steps.length - 1 && (
                  <div className="absolute left-6 top-14 bottom-[-48px] w-0.5 bg-border-strong" />
                )}
                <div className="w-12 h-12 shrink-0 rounded-full bg-bg-primary border-2 border-border-strong flex items-center justify-center relative z-10 shadow-sm">
                  {step.icon}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-lg text-text-secondary">{step.desc}</p>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper background="primary" hasBottomDivider>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionWrapper animation="fade-up">
            <h2 className="text-3xl font-bold mb-4">Don't just take our word for it</h2>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {candidateTestimonials.map((testimonial, idx) => (
            <MotionWrapper key={testimonial.id} animation="scale" delay={idx * 150}>
              <div className="bg-bg-secondary p-8 rounded-2xl border border-border h-full flex flex-col">
                <p className="text-lg text-text-secondary italic mb-8 grow">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-midnight text-white flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-text-muted">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper background="tertiary" className="text-center">
        <MotionWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Take control of your career</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Apta is 100% free for candidates to build profiles, take tests, and get discovered.
          </p>
          <Link href="/demo/candidate/onboarding">
            <Button size="lg" className="shadow-glow">
              Join Apta Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </MotionWrapper>
      </SectionWrapper>
    </main>
  );
}
