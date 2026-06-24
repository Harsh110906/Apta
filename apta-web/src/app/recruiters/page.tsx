import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Search, Filter, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export const metadata = {
  title: "For Recruiters | Apta",
  description: "Stop filtering. Start discovering. Hire top talent based on verified signal.",
};

export default function RecruitersPage() {
  const steps = [
    {
      title: "1. Define your needs",
      desc: "Select the domain, required skills, and minimum rank threshold.",
      icon: <Filter className="w-6 h-6 text-foreground" />
    },
    {
      title: "2. Get a curated stack",
      desc: "Instead of a list of 1000 resumes, receive a curated stack of the top candidates who match your criteria, ordered by rank.",
      icon: <Search className="w-6 h-6 text-sky" />
    },
    {
      title: "3. Swipe to shortlist",
      desc: "Review visual candidate cards. Swipe right to shortlist, left to pass. Simple and fast.",
      icon: <CheckCircle2 className="w-6 h-6 text-emerald" />
    },
    {
      title: "4. AI-powered outreach",
      desc: "Let Apta generate highly personalized outreach emails based on the candidate's exact profile and your job spec.",
      icon: <Mail className="w-6 h-6 text-orange-500" />
    }
  ];

  const recruiterTestimonials = TESTIMONIALS.filter(t => t.role === "Head of Engineering");

  return (
    <main className="flex-1 w-full">
      {/* Hero Section */}
      <SectionWrapper background="grid" className="pt-32 pb-20 relative overflow-hidden" hasBottomDivider>
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-sky-500/10 to-transparent blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <MotionWrapper animation="fade-up">
            <div className="inline-flex items-center rounded-full bg-sky-100 dark:bg-sky-900/30 px-3 py-1 text-sm font-medium text-sky-600 dark:text-sky-400 mb-6">
              For Hiring Teams
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find signal in the noise.
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Apta surfaces candidates based on verified skills and daily domain tests. Stop parsing PDFs and start swiping on proven talent.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/demo/recruiter/setup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto glow-blue">
                  Start Hiring
                </Button>
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Plans
                </Button>
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </SectionWrapper>

      {/* How it works */}
      <SectionWrapper background="secondary" hasBottomDivider>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionWrapper animation="fade-up">
            <h2 className="text-3xl font-bold mb-4">A better hiring workflow</h2>
            <p className="text-lg text-text-secondary">
              Designed to save you hours of manual filtering.
            </p>
          </MotionWrapper>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <MotionWrapper key={idx} animation="scale" delay={idx * 100}>
              <div className="bg-bg-primary p-8 rounded-2xl border border-border h-full hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-border flex items-center justify-center mb-6 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper background="primary" hasBottomDivider>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionWrapper animation="fade-up">
            <h2 className="text-3xl font-bold mb-4">Trusted by modern teams</h2>
          </MotionWrapper>
        </div>

        <div className="max-w-4xl mx-auto">
          {recruiterTestimonials.map((testimonial, idx) => (
            <MotionWrapper key={testimonial.id} animation="fade-up" delay={idx * 150}>
              <div className="bg-bg-tertiary p-8 md:p-10 rounded-3xl border border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <span className="text-8xl font-serif text-sky-500">"</span>
                </div>
                <p className="text-xl md:text-2xl text-foreground font-medium italic mb-8 relative z-10 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{testimonial.author}</div>
                    <div className="text-text-secondary">{testimonial.role}, {testimonial.company}</div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to upgrade your talent pipeline?</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Join the forward-thinking companies hiring on Apta.
          </p>
          <Link href="/demo/recruiter/setup">
            <Button size="lg" className="shadow-glow">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </MotionWrapper>
      </SectionWrapper>
    </main>
  );
}
