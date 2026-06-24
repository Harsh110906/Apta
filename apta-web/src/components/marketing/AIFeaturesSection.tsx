import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Bot, FileSignature, Target, Sparkles } from "lucide-react";

export function AIFeaturesSection() {
  const features = [
    {
      icon: <FileSignature className="w-6 h-6 text-orange-500" />,
      title: "AI Resume Optimization",
      description: "Get personalized feedback on your profile based on real job requirements in your domain."
    },
    {
      icon: <Target className="w-6 h-6 text-sky" />,
      title: "Skill-Gap Analysis",
      description: "Our AI analyzes your test results and certificates to identify exactly what you need to learn next."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: "AI Interview Coach",
      description: "Practice with an AI interviewer that asks domain-specific questions tailored to your experience level."
    },
    {
      icon: <Bot className="w-6 h-6 text-emerald" />,
      title: "Automated Outreach",
      description: "Recruiters can generate highly personalized interview emails instantly based on the candidate's profile."
    }
  ];

  return (
    <SectionWrapper background="tertiary" hasBottomDivider>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <MotionWrapper animation="fade-up">
          <div className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-600 dark:text-sky-400 mb-6">
            <Sparkles className="w-4 h-4 mr-2" /> AI-Powered
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">AI that coaches, not replaces</h2>
          <p className="text-lg text-text-secondary">
            Apta uses intelligent workflows to help candidates grow faster and help recruiters work smarter.
          </p>
        </MotionWrapper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <MotionWrapper key={idx} animation="fade-up" delay={idx * 150}>
            <div className="bg-bg-secondary border border-border rounded-2xl p-6 h-full transition-shadow hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-bg-tertiary flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </SectionWrapper>
  );
}
