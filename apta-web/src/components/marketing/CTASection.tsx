import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function CTASection() {
  return (
    <SectionWrapper background="grid" className="relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center bg-bg-secondary/50 backdrop-blur-md border border-border rounded-3xl p-10 md:p-16 shadow-2xl">
        <MotionWrapper animation="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to prove your potential?
          </h2>
          <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
            Join the platform where skill meets opportunity. Start your daily tests today, or discover the top talent in your industry tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/demo/candidate/onboarding" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto shadow-glow">
                Join as Candidate
              </Button>
            </Link>
            <Link href="/demo/recruiter/setup" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-bg-primary">
                Start Hiring
              </Button>
            </Link>
          </div>
        </MotionWrapper>
      </div>
    </SectionWrapper>
  );
}
