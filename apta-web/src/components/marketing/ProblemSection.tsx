import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FileText, Search, BookOpen, FilterX } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: <FileText className="w-6 h-6 text-rose" />,
      title: "Resumes are noisy",
      description: "Static PDFs don't prove current ability. Anyone can claim to be an expert in React or Python.",
      accent: "bg-rose-light/20 border-rose-light/30"
    },
    {
      icon: <FilterX className="w-6 h-6 text-sky" />,
      title: "Filters miss talent",
      description: "Recruiters waste hours parsing keyword-stuffed applications while passing over great but unconventional candidates.",
      accent: "bg-sky-light/20 border-sky-light/30"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-orange-500" />,
      title: "Learning lacks outcome",
      description: "Candidates take courses and build projects, but rarely have a way to connect that daily effort to getting hired.",
      accent: "bg-orange-100/50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-900/50"
    },
    {
      icon: <Search className="w-6 h-6 text-gold" />,
      title: "Signal is lost",
      description: "The hiring market is flooded. It's harder than ever for candidates to stand out and for recruiters to find true signal.",
      accent: "bg-gold-light/20 border-gold-light/30"
    }
  ];

  return (
    <SectionWrapper background="secondary" hasBottomDivider>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <MotionWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hiring is broken on both sides</h2>
          <p className="text-lg text-text-secondary">
            The traditional resume-and-apply model is failing us. We need a system built on proof, not presentation.
          </p>
        </MotionWrapper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {problems.map((problem, idx) => (
          <MotionWrapper key={idx} animation="fade-up" delay={idx * 100}>
            <div className={`p-8 rounded-2xl border transition-all duration-300 hover:shadow-md ${problem.accent} h-full`}>
              <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-border flex items-center justify-center mb-6 shadow-sm">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-text-secondary leading-relaxed">{problem.description}</p>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </SectionWrapper>
  );
}
