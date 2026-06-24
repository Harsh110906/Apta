import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Accordion } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/data/faq";

export const metadata = {
  title: "FAQ | Apta",
  description: "Frequently asked questions about Apta's ranking system, verification, and tools.",
};

export default function FAQPage() {
  return (
    <main className="flex-1 w-full pt-20">
      <SectionWrapper background="secondary">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionWrapper animation="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-text-secondary">
              Everything you need to know about how Apta works.
            </p>
          </MotionWrapper>
        </div>

        <div className="max-w-3xl mx-auto">
          <MotionWrapper animation="fade-up" delay={200}>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, idx) => (
                <Accordion key={item.id} title={item.title}>
                  <div className="text-text-secondary leading-relaxed p-1">
                    {item.content}
                  </div>
                </Accordion>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </SectionWrapper>
    </main>
  );
}
