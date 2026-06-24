import Link from "next/link";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";

function CandidateMockup() {
  return (
    <div className="bg-bg-secondary rounded-2xl border border-border shadow-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <div className="text-lg font-bold">Welcome back, Alex</div>
          <div className="text-sm text-text-secondary">Frontend Engineering</div>
        </div>
        <div className="flex items-center gap-2 bg-bg-tertiary px-3 py-1.5 rounded-lg border border-border">
          <span className="text-orange-500 animate-pulse">🔥</span>
          <span className="font-bold text-sm">45 Days</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-bg-tertiary rounded-xl p-3 border border-border">
          <div className="text-xs text-text-muted mb-1">Rank</div>
          <div className="font-bold text-sm flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-sky" /> Platinum
          </div>
        </div>
        <div className="bg-bg-tertiary rounded-xl p-3 border border-border">
          <div className="text-xs text-text-muted mb-1">Points</div>
          <div className="font-bold text-sm font-mono">12,450</div>
        </div>
        <div className="bg-bg-tertiary rounded-xl p-3 border border-border">
          <div className="text-xs text-text-muted mb-1">Tests</div>
          <div className="font-bold text-sm font-mono">127</div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {["React", "TypeScript", "Next.js"].map((skill) => (
          <span key={skill} className="px-2 py-1 bg-emerald/10 text-emerald rounded-md text-xs font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function RecruiterMockup() {
  return (
    <div className="bg-bg-secondary rounded-2xl border border-border shadow-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-sky/10 rounded-br-full" />

      {/* Card Stack Effect */}
      <div className="relative z-10">
        <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Candidate Stack</div>
        
        {/* Background card */}
        <div className="absolute top-12 left-2 right-2 h-40 bg-bg-tertiary rounded-xl border border-border opacity-40 scale-95" />
        
        {/* Front card */}
        <div className="relative bg-bg-tertiary rounded-xl border border-border p-4 shadow-md">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">SC</div>
              <div>
                <div className="font-bold text-sm">Sarah Chen</div>
                <div className="text-xs text-text-secondary">Data Science · ML & Python</div>
              </div>
            </div>
            <div className="px-2 py-0.5 bg-orange-500/10 text-orange-500 rounded-md text-xs font-bold">Diamond</div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {["Python", "ML", "PyTorch"].map((skill) => (
              <span key={skill} className="px-2 py-0.5 bg-emerald/10 text-emerald rounded text-[10px] font-medium flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" /> {skill}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="h-8 flex-1 rounded-lg border-2 border-border flex items-center justify-center text-rose text-sm hover:bg-rose/10 transition-colors cursor-pointer">✕</div>
            <div className="h-8 flex-1 rounded-lg bg-sky text-white flex items-center justify-center text-sm hover:bg-sky-600 transition-colors cursor-pointer">👍</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <SectionWrapper background="primary" hasBottomDivider className="overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <MotionWrapper animation="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">See it in action</h2>
          <p className="text-lg text-text-secondary">
            Explore the full candidate and recruiter experience with our interactive prototypes.
          </p>
        </MotionWrapper>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <MotionWrapper animation="fade-right" delay={100}>
          <div className="group">
            <div className="mb-6 transition-transform duration-300 group-hover:-translate-y-2">
              <CandidateMockup />
            </div>
            <h3 className="text-xl font-bold mb-2">Candidate Dashboard</h3>
            <p className="text-text-secondary text-sm mb-4">
              Track your rank, maintain your streak, take daily tests, and watch your skills get verified in real time.
            </p>
            <Link href="/demo/candidate/onboarding">
              <Button size="sm" className="group/btn">
                Try Candidate Demo <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </MotionWrapper>

        <MotionWrapper animation="fade-left" delay={250}>
          <div className="group">
            <div className="mb-6 transition-transform duration-300 group-hover:-translate-y-2">
              <RecruiterMockup />
            </div>
            <h3 className="text-xl font-bold mb-2">Recruiter Discovery</h3>
            <p className="text-text-secondary text-sm mb-4">
              Define your needs, get a curated stack of verified candidates, swipe to shortlist, and use AI to reach out.
            </p>
            <Link href="/demo/recruiter/setup">
              <Button variant="outline" size="sm" className="group/btn">
                Try Recruiter Demo <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </MotionWrapper>
      </div>
    </SectionWrapper>
  );
}
