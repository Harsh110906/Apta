import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Lightbulb, BarChart3, Globe, Clock } from "lucide-react";

const stats = [
  { value: 75, suffix: "%", label: "of resumes are never seen by humans", icon: <Clock className="w-5 h-5 text-rose" /> },
  { value: 88, suffix: "%", label: "of recruiters say skill verification is a top challenge", icon: <BarChart3 className="w-5 h-5 text-sky" /> },
  { value: 3, suffix: "x", label: "faster hiring with pre-verified candidate pools", icon: <Lightbulb className="w-5 h-5 text-gold" /> },
  { value: 52, suffix: "%", label: "of candidates feel current platforms don't reflect true ability", icon: <Globe className="w-5 h-5 text-emerald" /> },
];

const reasons = [
  {
    title: "Resumes are dead signals",
    description: "Static PDFs can't capture ongoing skill development, daily learning habits, or verified competency. Apta replaces them with a living, ranked profile.",
  },
  {
    title: "AI is changing every job",
    description: "As tools evolve rapidly, yesterday's certifications lose relevance. Daily domain tests keep rankings current and meaningful.",
  },
  {
    title: "Bias-free by design",
    description: "Traditional hiring screens for pedigree. Apta screens for proven, verified skill — regardless of where you studied or who you know.",
  },
];

export function WhyNowSection() {
  return (
    <SectionWrapper background="secondary" hasBottomDivider className="overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <MotionWrapper animation="fade-up">
          <div className="inline-flex items-center rounded-full bg-gold/10 border border-gold/20 px-3 py-1 text-sm font-medium text-gold mb-6">
            <Lightbulb className="w-4 h-4 mr-2" /> Why Now
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Hiring is broken.<br />We&apos;re fixing it.
          </h2>
          <p className="text-lg text-text-secondary">
            The talent market is shifting toward proof over promises. Apta is built for this moment.
          </p>
        </MotionWrapper>
      </div>

      {/* Stats Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat, idx) => (
          <MotionWrapper key={idx} animation="scale" delay={idx * 100}>
            <div className="bg-bg-primary rounded-2xl border border-border p-6 text-center hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 rounded-xl bg-bg-tertiary border border-border flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold font-display mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-text-secondary leading-snug">{stat.label}</p>
            </div>
          </MotionWrapper>
        ))}
      </div>

      {/* Reasons */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((reason, idx) => (
          <MotionWrapper key={idx} animation="fade-up" delay={200 + idx * 150}>
            <div className="bg-bg-primary rounded-2xl border border-border p-6 h-full hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                <span className="text-orange-500 font-mono font-bold text-sm">{idx + 1}</span>
              </div>
              <h3 className="text-lg font-bold mb-3">{reason.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{reason.description}</p>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </SectionWrapper>
  );
}
