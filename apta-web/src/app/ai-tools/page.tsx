import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AIFeaturesSection } from "@/components/marketing/AIFeaturesSection";
import { Bot, Sparkles, MessageSquare, Briefcase } from "lucide-react";

export const metadata = {
  title: "AI Tools | Apta",
  description: "Explore the AI coaching and matching tools powering Apta.",
};

export default function AIToolsPage() {
  return (
    <main className="flex-1 w-full pt-20">
      <SectionWrapper background="secondary" hasBottomDivider className="text-center">
        <MotionWrapper animation="fade-up">
          <div className="inline-flex items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-600 dark:text-sky-400 mb-6">
            <Sparkles className="w-4 h-4 mr-2" /> Powered by Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Personal Career Coach</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Apta's AI isn't here to replace you. It's here to guide you, analyze your gaps, and prepare you for your next big role.
          </p>
        </MotionWrapper>
      </SectionWrapper>

      <AIFeaturesSection />

      <SectionWrapper background="primary">
        <div className="max-w-4xl mx-auto">
          <MotionWrapper animation="fade-up">
            <div className="bg-bg-tertiary rounded-3xl p-8 md:p-12 border border-border shadow-xl flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Interactive Mock Interviews</h2>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Practice for the real thing with our voice-enabled AI interviewer. It adapts to your domain, asks follow-up questions based on your responses, and provides a detailed feedback report highlighting areas for improvement.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-sky" />
                    <span className="font-medium text-sm">Real-time conversational flow</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-emerald" />
                    <span className="font-medium text-sm">Tailored to specific job specs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-orange-500" />
                    <span className="font-medium text-sm">Actionable feedback reports</span>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 aspect-square bg-midnight rounded-2xl flex items-center justify-center border border-midnight-600 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-glow opacity-30" />
                <div className="w-24 h-24 rounded-full bg-bg-secondary flex items-center justify-center shadow-glow animate-float z-10">
                  <Bot className="w-12 h-12 text-sky-400" />
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </SectionWrapper>
    </main>
  );
}
