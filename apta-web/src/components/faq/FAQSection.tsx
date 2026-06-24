"use client";

import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Accordion } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/data/faq";
import Link from "next/link";

export function FAQSection() {
  const topFAQs = FAQ_ITEMS.slice(0, 6);

  return (
    <SectionWrapper background="secondary" hasBottomDivider>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <MotionWrapper animation="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Common questions</h2>
          <p className="text-lg text-text-secondary">
            Quick answers to things people ask most.
          </p>
        </MotionWrapper>
      </div>

      <div className="max-w-3xl mx-auto">
        <MotionWrapper animation="fade-up" delay={200}>
          <div className="space-y-4">
            {topFAQs.map((item) => (
              <Accordion key={item.id} title={item.title}>
                <div className="text-text-secondary leading-relaxed p-1">
                  {item.content}
                </div>
              </Accordion>
            ))}
          </div>
        </MotionWrapper>

        <MotionWrapper animation="fade-up" delay={400}>
          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              View all FAQs &rarr;
            </Link>
          </div>
        </MotionWrapper>
      </div>
    </SectionWrapper>
  );
}
